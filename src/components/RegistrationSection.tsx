import React, { useState, useEffect } from 'react';
import { ArrowRight, User, Baby, Phone } from 'lucide-react';
import { SuperbrainCenter, Registration } from '../types';
import { motion } from 'motion/react';

interface RegistrationSectionProps {
  centers: SuperbrainCenter[];
  preselectedCenter: SuperbrainCenter | null;
  onRegisterSuccess: (registrationData: Omit<Registration, 'id' | 'timestamp' | 'status'>) => void | Promise<void>;
  clearPreselection: () => void;
}

export default function RegistrationSection({
  centers,
  preselectedCenter,
  onRegisterSuccess,
  clearPreselection
}: RegistrationSectionProps) {
  
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [province, setProvince] = useState('');
  const [centerId, setCenterId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const provinces = React.useMemo(() => {
    return Array.from(new Set(centers.map(center => center.province).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'vi'));
  }, [centers]);

  // Auto-fill form fields when a center is preselected
  useEffect(() => {
    if (preselectedCenter) {
      setProvince(preselectedCenter.province);
      setCenterId(preselectedCenter.id);
      
      // Auto scroll to form smoothly
      setTimeout(() => {
        const element = document.getElementById('dang-ky');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      
      // Clear parent's choice after applying so they can change if they want To
      clearPreselection();
    }
  }, [preselectedCenter, clearPreselection]);

  // Load available centers matching the selected province (excluding 'Tất cả')
  const availableCentersInProvince = centers.filter(
    center => center.province.toLowerCase() === province.toLowerCase()
  );

  // If a center is selected but not in the newly selected province, reset center ID selection
  useEffect(() => {
    if (province) {
      const match = availableCentersInProvince.find(c => c.id === centerId);
      if (!match) {
        setCenterId('');
      }
    } else {
      setCenterId('');
    }
  }, [province]);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!parentName.trim()) errors.parentName = "Vui lòng nhập tên phụ huynh";
    if (!childName.trim()) errors.childName = "Vui lòng nhập tên bé";
    if (!childAge.trim()) errors.childAge = "Vui lòng nhập độ tuổi";
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9+ ]{9,13}$/.test(phoneNumber.trim())) {
      errors.phoneNumber = "Số điện thoại không hợp lệ";
    }
    if (!province) errors.province = "Vui lòng chọn tỉnh/thành phố";
    if (!centerId) errors.centerId = "Vui lòng chọn cơ sở Superbrain";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitError('');
    setIsSubmitting(true);

    // Retrieve full center name
    const selectedCenterObj = centers.find(c => c.id === centerId);

    try {
      await onRegisterSuccess({
        parentName,
        childName,
        childAge,
        phoneNumber,
        province,
        centerId,
        centerName: selectedCenterObj ? selectedCenterObj.name : 'Unknown Center'
      });

      // Reset fields except parentName & phoneNumber for user convenience if they register a second child
      setChildName('');
      setChildAge('');
    } catch (error) {
      console.error('Registration submit failed', error);
      setSubmitError('Chưa gửi được đăng ký. Bác tài vui lòng thử lại sau hoặc liên hệ Hotline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="dang-ky" className="scroll-mt-20 w-full max-w-7xl mx-auto py-2 sm:py-4">
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
        
        {/* Left Column: Usage terms image */}
        <div className="flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-2xl border border-[#dcefe2] bg-white p-4 shadow-sm sm:min-h-[520px] sm:p-6">
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <img
              src="/sample.png"
              alt="Thông tin điều kiện sử dụng chương trình"
              className="max-h-full w-full object-contain"
            />
          </div>

          <div className="mt-5 flex items-start gap-3 border-t border-[#dcefe2] pt-5 sm:items-center sm:gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e9f8ed] text-[#148144]">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-[#2f6f3f]">Liên hệ hỗ trợ</p>
              <p className="font-headline text-sm font-extrabold leading-snug text-[#148144] sm:text-base">
                Hotline: 09 188 188 00
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Registration submission Form panel */}
        <div className="relative overflow-hidden rounded-2xl border border-[#bfe4c8] bg-white p-5 shadow-xl shadow-[#148144]/10 sm:p-8">
          
          {/* Form Banner highlight */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#8bc53f] to-[#148144]"></div>

          <div className="text-center mb-6">
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-[#148144]">
              Hẹn lịch tư vấn
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#2f6f3f] font-medium mt-1">
              Vui lòng điền thông tin để nhận voucher và đặt lịch tư vấn
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            
            {/* Parent Name */}
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-1.5 font-headline text-xs sm:text-sm font-bold text-[#123d2a]">
                Tên Phụ Huynh <span className="text-red-500 font-extrabold">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8fbd78] h-4 w-4" />
                <input
                  type="text"
                  placeholder="Nhập họ và tên phụ huynh..."
                  className={`w-full pl-9 pr-3 py-3 rounded-xl border bg-[#f9f9fc] font-sans text-base font-semibold outline-none transition-all sm:py-2.5 sm:text-sm ${
                    formErrors.parentName ? 'border-error focus:border-error focus:ring-1 focus:ring-error' : 'border-[#bfe4c8] focus:border-[#148144] focus:ring-1 focus:ring-[#148144]'
                  }`}
                  value={parentName}
                  onChange={(e) => {
                    setParentName(e.target.value);
                    if (formErrors.parentName) {
                      setFormErrors(prev => ({ ...prev, parentName: '' }));
                    }
                  }}
                />
              </div>
              {formErrors.parentName && (
                <span className="text-[10px] font-bold text-error mt-0.5">{formErrors.parentName}</span>
              )}
            </div>

            {/* Child Name */}
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-1.5 font-headline text-xs sm:text-sm font-bold text-[#123d2a]">
                Tên Của Con <span className="text-red-500 font-extrabold">*</span>
              </label>
              <div className="relative">
                <Baby className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8fbd78] h-4 w-4" />
                <input
                  type="text"
                  placeholder="Nhập họ và tên cháu bé..."
                  className={`w-full pl-9 pr-3 py-3 rounded-xl border bg-[#f9f9fc] font-sans text-base font-semibold outline-none transition-all sm:py-2.5 sm:text-sm ${
                    formErrors.childName ? 'border-error focus:border-error focus:ring-1 focus:ring-error' : 'border-[#bfe4c8] focus:border-[#148144] focus:ring-1 focus:ring-[#148144]'
                  }`}
                  value={childName}
                  onChange={(e) => {
                    setChildName(e.target.value);
                    if (formErrors.childName) {
                      setFormErrors(prev => ({ ...prev, childName: '' }));
                    }
                  }}
                />
              </div>
              {formErrors.childName && (
                <span className="text-[10px] font-bold text-error mt-0.5">{formErrors.childName}</span>
              )}
            </div>

            {/* Grid for age & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Child Age selection */}
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-1.5 font-headline text-xs sm:text-sm font-bold text-[#123d2a]">
                  Độ Tuổi <span className="text-red-500 font-extrabold">*</span>
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max="18"
                  placeholder="Nhập độ tuổi..."
                  className={`w-full px-3 py-3 h-12 rounded-xl border bg-[#f9f9fc] font-sans text-base font-semibold outline-none transition-all sm:h-[41px] sm:py-2.5 sm:text-sm ${
                    formErrors.childAge ? 'border-error focus:border-error focus:ring-1 focus:ring-error' : 'border-[#bfe4c8] focus:border-[#148144] focus:ring-1 focus:ring-[#148144]'
                  }`}
                  value={childAge}
                  onChange={(e) => {
                    setChildAge(e.target.value);
                    if (formErrors.childAge) {
                      setFormErrors(prev => ({ ...prev, childAge: '' }));
                    }
                  }}
                />
                {formErrors.childAge && (
                  <span className="text-[10px] font-bold text-error mt-0.5">{formErrors.childAge}</span>
                )}
              </div>

              {/* Driver/Parent Phone */}
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-1.5 font-headline text-xs sm:text-sm font-bold text-[#123d2a]">
                  Số Điện Thoại <span className="text-red-500 font-extrabold">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại..."
                  className={`w-full px-3 py-3 h-12 rounded-xl border bg-[#f9f9fc] font-sans text-base font-semibold outline-none transition-all sm:h-[41px] sm:py-2.5 sm:text-sm ${
                    formErrors.phoneNumber ? 'border-error focus:border-error' : 'border-[#bfe4c8] focus:border-[#148144] focus:ring-1 focus:ring-[#148144]'
                  }`}
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (formErrors.phoneNumber) {
                      setFormErrors(prev => ({ ...prev, phoneNumber: '' }));
                    }
                  }}
                />
                {formErrors.phoneNumber && (
                  <span className="text-[10px] font-bold text-error mt-0.5">{formErrors.phoneNumber}</span>
                )}
              </div>

            </div>

            {/* Province selection */}
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-1.5 font-headline text-xs sm:text-sm font-bold text-[#123d2a]">
                Tỉnh / Thành phố <span className="text-red-500 font-extrabold">*</span>
              </label>
              <select
                className={`w-full px-3 py-3 h-12 rounded-xl border bg-[#f9f9fc] font-sans text-base font-semibold outline-none transition-all sm:h-[41px] sm:py-2.5 sm:text-sm ${
                  formErrors.province ? 'border-error focus:border-error' : 'border-[#bfe4c8] focus:border-[#148144] focus:ring-1 focus:ring-[#148144]'
                }`}
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                  if (formErrors.province) {
                    setFormErrors(prev => ({ ...prev, province: '' }));
                  }
                }}
              >
                <option value="">Chọn Tỉnh / Thành phố...</option>
                {provinces.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              {formErrors.province && (
                <span className="text-[10px] font-bold text-error mt-0.5">{formErrors.province}</span>
              )}
            </div>

            {/* Cooperative Centers selection matching the selected criteria */}
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-1.5 font-headline text-xs sm:text-sm font-bold text-[#123d2a]">
                Cơ sở Superbrain <span className="text-red-500 font-extrabold">*</span>
              </label>
              <select
                disabled={!province}
                className={`w-full px-3 py-3 h-12 rounded-xl border bg-[#f9f9fc] font-sans text-base font-semibold outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed sm:h-[41px] sm:py-2.5 sm:text-sm ${
                  formErrors.centerId ? 'border-error focus:border-error' : 'border-[#bfe4c8] focus:border-[#148144] focus:ring-1 focus:ring-[#148144]'
                }`}
                value={centerId}
                onChange={(e) => {
                  setCenterId(e.target.value);
                  if (formErrors.centerId) {
                    setFormErrors(prev => ({ ...prev, centerId: '' }));
                  }
                }}
              >
                <option value="">
                  {province ? 'Chọn cơ sở nhận ưu đãi...' : 'Vui lòng chọn Tỉnh/Thành phố trước'}
                </option>
                {availableCentersInProvince.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.district ? `${c.name} (${c.district})` : c.name}
                  </option>
                ))}
              </select>
              {formErrors.centerId && (
                <span className="text-[10px] font-bold text-error mt-0.5">{formErrors.centerId}</span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#148144] text-white font-headline text-base sm:text-lg font-bold py-3.5 mt-4 rounded-xl hover:bg-[#0f6f39] transition-all shadow-lg shadow-[#148144]/15 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'ĐANG GỬI...' : 'ĐĂNG KÝ NGAY'}
              <ArrowRight className="h-5 w-5" />
            </motion.button>
            {submitError && (
              <p className="text-center text-xs font-bold text-error">{submitError}</p>
            )}
          </form>

        </div>

      </div>
    </section>
  );
}
