import React from 'react';
import { Smartphone, Brain, Car, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function PsychologicalHook() {
  const cards = [
    {
      id: "pain-card-1",
      icon: <Smartphone className="h-6 w-6 text-primary" />,
      text: "Con ở nhà xem điện thoại, tivi quá nhiều, lười tư duy?"
    },
    {
      id: "pain-card-2",
      icon: <Brain className="h-6 w-6 text-primary" />,
      text: "Con kém tập trung, học trước quên sau, sợ môn Toán?"
    },
    {
      id: "pain-card-3",
      icon: <Car className="h-6 w-6 text-primary" />,
      text: "Bác tài bận rộn trên những cung đường, không có nhiều thời gian kèm con học?"
    }
  ];

  return (
    <section className="mx-auto max-w-4xl text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="font-headline text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-on-background"
      >
        Mỗi chuyến xe Bác tài lăn bánh là một bước lo cho tương lai của con. <br />
        <span className="text-secondary">Nhưng có bao giờ Bác tài trăn trở...</span>
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
            className="flex flex-col items-center gap-4 rounded-2xl border border-[#e8e8ea] bg-white p-6 text-center shadow-sm transition-all"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-orange-50 to-orange-100/60 ring-4 ring-orange-50/50">
              {card.icon}
            </div>
            <p className="font-sans text-sm sm:text-base font-semibold text-on-surface-variant leading-relaxed">
              {card.text}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-secondary/20 bg-secondary/5 p-4 text-center shadow-sm"
      >
        <Sparkles className="h-5 w-5 text-secondary shrink-0 animate-bounce" />
        <p className="font-headline text-sm sm:text-base font-bold text-secondary">
          👉 Hãy để Superbrain đồng hành cùng Bác tài gánh vác một phần trách nhiệm nuôi dạy con!
        </p>
      </motion.div>
    </section>
  );
}
