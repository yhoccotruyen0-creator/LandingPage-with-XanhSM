export interface SuperbrainCenter {
  id: string;
  name: string;
  province: string;
  district: string;
  address: string;
  hotline: string;
  email?: string;
  mapUrl?: string;
}

export interface Registration {
  id: string;
  parentName: string;
  childName: string;
  childAge: string;
  phoneNumber: string;
  province: string;
  centerId: string;
  centerName: string;
  timestamp: string;
  status: 'pending' | 'confirmed';
}
