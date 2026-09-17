import React, { useState } from 'react';
import { 
  Users, 
  Heart, 
  Sparkles, 
  Megaphone,
  Camera,
  Maximize2,
  X
} from 'lucide-react';
import { useClub } from '../context/ClubContext';

interface HeroProps {
  onOpenRegisterDonor?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegisterDonor }) => {
  const { heroBannerUrl, heroBannerPosition } = useClub();
  const [showPanoramaModal, setShowPanoramaModal] = useState(false);

  // Features matching the 4 floating cards in ui.png
  const floatingFeatures = [
    {
      icon: Users,
      title: 'Community Development',
      subtitle: 'Working together for a stronger society',
      href: '#about'
    },
    {
      icon: Heart,
      title: 'Social Service',
      subtitle: 'Care, Support and Real Change',
      href: '#blood-wing'
    },
    {
      icon: Sparkles,
      title: 'Youth Empowerment',
      subtitle: 'Nurturing talents a brighter future',
      href: '#programs'
    },
    {
      icon: Megaphone,
      title: 'Cultural Activities',
      subtitle: 'Preserving our roots Inspiring generations',
      href: '#programs'
    }
  ];

  const currentBannerSource = heroBannerUrl || '/hero-puthuponnani.jpg';
  const bannerFocalPoint = heroBannerPosition || 'center 72%';

  return (
    <section id="hero" className="relative bg-slate-50">
      {/* 1. Panoramic Scenic Hero Banner Image - Positioned to fit the beach, river and boat view */}
      <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] xl:h-[530px] bg-slate-900 overflow-hidden group">
        <img
          src={currentBannerSource}
          alt="Zealous Brothers Official Header Banner - Puthuponnani Estuary & Beach"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          style={{ objectPosition: bannerFocalPoint }}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== window.location.origin + '/hero-puthuponnani.jpg') {
              target.src = '/hero-puthuponnani.jpg';
            }
          }}
        />

        {/* Soft gradient vignette to ensure smooth transition into floating cards */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

        {/* View Full Resolution Sunset Panorama button */}
        <button
          onClick={() => setShowPanoramaModal(true)}
          className="absolute top-4 right-4 sm:top-5 sm:right-6 bg-black/45 hover:bg-black/65 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/25 transition cursor-pointer shadow-md z-10"
          title="View Full Resolution Puthuponnani Panorama"
          id="hero-view-panorama-btn"
        >
          <Camera className="w-3.5 h-3.5 text-sky-300" />
          <span className="hidden sm:inline">📍 പുതുപൊന്നാനി തീരം</span>
          <Maximize2 className="w-3 h-3 text-white/80" />
        </button>
      </div>

      {/* 2. Floating 4-Feature Card Bar overlapping Hero with gentle margin */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-20 -mt-6 sm:-mt-8 lg:-mt-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-4 sm:p-6 lg:p-7 transition-all">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 divide-y-0 sm:divide-x divide-slate-100">
            {floatingFeatures.map((item, index) => {
              const IconComp = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className={`flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5 p-2 sm:p-0 sm:px-3 first:sm:px-0 group transition cursor-pointer`}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 text-[#0072ce] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#0072ce] group-hover:text-white transition-all shadow-xs">
                    <IconComp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-xs sm:text-base leading-snug group-hover:text-[#0072ce] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5 sm:mt-1 leading-normal font-normal line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Panorama Lightbox Modal */}
      {showPanoramaModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowPanoramaModal(false)}
        >
          <div 
            className="relative max-w-6xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-slate-900/90 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-sky-400">പുതുപൊന്നാനി അഴിമുഖം & തീരം (Puthuponnani Estuary & Beach)</span>
                <span className="text-xs text-slate-400 hidden sm:inline">• Malappuram, Kerala</span>
              </div>
              <button
                onClick={() => setShowPanoramaModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full max-h-[75vh] overflow-auto bg-black flex items-center justify-center">
              <img
                src={currentBannerSource}
                alt="Puthuponnani Beach Full View"
                className="w-full h-auto max-h-[72vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-3 bg-slate-900 text-xs text-slate-400 text-center border-t border-slate-800">
              The historic homeland of Zealous Brothers Kala Samskarika Vedi since 1994.
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
