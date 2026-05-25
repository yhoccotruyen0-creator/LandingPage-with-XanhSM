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
import { HelpCircle, Star, ShieldCheck, Milestone } from 'lucide-react';

export default function App() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
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
  const handleRegisterSuccess = (formData: Omit<Registration, 'id' | 'timestamp' | 'status'>) => {
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
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-12 sm:gap-16 lg:gap-20">
        
        {/* Decorative Brand Announcement Header bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-secondary/20 bg-secondary/5 rounded-2xl shadow-sm text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3.5 w-3.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-secondary"></span>
            </span>
            <p className="font-headline text-xs sm:text-sm font-bold text-secondary uppercase tracking-wider">
              Chương trình Học bổng đặc quyền phát sóng toàn quốc năm học 2026!
            </p>
          </div>
          <button
            onClick={() => handleScrollToSection('hoc-bong')}
            className="text-xs font-bold text-primary hover:underline cursor-pointer font-headline flex items-center gap-1 shrink-0"
          >
            Tìm hiểu chính sách đóng góp
            <span>→</span>
          </button>
        </div>

        {/* 1. Hero Segment */}
        <Hero onRegisterClick={() => handleScrollToSection('dang-ky')} />

        {/* 2. Customer pain hook questions */}
        <PsychologicalHook />

        {/* 3. Method Cognitive Benefits values cards */}
        <Benefits />

        {/* 4. Scholarship criteria overview & CTA buttons */}
        <ScholarshipDetails 
          onRegisterClick={() => handleScrollToSection('dang-ky')} 
          onFinderClick={() => handleScrollToSection('dia-diem')} 
        />

        {/* 5. Horizontal filterable school search terminal */}
        <CenterFinder onSelectCenterToRegister={handleSelectCenterToRegister} />

        {/* 6. Stateful forms inputs mapping */}
        <RegistrationSection
          preselectedCenter={preselectedCenter}
          onRegisterSuccess={handleRegisterSuccess}
          clearPreselection={() => setPreselectedCenter(null)}
        />

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
