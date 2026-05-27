import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, MapPin } from 'lucide-react';
import { Registration } from '../types';
import voucherPreviewImage from '../../uploads/voucher-01.png';

interface RegistrationReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  registration: Registration | null;
}

export default function RegistrationReceiptModal({ isOpen, onClose, registration }: RegistrationReceiptModalProps) {
  if (!isOpen || !registration) return null;

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
          <div className="p-5 sm:p-6">
            
            <div className="mt-5 overflow-hidden rounded-xl border border-primary/20 bg-[#fff7eb] shadow-inner">
              <img
                src={voucherPreviewImage}
                alt="Voucher Mầm Xanh Trí Tuệ"
                className="block h-auto w-full"
              />
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

            <div className="mt-6 rounded-xl border border-[#dcefe2] bg-[#f6fcf2] p-4 text-center">
              <p className="font-sans text-sm font-semibold leading-relaxed text-[#2f6f3f]">
                Cơ sở <strong className="text-[#148144]">{registration.centerName}</strong> sẽ liên hệ trực tiếp cho Bác tài qua số điện thoại <strong className="text-[#148144]">{registration.phoneNumber}</strong> để tư vấn chương trình học!
              </p>
            </div>

          </div>

          <div className="flex justify-center border-t border-[#e8e8ea] bg-[#f9f9fc] px-6 py-4">
            <button
              onClick={onClose}
              className="w-full max-w-xs bg-secondary text-white font-headline font-bold text-sm py-3 rounded-xl hover:bg-secondary/90 transition-all text-center cursor-pointer shadow-sm active:scale-[0.98]"
            >
              Hoàn Thành
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
