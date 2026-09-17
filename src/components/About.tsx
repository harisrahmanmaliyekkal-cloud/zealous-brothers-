import React from 'react';
import { 
  Calendar, 
  FileText, 
  MapPin, 
  Users, 
  Heart, 
  HandHeart,
  ArrowRight,
  Upload
} from 'lucide-react';
import { ClubLogo } from './ClubLogo';
import { useClub } from '../context/ClubContext';

export const About: React.FC = () => {
  const { openLogoUploadModal } = useClub();
  const stats = [
    {
      icon: Calendar,
      value: '31+',
      label: 'Years of Service'
    },
    {
      icon: Users,
      value: '100+',
      label: 'Active Members'
    },
    {
      icon: Heart,
      value: '50+',
      label: 'Social Initiatives'
    },
    {
      icon: HandHeart,
      value: '1000+',
      label: 'People Benefited'
    }
  ];

  return (
    <section id="about" className="bg-white">
      {/* 1. Main 3-Column About Us Section (Matching ui.png) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Mission and Intro */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 text-xs font-bold text-[#0072ce] tracking-widest uppercase">
              <span>ABOUT US</span>
              <span className="w-10 h-[2px] bg-[#0072ce]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              ZEALOUS BROTHERS
            </h2>

            <h3 className="text-base sm:text-lg font-bold text-[#0072ce]">
              Kala Samskarika Vedi, Puthuponnani
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
              Founded in 1994, Zealous Brothers is a registered cultural and social organization from Puthuponnani, working towards a progressive and compassionate society through cultural activities, social initiatives, youth development and community welfare programs.
            </p>

            <div className="pt-2">
              <a
                href="#programs"
                className="inline-flex items-center gap-2 bg-[#0072ce] hover:bg-[#005bb5] text-white px-7 py-2.5 rounded-full font-semibold text-sm shadow-sm transition-all hover:gap-3 cursor-pointer"
                id="about-learn-more-btn"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Center Column: Big Official Emblem (Seal from zb eps.pdf (1).png) */}
          <div className="lg:col-span-4 flex justify-center items-center py-4">
            <div className="relative p-2 flex items-center justify-center">
              {/* Radial subtle ambient glow */}
              <div className="absolute inset-0 bg-sky-100/50 rounded-full blur-2xl pointer-events-none" />
              
              <div 
                className="relative z-10 w-52 h-52 sm:w-60 sm:h-60 lg:w-64 lg:h-64 aspect-square flex items-center justify-center drop-shadow-sm select-none"
                title="സെലസ് ബ്രദേഴ്സ് ഔദ്യോഗിക മുദ്ര (Zealous Brothers Official Emblem)"
              >
                <ClubLogo 
                  variant="emblem" 
                  theme="transparent-blue" 
                  size="100%" 
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Credential Rows with blue icons */}
          <div className="lg:col-span-3 space-y-6 lg:pl-4 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0">
            {/* 1. Estd */}
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0072ce] shrink-0 group-hover:bg-[#0072ce] group-hover:text-white transition-colors">
                <Calendar className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold text-slate-900 block">
                  Estd: 1994
                </span>
                <span className="text-xs text-slate-400 font-medium">Over 3 Decades of Unity</span>
              </div>
            </div>

            {/* 2. Govt. Reg. No. */}
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0072ce] shrink-0 group-hover:bg-[#0072ce] group-hover:text-white transition-colors">
                <FileText className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Govt. Reg. No.
                </span>
                <span className="text-lg font-black text-[#0072ce] font-mono leading-tight">
                  126/95
                </span>
              </div>
            </div>

            {/* 3. Aff. NYK. No. */}
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0072ce] shrink-0 group-hover:bg-[#0072ce] group-hover:text-white transition-colors">
                <FileText className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Aff. NYK. No.
                </span>
                <span className="text-lg font-black text-[#0072ce] font-mono leading-tight">
                  429/96
                </span>
              </div>
            </div>

            {/* 4. Location */}
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0072ce] shrink-0 group-hover:bg-[#0072ce] group-hover:text-white transition-colors">
                <MapPin className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold text-slate-900 block">
                  Puthuponnani
                </span>
                <span className="text-xs text-slate-400 font-medium">Malappuram Dt, Kerala</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Stats Counter Ribbon with Team Jersey Photographic Background (Matching ui.png) */}
      <div className="relative bg-[#002244] text-white py-14 sm:py-16 overflow-hidden">
        {/* Background photo with blue tint */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/team-jerseys.jpg"
            alt="Zealous Brothers Team"
            className="w-full h-full object-cover object-[center_30%] opacity-20 filter saturate-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002244] via-[#002244]/90 to-[#002244]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => {
              const IconComp = stat.icon;
              return (
                <div key={stat.label} className="flex flex-col items-center text-center space-y-2 group">
                  <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 mb-1 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-sky-200">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
