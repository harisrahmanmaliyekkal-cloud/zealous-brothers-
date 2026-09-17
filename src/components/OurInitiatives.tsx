import React, { useState } from 'react';
import { 
  Heart, 
  HandHeart, 
  Trophy, 
  Sparkles, 
  Clock, 
  MapPin, 
  ChevronRight, 
  ArrowRight,
  BookOpen,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useClub } from '../context/ClubContext';

interface OurInitiativesProps {
  onOpenRegisterDonor?: () => void;
  onOpenBloodWing?: () => void;
  onOpenMagazine?: (id?: string) => void;
  onOpenPrograms?: () => void;
}

export const OurInitiatives: React.FC<OurInitiativesProps> = ({
  onOpenRegisterDonor,
  onOpenBloodWing,
  onOpenMagazine,
  onOpenPrograms
}) => {
  const { programs, magazines } = useClub();
  const [activeMagazineIndex, setActiveMagazineIndex] = useState(0);

  // 4 Initiatives matching ui.png
  const initiatives = [
    {
      id: 'blood',
      title: 'Blood Donation',
      subtitle: 'Saving lives through voluntary blood donation camps.',
      image: '/images/blood-donation.jpg',
      icon: Heart,
      iconBg: 'bg-red-50 text-red-600',
      action: onOpenBloodWing || onOpenRegisterDonor
    },
    {
      id: 'social',
      title: 'Social Service',
      subtitle: 'Supporting the needy, standing with the community.',
      image: '/images/social-service.jpg',
      icon: HandHeart,
      iconBg: 'bg-sky-50 text-[#0072ce]',
      action: onOpenPrograms
    },
    {
      id: 'sports',
      title: 'Sports & Youth Development',
      subtitle: 'Encouraging talents and building a healthier generation.',
      image: '/images/sports-youth.jpg',
      icon: Trophy,
      iconBg: 'bg-sky-50 text-[#0072ce]',
      action: onOpenPrograms
    },
    {
      id: 'cultural',
      title: 'Cultural Activities',
      subtitle: 'Celebrating our culture, keeping our traditions alive.',
      image: '/images/cultural-chenda.jpg',
      icon: Sparkles,
      iconBg: 'bg-sky-50 text-[#0072ce]',
      action: onOpenPrograms
    }
  ];

  // Upcoming events matching ui.png
  const upcomingEvents = [
    {
      id: 'ev-1',
      day: '19',
      month: 'JUL',
      year: '2024',
      title: 'Blood Donation Camp',
      time: '9:00 AM – 1:00 PM',
      location: 'Puthuponnani',
      action: onOpenBloodWing
    },
    {
      id: 'ev-2',
      day: '15',
      month: 'AUG',
      year: '2024',
      title: 'Independence Day Celebration',
      time: '9:00 AM',
      location: 'Puthuponnani',
      action: onOpenPrograms
    }
  ];

  // Magazine Publications matching ui.png
  const publicationCovers = [
    {
      id: 'mag-1',
      title: 'സെലസ് ബ്രദേഴ്സ്',
      edition: 'Annual Souvenir',
      image: '/images/magazine-sunset.jpg',
      year: '2024'
    },
    {
      id: 'mag-2',
      title: 'സെലസ് ബ്രദേഴ്സ്',
      edition: 'Silver Jubilee',
      image: '/images/magazine-unity.jpg',
      year: '2023'
    },
    {
      id: 'mag-3',
      title: 'സെലസ് ബ്രദേഴ്സ്',
      edition: 'Special Issue',
      image: '/images/magazine-palms.jpg',
      year: '2022'
    }
  ];

  return (
    <section id="initiatives" className="bg-slate-50/50 py-16 sm:py-24 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ================= 1. OUR INITIATIVES ================= */}
        <div className="mb-14">
          <div className="flex items-center gap-2.5 text-xs font-bold text-[#0072ce] tracking-widest uppercase mb-6">
            <span>OUR INITIATIVES</span>
            <span className="w-10 h-[2px] bg-[#0072ce]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((item) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group"
                >
                  {/* Card Image with Floating Icon */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/95 shadow-md flex items-center justify-center backdrop-blur-sm">
                      <IconComp className={`w-5 h-5 ${item.iconBg.split(' ')[1]}`} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#0072ce] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-normal">
                        {item.subtitle}
                      </p>
                    </div>

                    <div>
                      <button
                        onClick={item.action}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0072ce] hover:text-[#005bb5] border border-sky-200 hover:border-[#0072ce] bg-sky-50/50 hover:bg-sky-50 px-4 py-1.5 rounded-full transition cursor-pointer"
                        id={`initiative-know-more-${item.id}`}
                      >
                        <span>Know More</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= 2. TWO COLUMNS: UPCOMING EVENTS & OUR PUBLICATIONS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-4">
          
          {/* Left Column: UPCOMING EVENTS */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                UPCOMING EVENTS
              </h3>
              <button
                onClick={onOpenPrograms}
                className="text-xs font-bold text-[#0072ce] hover:text-[#005bb5] flex items-center gap-1 hover:underline cursor-pointer"
                id="events-view-all-btn"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 pt-2">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={event.action}
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    {/* Date Block matching ui.png */}
                    <div className="w-14 h-16 rounded-xl bg-sky-50 border border-sky-200 flex flex-col items-center justify-center shrink-0 text-center">
                      <span className="text-xl font-black text-[#0072ce] leading-none">
                        {event.day}
                      </span>
                      <span className="text-[11px] font-bold text-sky-700 tracking-wider uppercase mt-0.5">
                        {event.month}
                      </span>
                      <span className="text-[9px] font-medium text-slate-400">
                        {event.year}
                      </span>
                    </div>

                    {/* Details */}
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#0072ce] transition-colors">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{event.time}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{event.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Circle Arrow Button */}
                  <div className="w-8 h-8 rounded-full border border-sky-200 flex items-center justify-center text-sky-600 group-hover:bg-[#0072ce] group-hover:text-white group-hover:border-[#0072ce] transition-colors shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: OUR PUBLICATIONS */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                OUR PUBLICATIONS
              </h3>
              <button
                onClick={() => onOpenMagazine && onOpenMagazine()}
                className="text-xs font-bold text-[#0072ce] hover:text-[#005bb5] flex items-center gap-1 hover:underline cursor-pointer"
                id="publications-view-all-btn"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <div className="grid grid-cols-3 gap-3 flex-1">
                {publicationCovers.map((pub, idx) => (
                  <div
                    key={pub.id}
                    onClick={() => onOpenMagazine && onOpenMagazine(pub.id)}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all border border-slate-200 cursor-pointer flex flex-col"
                  >
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img
                        src={pub.image}
                        alt={pub.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-2.5 text-white">
                        <span className="text-[10px] font-bold text-sky-300 tracking-wider">
                          {pub.year}
                        </span>
                        <span className="text-xs font-black leading-tight text-white line-clamp-1">
                          {pub.title}
                        </span>
                        <span className="text-[9px] text-slate-300 font-medium">
                          {pub.edition}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Arrow Button matching ui.png */}
              <button
                onClick={() => onOpenMagazine && onOpenMagazine()}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-[#0072ce] hover:border-[#0072ce] transition shrink-0 cursor-pointer"
                title="Browse all issues"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= 3. CALLOUT BANNER (Matching ui.png) ================= */}
        <div className="mt-14">
          <div className="bg-gradient-to-r from-[#00386e] via-[#005bb5] to-[#0072ce] rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            {/* Subtle decorative background glow */}
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-1.5 text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Together for a Brighter Community
              </h3>
              <p className="text-sky-100 text-sm sm:text-base font-medium">
                Let's continue to build a stronger, kinder and more vibrant Puthuponnani.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <button
                onClick={onOpenRegisterDonor}
                className="bg-white text-[#00386e] hover:bg-sky-50 font-black px-7 py-3 rounded-full text-sm shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                id="cta-join-us-today-btn"
              >
                <span>Join Us Today</span>
                <ArrowRight className="w-4 h-4 text-[#0072ce]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
