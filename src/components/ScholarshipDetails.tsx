import React from 'react';
import { Map } from 'lucide-react';
import voucherImage from '../../uploads/voucher-01.png';

interface ScholarshipDetailsProps {
  onRegisterClick: () => void;
  onFinderClick: () => void;
}

export default function ScholarshipDetails({ onRegisterClick, onFinderClick }: ScholarshipDetailsProps) {
  return (
    <section id="hoc-bong" className="overflow-hidden rounded-2xl border border-[#dcefe2] bg-white shadow-sm">
      <div>
        <img
          src={voucherImage}
          alt="Voucher học bổng Mầm Xanh Trí Tuệ trị giá 1.000.000 VNĐ"
          className="block h-auto w-full"
        />
      </div>

      <div className="grid grid-cols-1 border-t border-[#dcefe2] bg-gradient-to-tr from-[#effbf4] to-white lg:grid-cols-2">
        <div className="flex flex-col justify-center p-5 text-center sm:p-8 lg:text-left">
          <h3 className="font-headline text-lg font-extrabold leading-snug text-[#148144] sm:text-xl">
            Tặng con món quà tốt nhất ngay hôm nay!
          </h3>
        </div>

        <div className="flex flex-col justify-center p-5 pt-0 sm:p-8 sm:pt-0 lg:pt-8">
          <button
            onClick={onFinderClick}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#148144]/40 bg-white px-4 py-3.5 text-center font-headline text-xs font-bold leading-snug text-[#148144] transition-all hover:bg-[#f6fcf2] sm:px-5 sm:py-4 sm:text-base"
          >
            <Map className="h-5 w-5 shrink-0" />
            <span>XEM DANH SÁCH CƠ SỞ ĐỒNG HÀNH GẦN BẠN NHẤT</span>
          </button>
        </div>
      </div>
    </section>
  );
}
