import React from 'react';
import { 
  Heart, 
  Phone, 
  MapPin, 
  Mail, 
  Shield, 
  ArrowUp,
  HeartHandshake,
  Award,
  ShieldCheck
} from 'lucide-react';
import { ClubLogo } from './ClubLogo';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenRegisterDonor: () => void;
  onOpenVerification?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenRegisterDonor, onOpenVerification }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#001733] text-white border-t border-[#00386e] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#00386e]/80">
          
          {/* Brand Col with Official Club Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0072ce] p-1 border border-white/20 flex items-center justify-center shadow-lg">
                <ClubLogo variant="emblem" theme="transparent-white" size={44} />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block">
                  ZEALOUS <span className="text-sky-400">BROTHERS</span>
                </span>
                <span className="text-[11px] font-bold text-sky-200 block">
                  സെലസ് ബ്രദേഴ്‌സ് പുതുപൊന്നാനി
                </span>
                <span className="text-[9px] font-mono text-sky-300 block">
                  Reg No: 126/95, 429/96
                </span>
              </div>
            </div>

            <p className="text-xs text-sky-100/70 leading-relaxed">
              കലാ സാംസ്കാരിക വേദി പുതുപൊന്നാനി (Reg: 126/95, 429/96). A registered socio-cultural fraternity dedicated to youth football, educational kits, community arts festivals, and round-the-clock emergency blood assistance.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={onOpenRegisterDonor}
                className="px-3.5 py-1.5 bg-[#0072ce] hover:bg-[#005bb5] text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-sky-950/50 cursor-pointer"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                Join Blood Registry
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-sky-100/80">
              <li><a href="#hero" className="hover:text-white transition">Home Overview</a></li>
              <li><a href="#about" className="hover:text-white transition">About Club & History</a></li>
              <li><a href="#programs" className="hover:text-white transition">Programs & Tournaments</a></li>
              <li><a href="#blood-wing" className="hover:text-white transition">ZB Care Blood Wing</a></li>
              {onOpenVerification && (
                <li>
                  <button 
                    onClick={onOpenVerification} 
                    className="hover:text-white text-emerald-300 font-semibold transition flex items-center gap-1 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verify Member ID (അംഗത്വ പരിശോധന)</span>
                  </button>
                </li>
              )}
              <li><a href="#magazine" className="hover:text-white transition">Annual Club Magazine</a></li>
              <li><a href="#gallery" className="hover:text-white transition">Moments & Highlights</a></li>
            </ul>
          </div>

          {/* Emergency Lifeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              24/7 Emergency Blood Lifeline
            </h4>
            <p className="text-xs text-sky-100/70">
              For emergency blood requests across Puthuponnani and regional hospitals:
            </p>
            <div className="p-3.5 rounded-xl bg-[#002244] border border-sky-500/30 space-y-2">
              <div className="text-xs">
                <span className="text-sky-300 block text-[10px] uppercase font-semibold">Puthuponnani Coordinator</span>
                <a href="tel:+919847012345" className="font-mono font-bold text-white hover:text-sky-300 text-sm">
                  +91 98470 12345
                </a>
              </div>
              <div className="text-xs pt-1 border-t border-[#00386e]">
                <span className="text-sky-300 block text-[10px] uppercase font-semibold">Hospital Liaison Desk</span>
                <a href="tel:+919447199887" className="font-mono font-bold text-sky-100 hover:text-white text-xs">
                  +91 94471 99887
                </a>
              </div>
            </div>
          </div>

          {/* Club Headquarters */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider">Club Secretariat</h4>
            <div className="space-y-2.5 text-xs text-sky-100/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  Zealous Brothers Cultural Center, Puthuponnani, Ponnani Taluk, Malappuram District, Kerala - 679577
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:info@zealousbrothers.org" className="hover:text-white">
                  info@zealousbrothers.org
                </a>
              </div>
              <div className="pt-2 flex flex-wrap items-center gap-2">
                {onOpenVerification && (
                  <button
                    onClick={onOpenVerification}
                    className="flex items-center gap-1.5 text-xs font-bold text-sky-200 hover:text-white bg-[#002244] hover:bg-[#002b5c] px-3.5 py-2 rounded-xl border border-sky-500/30 transition cursor-pointer"
                    id="footer-verify-member-btn"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verify Member ID</span>
                  </button>
                )}
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 text-xs font-bold text-sky-200 hover:text-white bg-[#002244] hover:bg-[#002b5c] px-3.5 py-2 rounded-xl border border-sky-500/30 transition cursor-pointer"
                  id="footer-admin-btn"
                >
                  <Shield className="w-3.5 h-3.5 text-sky-400" />
                  <span>Admin Console</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom micro bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-200/60">
          <div>
            © {new Date().getFullYear()} ZEALOUS BROTHERS (Kala Samskarika Vedi Puthuponnani). Reg No: 126/95, 429/96. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-sky-200/80">
              Brotherhood & Community in Puthuponnani
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#002244] hover:bg-[#002b5c] text-sky-300 hover:text-white border border-sky-500/30 transition cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
