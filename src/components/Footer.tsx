import React from 'react';
import logoUrl from '../../logo.png';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  return (
    <footer className="mt-12 border-t border-[#bfe4c8] bg-[#f6fcf2] sm:mt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-11 lg:px-8">
        
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          
          {/* Logo brand */}
          <button
            onClick={() => onScrollToSection('hero')}
            className="flex items-center gap-2 text-left focus:outline-none rounded-lg"
          >
            <img
              src={logoUrl}
              alt=""
              aria-hidden="true"
              className="h-8 w-auto object-contain sm:h-9"
            />
            <div className="space-y-0.5">
              <p className="font-sans text-[10px] font-extrabold uppercase leading-none text-[#272727] sm:text-xs">
                SUPERBRAIN x GREEN SM
              </p>
              <p className="font-headline text-base font-extrabold uppercase leading-none text-[#148144] sm:text-lg">
                MẦM XANH TRÍ TUỆ
              </p>
              <p className="font-sans text-[11px] font-bold leading-none text-[#272727] sm:text-xs">
                Đồng hành vì tương lai Việt Nam
              </p>
            </div>
          </button>

          {/* Copyright description */}
          <div className="max-w-xl text-center text-sm text-[#2f6f3f] font-medium lg:text-left">
            <p>© 2026 Mầm Xanh Trí Tuệ. Bản quyền thuộc về Superbrain & Xanh SM.</p>
            <p className="mt-1 text-xs opacity-80">
              Chương trình tài tài trợ đặc quyền dành riêng cho con em đội ngũ tài xế Xanh SM Việt Nam.
            </p>
          </div>

          {/* Core policy anchors */}
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-semibold text-[#2f6f3f] sm:gap-x-6">
            <a
              href="https://superbrain.edu.vn/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#148144] transition-colors cursor-pointer"
            >
              Chính sách bảo mật
            </a>
            <a
              href="https://superbrain.edu.vn/dieu-khoan-dich-vu/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#148144] transition-colors cursor-pointer"
            >
              Điều khoản dịch vụ
            </a>
            <button 
              onClick={() => {
                const mail = "yhoccotruyen0@gmail.com";
                alert(`Mọi thông tin phản hồi hoặc thắc mắc Bác tài vui lòng liên hệ qua email:\n${mail} hoặc hỗ trợ Hotline: 1900 636 079.`);
              }}
              className="hover:text-[#148144] transition-colors cursor-pointer"
            >
              Liên hệ
            </button>
          </nav>

        </div>

      </div>
    </footer>
  );
}
