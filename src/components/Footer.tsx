import React from 'react';
import { BookOpen } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-[#e2e2e5] bg-[#e2e2e5]/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo brand */}
          <button
            onClick={() => onScrollToSection('hero')}
            className="flex items-center gap-2 text-left focus:outline-none rounded-lg"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-primary-container text-white shadow-sm">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="font-headline text-base font-bold text-primary leading-tight">
                Mầm Xanh Trí Tuệ
              </p>
              <p className="font-sans text-[9px] font-bold uppercase tracking-wider text-secondary">
                Superbrain x Xanh SM
              </p>
            </div>
          </button>

          {/* Copyright description */}
          <div className="text-center md:text-left text-xs text-on-surface-variant font-medium">
            <p>© 2026 Mầm Xanh Trí Tuệ. Bản quyền thuộc về Superbrain & Xanh SM.</p>
            <p className="mt-1 text-[10px] opacity-70">
              Chương trình tài tài trợ đặc quyền dành riêng cho con em đội ngũ tài xế Xanh SM Việt Nam.
            </p>
          </div>

          {/* Core policy anchors */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-on-surface-variant">
            <button 
              onClick={() => alert("Trang Chính sách bảo mật thông tin tài xế của học bổng Mầm Xanh Trí Tuệ.\nDữ liệu học sinh được bảo vệ tuyệt mật theo chuẩn quy định Superbrain.")}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Chính sách bảo mật
            </button>
            <button 
              onClick={() => alert("Điều khoản xếp lịch và nhận ưu đãi:\nVoucher trị giá 1 triệu áp dụng cho khóa học Bingo đầu tiên trên toàn hệ thống Superbrain.\nKhông quy đổi thành tiền mặt hoặc áp dụng kèm chương trình khác.")}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Điều khoản sử dụng
            </button>
            <button 
              onClick={() => {
                const mail = "yhoccotruyen0@gmail.com";
                alert(`Mọi thông tin phản hồi hoặc thắc mắc Bác tài vui lòng liên hệ qua email:\n${mail} hoặc hỗ trợ Hotline: 1900 636 079.`);
              }}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Liên hệ
            </button>
          </nav>

        </div>

      </div>
    </footer>
  );
}
