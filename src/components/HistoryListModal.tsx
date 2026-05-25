import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Award, Calendar, MapPin, ExternalLink, ShieldAlert } from 'lucide-react';
import { Registration } from '../types';

interface HistoryListModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: Registration[];
  onDeleteRegistration: (id: string) => void;
  onSelectRegistration: (reg: Registration) => void;
}

export default function HistoryListModal({
  isOpen,
  onClose,
  registrations,
  onDeleteRegistration,
  onSelectRegistration
}: HistoryListModalProps) {
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        
        {/* Modal Wrapper panel box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-secondary/15 overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="bg-secondary text-white px-6 py-5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-white animate-pulse" />
              <h3 className="font-headline text-lg font-bold">
                Lịch Sử Đăng Ký Giữ Suất ({registrations.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white rounded-lg p-1 hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Core scrollable booking list */}
          <div className="p-6 overflow-y-auto custom-scrollbar flex-1 flex flex-col gap-4">
            
            <p className="font-sans text-xs text-on-surface-variant font-medium leading-relaxed">
              * Đây là danh sách các suất học bổng Bingo (1.000.000 VNĐ) Bác tài đã đặt thành công cho con em trên thiết bị này. Danh sách được tự động đồng bộ hóa ưu tiên.
            </p>

            {registrations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-[#e2e2e5] rounded-2xl bg-[#f9f9fc]">
                <ShieldAlert className="h-10 w-10 text-on-surface-variant/40" />
                <p className="mt-3 font-headline text-sm font-bold text-on-surface">Chưa có lượt đăng ký nào</p>
                <p className="mt-1 font-sans text-xs text-on-surface-variant font-medium max-w-xs">
                  Bác tài hãy điền nhanh thông tin của con ở phần đăng ký nhận học bổng để khởi tạo giữ chỗ ngay hôm nay.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {registrations.map(reg => {
                  const regVoucherCode = `XANHSM-SPB-${reg.id.toUpperCase().split('-')[0] || '9843'}`;
                  const formattedDate = new Date(reg.timestamp).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <div
                      key={reg.id}
                      className="rounded-xl border border-[#e8e8ea] bg-white hover:border-[#dfc0af]/60 shadow-sm p-4 hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden group"
                    >
                      
                      {/* Left meta columns */}
                      <div className="flex flex-col gap-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-headline font-bold text-base text-on-surface">
                            {reg.childName} <span className="font-sans text-xs text-on-surface-variant font-medium">({reg.childAge})</span>
                          </p>
                          <span className="bg-[#e2f8e9] text-secondary text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-secondary/15 uppercase tracking-wider">
                            {regVoucherCode}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 mt-1 text-xs text-on-surface-variant font-semibold">
                          <div className="flex items-center gap-1.5 font-medium">
                            <MapPin className="h-3.5 w-3.5 text-secondary shrink-0" />
                            <span>Cần đến: <strong>{reg.centerName}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5 font-medium">
                            <Calendar className="h-3.5 w-3.5 text-secondary shrink-0" />
                            <span>Đã đăng ký: {formattedDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right button column */}
                      <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end border-t sm:border-t-0 border-[#f3f3f6] pt-3 sm:pt-0 shrink-0">
                        <button
                          onClick={() => onSelectRegistration(reg)}
                          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-orange-100 font-headline text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                          title="Xem Phiếu Giữ Chỗ"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Xem mã
                        </button>
                        
                        <button
                          onClick={() => {
                            if (confirm(`Bạn có chắc chắn muốn hủy đăng ký giữ suất học bổng 1 triệu đồng cho cháu ${reg.childName} không?\nHành động này không thể hoàn tác.`)) {
                              onDeleteRegistration(reg.id);
                            }
                          }}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-500 hover:text-white text-red-500 transition-all cursor-pointer"
                          title="Hủy Đăng Ký này"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

          <div className="bg-[#f9f9fc] border-t border-[#e8e8ea] px-6 py-4 flex justify-end shrink-0">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-secondary text-white font-headline font-bold text-sm rounded-xl hover:bg-secondary/95 transition-all text-center cursor-pointer shadow-sm active:scale-[0.98]"
            >
              Đóng Lại
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
