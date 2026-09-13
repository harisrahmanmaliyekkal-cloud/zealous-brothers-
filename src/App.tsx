import React, { useState, useEffect } from 'react';
import { ClubProvider, useClub } from './context/ClubContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Programs } from './components/Programs';
import { BloodWing } from './components/BloodWing';
import { Magazine } from './components/Magazine';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { RegisterDonorModal } from './components/RegisterDonorModal';
import { AdminPanel } from './components/AdminPanel';
import { LogoUploadModal } from './components/LogoUploadModal';
import { MemberVerificationView } from './components/MemberVerificationView';
import { CheckCircle2 } from 'lucide-react';

function AppContent() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isRegisterDonorOpen, setIsRegisterDonorOpen] = useState(false);

  // URL-driven verification state for QR code scans & public verification
  const [verificationMemberId, setVerificationMemberId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('verify');
    }
    return null;
  });
  const [isVerificationViewOpen, setIsVerificationViewOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.has('verify');
    }
    return false;
  });

  const { toastMessage, isLogoUploadModalOpen, closeLogoUploadModal } = useClub();

  // Handle browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.has('verify')) {
        setVerificationMemberId(params.get('verify'));
        setIsVerificationViewOpen(true);
      } else {
        setVerificationMemberId(null);
        setIsVerificationViewOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenVerification = (memberId?: string) => {
    const targetId = memberId || '';
    setVerificationMemberId(targetId);
    setIsVerificationViewOpen(true);
    const newUrl = targetId 
      ? `${window.location.pathname}?verify=${encodeURIComponent(targetId)}`
      : `${window.location.pathname}?verify=`;
    window.history.pushState({}, '', newUrl);
  };

  const handleBackFromVerification = () => {
    setVerificationMemberId(null);
    setIsVerificationViewOpen(false);
    window.history.pushState({}, '', window.location.pathname);
  };

  // If scanning a QR code or visiting verification portal, display verification view directly
  if (isVerificationViewOpen || verificationMemberId !== null) {
    return (
      <MemberVerificationView
        initialMemberId={verificationMemberId || ''}
        onBackToHome={handleBackFromVerification}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#0072ce] selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#001733] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-sky-500/30 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200 max-w-md">
          <div className="w-8 h-8 rounded-full bg-[#0072ce]/30 text-sky-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-medium leading-snug">{toastMessage}</p>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenRegisterDonor={() => setIsRegisterDonorOpen(true)}
        onOpenVerification={() => handleOpenVerification()}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero onOpenRegisterDonor={() => setIsRegisterDonorOpen(true)} />
        <About />
        <Programs />
        <BloodWing onOpenRegisterModal={() => setIsRegisterDonorOpen(true)} />
        <Magazine />
        <Gallery />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenRegisterDonor={() => setIsRegisterDonorOpen(true)}
        onOpenVerification={() => handleOpenVerification()}
      />

      {/* Modals */}
      <RegisterDonorModal
        isOpen={isRegisterDonorOpen}
        onClose={() => setIsRegisterDonorOpen(false)}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onOpenVerification={handleOpenVerification}
      />

      {/* Logo Upload Modal */}
      <LogoUploadModal
        isOpen={isLogoUploadModalOpen}
        onClose={closeLogoUploadModal}
      />
    </div>
  );
}

export default function App() {
  return (
    <ClubProvider>
      <AppContent />
    </ClubProvider>
  );
}
