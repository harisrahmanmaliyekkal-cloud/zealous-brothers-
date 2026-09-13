import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Menu, 
  X, 
  Shield, 
  PhoneCall, 
  LogOut,
  Calendar,
  BookOpen,
  Image as ImageIcon,
  Users,
  ShieldCheck
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { ClubLogo } from './ClubLogo';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenRegisterDonor: () => void;
  onOpenVerification?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenRegisterDonor, onOpenVerification }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin, logoutAdmin } = useClub();

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Club', href: '#about', icon: Users },
    { name: 'Programs & Events', href: '#programs', icon: Calendar },
    { name: 'ZB Care (Blood)', href: '#blood-wing', icon: HeartHandshake, badge: '24/7' },
    { name: 'Annual Magazine', href: '#magazine', icon: BookOpen },
    { name: 'Moments Gallery', href: '#gallery', icon: ImageIcon },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#002244]/95 backdrop-blur-md border-b border-[#00386e] text-white transition-all shadow-lg">
      {/* Top micro emergency banner with official Royal Blue accent */}
      <div className="bg-[#0072ce] text-white text-xs font-semibold py-1.5 px-4 tracking-wide flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-200 opacity-85"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="truncate">
            <strong className="font-bold">24/7 ZB Care Blood Wing Helpline:</strong> Urgent blood requirement in Puthuponnani & nearby hospitals?{' '}
            <a href="tel:+919847012345" className="underline font-extrabold hover:text-sky-100">+91 98470 12345</a>
          </span>
          <div className="hidden sm:flex ml-auto items-center gap-3 text-xs shrink-0">
            {onOpenVerification && (
              <button
                onClick={onOpenVerification}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-2.5 py-1 rounded-md text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                id="top-verify-member-btn"
                title="Verify Digital ID Card (അംഗത്വ പരിശോധന)"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Verify ID Card</span>
              </button>
            )}
            <button
              onClick={onOpenRegisterDonor}
              className="bg-white text-[#0072ce] hover:bg-sky-50 px-3 py-1 rounded-md text-xs font-black transition shadow-sm cursor-pointer"
              id="top-register-donor-btn"
            >
              + Register as Blood Donor
            </button>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Official Club Brand with Emblem */}
        <div className="flex items-center gap-3.5" id="brand-logo-container">
          <ClubLogo variant="emblem" size={48} theme="blue-bg" interactive={true} className="group-hover:scale-105 transition-transform duration-200" />
          <a href="#hero" className="flex flex-col group focus:outline-none" id="brand-logo-link">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black tracking-tight text-white flex items-center">
                ZEALOUS <span className="text-sky-400 ml-1.5">BROTHERS</span>
              </span>
              <span className="hidden sm:inline-block text-[13px] font-bold text-sky-200">
                സെലസ് ബ്രദേഴ്‌സ്
              </span>
            </div>
            <span className="text-[11px] font-medium tracking-wider text-sky-100/80 flex items-center gap-1.5">
              <span>കലാ സാംസ്കാരിക വേദി പുതുപൊന്നാനി</span>
              <span className="text-sky-400 font-bold">•</span>
              <span className="font-mono text-[10px] text-sky-300">Reg: 126/95, 429/96</span>
            </span>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative px-3 py-2 text-sm font-semibold text-sky-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1.5"
              id={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {item.name}
              {item.badge && (
                <span className="bg-red-600 text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          {onOpenVerification && (
            <button
              onClick={onOpenVerification}
              className="flex items-center gap-1.5 text-xs font-bold text-sky-200 hover:text-white bg-[#001733] hover:bg-[#002b5e] border border-sky-500/40 px-3 py-2 rounded-lg transition shadow-sm cursor-pointer"
              id="desktop-verify-member-btn"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verify Member</span>
            </button>
          )}

          <a
            href="tel:+919847012345"
            className="flex items-center gap-2 text-xs font-bold text-white bg-[#00386e] hover:bg-[#004f8c] border border-sky-500/30 px-3 py-2 rounded-lg transition shadow-sm"
            id="emergency-call-nav-btn"
          >
            <PhoneCall className="w-4 h-4 text-sky-300 animate-pulse" />
            <span>Emergency</span>
          </a>

          {isAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-2 bg-[#0072ce] hover:bg-[#005bb5] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition shadow-md shadow-sky-950/40 cursor-pointer"
                id="admin-dashboard-btn"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Panel</span>
              </button>
              <button
                onClick={logoutAdmin}
                title="Log Out"
                className="p-2 text-sky-200 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                id="admin-logout-btn"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-white hover:bg-[#0072ce] bg-white/10 border border-white/20 px-3.5 py-2 rounded-lg transition cursor-pointer"
              id="admin-login-nav-btn"
            >
              <Shield className="w-3.5 h-3.5 text-sky-300" />
              <span>Admin Login</span>
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-sky-100 hover:text-white hover:bg-white/10 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#002244] border-b border-[#00386e] px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-sky-100 hover:bg-white/10 hover:text-white"
              >
                <span className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4 text-sky-400" />
                  {item.name}
                </span>
                {item.badge && (
                  <span className="bg-red-600 text-[10px] font-bold text-white px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#00386e] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegisterDonor();
              }}
              className="w-full py-2.5 px-4 bg-[#0072ce] hover:bg-[#005bb5] text-white font-bold text-sm rounded-lg text-center flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              id="mobile-register-donor-btn"
            >
              <HeartHandshake className="w-4 h-4" />
              Register as Blood Donor
            </button>
            <div className="flex items-center gap-2">
              {onOpenVerification && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenVerification();
                  }}
                  className="flex-1 py-2.5 px-3 bg-[#001733] hover:bg-[#002b5e] text-sky-200 font-semibold text-xs rounded-lg text-center flex items-center justify-center gap-1.5 border border-sky-500/40 cursor-pointer"
                  id="mobile-verify-btn"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verify Member</span>
                </button>
              )}
              <a
                href="tel:+919847012345"
                className="flex-1 py-2.5 px-3 bg-[#00386e] hover:bg-[#004f8c] text-white font-semibold text-xs rounded-lg text-center flex items-center justify-center gap-2 border border-sky-500/30"
              >
                <PhoneCall className="w-3.5 h-3.5 text-sky-300" />
                98470 12345
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 border border-white/20 cursor-pointer"
                id="mobile-admin-btn"
              >
                <Shield className="w-3.5 h-3.5 text-sky-300" />
                {isAdmin ? 'Admin' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
