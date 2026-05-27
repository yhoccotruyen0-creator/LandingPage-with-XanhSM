import React from 'react';
import { Search } from 'lucide-react';
import logoUrl from '../../logo.png';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenHistory: () => void;
  registrationCount: number;
}

export default function Header({ onScrollToSection, onOpenHistory, registrationCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#d8eee2] bg-white/95 shadow-[0_8px_28px_rgba(18,91,52,0.08)] backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:min-h-20 sm:gap-4 sm:px-6 sm:py-3 lg:px-8">
        
        {/* Brand Logo */}
        <button 
          onClick={() => onScrollToSection('hero')}
          className="flex min-w-0 items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded-lg sm:gap-3"
        >
          <img
            src={logoUrl}
            alt=""
            aria-hidden="true"
            className="h-10 w-auto shrink-0 object-contain sm:h-12"
          />
          <span className="hidden h-11 w-px bg-[#88b99b] sm:block" />

          <span className="hidden min-w-0 space-y-0.5 min-[420px]:block">
            <span className="block whitespace-nowrap font-headline text-base font-extrabold leading-none text-[#148144] sm:text-lg">
              Mầm Xanh Trí Tuệ
            </span>
            <span className="block whitespace-nowrap font-sans text-xs font-bold leading-none text-[#272727] sm:text-sm">
              Hành trình khơi dậy tinh hoa
            </span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          <button 
            onClick={() => onScrollToSection('dia-diem')}
            className="font-headline text-base font-bold text-[#202020] transition-colors hover:text-[#178447] cursor-pointer"
          >
            Tra cứu cơ sở
          </button>
        </nav>

        {/* Call to Action Buttons */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          {/* My Registrations Button */}
          {registrationCount > 0 && (
            <button
              onClick={onOpenHistory}
              className="relative hidden items-center gap-1 rounded-lg border border-[#159650]/30 bg-[#eaf8ef] px-3 py-2 font-headline text-xs font-bold text-[#137c44] transition-colors hover:bg-[#d9f2e2] md:flex lg:hidden"
            >
              Mã ưu đãi
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-white text-[10px] shadow-sm animate-pulse">
                {registrationCount}
              </span>
            </button>
          )}

          <button
            onClick={() => onScrollToSection('dia-diem')}
            aria-label="Tra cứu cơ sở"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#159650]/20 text-[#137c44] transition-colors hover:bg-[#eaf8ef] sm:h-10 sm:w-10 lg:hidden"
          >
            <Search className="h-5 w-5" />
          </button>

          <button 
            onClick={() => onScrollToSection('dang-ky')}
            className="rounded-lg bg-[#14934f] px-3 py-2.5 font-headline text-xs font-bold text-white shadow-[0_10px_24px_rgba(20,147,79,0.22)] transition-all hover:bg-[#0f7f42] active:scale-95 sm:px-6 sm:text-base"
          >
            Đặt lịch tư vấn
          </button>
        </div>
      </div>
    </header>
  );
}
