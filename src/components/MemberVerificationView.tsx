import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  ArrowLeft, 
  Calendar, 
  Phone, 
  Droplet, 
  MapPin, 
  ExternalLink,
  Award,
  Download,
  Share2,
  Clock,
  Building2,
  Sparkles
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { ClubMember } from '../types';
import { ClubLogo } from './ClubLogo';
import { MemberIdCardModal } from './MemberIdCardModal';

interface MemberVerificationViewProps {
  initialMemberId?: string;
  onBackToHome: () => void;
}

export const MemberVerificationView: React.FC<MemberVerificationViewProps> = ({
  initialMemberId = '',
  onBackToHome
}) => {
  const { members, getMemberById, showToast } = useClub();
  const [searchQuery, setSearchQuery] = useState(initialMemberId);
  const [selectedMember, setSelectedMember] = useState<ClubMember | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);

  useEffect(() => {
    if (initialMemberId) {
      setSearchQuery(initialMemberId);
      const found = getMemberById(initialMemberId);
      setSelectedMember(found || null);
      setHasSearched(true);
    } else if (members.length > 0 && !hasSearched) {
      // If no initial ID provided, show the first member as preview
      setSelectedMember(members[0]);
    }
  }, [initialMemberId, members]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = getMemberById(searchQuery.trim());
    setSelectedMember(found || null);
    setHasSearched(true);
  };

  const verificationTimestamp = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col selection:bg-[#0072ce] selection:text-white">
      
      {/* Top Header Bar */}
      <header className="bg-[#001733] border-b border-sky-500/30 sticky top-0 z-40 px-4 sm:px-8 py-3.5 shadow-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2 rounded-xl bg-slate-800 hover:bg-[#0072ce] text-sky-200 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-slate-700 hover:border-sky-400"
              title="Return to Main Portal"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Home Portal</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0072ce] p-1 flex items-center justify-center text-white border border-white/20">
                <ClubLogo variant="emblem" theme="transparent-white" size={28} />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-black text-white leading-tight">
                  ZEALOUS BROTHERS
                </h1>
                <p className="text-[10px] text-sky-200/70 leading-none">
                  Public Membership Verification Authority • Puthuponnani
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              Official Verification Portal
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 space-y-6">
        
        {/* Search & Lookup Bar */}
        <div className="bg-[#001b3a] p-4 sm:p-6 rounded-3xl border border-sky-500/30 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                <span>അംഗത്വ പരിശോധന (Member Verification)</span>
              </h2>
              <p className="text-xs text-sky-200/70 mt-0.5">
                Scan ID Card QR Code or enter Member Identification Number (e.g. ZB-1994-001)
              </p>
            </div>
            
            <div className="text-[10px] sm:text-xs text-sky-300/80 font-mono bg-[#001226] px-3 py-1.5 rounded-xl border border-sky-500/20">
              Govt. Reg. No: 126/95 | NYK: 429/96
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Member ID (e.g. ZB-1994-001) or Member Name..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#001226] border border-sky-500/40 rounded-xl text-sm text-white placeholder-sky-200/40 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                id="member-verification-search-input"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0072ce] hover:bg-sky-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition flex items-center gap-1.5 cursor-pointer"
              id="member-verification-search-btn"
            >
              <Search className="w-4 h-4" />
              <span>Verify (പരിശോധിക്കുക)</span>
            </button>
          </form>
        </div>

        {/* Verification Result Card */}
        {selectedMember ? (
          <div className="bg-[#001733] border-2 border-emerald-500/50 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Top Verified Header Status */}
            <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Authenticity Confirmed
                  </div>
                  <h3 className="text-base sm:text-lg font-black tracking-wide">
                    VERIFIED OFFICIAL MEMBER OF ZEALOUS BROTHERS
                  </h3>
                </div>
              </div>

              <div className="text-right text-xs text-emerald-100 bg-black/20 px-3 py-1.5 rounded-xl border border-white/20">
                <div className="font-mono font-bold text-white">{selectedMember.memberId}</div>
                <div className="text-[10px] opacity-80">Verified on {verificationTimestamp}</div>
              </div>
            </div>

            {/* Member Profile Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Photo & Role Section */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-2xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-slate-950 relative flex items-center justify-center">
                  {selectedMember.photoUrl ? (
                    <img
                      src={selectedMember.photoUrl}
                      alt={selectedMember.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0072ce] to-[#002244] flex items-center justify-center text-white text-5xl font-black">
                      {selectedMember.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <span className="inline-block px-3 py-1 rounded-lg bg-[#0072ce] text-white text-xs font-bold uppercase tracking-wider shadow">
                    {selectedMember.role}
                  </span>
                  <div className="text-xs text-emerald-400 font-semibold mt-1 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Status: Active & Accredited</span>
                  </div>
                </div>
              </div>

              {/* Personal Credentials */}
              <div className="md:col-span-2 space-y-4 text-left">
                <div>
                  <div className="text-xs text-sky-300/80 font-bold uppercase tracking-wider">
                    Member Name
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                    {selectedMember.name}
                  </h2>
                  <p className="text-xs text-sky-200/70 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>{selectedMember.address ? `${selectedMember.address}, ` : ''}{selectedMember.locality || 'Puthuponnani, Malappuram Dt, Kerala'}</span>
                  </p>
                </div>

                {/* Detail Blocks */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-2xl bg-[#002244] border border-sky-500/30">
                    <span className="block text-[10px] text-sky-300 font-bold uppercase flex items-center gap-1">
                      <Droplet className="w-3 h-3 text-red-400" />
                      Blood Group
                    </span>
                    <span className="text-base font-black text-red-400 font-mono mt-0.5 block">
                      {selectedMember.bloodGroup}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#002244] border border-sky-500/30">
                    <span className="block text-[10px] text-sky-300 font-bold uppercase flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-sky-400" />
                      Member Since
                    </span>
                    <span className="text-base font-bold text-white mt-0.5 block">
                      {selectedMember.joiningDate || '1994'}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#002244] border border-sky-500/30 col-span-2 sm:col-span-1">
                    <span className="block text-[10px] text-sky-300 font-bold uppercase flex items-center gap-1">
                      <Phone className="w-3 h-3 text-emerald-400" />
                      Official Phone
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200 font-mono mt-0.5 block truncate">
                      {selectedMember.phone}
                    </span>
                  </div>
                </div>

                {/* Organization Certification Statement */}
                <div className="p-3.5 rounded-2xl bg-[#00142b] border border-sky-500/20 text-xs text-sky-200/80 leading-relaxed">
                  <strong className="text-white">സെലസ് ബ്രദേഴ്സ് അംഗീകൃത സർട്ടിഫിക്കറ്റ്:</strong> ഈ വ്യക്തി സെലസ് ബ്രദേഴ്സ് കലാ സാംസ്കാരിക വേദി പുതുപൊന്നാനിയുടെ നിയമപരമായ അംഗത്വ രജിസ്റ്ററിൽ രേഖപ്പെടുത്തിയിട്ടുള്ള ഔദ്യോഗിക അംഗമാണെന്ന് സാക്ഷ്യപ്പെടുത്തുന്നു.
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsIdModalOpen(true)}
                    className="px-4 py-2.5 bg-[#0072ce] hover:bg-sky-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-sky-950/50 transition flex items-center gap-2 cursor-pointer"
                    id="verification-view-id-card-btn"
                  >
                    <Award className="w-4 h-4" />
                    <span>View & Download ID Card (ഡിജിറ്റൽ കാർഡ് കാണുക)</span>
                  </button>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Verified Member of ZEALOUS BROTHERS: ${selectedMember.name} (${selectedMember.memberId}) - ${window.location.href}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Verification</span>
                  </a>
                </div>

              </div>

            </div>

            {/* Verification Footer credentials */}
            <div className="px-6 py-3.5 bg-[#001024] border-t border-sky-500/20 flex flex-wrap items-center justify-between text-[11px] text-sky-300/70 gap-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Zealous Brothers Headquarters, Puthuponnani, Ponnani, Malappuram - 679586</span>
              </div>
              <div className="font-mono text-emerald-400">
                SSL CERTIFIED • RECORD AUTHENTICATED
              </div>
            </div>

          </div>
        ) : hasSearched ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#001733] border border-red-500/40 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-red-950/80 text-red-400 flex items-center justify-center mx-auto border border-red-500/50">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">അംഗത്വ രേഖ കണ്ടെത്താനായില്ല (Record Not Found)</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                No verified member found matching identification "{searchQuery}". Please verify the Member ID or contact the Zealous Brothers office.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition"
              >
                Clear Search
              </button>
            </div>
          </div>
        ) : null}

        {/* Directory List of Members (Quick Click to Verify) */}
        {members.length > 0 && (
          <div className="bg-[#001b3a] p-5 sm:p-6 rounded-3xl border border-sky-500/30 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Club Members Directory ({members.length})</span>
              <span className="text-xs text-sky-300 font-normal">Click any member to verify</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {members.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMember(m);
                    setSearchQuery(m.memberId);
                    setHasSearched(true);
                  }}
                  className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                    selectedMember?.id === m.id
                      ? 'bg-[#0072ce]/30 border-sky-400 ring-1 ring-sky-400'
                      : 'bg-[#001226] border-sky-900/50 hover:border-sky-500/50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-amber-400/80 shrink-0 flex items-center justify-center text-white font-bold">
                    {m.photoUrl ? (
                      <img src={m.photoUrl} alt={m.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    ) : (
                      m.name.charAt(0)
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate">{m.name}</div>
                    <div className="text-[10px] text-sky-300/80 truncate flex items-center gap-1.5">
                      <span className="font-mono text-amber-300">{m.memberId}</span>
                      <span>•</span>
                      <span>{m.role}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ID Card Modal */}
      {selectedMember && (
        <MemberIdCardModal
          isOpen={isIdModalOpen}
          onClose={() => setIsIdModalOpen(false)}
          member={selectedMember}
        />
      )}

      {/* Footer */}
      <footer className="bg-[#001226] border-t border-sky-900/50 py-6 px-4 text-center text-xs text-sky-200/60 mt-auto">
        <p>സെലസ് ബ്രദേഴ്സ് കലാ സാംസ്കാരിക വേദി പുതുപൊന്നാനി (ZEALOUS BROTHERS)</p>
        <p className="text-[10px] text-sky-300/40 mt-1">
          Estd. 1994 • Govt. Reg. No. 126/95 • Affiliated to Nehru Yuva Kendra Malappuram No. 429/96
        </p>
      </footer>
    </div>
  );
};
