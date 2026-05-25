import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Clipboard, Copy, X, Calendar, MapPin, Phone, Award, Smile } from 'lucide-react';
import { Registration } from '../types';

interface RegistrationReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  registration: Registration | null;
}

export default function RegistrationReceiptModal({ isOpen, onClose, registration }: RegistrationReceiptModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !registration) return null;

  // Generate a mock code based on registration values
  const voucherCode = `XANHSM-SPB-${registration.id.toUpperCase().split('-')[0] || '9843'}`;

  const copyVoucher = () => {
    navigator.clipboard.writeText(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        
        {/* Modal content cardboard wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="relative w-full max-w-lg bg-[#ffffff] rounded-2xl shadow-2xl border border-secondary/20 overflow-hidden"
        >
          
          {/* Header layout with custom check icon overlay */}
          <div className="bg-gradient-to-r from-secondary to-[#008d4a] px-6 py-6 text-white text-center relative">
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 text-white/80 hover:text-white rounded-lg p-1 hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-secondary shadow-lg">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>

            <h3 className="mt-3 font-headline text-lg sm:text-xl font-bold uppercase tracking-wide">
              Đăng Ký Thành Công!
            </h3>
            <p className="text-xs sm:text-sm text-white/90 mt-1 font-semibold">
              Hệ thống đã nhận thông tin giữ suất ưu tiên của Bác tài!
            </p>
          </div>

          {/* Form Receipt details sheet */}
          <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            
            <p className="font-headline text-center text-on-surface font-extrabold text-sm sm:text-base">
              CHÚC MỪNG PHỤ HUYNH: <span className="text-primary font-bold uppercase">{registration.parentName}</span>!
            </p>

            <p className="text-center text-xs text-on-surface-variant font-medium mt-1 leading-relaxed">
              Dưới đây là mã giữ chỗ ưu đãi học bổng <strong className="text-primary">1.000.000 VNĐ</strong> cho bé <strong className="text-primary">{registration.childName}</strong>:
            </p>

            {/* Visual Voucher Ticket Card design */}
            <div className="mt-5 relative overflow-hidden bg-radial from-orange-50 to-orange-100/60 rounded-xl border border-dashed border-primary/30 p-5 text-center shadow-inner">
              
              {/* Ticket Jagged Circles edges left and right */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-white border-r border-[#e8e8ea] rounded-r-full"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-white border-l border-[#e8e8ea] rounded-l-full"></div>

              <div className="flex items-center justify-center gap-1.5 text-primary">
                <Award className="h-5 w-5 animate-pulse" />
                <span className="font-headline text-xs font-bold tracking-wider uppercase">
                  Voucher Mầm Xanh Trí Tuệ
                </span>
              </div>

              <div className="mt-2 text-2xl font-mono font-extrabold text-primary tracking-widest bg-white rounded-lg border border-primary/20 py-2.5 px-4 shadow-sm inline-flex items-center gap-2">
                {voucherCode}
                <button
                  onClick={copyVoucher}
                  className="p-1 rounded bg-[#f3f3f6] hover:bg-primary-container hover:text-white transition-colors cursor-pointer text-on-surface-variant"
                  title="Copy Voucher Code"
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <p className="text-[10px] font-bold text-on-surface-variant uppercase mt-3 tracking-wider">
                Giá trị: Giảm 1 Triệu học phí trực tiếp
              </p>
              <p className="text-[9px] font-medium text-on-surface-variant/70 mt-0.5">
                Mã Độc Quyền cho tài xế Xanh SM • Hạn chót: 31/08/2026
              </p>
            </div>

            {/* Core tabular statistics metadata info */}
            <div className="mt-6 border border-[#e8e8ea] rounded-xl overflow-hidden text-xs sm:text-sm bg-[#f9f9fc]">
              <div className="grid grid-cols-3 border-b border-[#e8e8ea] p-3">
                <span className="font-headline font-bold text-on-surface-variant">Tên bé:</span>
                <span className="col-span-2 font-sans font-bold text-on-surface text-right">{registration.childName} ({registration.childAge})</span>
              </div>
              <div className="grid grid-cols-3 border-b border-[#e8e8ea] p-3">
                <span className="font-headline font-bold text-on-surface-variant">Số ĐT Bác tài:</span>
                <span className="col-span-2 font-mono font-semibold text-on-surface text-right">{registration.phoneNumber}</span>
              </div>
              <div className="grid grid-cols-3 border-b border-[#e8e8ea] p-3">
                <span className="font-headline font-bold text-on-surface-variant">Cơ sở đăng ký:</span>
                <span className="col-span-2 font-sans font-bold text-secondary text-right flex items-center justify-end gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {registration.centerName}
                </span>
              </div>
              <div className="grid grid-cols-3 p-3">
                <span className="font-headline font-bold text-on-surface-variant">Trạng thái duyệt:</span>
                <span className="col-span-2 text-right flex items-center justify-end gap-1.5 font-bold text-green-600 animate-pulse">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  Đã nhận suất - Đang chờ liên hệ
                </span>
              </div>
            </div>

            {/* Next step guidelines */}
            <div className="mt-6 space-y-3 border-t border-[#f3f3f6] pt-5">
              <h4 className="font-headline text-xs font-extrabold text-[#1a1c1e] uppercase tracking-wider">
                📌 Hướng dẫn các bước tiếp theo:
              </h4>

              <ul className="space-y-2.5 text-xs text-on-surface-variant font-medium leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold text-sm shrink-0">1.</span>
                  <p>
                    <strong>Chụp màn hình</strong> hoặc sao chép mã voucher <strong className="text-primary bg-orange-50 px-1 border border-primary/10 rounded">{voucherCode}</strong> này lại để lưu giữ.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold text-sm shrink-0">2.</span>
                  <p>
                    Ban đào tạo cơ sở <strong>{registration.centerName}</strong> sẽ liên lạc trực tiếp cho Bác tài trong vòng 24h qua số điện thoại <strong>{registration.phoneNumber}</strong> để xếp lịch đánh giá năng lực tập trung cho con.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold text-sm shrink-0">3.</span>
                  <p>
                    Khi mang bé đến học, Bác tài chỉ cần xuất trình <strong>ứng dụng Tài xế Xanh SM</strong> hoặc thẻ vật lý để xác minh và áp dụng giảm trừ 1 triệu vào học phí khóa học Bingo đầu tiên.
                  </p>
                </li>
              </ul>
            </div>

          </div>

          <div className="bg-[#f9f9fc] border-t border-[#e8e8ea] px-6 py-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-secondary text-white font-headline font-bold text-sm py-3 rounded-xl hover:bg-secondary/90 transition-all text-center cursor-pointer shadow-sm active:scale-[0.98]"
            >
              Hoàn Thành
            </button>
            <button
              onClick={() => {
                window.print();
              }}
              className="sm:px-4 bg-white text-on-surface-variant border border-[#e2e2e5] font-headline font-bold text-xs py-3 rounded-xl hover:bg-secondary/5 transition-all text-center cursor-pointer"
            >
              In Phiếu Giữ Chỗ
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
