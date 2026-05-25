import React from 'react';
import { Award, Search, Compass, BookOpen } from 'lucide-react';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenHistory: () => void;
  registrationCount: number;
}

export default function Header({ onScrollToSection, onOpenHistory, registrationCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e2e2e5] bg-[#ffffff]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <button 
          onClick={() => onScrollToSection('hero')}
          className="flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded-lg"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-primary-container text-white shadow-md">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-headline text-lg font-bold tracking-tight text-primary">
              Mầm Xanh Trí Tuệ
            </h1>
            <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-secondary">
              Superbrain x Xanh SM
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onScrollToSection('loi-ich')}
            className="flex items-center gap-1.5 font-headline text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <Compass className="h-4 w-4 text-secondary/70" />
            Lợi ích
          </button>
          
          <button 
            onClick={() => onScrollToSection('hoc-bong')}
            className="flex items-center gap-1.5 font-headline text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <Award className="h-4 w-4 text-secondary/70" />
            Học bổng
          </button>
          
          <button 
            onClick={() => onScrollToSection('dia-diem')}
            className="flex items-center gap-1.5 font-headline text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <Search className="h-4 w-4 text-secondary/70" />
            Địa điểm (71 cơ sở)
          </button>
        </nav>

        {/* Call to Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* My Registrations Button */}
          {registrationCount > 0 && (
            <button
              onClick={onOpenHistory}
              className="relative flex items-center gap-1 rounded-xl border border-secondary/30 bg-secondary-container/10 px-3 py-1.5 font-headline text-xs font-bold text-secondary hover:bg-secondary/10 transition-colors"
            >
              Suất đã đăng ký
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-white text-[10px] shadow-sm animate-pulse">
                {registrationCount}
              </span>
            </button>
          )}

          <button 
            onClick={() => onScrollToSection('dang-ky')}
            className="rounded-xl bg-primary px-4 py-2 font-headline text-xs sm:text-sm font-bold text-white shadow-md shadow-primary/10 hover:bg-primary-container transition-all active:scale-95"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </header>
  );
}
