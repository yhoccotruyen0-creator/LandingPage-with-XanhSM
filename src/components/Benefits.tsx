import React from 'react';
import programImage1 from '../../uploads/image_1.png';
import programImage2 from '../../uploads/image_2.png';
import programImage3 from '../../uploads/image_3.png';
import { motion } from 'motion/react';
import { BookOpen, Building2, Globe2, GraduationCap, Handshake, Users } from 'lucide-react';

export default function Benefits() {
  const stats = [
    {
      id: "stat-1",
      icon: <GraduationCap className="h-8 w-8" />,
      value: "15+",
      label: "Năm hình thành và phát triển"
    },
    {
      id: "stat-2",
      icon: <Handshake className="h-8 w-8" />,
      value: "160+",
      label: "Cơ sở trên Toàn quốc"
    },
    {
      id: "stat-3",
      icon: <Users className="h-8 w-8" />,
      value: "1.000+",
      label: "Người hướng dẫn"
    },
    {
      id: "stat-4",
      icon: <Globe2 className="h-8 w-8" />,
      value: "10.000+",
      label: "Học viên trong và ngoài nước"
    },
    {
      id: "stat-5",
      icon: <Building2 className="h-8 w-8" />,
      value: "460.000+",
      label: "Trẻ em đã tiếp cận phương pháp"
    }
  ];

  const programImages = [
    { id: 'program-image-1', src: programImage1, alt: 'Hoạt động chương trình Superbrain 1' },
    { id: 'program-image-2', src: programImage2, alt: 'Hoạt động chương trình Superbrain 2' },
    { id: 'program-image-3', src: programImage3, alt: 'Hoạt động chương trình Superbrain 3' }
  ];

  return (
    <section id="phuong-phap" className="scroll-mt-24 rounded-2xl border border-[#dcefe2] bg-white p-5 shadow-sm sm:p-8 lg:p-14">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full bg-[#edf9e9] px-3 py-1.5 text-[#2f8e2f] shadow-sm sm:px-4"
        >
          <BookOpen className="h-4 w-4" />
          <span className="font-headline text-xs font-extrabold uppercase tracking-wide">
            Phương pháp Toán trí tuệ độc quyền
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-5 font-headline text-2xl font-extrabold leading-tight text-[#148144] sm:text-3xl"
        >
          Khơi Dậy Tiềm Năng Trí Tuệ Cho Con
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 font-sans text-sm font-medium leading-relaxed text-[#2f6f3f] sm:text-base lg:text-lg"
        >
          Superbrain tự hào là đơn vị tiên phong sử dụng phương pháp Toán Trí Tuệ <span className="font-extrabold text-[#148144]">(Fingermath & Soroban)</span> <br /> để kích hoạt trọn vẹn cả hai bán cầu não của trẻ từ 3 - 12 tuổi, mang lại sự tự tin vượt trội.
        </motion.p>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-9 lg:mt-10">
        {programImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="aspect-square"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-contain"
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 lg:mt-12 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="flex min-h-32 flex-col items-center justify-center gap-2 border border-[#dcefe2] bg-white p-4 text-center shadow-[0_10px_24px_rgba(18,91,52,0.08)] transition-all sm:min-h-36 sm:gap-3 sm:p-5"
          >
            <div className="text-[#8fc722]">
              {stat.icon}
            </div>
            <p className="font-headline text-lg font-extrabold leading-none text-[#8fc722] sm:text-2xl">
              {stat.value}
            </p>
            <p className="font-sans text-xs font-extrabold leading-snug text-[#1f6b3a] sm:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
