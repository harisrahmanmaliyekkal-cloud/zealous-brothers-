import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Shield, 
  ShieldCheck
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { ClubLogo } from './ClubLogo';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenRegisterDonor?: () => void;
  onOpenVerification?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenVerification }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const { isAdmin } = useClub();

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Activities', href: '#programs' },
    { name: 'Blood Donation', href: '#blood-wing' },
    { name: 'Members', href: '#members' },
    { name: 'Publications', href: '#magazine' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#footer' },
  ];

  const handleNavClick = (linkName: string, href: string) => {
    setActiveTab(linkName);
    setMobileMenuOpen(false);
    if (linkName === 'Members' && onOpenVerification) {
      onOpenVerification();
      return;
    }
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs text-slate-800 transition-all">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Left: Official Club Brand with Emblem */}
        <div className="flex items-center" id="brand-logo-container">
          <a 
            href="#hero" 
            onClick={() => setActiveTab('Home')}
            className="flex items-center gap-3 focus:outline-none group" 
            id="brand-logo-link"
          >
            <ClubLogo 
              variant="horizontal" 
              theme="white-bg" 
              size={46} 
              className="transition-transform group-hover:scale-[1.01]" 
            />
          </a>
        </div>

        {/* Right: Desktop Nav Links + Join Us Button */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <div className="flex items-center gap-5 xl:gap-7">
            {navLinks.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.name, item.href);
                  }}
                  className={`text-sm font-medium transition-colors relative py-2 ${
                    isActive 
                      ? 'text-[#0072ce] font-bold' 
                      : 'text-slate-700 hover:text-[#0072ce]'
                  }`}
                  id={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0072ce] rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.name, item.href);
                }}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeTab === item.name 
                    ? 'bg-sky-50 text-[#0072ce] font-bold' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {onOpenVerification && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVerification();
                }}
                className="w-full text-center py-2 text-xs font-semibold text-sky-700 bg-sky-50 rounded-lg flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-[#0072ce]" />
                <span>Verify Digital ID Card</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full text-center py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg flex items-center justify-center gap-1.5"
            >
              <Shield className="w-4 h-4 text-slate-500" />
              <span>{isAdmin ? 'Admin Dashboard' : 'Admin Login'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
