import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Play } from 'lucide-react';

const HERO_VIDEO_URL = 'video.mov';

interface HeroProps {
  onRegisterClick: () => void;
}

export default function Hero(_props: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#effbf4]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(91,190,111,0.18),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(253,208,64,0.16),transparent_24%),linear-gradient(180deg,#f6fff9_0%,#eaf8f0_100%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-7 px-4 pb-8 pt-6 sm:gap-10 sm:px-6 sm:pb-10 sm:pt-8 lg:flex-row lg:items-center lg:gap-10 lg:px-8 lg:pb-14 lg:pt-10">
        
        {/* Left Column: Core Promo Content */}
        <div className="flex flex-col justify-center text-left lg:w-[45%]">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex w-fit max-w-full items-center gap-2 rounded-full border border-[#79bc8c] bg-white/60 px-3 py-1.5 shadow-sm sm:px-3.5"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#69b878] text-white">
              <CheckCircle2 className="h-4 w-4" />
            </span>
            <span className="font-headline text-xs font-extrabold tracking-wide text-[#137c44] uppercase sm:text-sm">
              Chương trình Tết thiếu nhi
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 font-headline text-3xl font-extrabold leading-tight tracking-tight text-[#11823d] sm:mt-7 sm:text-4xl lg:text-5xl"
          >
            Voucher
            <span className="mt-1 block uppercase">Mầm Xanh Trí Tuệ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-2xl font-sans text-base font-semibold leading-relaxed text-[#151515] sm:mt-5 sm:text-lg lg:text-xl"
          >
            Superbrain Vietnam dành tặng học bổng <strong className="font-extrabold">"Mầm Xanh Trí Tuệ" trị giá 1.000.000đ</strong> cho con em bác tài Xanh Green SM khi tham gia khóa học Bingo đầu tiên
          </motion.p>
          
          {/* Urgent Warning banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-5 flex w-full max-w-2xl items-center gap-3 rounded-xl bg-[#ffe0e3] px-3 py-3 text-[#6d171c] shadow-sm sm:mt-6 sm:px-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#c83d55] text-[#c83d55]">
              <Clock className="h-5 w-5" />
            </div>
            <p className="font-headline text-sm font-extrabold leading-tight sm:text-base">
              Hãy tặng món quà tốt nhất cho con ngay hôm nay!
            </p>
          </motion.div>
        </div>

        {/* Right Column: Imagery with nice overlay text or gradient shape */}
        <div className="relative lg:w-[55%]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border-[6px] border-white bg-[#dff4e6] shadow-[0_18px_34px_rgba(27,96,52,0.18)] sm:rounded-[2rem] sm:border-[10px] sm:shadow-[0_24px_42px_rgba(27,96,52,0.22)]">
            {HERO_VIDEO_URL ? (
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster=""
              >
                <source src={HERO_VIDEO_URL} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video.
              </video>
            ) : (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,#108848_0_8%,transparent_20%),radial-gradient(circle_at_84%_18%,#e4df48_0_9%,transparent_20%),radial-gradient(circle_at_50%_48%,#8bd234_0_20%,transparent_34%),radial-gradient(circle_at_18%_78%,#ffd45d_0_8%,transparent_19%),linear-gradient(135deg,#e9fff0_0%,#fbfff7_45%,#b6e061_100%)]" />
                <div className="absolute inset-x-[18%] top-[28%] h-[18%] rounded-full bg-[#43aa3d]/70 blur-sm" />
                <div className="absolute inset-x-[31%] top-[50%] h-[16%] rounded-full bg-[#b4bf24]/80 blur-sm" />
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg bg-[#ffd923] px-4 py-2 font-headline text-2xl font-extrabold text-[#171717] shadow-lg sm:text-3xl">
                  <Play className="h-6 w-6 fill-current" />
                  link VDO
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
