import React, { useState, useEffect } from 'react';
import { Info, CheckCircle, Phone, ArrowRight, User, Baby, HelpCircle } from 'lucide-react';
import { SuperbrainCenter, Registration } from '../types';
import { motion } from 'motion/react';

const AGE_GROUPS = [
  "3 - 5 tuổi",
  "6 - 8 tuổi",
  "9 - 12 tuổi"
];

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
    if (!childAge) errors.childAge = "Vui lòng chọn độ tuổi";
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
    <section id="dang-ky" className="scroll-mt-20 w-full max-w-4xl mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Parental benefits sheet */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e8e8ea] shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2.5 text-primary">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-primary">
              <Info className="h-5 w-5" />
            </div>
            <h2 className="font-headline text-lg sm:text-xl font-bold">
              Thông tin hỗ trợ phụ huynh
            </h2>
          </div>

          <div className="bg-[#f9f9fc] p-5 sm:p-6 rounded-xl border border-primary/10">
            <h3 className="font-headline font-bold text-on-surface mb-3 text-sm">
              Mỗi suất đăng ký được duyệt bao gồm:
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-secondary shrink-0 mt-0.5" />
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
                  Ưu đãi ngay <strong className="text-secondary">1.000.000 VNĐ</strong> học phí trực tiếp.
                </p>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-secondary shrink-0 mt-0.5" />
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
                  Tặng kèm bộ Giáo cụ Soroban nhập khẩu cao cấp.
                </p>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-secondary shrink-0 mt-0.5" />
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
                  Miễn phí 100% buổi đánh giá khả năng tập trung toàn diện cho trẻ (30 phút).
                </p>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-headline text-sm font-bold text-on-surface mb-1">Địa điểm học tập:</p>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed font-semibold">
              Hỗ trợ học và giữ chỗ tại bất kỳ cơ sở nào trong số 71 hệ thống đại diện được Superbrain tuyển chọn nâng cấp khóa học.
            </p>
          </div>

          <div className="flex items-center gap-3.5 pt-5 border-t border-[#f3f3f6]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-primary">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-on-surface-variant">Hotline Tổng đài Superbrain hỗ trợ:</p>
              <p className="font-headline text-sm sm:text-base font-extrabold text-primary">
                1900 636 079 <span className="font-sans text-xs font-semibold text-on-surface-variant ml-1">(8:00 - 18:00 hằng ngày)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Registration submission Form panel */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-secondary/20 shadow-xl relative overflow-hidden">
          
          {/* Form Banner highlight */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary to-secondary"></div>

          <div className="text-center mb-6">
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-primary">
              Đăng Ký Giữ Suất
            </h2>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
              Vui lòng cung cấp thông tin bên dưới để được hệ thống duyệt voucher tự động.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            
            {/* Parent Name */}
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-1.5 font-headline text-xs sm:text-sm font-bold text-on-surface">
                Tên Phụ Huynh <span className="text-red-500 font-extrabold">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Nhập họ và tên phụ huynh..."
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border bg-[#f9f9fc] font-sans text-sm font-semibold outline-none transition-all ${
                    formErrors.parentName ? 'border-error focus:border-error focus:ring-1 focus:ring-error' : 'border-[#e0c0af] focus:border-secondary focus:ring-1 focus:ring-secondary'
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
              <label className="flex items-center gap-1.5 font-headline text-xs sm:text-sm font-bold text-on-surface">
                Tên Của Con <span className="text-red-500 font-extrabold">*</span>
              </label>
              <div className="relative">
                <Baby className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Nhập họ và tên cháu bé..."
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border bg-[#f9f9fc] font-sans text-sm font-semibold outline-none transition-all ${
                    formErrors.childName ? 'border-error focus:border-error focus:ring-1 focus:ring-error' : 'border-[#e0c0af] focus:border-secondary focus:ring-1 focus:ring-secondary'
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
                <label className="flex items-center gap-1.5 font-headline text-xs sm:text-sm font-bold text-on-surface">
                  Độ Tuổi <span className="text-red-500 font-extrabold">*</span>
                </label>
                <select
                  className={`w-full px-3 py-2.5 h-[41px] rounded-xl border bg-[#f9f9fc] font-sans text-sm font-semibold outline-none transition-all ${
                    formErrors.childAge ? 'border-error focus:border-error focus:ring-1 focus:ring-error' : 'border-[#e0c0af] focus:border-secondary focus:ring-1 focus:ring-secondary'
                  }`}
                  value={childAge}
                  onChange={(e) => {
                    setChildAge(e.target.value);
                    if (formErrors.childAge) {
                      setFormErrors(prev => ({ ...prev, childAge: '' }));
                    }
                  }}
                >
                  <option value="">Chọn</option>
                  {AGE_GROUPS.map(ag => (
                    <option key={ag} value={ag}>{ag}</option>
                  ))}
                </select>
                {formErrors.childAge && (
                  <span className="text-[10px] font-bold text-error mt-0.5">{formErrors.childAge}</span>
                )}
              </div>

              {/* Driver/Parent Phone */}
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-1.5 font-headline text-xs sm:text-sm font-bold text-on-surface">
                  Số Điện Thoại <span className="text-red-500 font-extrabold">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại..."
                  className={`w-full px-3 py-2.5 h-[41px] rounded-xl border bg-[#f9f9fc] font-sans text-sm font-semibold outline-none transition-all ${
                    formErrors.phoneNumber ? 'border-error focus:border-error' : 'border-[#e0c0af] focus:border-secondary focus:ring-1 focus:ring-secondary'
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
              <label className="flex items-center gap-1.5 font-headline text-xs sm:text-sm font-bold text-on-surface">
                Tỉnh / Thành phố <span className="text-red-500 font-extrabold">*</span>
              </label>
              <select
                className={`w-full px-3 py-2.5 h-[41px] rounded-xl border bg-[#f9f9fc] font-sans text-sm font-semibold outline-none transition-all ${
                  formErrors.province ? 'border-error focus:border-error' : 'border-[#e0c0af] focus:border-secondary focus:ring-1 focus:ring-secondary'
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
              <label className="flex items-center gap-1.5 font-headline text-xs sm:text-sm font-bold text-on-surface">
                Cơ sở Superbrain <span className="text-red-500 font-extrabold">*</span>
              </label>
              <select
                disabled={!province}
                className={`w-full px-3 py-2.5 h-[41px] rounded-xl border bg-[#f9f9fc] font-sans text-sm font-semibold outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  formErrors.centerId ? 'border-error focus:border-error' : 'border-[#e0c0af] focus:border-secondary focus:ring-1 focus:ring-secondary'
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
              className="w-full bg-primary text-white font-headline text-base sm:text-lg font-bold py-3.5 mt-4 rounded-xl hover:bg-primary-container transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
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
