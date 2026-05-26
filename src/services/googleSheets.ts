import { Registration, SuperbrainCenter } from '../types';

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
const SPREADSHEET_ID = '1dgb_954aTZxHSLHpjuTyh2IFocBNbGwKH14f6cX2jI';

type RawCenterRow = Record<string, unknown>;

function toText(value: unknown): string {
  if (value == null) return '';
  return String(value).trim();
}

function getFirst(row: RawCenterRow, keys: string[]): string {
  for (const key of keys) {
    const value = toText(row[key]);
    if (value) return value;
  }
  return '';
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizeCenter(
  row: RawCenterRow,
  index: number,
  fallbackProvince = ''
): SuperbrainCenter | null {
  const province = getFirst(row, ['province', 'location', 'tinh', 'city', 'tinh_thanhpho']) || fallbackProvince;
  const name = getFirst(row, ['name', 'branch', 'coso', 'branchName', 'branch_name', 'title']);

  if (!province || !name) return null;

  const district = getFirst(row, ['district', 'quan_huyen', 'districtName']);
  const address = getFirst(row, ['address', 'dia_chi']);
  const hotline = getFirst(row, ['hotline', 'phone', 'sdt']) || '1900 636 079';
  const email = getFirst(row, ['email', 'email_coso']);

  return {
    id: `${slugify(province)}-${slugify(name)}-${index}`,
    name,
    province,
    district,
    address,
    hotline,
    email: email || undefined
  };
}

export function normalizeCentersFromSheet(rawData: unknown): SuperbrainCenter[] {
  if (!rawData || typeof rawData !== 'object') return [];

  if ('ok' in rawData && (rawData as { ok?: unknown }).ok === false) {
    const error = toText((rawData as { error?: unknown }).error) || 'Google Sheet returned an error';
    throw new Error(error);
  }

  if ('data' in rawData && Array.isArray((rawData as { data?: unknown }).data)) {
    return normalizeCentersFromSheet((rawData as { data: unknown }).data);
  }

  const centers: SuperbrainCenter[] = [];

  if (Array.isArray(rawData)) {
    rawData.forEach((row, index) => {
      if (!row || typeof row !== 'object') return;
      const center = normalizeCenter(row as RawCenterRow, index);
      if (center) centers.push(center);
    });
  } else {
    Object.entries(rawData as Record<string, unknown>).forEach(([province, branches]) => {
      const branchList = Array.isArray(branches) ? branches : [branches];

      branchList.forEach((branch, index) => {
        if (typeof branch === 'string' || typeof branch === 'number') {
          const center = normalizeCenter({ branch }, index, province);
          if (center) centers.push(center);
          return;
        }

        if (!branch || typeof branch !== 'object') return;
        const center = normalizeCenter(branch as RawCenterRow, index, province);
        if (center) centers.push(center);
      });
    });
  }

  const unique = new Map<string, SuperbrainCenter>();
  centers.forEach(center => {
    unique.set(`${center.province.toLowerCase()}::${center.name.toLowerCase()}`, center);
  });

  return Array.from(unique.values()).sort((a, b) => {
    const provinceCompare = a.province.localeCompare(b.province, 'vi');
    if (provinceCompare !== 0) return provinceCompare;
    return a.name.localeCompare(b.name, 'vi');
  });
}

export async function fetchCentersFromSheet(): Promise<SuperbrainCenter[]> {
  if (!SCRIPT_URL) {
    throw new Error('Missing VITE_GOOGLE_SCRIPT_URL');
  }

  const response = await fetch(SCRIPT_URL, {
    method: 'GET',
    cache: 'no-cache'
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch centers: ${response.status}`);
  }

  const rawData = await response.json();
  return normalizeCentersFromSheet(rawData);
}

type RegistrationPayload = Omit<Registration, 'id' | 'timestamp' | 'status'> & {
  centerEmail?: string;
};

export async function submitRegistrationToSheet(data: RegistrationPayload): Promise<void> {
  if (!SCRIPT_URL) {
    throw new Error('Missing VITE_GOOGLE_SCRIPT_URL');
  }

  const timestamp = new Date().toLocaleString('vi-VN');
  const payload = {
    sheet_id: '1dgb_954aTZxHSLHpjuTyh2IFocBNbGwaKH14f6cX2jI',
    sheet_name: 'LandingPage',
    row: [
      timestamp,
      data.parentName,
      data.childName,
      data.childAge,
      data.phoneNumber,
      data.province,
      data.centerName,
      data.centerEmail || '',
      'xanhsm-landing-page',
      'sent',
      timestamp
    ],
    data: {
      timestamp,
      parent_name: data.parentName,
      child_name: data.childName,
      child_age: data.childAge,
      phone: data.phoneNumber,
      tinh_thanhpho: data.province,
      coso: data.centerName,
      email_coso: data.centerEmail || '',
      source: 'xanhsm-landing-page',
      status: 'sent',
      update_at: timestamp
    }
  };

  await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
