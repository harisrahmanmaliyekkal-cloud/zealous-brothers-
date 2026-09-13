import React from 'react';
import { 
  Trophy, 
  Heart, 
  Sparkles, 
  Users, 
  Target, 
  Compass, 
  ShieldCheck, 
  Clock,
  BookOpen,
  Flame,
  Feather,
  Award
} from 'lucide-react';
import { ClubLogo } from './ClubLogo';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Trophy,
      title: 'Sports & Youth Athletics',
      description: 'Organizing the prestigious All-Kerala 7s Football Championship and youth athletic camps in Puthuponnani, nurturing teamwork, discipline, and healthy recreation.',
      accent: 'border-sky-500/30 text-[#0072ce] bg-sky-50'
    },
    {
      icon: Heart,
      title: '24/7 ZB Care Blood Wing',
      description: 'Maintaining a round-the-clock voluntary blood donor dispatch network connecting Puthuponnani and regional hospitals to save precious lives during critical emergencies.',
      accent: 'border-red-500/30 text-red-600 bg-red-50'
    },
    {
      icon: BookOpen,
      title: 'Akshara Jyothi Educational Aid',
      description: 'Empowering children by distributing school kits, textbooks, uniforms, and merit awards every academic year to ensure educational continuity for underprivileged families.',
      accent: 'border-blue-500/30 text-blue-700 bg-blue-50'
    },
    {
      icon: Sparkles,
      title: 'Arts & Cultural Heritage (കലാ സാംസ്കാരികം)',
      description: 'Preserving Kerala’s artistic legacy through Sargotsav youth festivals, drama, folk music, debate forums, and the annual club souvenir magazine publication.',
      accent: 'border-indigo-500/30 text-indigo-600 bg-indigo-50'
    }
  ];

  const emblemSymbols = [
    {
      title: 'The Flaming Torch',
      malayalam: 'അറിവിന്റെ ദീപശിഖ',
      desc: 'Symbolizes enlightenment, wisdom, and social awakening guiding our youth to banish ignorance and lead community progress.'
    },
    {
      title: 'The Wings of Zeal',
      malayalam: 'ചിറകുകൾ',
      desc: 'Embodies fraternal unity, relentless aspiration, and rising above barriers to support every neighbor in need.'
    },
    {
      title: 'The Football',
      malayalam: 'കായിക പ്രതിബദ്ധത',
      desc: 'Celebrates Puthuponnani’s deep-rooted passion for football, promoting athletic fitness, sportsmanship, and youthful vigor.'
    },
    {
      title: 'The Fountain Pen Nib',
      malayalam: 'സാഹിത്യവും സംസ്കാരവും',
      desc: 'Reflects literary excellence, creative cultural expression, and our commitment to educational upliftment (Reg: 126/95, 429/96).'
    }
  ];

  const milestones = [
    { year: '1995-96', title: 'Registration & Inception', desc: 'Officially registered under Societies Registration Act (Reg No: 126/95, 429/96) in Puthuponnani.' },
    { year: '2005', title: '7s Football Championship Inaugurated', desc: 'Launched the signature annual floodlit tournament drawing clubs from across Malabar and Kerala.' },
    { year: '2016', title: 'ZB Care Blood Wing Formalized', desc: 'Centralized 24/7 donor database dispatch assisting government and private hospitals around the clock.' },
    { year: '2026', title: '30+ Years of Glorious Community Service', desc: 'Over three decades of unbroken service, cultural festivals, and compassionate youth welfare.' },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-[#0072ce] text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            Who We Are • നമ്മുടെ ചരിത്രം
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Rooted in Brotherhood, Powered by Purpose
          </h2>
          <div className="text-lg font-bold text-[#0072ce]">
            സെലസ് ബ്രദേഴ്സ് കലാ സാംസ്കാരിക വേദി പുതുപൊന്നാനി
          </div>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            ZEALOUS BROTHERS is a premier registered socio-cultural and youth organization (Reg No: 126/95, 429/96) based in Puthuponnani, dedicated to youth athletics, humanitarian healthcare, educational patronage, and arts.
          </p>
        </div>

        {/* Official Insignia & Heritage Showcase */}
        <div className="mb-16 p-8 rounded-3xl bg-[#002244] text-white border-2 border-sky-500/30 shadow-xl overflow-hidden relative">
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#0072ce] rounded-full blur-3xl opacity-30 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: The Official Vector Logo */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-[260px] bg-[#0072ce] rounded-2xl p-5 shadow-2xl border border-white/20">
                <ClubLogo variant="full" theme="transparent-white" size="100%" showRegNo={true} />
              </div>
            </div>

            {/* Right: Symbolism Explained */}
            <div className="lg:col-span-8 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Official Insignia Breakdown</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  The Meaning Behind Our Club Emblem
                </h3>
                <p className="text-sm text-sky-100/90 leading-relaxed">
                  Every element of the Zealous Brothers emblem represents the pillars on which our founders built this enduring institution in Puthuponnani.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {emblemSymbols.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/5 border border-sky-500/20 backdrop-blur-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <span className="text-[11px] font-bold text-sky-300">{item.malayalam}</span>
                    </div>
                    <p className="text-xs text-sky-100/80 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-sky-200">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>Government Registered: Reg No 126/95 & 429/96</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>Headquarters: Puthuponnani, Malappuram, Kerala</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Vision Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0072ce] text-white flex items-center justify-center shadow-md shadow-sky-900/20">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To nurture an empowered, cohesive, and socially conscious generation in Puthuponnani that stands united across all divides, championing public health, education, cultural richness, athletic achievement, and selfless humanitarian welfare.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <ShieldCheck className="w-4 h-4 text-[#0072ce]" />
              <span>Guided by brotherhood, integrity, and volunteer dedication.</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#002244] text-white flex items-center justify-center shadow-md">
              <Target className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To guarantee swift 24/7 blood donation response during hospital crises, conduct state-level sports competitions, support every deserving student through Akshara Jyothi educational aid, and celebrate local cultural arts and literature.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Clock className="w-4 h-4 text-[#0072ce]" />
              <span>Active 365 days a year across Puthuponnani and regional zones.</span>
            </div>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="space-y-6 mb-16">
          <div className="text-center">
            <h3 className="text-2xl font-black text-slate-900">Our Core Activities & Focus Areas</h3>
            <p className="text-sm text-slate-500 mt-1">Four main branches driving our year-round grassroots impact</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-300 transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${p.accent}`}>
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{p.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline / Journey banner */}
        <div className="p-8 rounded-3xl bg-[#002244] text-white border border-sky-900 shadow-xl">
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h4 className="text-xl font-bold text-white">Our 30-Year Milestones in Puthuponnani</h4>
              <p className="text-xs text-sky-200">From humble beginnings to an institutional pillar of social welfare</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#0072ce] text-white text-xs font-bold shadow-sm">
              100% Volunteer Driven
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="border-l-2 border-[#0072ce] pl-4 space-y-1">
                <span className="text-xs font-black text-sky-400 tracking-wider uppercase">{m.year}</span>
                <h5 className="text-sm font-bold text-white">{m.title}</h5>
                <p className="text-xs text-sky-100/70 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
