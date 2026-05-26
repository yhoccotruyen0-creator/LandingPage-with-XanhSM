import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PsychologicalHook from './components/PsychologicalHook';
import Benefits from './components/Benefits';
import ScholarshipDetails from './components/ScholarshipDetails';
import CenterFinder from './components/CenterFinder';
import RegistrationSection from './components/RegistrationSection';
import RegistrationReceiptModal from './components/RegistrationReceiptModal';
import HistoryListModal from './components/HistoryListModal';
import Footer from './components/Footer';
import { SuperbrainCenter, Registration } from './types';
import { motion } from 'motion/react';
import { fetchCentersFromSheet, submitRegistrationToSheet } from './services/googleSheets';

export default function App() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [centers, setCenters] = useState<SuperbrainCenter[]>([]);
  const [centersLoadError, setCentersLoadError] = useState('');
  const [preselectedCenter, setPreselectedCenter] = useState<SuperbrainCenter | null>(null);
  
  // Modals status triggers
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<Registration | null>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mamxanh_registrations');
      if (stored) {
        setRegistrations(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to read registrations from localStorage', e);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    fetchCentersFromSheet()
      .then(remoteCenters => {
        if (!ignore && remoteCenters.length > 0) {
          setCenters(remoteCenters);
          setCentersLoadError('');
        } else if (!ignore) {
          setCentersLoadError('Google Sheet không trả về cơ sở nào.');
        }
      })
      .catch(error => {
        console.error('Failed to load centers from Google Sheet', error);
        if (!ignore) {
          setCentersLoadError(error instanceof Error ? error.message : 'Không kết nối được Google Sheet.');
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  // Sync to local storage
  const saveRegistrationsToLocalStorage = (newRegs: Registration[]) => {
    setRegistrations(newRegs);
    try {
      localStorage.setItem('mamxanh_registrations', JSON.stringify(newRegs));
    } catch (e) {
      console.error('Failed to save registrations to localStorage', e);
    }
  };

  // Create booking slot
  const handleRegisterSuccess = async (formData: Omit<Registration, 'id' | 'timestamp' | 'status'>) => {
    const selectedCenter = centers.find(center => center.id === formData.centerId);

    await submitRegistrationToSheet({
      ...formData,
      centerEmail: selectedCenter?.email
    });

    const newReg: Registration = {
      ...formData,
      id: `reg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    const updated = [newReg, ...registrations];
    saveRegistrationsToLocalStorage(updated);
    
    // Set active receipt to show voucher
    setActiveReceipt(newReg);
    setReceiptModalOpen(true);
  };

  // Delete/Cancel booking
  const handleDeleteRegistration = (id: string) => {
    const updated = registrations.filter(r => r.id !== id);
    saveRegistrationsToLocalStorage(updated);
    
    // If active receipt is the deleted one, close modal
    if (activeReceipt && activeReceipt.id === id) {
      setActiveReceipt(null);
      setReceiptModalOpen(false);
    }
  };

  // Re-preview receipt from list
  const handlePreviewReceipt = (reg: Registration) => {
    setActiveReceipt(reg);
    setHistoryModalOpen(false);
    setReceiptModalOpen(true);
  };

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // When a center is clicked from finder, store to trigger populate in Form
  const handleSelectCenterToRegister = (center: SuperbrainCenter) => {
    setPreselectedCenter(center);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9fc] text-[#1a1c1e]">
      
      {/* Sticky Navigation Bar */}
      <Header
        onScrollToSection={handleScrollToSection}
        onOpenHistory={() => setHistoryModalOpen(true)}
        registrationCount={registrations.length}
      />

      {/* Main landing segments layout container */}
      <main className="flex-grow w-full">
        
        {/* Decorative Brand Announcement Header bar */}
        <div className="bg-[#eefbf4] px-4 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-2xl border-2 border-[#72b88d] bg-white/80 px-5 py-4 text-center shadow-sm sm:px-8">
            <p className="font-headline text-xl font-bold leading-snug text-[#171717] sm:text-2xl lg:text-3xl">            
              <span className="block pt-1">
                Đặc quyền dành riêng cho <span className="font-extrabold text-[#148144]">bác tài Xanh Green SM!</span>
              </span>
            </p>
          </div>
        </div>

        {/* 1. Hero Segment */}
        <Hero onRegisterClick={() => handleScrollToSection('dang-ky')} />

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-8 sm:gap-16 sm:px-6 md:py-12 lg:gap-20 lg:px-8">
          {/* 2. Customer pain hook questions */}
          <PsychologicalHook onRegisterClick={() => handleScrollToSection('dang-ky')} />

          {/* 3. Method Cognitive Benefits values cards */}
          <Benefits />

          {/* 4. Scholarship criteria overview & CTA buttons */}
          <ScholarshipDetails 
            onRegisterClick={() => handleScrollToSection('dang-ky')} 
            onFinderClick={() => handleScrollToSection('dia-diem')} 
          />

          {/* 5. Horizontal filterable school search terminal */}
          <CenterFinder centers={centers} loadError={centersLoadError} onSelectCenterToRegister={handleSelectCenterToRegister} />

          {/* 6. Stateful forms inputs mapping */}
          <RegistrationSection
            centers={centers}
            preselectedCenter={preselectedCenter}
            onRegisterSuccess={handleRegisterSuccess}
            clearPreselection={() => setPreselectedCenter(null)}
          />
        </div>

      </main>

      {/* Polished Footers */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* MODALS RENDER OVERLAYS */}
      
      {/* SUCCESS CONFIRMATION RECEIPT MODAL */}
      <RegistrationReceiptModal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        registration={activeReceipt}
      />

      {/* PREVIOUS TICKETS HISTORY PREVIEW DRAWER */}
      <HistoryListModal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        registrations={registrations}
        onDeleteRegistration={handleDeleteRegistration}
        onSelectRegistration={handlePreviewReceipt}
      />

    </div>
  );
}
