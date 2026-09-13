import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, 
  Calendar, 
  PhoneCall, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Activity,
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { ClubLogo } from './ClubLogo';

interface HeroProps {
  onOpenRegisterDonor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegisterDonor }) => {
  const { donors, programs } = useClub();
  
  // Dynamic taglines
  const taglines = [
    'United in Brotherhood, Dedicated to Community, Culture & Humanity.',
    'Fueling Youth Energy Through Sports, Cultural Arts & Social Service.',
    'Saving Lives with Every Drop: Our 24/7 Voluntary Blood Donor Network.',
    'Empowering Puthuponnani with Knowledge, Health, and Compassion.'
  ];

  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const totalDonorsCount = donors.length > 0 ? donors.length : 48;
  const upcomingCount = programs.filter((p) => p.status === 'Upcoming' || p.status === 'Ongoing').length;

  return (
    <section id="hero" className="relative bg-[#001733] text-white overflow-hidden py-14 lg:py-20 border-b border-[#00386e]">
      {/* Background Graphic Accents in Signature Royal Azure Blue */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0072ce] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#005bb5] rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#00386e] rounded-full blur-3xl"></div>
      </div>

      {/* Grid texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Hero Left */}
          <div className="lg:col-span-7 space-y-6">
            {/* Dynamic Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#002b5c] border border-sky-400/40 text-sky-200 text-xs font-bold tracking-wide shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-pulse"></span>
              <span className="uppercase text-[11px] tracking-wider font-extrabold">Official Club Portal</span>
              <span className="text-sky-400">•</span>
              <span className="text-white font-medium">പുതുപൊന്നാനി</span>
              <span className="text-sky-400">•</span>
              <span className="text-sky-300 font-mono text-[10px]">Reg: 126/95, 429/96</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-sky-300 tracking-wider uppercase mb-1">
                  കലാ സാംസ്കാരിക വേദി
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
                  ZEALOUS <span className="text-[#38bdf8]">BROTHERS</span>
                </h1>
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-100 tracking-wide mt-1">
                  സെലസ് ബ്രദേഴ്‌സ്
                </div>
              </div>
              <p className="text-sky-100/90 text-base sm:text-lg font-medium tracking-normal pt-1">
                Fraternity • Youth Athletics • Education • 24/7 ZB Care Blood Wing
              </p>
            </div>

            {/* Dynamic Tagline Carousel */}
            <div className="min-h-[50px] flex items-center">
              <p className="text-base sm:text-lg text-sky-50 font-normal leading-relaxed transition-opacity duration-500 border-l-4 border-[#0072ce] pl-4">
                {taglines[currentTaglineIndex]}
              </p>
            </div>

            {/* CTA Buttons with signature Royal Blue & White combo */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpenRegisterDonor}
                className="px-6 py-3.5 rounded-xl bg-[#0072ce] hover:bg-[#005bb5] text-white font-bold text-sm sm:text-base transition shadow-xl shadow-sky-950/60 flex items-center gap-2.5 group cursor-pointer border border-sky-400/40"
                id="hero-register-donor-cta"
              >
                <HeartHandshake className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span>Register as Blood Donor</span>
                <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#programs"
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-sky-50 text-[#002244] font-bold text-sm sm:text-base transition flex items-center gap-2 shadow-md cursor-pointer"
                id="hero-explore-programs-cta"
              >
                <Calendar className="w-5 h-5 text-[#0072ce]" />
                <span>Club Programs & Events</span>
              </a>

              <a
                href="#blood-wing"
                className="px-4 py-3.5 rounded-xl bg-[#002855] hover:bg-[#00386e] text-sky-200 border border-sky-400/30 font-semibold text-sm transition flex items-center gap-2"
                id="hero-emergency-request-cta"
              >
                <PhoneCall className="w-4 h-4 text-sky-300 animate-pulse" />
                <span>Blood Helpline</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-[#00386e] grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">{totalDonorsCount}+</span>
                <span className="text-xs text-sky-200 font-medium">Registered Donors</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-sky-300">{upcomingCount > 0 ? upcomingCount : '4'}</span>
                <span className="text-xs text-sky-200 font-medium">Active Programs</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">Estd 1994</span>
                <span className="text-xs text-sky-200 font-medium">Community Legacy</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-amber-300">24/7</span>
                <span className="text-xs text-sky-200 font-medium">Emergency Desk</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Official Emblem Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-[#002244] border-2 border-sky-500/30 p-6 sm:p-7 shadow-2xl overflow-hidden group">
              {/* Subtle radiant background glow matching 2.png */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#0072ce] rounded-full blur-3xl opacity-40"></div>
              
              {/* Top Banner Tag */}
              <div className="flex items-center justify-between pb-4 border-b border-[#00386e] relative">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping"></span>
                  <span className="text-xs font-black tracking-wider text-sky-200 uppercase">
                    Official Insignia & Emblem
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-white/10 text-white border border-white/20">
                  PUTHUPONNANI
                </span>
              </div>

              {/* Full Club Emblem Display as seen in 2.png */}
              <div className="py-5 flex flex-col items-center justify-center relative">
                <div className="w-full max-w-[280px] bg-[#0072ce] rounded-2xl p-4 shadow-xl border border-white/20 hover:scale-[1.02] transition-transform duration-300">
                  <ClubLogo variant="full" theme="transparent-white" size="100%" showRegNo={true} />
                </div>
                <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-sky-200/85">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>സെലസ് ബ്രദേഴ്സ് കലാ സാംസ്കാരിക വേദി • Estd. 1994</span>
                </div>
              </div>

              {/* Instant Emergency Blood Call Ribbon */}
              <div className="pt-4 border-t border-[#00386e] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-sky-200 font-semibold">
                    <Activity className="w-4 h-4 text-sky-400" />
                    <span>Emergency Blood Desk (24/7)</span>
                  </div>
                  <a href="#blood-wing" className="text-[11px] font-bold text-sky-300 hover:text-white underline">
                    Find Donors →
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-[#001733] border border-sky-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0072ce] text-white flex items-center justify-center shadow-sm">
                      <PhoneCall className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-[10px] text-sky-300 font-semibold uppercase">Puthuponnani Coordinator:</div>
                      <div className="text-sm font-black text-white">+91 98470 12345</div>
                    </div>
                  </div>
                  <a
                    href="tel:+919847012345"
                    className="px-3 py-1.5 bg-white text-[#002244] hover:bg-sky-50 font-black text-xs rounded-lg transition shadow-sm"
                  >
                    Call
                  </a>
                </div>

                <div className="flex items-center justify-between text-[11px] text-sky-200/80 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    Reg: 126/95, 429/96
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Kala Samskarika Vedi
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
