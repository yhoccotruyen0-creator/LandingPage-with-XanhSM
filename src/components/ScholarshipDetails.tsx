import React from 'react';
import { motion } from 'motion/react';
import { Gift, Wallet2, CheckSquare, Calendar, MapPin, ArrowRight, Map } from 'lucide-react';

interface ScholarshipDetailsProps {
  onRegisterClick: () => void;
  onFinderClick: () => void;
}

export default function ScholarshipDetails({ onRegisterClick, onFinderClick }: ScholarshipDetailsProps) {
  return (
    <section id="hoc-bong" className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      
      {/* Left Column: List item cards with specific info */}
      <div className="flex flex-col justify-center rounded-2xl border border-[#e8e8ea] bg-white p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-2.5 text-primary">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-primary shadow-sm shadow-primary/5">
            <Gift className="h-5 w-5" />
          </div>
          <h2 className="font-headline text-xl font-bold">
            Chi Tiết Học Bổng
          </h2>
        </div>

        <ul className="mt-8 space-y-6">
          <li className="flex items-start gap-4 border-b border-[#eeeef0] pb-5 last:border-0 last:pb-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <Wallet2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-wider text-secondary">Giá trị</p>
              <p className="mt-1 font-headline text-base font-extrabold text-[#1a1c1e]">
                Giảm 1.000.000 VNĐ cho khóa học Bingo đầu tiên.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4 border-b border-[#eeeef0] pb-5 last:border-0 last:pb-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <CheckSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-wider text-secondary">Điều kiện</p>
              <p className="mt-1 font-sans text-sm sm:text-base font-semibold text-on-surface-variant leading-relaxed">
                Xuất trình Thẻ tài xế Xanh SM (vật lý hoặc trên app tài xế) và Voucher của chương trình.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4 border-b border-[#eeeef0] pb-5 last:border-0 last:pb-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-wider text-secondary">Thời hạn</p>
              <p className="mt-1 font-sans text-sm sm:text-base font-semibold text-on-surface-variant">
                Đến hết ngày <span className="font-bold text-primary">31/08/2026</span>.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-wider text-secondary">Địa điểm áp dụng</p>
              <p className="mt-1 font-sans text-sm sm:text-base font-semibold text-on-surface-variant">
                Các cơ sở đào tạo của hệ thống Superbrain được tuyển chọn trên toàn quốc.
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Right Column: CTA box card */}
      <div className="flex flex-col justify-center items-center text-center rounded-2xl border border-secondary/20 bg-gradient-to-tr from-[#f3f3f6] to-[#f9f9fc] p-6 sm:p-10 shadow-sm">
        <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface leading-snug">
          Đừng bỏ lỡ cơ hội vàng cho tương lai của con em chúng ta!
        </h3>
        
        <p className="mt-3 font-sans text-sm text-on-surface-variant font-medium max-w-sm">
          Đăng ký lưu giữ suất học bổng ngay hôm nay để nhận mã voucher và quyền ưu tiên đánh giá khả năng tập trung cho bé.
        </p>

        <div className="mt-8 w-full flex flex-col gap-4 max-w-md">
          <button
            onClick={onRegisterClick}
            className="w-full bg-primary text-white font-headline font-bold text-sm sm:text-base py-4 px-6 rounded-xl hover:bg-primary-container transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            ĐĂNG KÝ GIỮ SUẤT HỌC BỔNG 1 TRIỆU CHO CON
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <button
            onClick={onFinderClick}
            className="w-full bg-white text-secondary border border-secondary/40 font-headline font-bold text-sm py-3 px-6 rounded-xl hover:bg-secondary/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Map className="h-4 w-4" />
            XEM DANH SÁCH 71 CƠ SỞ ĐỒNG HÀNH GẦN BẠN NHẤT
          </button>
        </div>
      </div>

    </section>
  );
}
