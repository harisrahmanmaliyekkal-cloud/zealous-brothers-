import React, { useState } from 'react';
import { 
  PhoneCall, 
  MapPin, 
  PlusCircle, 
  Search, 
  UserCheck, 
  ShieldCheck, 
  Clock, 
  AlertCircle,
  Info,
  Heart
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { BloodGroup } from '../types';

interface BloodWingProps {
  onOpenRegisterModal: () => void;
}

const EMERGENCY_CONTACTS = [
  {
    id: 'c1',
    name: 'Muhammed Haris',
    role: 'Chief Blood Wing Coordinator',
    phone: '+91 98470 12345',
    zone: 'Puthuponnani & Ponnani Taluk',
    available: '24/7 Priority'
  },
  {
    id: 'c2',
    name: 'Suhail Rahman',
    role: 'Regional Hospital Liaison',
    phone: '+91 94471 99887',
    zone: 'Edappal & Kuttippuram Hospitals',
    available: '24/7 Priority'
  },
  {
    id: 'c3',
    name: 'Arjun K. V.',
    role: 'Emergency Volunteer Dispatch',
    phone: '+91 97455 43210',
    zone: 'Tirur & Malappuram Trauma Line',
    available: '24/7 Priority'
  }
];

export const BloodWing: React.FC<BloodWingProps> = ({ onOpenRegisterModal }) => {
  const { donors, loadingDonors } = useClub();
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup | 'All'>('All');
  const [locationSearch, setLocationSearch] = useState('');

  const bloodGroups: (BloodGroup | 'All')[] = [
    'All', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'
  ];

  const filteredDonors = donors.filter((donor) => {
    const matchesGroup = selectedGroup === 'All' || donor.bloodGroup === selectedGroup;
    const matchesLocation =
      locationSearch.trim() === '' ||
      donor.location.toLowerCase().includes(locationSearch.toLowerCase()) ||
      donor.name.toLowerCase().includes(locationSearch.toLowerCase());
    return matchesGroup && matchesLocation;
  });

  return (
    <section id="blood-wing" className="py-20 bg-[#001733] text-white relative overflow-hidden border-b border-[#00386e]">
      
      {/* Visual background accents */}
      <div className="absolute -top-40 right-0 w-96 h-96 bg-[#0072ce]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#002b5c] border border-sky-400/40 text-sky-200 text-xs font-bold uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
            ZB Care Blood Wing • 24/7 രക്തദാന സേന
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Give the Gift of Life: ZB Care Blood Wing
          </h2>
          <p className="text-base sm:text-lg text-sky-100/80 leading-relaxed">
            Whenever a patient in Puthuponnani or regional hospitals needs blood, our voluntary brotherhood mobilizes within minutes. Join our donor registry or search available donors below.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={onOpenRegisterModal}
              className="px-6 py-3.5 rounded-xl bg-[#0072ce] hover:bg-[#005bb5] text-white font-bold text-sm transition shadow-xl shadow-sky-950/60 flex items-center gap-2 cursor-pointer border border-sky-400/30"
              id="bloodwing-register-hero-btn"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Register as a Blood Donor Now</span>
            </button>
            <a
              href="#emergency-hotlines"
              className="px-6 py-3.5 rounded-xl bg-[#002244] hover:bg-[#002b5c] text-white border border-sky-500/30 font-bold text-sm transition flex items-center gap-2"
            >
              <PhoneCall className="w-5 h-5 text-sky-300" />
              <span>Emergency Coordinator Numbers</span>
            </a>
          </div>
        </div>

        {/* 24/7 Emergency Coordinators Call Center Cards */}
        <div id="emergency-hotlines" className="mb-16 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#00386e] pb-3">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-sky-400" />
                Emergency Blood Helpline Coordinators (Puthuponnani)
              </h3>
              <p className="text-xs text-sky-200/70 mt-0.5">
                Reach out immediately for accident cases, delivery emergencies, or hospital platelet needs.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full">
              ● All lines active 24/7
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EMERGENCY_CONTACTS.map((contact) => (
              <div
                key={contact.id}
                className="rounded-3xl bg-[#002244] p-6 border border-sky-500/30 shadow-xl hover:border-sky-400/60 transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white">{contact.name}</h4>
                      <p className="text-xs text-sky-300 font-semibold">{contact.role}</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#001733] text-sky-200 border border-sky-500/40">
                      {contact.available}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-sky-200/70">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>Coverage: {contact.zone}</span>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-[#00386e] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-sky-300 uppercase font-semibold">Direct Helpline</div>
                    <div className="text-sm font-black text-white">{contact.phone}</div>
                  </div>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="px-4 py-2 bg-[#0072ce] hover:bg-[#005bb5] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Registered Donors Directory Section */}
        <div className="bg-[#002244] rounded-3xl p-6 sm:p-8 border border-sky-500/30 shadow-2xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-sky-300 text-xs font-bold uppercase tracking-wider mb-1">
                <UserCheck className="w-4 h-4 text-sky-400" />
                Verified Community Registry
              </div>
              <h3 className="text-2xl font-bold text-white">Find a Blood Donor Near You</h3>
              <p className="text-xs text-sky-200/70 mt-1">
                Directly connect with registered brotherhood donors in Puthuponnani and nearby regions.
              </p>
            </div>

            <button
              onClick={onOpenRegisterModal}
              className="px-4 py-2.5 rounded-xl bg-[#0072ce] hover:bg-[#005bb5] text-white font-bold text-xs transition flex items-center gap-2 self-start md:self-auto shadow-md cursor-pointer border border-white/20"
              id="join-donor-btn-section"
            >
              <PlusCircle className="w-4 h-4" />
              Add My Name as Donor
            </button>
          </div>

          {/* Filters Bar */}
          <div className="space-y-4">
            {/* Blood group selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-sky-200 uppercase tracking-wide">
                Select Blood Group:
              </label>
              <div className="flex flex-wrap gap-2">
                {bloodGroups.map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setSelectedGroup(bg)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                      selectedGroup === bg
                        ? 'bg-[#0072ce] text-white ring-2 ring-sky-300 shadow-md'
                        : 'bg-[#001733] text-sky-200 hover:bg-[#002b5c] hover:text-white border border-sky-500/30'
                    }`}
                  >
                    {bg === 'All' ? 'All Blood Groups' : bg}
                  </button>
                ))}
              </div>
            </div>

            {/* Location search input */}
            <div className="relative">
              <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                placeholder="Search by location (e.g., Puthuponnani, Kadavanad, Hospital Road) or donor name..."
                className="w-full pl-10 pr-4 py-3 bg-[#001733] border border-sky-500/40 rounded-xl text-xs text-white placeholder-sky-200/40 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition"
              />
              {locationSearch && (
                <button
                  onClick={() => setLocationSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-sky-300 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Donors Cards List */}
          {loadingDonors ? (
            <div className="py-12 text-center text-sky-300 animate-pulse text-sm">
              Loading verified donor database...
            </div>
          ) : filteredDonors.length === 0 ? (
            <div className="py-12 text-center bg-[#001733] rounded-2xl border border-sky-500/30 p-8 space-y-3">
              <AlertCircle className="w-10 h-10 text-sky-400 mx-auto" />
              <h4 className="text-base font-bold text-white">No donors found matching your search</h4>
              <p className="text-xs text-sky-200/70 max-w-md mx-auto">
                No donors currently matched for blood group <strong>{selectedGroup}</strong> in that specific location. Please contact our 24/7 helpline coordinators directly!
              </p>
              <div className="pt-2">
                <a
                  href="tel:+919847012345"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0072ce] hover:bg-[#005bb5] text-white rounded-xl text-xs font-bold shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  Call Emergency Coordinator (+91 98470 12345)
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredDonors.map((donor) => (
                <div
                  key={donor.id}
                  className="rounded-2xl bg-[#001733] border border-sky-500/30 p-5 hover:border-sky-400 transition-all flex flex-col justify-between space-y-4 group"
                  id={`donor-card-${donor.id}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      {/* Blood Group Badge */}
                      <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 font-black text-xl shadow-inner group-hover:bg-red-600 group-hover:text-white transition-colors">
                        {donor.bloodGroup}
                      </div>
                      
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        donor.isAvailable !== false
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {donor.isAvailable !== false ? 'Available' : 'On Interval'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white truncate">{donor.name}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-sky-200/70 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="truncate">{donor.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#00386e] flex items-center justify-between">
                    <div className="text-[11px] text-sky-200/80 font-mono">
                      {donor.phone}
                    </div>
                    <a
                      href={`tel:${donor.phone.replace(/\s+/g, '')}`}
                      className="px-3 py-1.5 bg-[#0072ce] hover:bg-[#005bb5] text-white rounded-lg text-xs font-bold flex items-center gap-1 transition shadow-sm"
                      title="Direct Call"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>Dial</span>
                    </a>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Eligibility Criteria Note */}
          <div className="p-4 rounded-2xl bg-[#001733] border border-sky-500/30 flex items-start gap-3 text-xs text-sky-200/80">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Donor Eligibility Guidelines:</strong> Must be between 18 to 60 years old, weighing at least 45kg, with a minimum 90-day gap since last whole blood donation.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
