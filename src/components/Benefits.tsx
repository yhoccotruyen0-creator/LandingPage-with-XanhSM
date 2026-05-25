import React from 'react';
import { motion } from 'motion/react';
import { Target, Zap, Milestone, Award } from 'lucide-react';

export default function Benefits() {
  const points = [
    {
      id: "benefit-1",
      number: "1",
      icon: <Target className="h-5 w-5 text-white" />,
      title: "Tập trung tuyệt đối",
      desc: "Trẻ rèn luyện khả năng tập trung cao độ trong quá trình nghe và tính toán, loại bỏ xao nhãng hiệu quả."
    },
    {
      id: "benefit-2",
      number: "2",
      icon: <Zap className="h-5 w-5 text-white" />,
      title: "Ghi nhớ siêu tốc",
      desc: "Phát triển khả năng phân tích logic và hình dung không gian (visualization) giúp con phản xạ nhạy bén."
    },
    {
      id: "benefit-3",
      number: "3",
      icon: <Milestone className="h-5 w-5 text-white" />,
      title: "Tự tin bứt phá",
      desc: "Môi trường học tập tuyệt vời theo chuẩn vàng DNA SUPER, khuyến khích trẻ tự tin khám phá, không sợ sai lầm."
    }
  ];

  return (
    <section id="loi-ich" className="rounded-2xl border border-[#e8e8ea] bg-white p-6 sm:p-10 lg:p-14 shadow-sm">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-primary shadow-sm"
        >
          <Award className="h-5 w-5" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-4 font-headline text-2xl sm:text-3xl font-bold text-primary"
        >
          Khơi Dậy Tiềm Năng Trí Tuệ
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 font-sans text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed"
        >
          Superbrain sử dụng phương pháp Toán Trí Tuệ (Fingermath & Soroban) để kích hoạt đồng thời hai bán cầu não cho trẻ từ <span className="font-bold text-secondary">3 đến 12 tuổi</span>.
        </motion.p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {points.map((pt, index) => (
          <motion.div
            key={pt.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="flex flex-col gap-4 rounded-xl bg-[#f9f9fc] p-6 border border-[#eeeef0] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-headline text-base font-extrabold text-white shadow-sm shadow-primary/20">
                {pt.number}
              </div>
              <h3 className="font-headline text-base sm:text-lg font-bold text-on-surface">
                {pt.title}
              </h3>
            </div>
            
            <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed font-medium">
              {pt.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
