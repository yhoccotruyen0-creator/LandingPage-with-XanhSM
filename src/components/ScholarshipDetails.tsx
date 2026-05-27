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
      <div className="flex flex-col justify-center rounded-2xl border border-[#dcefe2] bg-white px-5 py-4 shadow-sm sm:p-10">
        <div className="flex items-center gap-2.5 text-[#148144]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9f8ed] text-[#148144] shadow-sm shadow-[#148144]/5">
            <Gift className="h-5 w-5" />
          </div>
          <h2 className="font-headline text-xl font-extrabold">
            Chi tiết học bổng “Mầm Xanh Trí Tuệ”
          </h2>
        </div>

        <ul className="mt-8 space-y-6">
          <li className="flex items-start gap-4 border-b border-[#dcefe2] pb-5 last:border-0 last:pb-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9f8ed] text-[#148144]">
              <Wallet2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-headline text-sm font-extrabold uppercase tracking-wider text-[#148144] sm:text-base">Giá trị học bổng</p>
              <p className="mt-1 font-sans text-sm font-semibold leading-relaxed text-[#2f6f3f] sm:text-base">
                Ưu đãi <span className="font-extrabold text-[#148144]">1.000.000 VNĐ</span> học phí khóa học Bingo đầu tiên tại các cơ sở đồng hành Superbrain.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4 border-b border-[#dcefe2] pb-5 last:border-0 last:pb-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9f8ed] text-[#148144]">
              <CheckSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="font-headline text-sm font-extrabold uppercase tracking-wider text-[#148144] sm:text-base">Điều kiện áp dụng</p>
              <ul className="mt-1 space-y-2 font-sans text-sm font-semibold leading-relaxed text-[#2f6f3f] sm:text-base">
                <li>Áp dụng cho học viên mới đăng ký, chưa từng học tại Superbrain.</li>
                <li>Không quy đổi thành tiền mặt và không áp dụng đồng thời các chương trình khác.</li>
              </ul>
            </div>
          </li>

          <li className="flex items-start gap-4 border-b border-[#dcefe2] pb-5 last:border-0 last:pb-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9f8ed] text-[#148144]">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="font-headline text-sm font-extrabold uppercase tracking-wider text-[#148144] sm:text-base">Thời hạn sử dụng</p>
              <p className="mt-1 font-sans text-sm sm:text-base font-semibold text-[#2f6f3f]">
                Đến hết ngày <span className="font-extrabold text-[#148144]">31/08/2026</span>.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9f8ed] text-[#148144]">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="font-headline text-sm font-extrabold uppercase tracking-wider text-[#148144] sm:text-base">Địa điểm chấp nhận</p>
              <p className="mt-1 font-sans text-sm sm:text-base font-semibold text-[#2f6f3f]">
                Áp dụng đồng bộ tại các cơ sở đồng hành cùng Superbrain.
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Right Column: CTA box card */}
      <div className="flex flex-col justify-center items-center text-center rounded-2xl border border-[#dcefe2] bg-gradient-to-tr from-[#effbf4] to-white p-6 shadow-sm sm:p-10">
        <h3 className="font-headline text-lg sm:text-xl font-extrabold text-[#148144] leading-snug">
          Hãy tặng món quà tốt nhất cho con ngay hôm nay!
        </h3>
        
        <p className="mt-3 font-sans text-sm text-[#2f6f3f] font-medium max-w-sm">
          Giúp bé khởi dậy sức mạnh trí tuệ, tự tin chinh phục các môn học khác ngoài Toán, nuôi dưỡng thói quen tự giác học tập ngay từ hôm nay.
        </p>

        <div className="mt-8 w-full flex flex-col gap-4 max-w-md">
          <button
            onClick={onRegisterClick}
            className="w-full bg-[#148144] text-white font-headline font-bold text-sm sm:text-base py-4 px-6 rounded-xl hover:bg-[#0f6f39] transition-all shadow-md shadow-[#148144]/15 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            ĐĂNG KÝ GIỮ SUẤT HỌC BỔNG 1 TRIỆU CHO CON
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <button
            onClick={onFinderClick}
            className="w-full bg-white text-[#148144] border border-[#148144]/40 font-headline font-bold text-sm py-3 px-6 rounded-xl hover:bg-[#f6fcf2] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Map className="h-4 w-4" />
            XEM DANH SÁCH CƠ SỞ ĐỒNG HÀNH GẦN BẠN NHẤT
          </button>
        </div>
      </div>

    </section>
  );
}