import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Gift, Clock, Sparkles } from 'lucide-react';

interface HeroProps {
  onRegisterClick: () => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden rounded-2xl border border-[#e8e8ea] bg-white shadow-lg">
      <div className="flex flex-col lg:flex-row items-stretch">
        
        {/* Left Column: Core Promo Content */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:w-1/2 lg:p-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 rounded-full bg-secondary-container/10 px-3 py-1 w-fit border border-secondary/20"
          >
            <Sparkles className="h-4 w-4 text-secondary animate-pulse" />
            <span className="font-headline text-xs font-bold text-secondary tracking-wide uppercase">
              Hợp Tác Độc Quyền
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-primary uppercase"
          >
            Đặc Quyền Trân Quý <br />
            <span className="text-secondary">— Dành Riêng Cho Gia Đình Bác Tài Xanh SM!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 font-sans text-base sm:text-lg leading-relaxed text-on-surface-variant font-medium"
          >
            Hội sở Superbrain Việt Nam tài trợ Học bổng đặc quyền <strong className="text-primary font-bold">"Mầm Xanh Trí Tuệ"</strong> trị giá <span className="inline-block rounded-lg bg-orange-100 px-2.5 py-0.5 font-headline font-extrabold text-primary border border-primary/20 shadow-sm">1.000.000 VNĐ</span> áp dụng ngay cho Khóa học Bingo đầu tiên của con.
          </motion.p>
          
          {/* Urgent Warning banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex items-start gap-3 rounded-xl border border-error/20 bg-error-container p-4 dark:bg-error-container/80 shadow-inner"
          >
            <div className="flex bg-white text-error p-1.5 rounded-lg border border-error/10 shadow-sm shrink-0">
              <AlertTriangle className="h-5 w-5 text-error" />
            </div>
            <div>
              <p className="font-headline text-sm font-bold text-[#93000a] flex items-center gap-1.5 uppercase tracking-wide">
                <span>🚨 SỐ LƯỢNG HỮU HẠN:</span>
              </p>
              <p className="mt-1 font-sans text-xs sm:text-sm leading-relaxed text-[#93000a] font-semibold">
                Chỉ áp dụng tối đa <span className="font-extrabold underline">20 suất/năm</span> trên toàn hệ thống 100 cơ sở! Ai đăng ký trước giữ chỗ trước!
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-3.5"
          >
            <button
              onClick={onRegisterClick}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-container hover:from-primary-container hover:to-primary text-white font-headline font-bold text-sm sm:text-base px-6 py-3.5 shadow-lg shadow-primary/20 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Gift className="h-5 w-5" />
              Đăng Ký Nhận Học Bổng Ngay
            </button>
          </motion.div>
        </div>

        {/* Right Column: Imagery with nice overlay text or gradient shape */}
        <div className="relative min-h-[320px] sm:min-h-[400px] lg:w-1/2 bg-[#f3f3f6] overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF3uG_K8whNN44wLVOZz99gZx297ptFA9N7BIHRYIpw96VaojehIFbeQiAcdpc_IhqFq2_v7sXb-R7rhw_flvxgVqU46PwV478tHUx00iN3LpKjucN554Q-91VFgeCBSkF28E19rbqrtPsZJ3ZV80gXDqND1KyZMzz2ZOcddU45zqvAMa7l1PVyOYDPEehS-6XsI75wwpe27kl8G2FWM5wSd-nwCcg6IKfjHRXRbsv1ENyFswq_Fbg-eidPG9JmjGNPduyXMJzG10"
            alt="Xanh SM driver with a happy smiling child"
            className="absolute inset-0 h-full w-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white/10 lg:to-transparent"></div>
          
          {/* Subtle Float Tag */}
          <div className="absolute bottom-4 right-4 rounded-xl bg-black/60 backdrop-blur-sm px-3 py-2 text-white border border-white/20">
            <p className="font-sans text-[10px] font-bold tracking-wider uppercase opacity-80">Đồng Hành Phát Triển</p>
            <p className="font-headline text-xs font-semibold">Superbrain & Xanh SM</p>
          </div>
        </div>

      </div>
    </section>
  );
}
