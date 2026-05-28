import React, { useEffect, useState, useMemo } from 'react';
import { Search, MapPin, Phone, ArrowRight, ChevronsDown, ChevronsUp, Loader2, AlertCircle, ChevronLeft, ChevronRight, ChevronDown, MessageCircle } from 'lucide-react';
import { SuperbrainCenter } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const FANPAGE_URL = 'https://www.facebook.com/superbrainvietnam';

const getTelHref = (hotline: string) => 'tel:' + hotline.replace(/[^\d+]/g, '');

interface CenterFinderProps {
  centers: SuperbrainCenter[];
  isLoading?: boolean;
  loadError?: string;
  onSelectCenterToRegister: (center: SuperbrainCenter) => void;
}

export default function CenterFinder({ centers, isLoading = false, loadError, onSelectCenterToRegister }: CenterFinderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('Tất cả');
  const [showAllCenters, setShowAllCenters] = useState(false);
  const [mobilePage, setMobilePage] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const provinces = useMemo(() => {
    const values = Array.from(new Set(centers.map(center => center.province).filter(Boolean)));
    return ['Tất cả', ...values.sort((a, b) => a.localeCompare(b, 'vi'))];
  }, [centers]);

  // Compute counts dynamically to match specified database constraints
  const provinceCounts = useMemo(() => {
    const counts: Record<string, number> = { 'Tất cả': centers.length };
    
    // Initialize standard values to ensure labels are present
    provinces.forEach(p => {
      if (p !== 'Tất cả') counts[p] = 0;
    });

    // Count
    centers.forEach(center => {
      const p = center.province;
      if (counts[p] !== undefined) {
        counts[p] += 1;
      } else {
        counts[p] = 1;
      }
    });

    return counts;
  }, [centers, provinces]);

  // Filter centers based on query and selected province tab
  const filteredCenters = useMemo(() => {
    return centers.filter(center => {
      const matchTab = selectedProvince === 'Tất cả' || center.province.toLowerCase() === selectedProvince.toLowerCase();
      
      const cleanQuery = searchQuery.trim().toLowerCase();
      if (!cleanQuery) return matchTab;

      const matchText = 
        center.name.toLowerCase().includes(cleanQuery) ||
        center.address.toLowerCase().includes(cleanQuery) ||
        center.district.toLowerCase().includes(cleanQuery) ||
        center.province.toLowerCase().includes(cleanQuery) ||
        (center.email || '').toLowerCase().includes(cleanQuery);

      return matchTab && matchText;
    });
  }, [centers, searchQuery, selectedProvince]);

  useEffect(() => {
    setShowAllCenters(false);
    setMobilePage(0);
  }, [searchQuery, selectedProvince]);

  const mobilePageSize = 2;
  const mobilePageCount = Math.max(1, Math.ceil(filteredCenters.length / mobilePageSize));
  const mobilePageStart = mobilePage * mobilePageSize;
  const mobileVisibleCenters = filteredCenters.slice(mobilePageStart, mobilePageStart + mobilePageSize);

  useEffect(() => {
    setMobilePage(current => Math.min(current, mobilePageCount - 1));
  }, [mobilePageCount]);

  const hasMoreCenters = filteredCenters.length > 6;
  const visibleCenters = showAllCenters ? filteredCenters : filteredCenters.slice(0, 6);

  const goToMobilePage = (page: number) => {
    setMobilePage(Math.min(Math.max(page, 0), mobilePageCount - 1));
  };

  const handleMobileSwipeEnd = (touchEndX: number) => {
    if (touchStartX === null || mobilePageCount <= 1) return;

    const deltaX = touchStartX - touchEndX;
    const swipeThreshold = 40;

    if (Math.abs(deltaX) >= swipeThreshold) {
      goToMobilePage(mobilePage + (deltaX > 0 ? 1 : -1));
    }

    setTouchStartX(null);
  };

  const renderCenterCard = (center: SuperbrainCenter) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      key={center.id}
      className="flex flex-col justify-between rounded-2xl border border-[#dcefe2] bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6 relative overflow-hidden group"
    >
      <div className="flex flex-col gap-3">
        
        {/* Header: Name & Badge */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <h3 className="font-headline font-bold text-[#123d2a] text-base sm:text-lg group-hover:text-[#148144] transition-colors">
            {center.name}
          </h3>
          <span className="w-fit shrink-0 bg-[#e9f8ed] text-[#148144] text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-widest border border-[#bfe4c8]">
            {center.province}
          </span>
        </div>

        {/* Meta rows */}
        <div className="flex flex-col gap-2.5 mt-2">
          <div className="flex items-start gap-2.5 text-sm font-medium text-[#2f6f3f]">
            <MapPin className="h-4.5 w-4.5 text-[#148144] shrink-0 mt-0.5" />
            <span className="line-clamp-2 leading-relaxed text-xs sm:text-sm font-semibold">
              {center.address || center.email || 'Thông tin địa chỉ sẽ được cập nhật'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-sm font-medium text-[#2f6f3f]">
            <Phone className="h-4 w-4 text-[#148144] shrink-0" />
            <span className="font-mono text-xs sm:text-sm font-semibold text-[#123d2a]">{center.hotline}</span>
          </div>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-6 pt-4 border-t border-[#f3f3f6]">
        <button
          onClick={() => onSelectCenterToRegister(center)}
          className="w-full bg-[#e9f8ed] text-[#148144] border border-[#bfe4c8] font-headline font-bold text-xs py-2.5 rounded-xl hover:bg-[#148144] hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          Đăng ký học cơ sở này
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
        
        <div className="grid grid-cols-2 gap-2">
          <a
            href={getTelHref(center.hotline)}
            className="flex min-h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-[#bfe4c8] bg-white px-2 py-2 text-center font-headline text-[11px] font-semibold leading-tight text-[#2f6f3f] transition-all hover:bg-[#f6fcf2] sm:text-xs"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 text-[#2f6f3f]" />
            <span>Gọi điện tư vấn</span>
          </a>

          <a
            href={FANPAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-[#bfe4c8] bg-white px-2 py-2 text-center font-headline text-[11px] font-semibold leading-tight text-[#2f6f3f] transition-all hover:bg-[#f6fcf2] sm:text-xs"
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[#2f6f3f]" />
            <span>Liên hệ fanpage</span>
          </a>
        </div>
      </div>

    </motion.div>

  );


  return (
    <section id="dia-diem" className="scroll-mt-20 w-full flex flex-col gap-6 sm:gap-8">
      
      {/* Header and description of location locator */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2.5 sm:items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#148144] text-white shadow-md shadow-[#148144]/15">
            <MapPin className="h-4 w-4" />
          </div>
          <h2 className="font-headline text-xl font-bold leading-tight text-[#148144] md:text-2xl">
            Hệ thống cơ sở Superbrain đồng hành ({centers.length} cơ sở)
          </h2>
        </div>
        <p className="font-sans text-sm sm:text-base text-[#2f6f3f] font-medium">
          Tìm địa điểm học tập thích hợp gần nhà hoặc vị trí thường di chuyển để tiện việc đưa đón trẻ.
        </p>
      </div>

      {/* Area filter block */}
      <div className="rounded-2xl border border-[#bfe4c8] bg-[#f6fcf2] px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6 flex flex-col gap-4">
        
        {/* Search header container */}
        <div className="flex items-center">
          <h3 className="font-headline text-sm font-bold tracking-wider text-[#148144] uppercase whitespace-nowrap">
            BỘ LỌC KHU VỰC NHANH
          </h3>
        </div>

        {/* Tỉnh / Thành phố quick list tabs */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] lg:items-end">
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex items-center justify-between gap-3 sm:block">
              <p className="text-xs font-bold text-[#2f6f3f] uppercase tracking-wider">
                Tỉnh / Thành phố
              </p>

              <div className="relative min-w-0 flex-1 sm:hidden">
                <select
                  value={selectedProvince}
                  onChange={(event) => setSelectedProvince(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#9fd7aa] bg-white py-2 pl-3 pr-11 font-sans text-xs font-extrabold text-[#148144] outline-none focus:border-[#148144] focus:ring-1 focus:ring-[#148144]"
                  aria-label="Chọn tỉnh hoặc thành phố"
                >
                  {provinces.map(prov => (
                    <option key={`prov-option-${prov}`} value={prov}>
                      {prov} ({provinceCounts[prov] || 0})
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#148144]" />
              </div>
            </div>
            
            {/* Scrollable container for chips */}
            <div className="hidden gap-2 overflow-x-auto pb-1 custom-scrollbar sm:flex">
              {provinces.map(prov => {
                const count = provinceCounts[prov] || 0;
                const isSelected = selectedProvince.toLowerCase() === prov.toLowerCase();
                return (
                  <button
                    key={`prov-chip-${prov}`}
                    onClick={() => setSelectedProvince(prov)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 shadow-sm cursor-pointer border ${
                      isSelected
                        ? "bg-[#148144] text-white border-[#148144] scale-102"
                        : "bg-white text-[#185c34] border-[#bfe4c8] hover:border-[#148144]/60 hover:text-[#148144]"
                    }`}
                  >
                    {prov} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative min-w-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#148144] text-sm h-4.5 w-4.5" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#9fd7aa] bg-white text-sm outline-none focus:border-[#148144] focus:ring-1 focus:ring-[#148144] transition-all font-sans font-semibold placeholder:text-[#7fae82]"
              placeholder="Nhập tên cơ sở, quận huyện hoặc tên đường..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

      </div>

      {/* Grid listing search results */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-sm text-[#2f6f3f] font-medium">
            Đang hiển thị:{' '}
            <span className="font-bold text-[#123d2a] sm:hidden">
              {mobileVisibleCenters.length}/{filteredCenters.length} cơ sở phù hợp
            </span>
            <span className="hidden font-bold text-[#123d2a] sm:inline">
              {visibleCenters.length}/{filteredCenters.length} cơ sở phù hợp
            </span>
          </p>
          {(searchQuery || selectedProvince !== 'Tất cả') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedProvince('Tất cả');
              }}
              className="hidden font-headline text-xs font-bold text-[#148144] hover:underline sm:block"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-dashed border-[#e2e2e5] bg-white text-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#148144]" />
            <p className="mt-4 font-headline text-base font-bold text-[#123d2a]">Đang tải danh sách cơ sở...</p>
            <p className="mt-1 font-sans text-xs text-[#2f6f3f] font-medium max-w-sm">
              Hệ thống đang kết nối dữ liệu từ Superbrain, vui lòng chờ trong giây lát.
            </p>
          </div>
        ) : loadError ? (
          <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-error/20 bg-error-container text-center">
            <AlertCircle className="h-10 w-10 text-error" />
            <p className="mt-4 font-headline text-base font-bold text-error">
              Lỗi khi tải dữ liệu, liên hệ Superbrain để được hỗ trợ
            </p>
          </div>
        ) : filteredCenters.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-dashed border-[#e2e2e5] bg-white text-center">
            <MapPin className="h-10 w-10 text-[#8fbd78] animate-bounce" />
            <p className="mt-4 font-headline text-base font-bold text-[#123d2a]">Không tìm thấy cơ sở phù hợp</p>
            <p className="mt-1 font-sans text-xs text-[#2f6f3f] font-medium max-w-sm">
              Bạn hãy thử thay đổi từ khóa tìm kiếm hoặc chọn tỉnh thành khác để tìm được cơ sở Superbrain đồng hành.
            </p>
          </div>
        ) : (
          <>
            <div
              className="sm:hidden"
              onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
              onTouchEnd={(event) => handleMobileSwipeEnd(event.changedTouches[0].clientX)}
            >
              <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode="popLayout">
                  {mobileVisibleCenters.map(center => renderCenterCard(center))}
                </AnimatePresence>
              </div>

              {mobilePageCount > 1 && (
                <div className="mt-4 flex flex-col items-center gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => goToMobilePage(mobilePage - 1)}
                      disabled={mobilePage === 0}
                      aria-label="Trang trước"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#bfe4c8] bg-white text-[#148144] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <div className="flex max-w-[calc(100vw-9rem)] items-center gap-1.5 overflow-x-auto px-1 py-1">
                      {Array.from({ length: mobilePageCount }).map((_, pageIndex) => (
                        <button
                          key={pageIndex}
                          type="button"
                          onClick={() => goToMobilePage(pageIndex)}
                          aria-label={`Tới trang ${pageIndex + 1}`}
                          className={`h-2.5 rounded-full transition-all ${
                            pageIndex === mobilePage
                              ? 'w-7 bg-[#148144]'
                              : 'w-2.5 bg-[#bfe4c8]'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => goToMobilePage(mobilePage + 1)}
                      disabled={mobilePage === mobilePageCount - 1}
                      aria-label="Trang sau"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#bfe4c8] bg-white text-[#148144] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="font-sans text-xs font-bold text-[#2f6f3f]">
                    Trang {mobilePage + 1}/{mobilePageCount}
                  </p>
                </div>
              )}
            </div>

            <div className="hidden grid-cols-1 gap-4 sm:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
            <AnimatePresence mode="popLayout">
              {visibleCenters.map(center => renderCenterCard(center))}
            </AnimatePresence>
            </div>
          </>
        )}

        {!isLoading && !loadError && hasMoreCenters && (
          <div className="hidden justify-center pt-2 sm:flex">
            <button
              onClick={() => setShowAllCenters(current => !current)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#148144]/30 bg-white px-5 py-3 font-headline text-sm font-extrabold text-[#148144] shadow-sm transition-all hover:bg-[#148144] hover:text-white cursor-pointer"
            >
              {showAllCenters ? (
                <>
                  Ẩn bớt
                  <ChevronsUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Xem thêm {filteredCenters.length - 6} cơ sở
                  <ChevronsDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

    </section>
  );
}
