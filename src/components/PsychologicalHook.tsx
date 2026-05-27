import React from 'react';
import { Brain, Car, HeartHandshake, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface PsychologicalHookProps {
  onRegisterClick: () => void;
}

export default function PsychologicalHook(_props: PsychologicalHookProps) {
  const cards = [
    {
      id: "pain-card-1",
      icon: <HeartHandshake className="h-6 w-6 text-[#148144]" />,
      text: "Mong muốn đem điều tốt nhất dành cho con"
    },
    {
      id: "pain-card-2",
      icon: <Brain className="h-6 w-6 text-[#148144]" />,
      text: "Con kém tập trung, học trước quên sau, sợ môn Toán?"
    },
    {
      id: "pain-card-3",
      icon: <Car className="h-6 w-6 text-[#148144]" />,
      text: "Ba bận rộn, không có thời gian kèm con học mỗi ngày?"
    }
  ];

  return (
    <section id="loi-ich" className="scroll-mt-24 mx-auto max-w-5xl text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-5xl font-headline text-2xl font-extrabold leading-tight text-on-background sm:text-3xl md:text-4xl"
      >
        Mỗi chuyến xe bác tài lăn bánh là một lần trăn trở...
      </motion.h2>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}
            className="flex min-h-48 flex-col items-center justify-center gap-5 rounded-2xl border border-[#e8e8ea] bg-white p-6 text-center shadow-sm transition-all"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#e9f8ed] to-[#d9f2e2] ring-4 ring-[#edf9f1]">
              {card.icon}
            </div>
            <p className="font-sans text-base font-bold leading-relaxed text-[#2f6f3f]">
              {card.text}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 rounded-2xl border border-[#b9d7b7] bg-[#f5fbef] p-5 text-left shadow-sm"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#158a16] text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-headline text-base font-extrabold text-[#137c44]">
                Chương trình Toán trí tuệ Superbrain
              </h3>
            </div>
            <p className="mt-2 font-sans text-sm font-semibold leading-relaxed text-[#2f6f3f] sm:text-base">
              Toán trí tuệ Superbrain giúp trẻ phát triển trí não cho một cách toàn diện và cải thiện khả năng <strong>TẬP TRUNG</strong> - <strong>GHI NHỚ</strong> - <strong>PHẢN XẠ</strong> - <strong>TỰ TIN</strong>.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#bfe4c8] bg-[#f6fcf2] p-4 text-center shadow-sm sm:flex-row"
      >
        <p className="font-headline text-sm font-bold text-[#148144] sm:text-base">
          Ba yên tâm trên mọi cung đường - Superbrain giúp con tự tin mỗi ngày.
        </p>
      </motion.div>
    </section>
  );
}