import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Mail, 
  X, 
  LogOut, 
  Users, 
  Calendar, 
  Plus, 
  Search, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink, 
  Phone, 
  MapPin, 
  Download, 
  Sparkles,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
  CreditCard,
  BookOpen
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { BloodGroup, ProgramCategory, ProgramStatus } from '../types';
import { ClubLogo } from './ClubLogo';
import { MemberManagement } from './MemberManagement';
import { MagazineManagement } from './MagazineManagement';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVerification?: (memberId: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, onOpenVerification }) => {
  const { 
    isAdmin, 
    adminUserEmail, 
    loginAdmin, 
    logoutAdmin,
    members,
    donors,
    deleteDonor,
    toggleDonorAvailability,
    addDonor,
    programs,
    addProgram,
    deleteProgram,
    updateProgramStatus,
    magazines,
    customLogoUrl,
    heroBannerUrl,
    uploadHeroBanner,
    resetHeroBanner,
    openLogoUploadModal,
    resetCustomLogo
  } = useClub();

  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Tab State
  const [activeTab, setActiveTab] = useState<'members' | 'donors' | 'programs' | 'add-program' | 'magazines' | 'branding'>('members');

  // Donor Search & Filter
  const [donorSearch, setDonorSearch] = useState('');
  const [donorBloodFilter, setDonorBloodFilter] = useState<string>('All');

  // Program Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProgramCategory>('Sports');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newVenue, setNewVenue] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStatus, setNewStatus] = useState<ProgramStatus>('Upcoming');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newOrganizerContact, setNewOrganizerContact] = useState('+91 98470 12345');
  const [isPublishingProgram, setIsPublishingProgram] = useState(false);
  const [programFormSuccess, setProgramFormSuccess] = useState(false);

  // Manual Donor Add Form
  const [showAddDonorModal, setShowAddDonorModal] = useState(false);
  const [manualDonorName, setManualDonorName] = useState('');
  const [manualDonorBg, setManualDonorBg] = useState<BloodGroup>('O+');
  const [manualDonorPhone, setManualDonorPhone] = useState('');
  const [manualDonorLocation, setManualDonorLocation] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);
    const res = await loginAdmin(email, password);
    setIsLoggingIn(false);
    if (!res.success) {
      setAuthError(res.error || 'Authentication failed');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@zealousbrothers.org');
    setPassword('admin123');
    setAuthError('');
  };

  const handlePublishProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate || !newVenue.trim() || !newDescription.trim()) {
      alert('Please fill out all required fields for the club program.');
      return;
    }

    setIsPublishingProgram(true);
    const res = await addProgram({
      title: newTitle.trim(),
      category: newCategory,
      date: newDate,
      time: newTime.trim() || undefined,
      venue: newVenue.trim(),
      description: newDescription.trim(),
      status: newStatus,
      imageUrl: newImageUrl.trim() || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      organizerContact: newOrganizerContact.trim()
    });
    setIsPublishingProgram(false);

    if (res.success) {
      setProgramFormSuccess(true);
      setTimeout(() => {
        setProgramFormSuccess(false);
        setActiveTab('programs');
        // Reset form
        setNewTitle('');
        setNewDate('');
        setNewTime('');
        setNewVenue('');
        setNewDescription('');
        setNewImageUrl('');
      }, 1500);
    } else {
      alert(res.error || 'Failed to publish program');
    }
  };

  const handleManualAddDonor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualDonorName || !manualDonorPhone || !manualDonorLocation) {
      alert('Please enter name, phone, and location.');
      return;
    }
    await addDonor({
      name: manualDonorName.trim(),
      bloodGroup: manualDonorBg,
      phone: manualDonorPhone.trim(),
      location: manualDonorLocation.trim(),
      isAvailable: true
    });
    setShowAddDonorModal(false);
    setManualDonorName('');
    setManualDonorPhone('');
    setManualDonorLocation('');
  };

  const exportDonorsCSV = () => {
    const headers = ['Name', 'Blood Group', 'Phone', 'Location', 'Available', 'Registered At'];
    const rows = donors.map(d => [
      `"${d.name}"`,
      `"${d.bloodGroup}"`,
      `"${d.phone}"`,
      `"${d.location}"`,
      d.isAvailable !== false ? 'Yes' : 'No',
      `"${d.registeredAt || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Zealous_Puthuponnani_Donors_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Donors for table
  const filteredDonors = donors.filter((d) => {
    const matchesGroup = donorBloodFilter === 'All' || d.bloodGroup === donorBloodFilter;
    const matchesSearch =
      donorSearch === '' ||
      d.name.toLowerCase().includes(donorSearch.toLowerCase()) ||
      d.phone.includes(donorSearch) ||
      d.location.toLowerCase().includes(donorSearch.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#001733]/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#001733] rounded-3xl max-w-5xl w-full border border-sky-500/30 text-white shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-[#002244] border-b border-[#00386e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0072ce] flex items-center justify-center text-white shadow-md shadow-sky-950/50 p-1 border border-white/20">
              <ClubLogo variant="emblem" theme="transparent-white" size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">ZEALOUS BROTHERS</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0072ce] text-white border border-sky-400/40 uppercase">
                  Admin Console
                </span>
              </div>
              <p className="text-xs text-sky-200/70">
                {isAdmin ? `Authenticated: ${adminUserEmail}` : 'Protected Organization Management Access • Puthuponnani'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 bg-[#001733] hover:bg-red-900/40 text-sky-200 hover:text-red-300 rounded-xl text-xs font-semibold transition border border-sky-500/30 flex items-center gap-1.5 cursor-pointer"
                id="admin-panel-logout-btn"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-sky-200 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Logged In View: Login Form */}
        {!isAdmin ? (
          <div className="p-6 sm:p-10 flex-1 flex items-center justify-center bg-[#001733]">
            <div className="max-w-md w-full space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-[#002244] border border-sky-500/40 text-[#0072ce] flex items-center justify-center mx-auto shadow-xl p-2">
                  <ClubLogo variant="emblem" theme="royal-blue" size={48} />
                </div>
                <h4 className="text-2xl font-black text-white">Administrator Login</h4>
                <p className="text-xs text-sky-200/70">
                  Authenticate with club credentials to manage blood donors and publish official club programs for Zealous Brothers Puthuponnani.
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sky-200 uppercase tracking-wide flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    Admin Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@zealousbrothers.org"
                    className="w-full px-4 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 placeholder-sky-200/30"
                    id="admin-email-input"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sky-200 uppercase tracking-wide flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-sky-400" />
                    Security Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 placeholder-sky-200/30"
                    id="admin-password-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 bg-[#0072ce] hover:bg-[#005bb5] disabled:opacity-50 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-sky-950/60 cursor-pointer border border-sky-400/30"
                  id="admin-submit-login-btn"
                >
                  {isLoggingIn ? 'Verifying Credentials...' : 'Sign In to Admin Dashboard'}
                </button>
              </form>

              {/* Demo Credentials Quick Fill Banner */}
              <div className="p-4 rounded-2xl bg-[#002244] border border-sky-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    Pre-configured Admin Access:
                  </span>
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="text-sky-300 hover:text-white font-bold underline cursor-pointer"
                    id="fill-demo-credentials-btn"
                  >
                    Quick Auto-Fill
                  </button>
                </div>
                <div className="text-sky-200/80 font-mono text-[11px] space-y-0.5">
                  <div>Email: <strong className="text-white">admin@zealousbrothers.org</strong></div>
                  <div>Password: <strong className="text-white">admin123</strong></div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Logged In Admin Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top Stats Overview */}
            <div className="p-4 sm:p-6 bg-[#002244] border-b border-[#00386e] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#001733] border border-sky-500/30">
                <div className="text-xs text-sky-200/70 font-medium">Club Members & IDs</div>
                <div className="text-xl font-black text-amber-300 mt-0.5 flex items-center justify-between">
                  <span>{members.length}</span>
                  <span className="text-[10px] font-mono font-normal text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">Active</span>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#001733] border border-sky-500/30">
                <div className="text-xs text-sky-200/70 font-medium">Registered Donors</div>
                <div className="text-xl font-black text-white mt-0.5">{donors.length}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#001733] border border-sky-500/30">
                <div className="text-xs text-sky-200/70 font-medium">Available Donors</div>
                <div className="text-xl font-black text-emerald-400 mt-0.5">
                  {donors.filter(d => d.isAvailable !== false).length}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#001733] border border-sky-500/30">
                <div className="text-xs text-sky-200/70 font-medium">Club Programs</div>
                <div className="text-xl font-black text-sky-300 mt-0.5">{programs.length}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#001733] border border-sky-500/30 col-span-2 sm:col-span-1">
                <div className="text-xs text-sky-200/70 font-medium">Club Magazines</div>
                <div className="text-xl font-black text-white mt-0.5 flex items-center justify-between">
                  <span>{magazines.length}</span>
                  <span className="text-[10px] font-mono text-sky-300 bg-sky-950 px-2 py-0.5 rounded">Souvenirs</span>
                </div>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="px-4 sm:px-6 bg-[#002244] border-b border-[#00386e] flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('members')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'members'
                    ? 'border-sky-400 text-white'
                    : 'border-transparent text-sky-200/70 hover:text-white'
                }`}
                id="admin-tab-members"
              >
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Members & ID Card Generator ({members.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('donors')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'donors'
                    ? 'border-sky-400 text-white'
                    : 'border-transparent text-sky-200/70 hover:text-white'
                }`}
                id="admin-tab-donors"
              >
                <Users className="w-4 h-4 text-sky-400" />
                <span>Manage Blood Donors ({donors.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('programs')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'programs'
                    ? 'border-sky-400 text-white'
                    : 'border-transparent text-sky-200/70 hover:text-white'
                }`}
                id="admin-tab-programs"
              >
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>Programs & Announcements ({programs.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('add-program')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'add-program'
                    ? 'border-sky-400 text-white'
                    : 'border-transparent text-sky-200/70 hover:text-white'
                }`}
                id="admin-tab-add-program"
              >
                <Plus className="w-4 h-4 text-sky-400" />
                <span>+ Create New Program</span>
              </button>

              <button
                onClick={() => setActiveTab('magazines')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'magazines'
                    ? 'border-sky-400 text-white'
                    : 'border-transparent text-sky-200/70 hover:text-white'
                }`}
                id="admin-tab-magazines"
              >
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>Upload Magazine (മാഗസിൻ അപ്‌ലോഡ്) ({magazines.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('branding')}
                className={`py-3.5 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'branding'
                    ? 'border-sky-400 text-white'
                    : 'border-transparent text-sky-200/70 hover:text-white'
                }`}
                id="admin-tab-branding"
              >
                <Upload className="w-4 h-4 text-sky-400" />
                <span>Logo & Branding (ഔദ്യോഗിക ലോഗോ)</span>
              </button>
            </div>

            {/* Tab 0: Membership Management & ID Card Generator */}
            {activeTab === 'members' && (
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#001733]">
                <MemberManagement onOpenVerification={onOpenVerification} />
              </div>
            )}

            {/* Tab 1: Blood Donor Management */}
            {activeTab === 'donors' && (
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-[#001733]">
                
                {/* Search & Actions Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex flex-1 items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={donorSearch}
                        onChange={(e) => setDonorSearch(e.target.value)}
                        placeholder="Search donor by name, phone, or location..."
                        className="w-full pl-9 pr-3 py-2 bg-[#002244] border border-sky-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                        id="admin-donor-search-input"
                      />
                    </div>

                    <select
                      value={donorBloodFilter}
                      onChange={(e) => setDonorBloodFilter(e.target.value)}
                      className="px-3 py-2 bg-[#002244] border border-sky-500/30 rounded-xl text-xs text-white font-bold focus:outline-none"
                    >
                      <option value="All">All Blood Groups</option>
                      {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={exportDonorsCSV}
                      className="px-3.5 py-2 bg-[#002244] hover:bg-[#002b5c] border border-sky-500/30 rounded-xl text-xs font-bold text-sky-200 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-400" />
                      Export CSV
                    </button>
                    <button
                      onClick={() => setShowAddDonorModal(true)}
                      className="px-4 py-2 bg-[#0072ce] hover:bg-[#005bb5] rounded-xl text-xs font-bold text-white transition flex items-center gap-1.5 shadow-md cursor-pointer border border-sky-400/30"
                      id="admin-add-donor-btn"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Donor
                    </button>
                  </div>
                </div>

                {/* Donors Data Table */}
                <div className="bg-[#002244] rounded-2xl border border-sky-500/30 overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-sky-100">
                      <thead className="bg-[#001733] text-sky-300 font-bold uppercase tracking-wider border-b border-[#00386e]">
                        <tr>
                          <th className="px-4 py-3">Donor Name</th>
                          <th className="px-4 py-3">Group</th>
                          <th className="px-4 py-3">Phone</th>
                          <th className="px-4 py-3">Location</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#00386e]/60">
                        {filteredDonors.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-sky-300/60">
                              No donor records found matching this criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredDonors.map((donor) => (
                            <tr key={donor.id} className="hover:bg-white/5 transition">
                              <td className="px-4 py-3 font-semibold text-white flex items-center gap-2">
                                <span>{donor.name}</span>
                                {donor.age && <span className="text-[10px] text-sky-300/70 font-normal">({donor.age} yrs)</span>}
                              </td>
                              <td className="px-4 py-3">
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-red-950/80 text-red-400 border border-red-800">
                                  {donor.bloodGroup}
                                </span>
                              </td>
                              <td className="px-4 py-3 font-mono text-sky-100">
                                <a href={`tel:${donor.phone}`} className="hover:text-white underline">
                                  {donor.phone}
                                </a>
                              </td>
                              <td className="px-4 py-3 text-sky-100/90 truncate max-w-[150px]">
                                {donor.location}
                              </td>
                              <td className="px-4 py-3">
                                <button
                                  onClick={() => toggleDonorAvailability(donor.id, donor.isAvailable !== false)}
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                                    donor.isAvailable !== false
                                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                                  }`}
                                  title="Click to toggle availability"
                                >
                                  {donor.isAvailable !== false ? '● Available' : '○ On Interval'}
                                </button>
                              </td>
                              <td className="px-4 py-3 text-right space-x-1">
                                <button
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to delete donor record for "${donor.name}"? This action cannot be undone.`)) {
                                      deleteDonor(donor.id);
                                    }
                                  }}
                                  className="p-1.5 text-sky-300 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition cursor-pointer"
                                  title="Delete Donor"
                                  id={`delete-donor-${donor.id}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="text-xs text-sky-300/70 flex items-center justify-between">
                  <span>Showing {filteredDonors.length} of {donors.length} total registered blood donors</span>
                  <span>Synced in real-time with Firebase Firestore</span>
                </div>
              </div>
            )}

            {/* Tab 2: Club Programs & Announcements List */}
            {activeTab === 'programs' && (
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-[#001733]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Published Club Programs</h4>
                    <p className="text-xs text-sky-200/70">All programs listed here appear immediately on the public website</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('add-program')}
                    className="px-4 py-2 bg-[#0072ce] hover:bg-[#005bb5] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer border border-sky-400/30"
                  >
                    <Plus className="w-4 h-4" />
                    Add Program
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {programs.map((prog) => (
                    <div
                      key={prog.id}
                      className="p-4 rounded-2xl bg-[#002244] border border-sky-500/30 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#001733] text-sky-300 border border-sky-500/30">
                            {prog.category}
                          </span>
                          
                          {/* Status toggle dropdown */}
                          <select
                            value={prog.status}
                            onChange={(e) => updateProgramStatus(prog.id, e.target.value as ProgramStatus)}
                            className="bg-[#001733] text-white text-[10px] font-bold px-2 py-1 rounded border border-sky-500/30 focus:outline-none"
                          >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>

                        <h5 className="text-sm font-bold text-white line-clamp-1">{prog.title}</h5>
                        <p className="text-xs text-sky-200/80 line-clamp-2">{prog.description}</p>

                        <div className="text-xs text-sky-200/70 space-y-1 pt-1">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-sky-400" />
                            <span>{prog.date} {prog.time ? `• ${prog.time}` : ''}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-sky-400" />
                            <span className="truncate">{prog.venue}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#00386e] flex items-center justify-between">
                        <span className="text-[10px] text-sky-300/60 font-mono">
                          ID: {prog.id.substring(0, 8)}...
                        </span>
                        <button
                          onClick={() => {
                            if (confirm(`Remove event "${prog.title}"?`)) {
                              deleteProgram(prog.id);
                            }
                          }}
                          className="px-2.5 py-1 text-xs text-red-400 hover:bg-red-950/40 rounded border border-red-900/50 flex items-center gap-1 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Add New Club Program Form */}
            {activeTab === 'add-program' && (
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#001733]">
                <div className="max-w-2xl mx-auto space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-white">Create New Club Program / Announcement</h4>
                    <p className="text-xs text-sky-200/70 mt-0.5">
                      Enter the event details below. It will automatically synchronize to Firebase Firestore and render on the public home page immediately.
                    </p>
                  </div>

                  {programFormSuccess && (
                    <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>Program successfully created and published to the website!</span>
                    </div>
                  )}

                  <form onSubmit={handlePublishProgram} className="space-y-4">
                    {/* Title */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-sky-200 uppercase tracking-wide">
                        Program / Announcement Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Zealous Premier Football League 2026 Puthuponnani"
                        className="w-full px-4 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                        id="new-program-title"
                      />
                    </div>

                    {/* Category & Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-sky-200 uppercase tracking-wide">
                          Activity Category *
                        </label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value as ProgramCategory)}
                          className="w-full px-4 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                        >
                          <option value="Sports">Sports (Football, Athletics)</option>
                          <option value="Charity">Charity & Educational Kits</option>
                          <option value="Cultural">Cultural & Arts Fest</option>
                          <option value="Healthcare">Healthcare & Blood Camp</option>
                          <option value="Youth">Youth Welfare & Meet</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-sky-200 uppercase tracking-wide">
                          Initial Status *
                        </label>
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value as ProgramStatus)}
                          className="w-full px-4 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                        >
                          <option value="Upcoming">Upcoming</option>
                          <option value="Ongoing">Ongoing (Live)</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-sky-200 uppercase tracking-wide">
                          Event Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                          className="w-full px-4 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                          id="new-program-date"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-sky-200 uppercase tracking-wide">
                          Time / Timing (Optional)
                        </label>
                        <input
                          type="text"
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                          placeholder="e.g. 05:00 PM Onwards"
                          className="w-full px-4 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                        />
                      </div>
                    </div>

                    {/* Venue & Organizer Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-sky-200 uppercase tracking-wide">
                          Venue / Location *
                        </label>
                        <input
                          type="text"
                          required
                          value={newVenue}
                          onChange={(e) => setNewVenue(e.target.value)}
                          placeholder="e.g. Puthuponnani Stadium Ground"
                          className="w-full px-4 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                          id="new-program-venue"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-sky-200 uppercase tracking-wide">
                          Organizer Contact Phone
                        </label>
                        <input
                          type="text"
                          value={newOrganizerContact}
                          onChange={(e) => setNewOrganizerContact(e.target.value)}
                          placeholder="+91 98470 12345"
                          className="w-full px-4 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                        />
                      </div>
                    </div>

                    {/* Image URL & Presets */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-sky-200 uppercase tracking-wide">
                          Cover Photo URL
                        </label>
                        <span className="text-[11px] text-sky-300">Presets:</span>
                      </div>
                      <input
                        type="url"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-4 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                      />
                      <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                        <button
                          type="button"
                          onClick={() => setNewImageUrl('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80')}
                          className="px-2 py-1 bg-[#002244] hover:bg-[#002b5c] rounded-lg text-sky-200 border border-sky-500/20 cursor-pointer"
                        >
                          Football Pitch
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewImageUrl('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80')}
                          className="px-2 py-1 bg-[#002244] hover:bg-[#002b5c] rounded-lg text-sky-200 border border-sky-500/20 cursor-pointer"
                        >
                          Study Kits
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewImageUrl('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80')}
                          className="px-2 py-1 bg-[#002244] hover:bg-[#002b5c] rounded-lg text-sky-200 border border-sky-500/20 cursor-pointer"
                        >
                          Cultural Fest
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewImageUrl('https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80')}
                          className="px-2 py-1 bg-[#002244] hover:bg-[#002b5c] rounded-lg text-sky-200 border border-sky-500/20 cursor-pointer"
                        >
                          Blood Drive
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-sky-200 uppercase tracking-wide">
                        Detailed Description & Announcement *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Describe the program, participating clubs, dates, guidelines, or contacts..."
                        className="w-full px-4 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400"
                        id="new-program-desc"
                      />
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveTab('programs')}
                        className="px-5 py-2.5 rounded-xl text-sky-200 hover:text-white text-xs font-bold transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isPublishingProgram}
                        className="px-6 py-2.5 bg-[#0072ce] hover:bg-[#005bb5] disabled:opacity-50 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-sky-950/60 flex items-center gap-2 cursor-pointer border border-sky-400/30"
                        id="publish-program-submit-btn"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{isPublishingProgram ? 'Publishing to Firestore...' : 'Publish Program Online'}</span>
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            )}

            {/* Tab 4: Logo & Branding Management */}
            {activeTab === 'branding' && (
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-[#001733]">
                {/* Header info */}
                <div className="bg-[#002244] border border-sky-500/30 rounded-3xl p-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black text-white flex items-center gap-2">
                        <span>Official Club Logo & Emblem Management</span>
                        <span className="text-xs font-normal text-sky-300 font-mono">
                          {customLogoUrl ? '● Custom Upload Active' : '● Official 1994 Vector Active'}
                        </span>
                      </h3>
                      <p className="text-xs text-sky-200/80 mt-1 max-w-2xl">
                        നിങ്ങൾ നൽകിയ ഔദ്യോഗിക ലോഗോ റീ-എഡിറ്റ് ചെയ്യാതെ നേരിട്ട് സൈറ്റിൽ അപ്‌ലോഡ് ചെയ്തു ഉപയോഗിക്കാം. കമ്പ്യൂട്ടറിലോ ഫോണിലോ ഉള്ള ഫയൽ (JPG / PNG / WEBP) തിരഞ്ഞെടുക്കുക.
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={openLogoUploadModal}
                        className="px-4 py-2.5 bg-[#0072ce] hover:bg-[#005bb5] text-white text-xs font-black rounded-xl transition flex items-center gap-2 shadow-md cursor-pointer border border-sky-400/40"
                        id="admin-open-upload-modal-btn"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Logo File (നേരിട്ട് അപ്‌ലോഡ് ചെയ്യുക)</span>
                      </button>
                      {customLogoUrl && (
                        <button
                          type="button"
                          onClick={resetCustomLogo}
                          className="px-4 py-2.5 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-bold rounded-xl transition cursor-pointer"
                          id="admin-reset-logo-btn"
                        >
                          Reset to 1994 Vector
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Live Previews in Different Contexts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Light Canvas Preview */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col items-center justify-between text-slate-800">
                    <div className="w-full flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                        Light Mode Display (വെബ്സൈറ്റ് ബാനർ കാഴ്ച്ച)
                      </span>
                      <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                        Live Rendering
                      </span>
                    </div>

                    <div className="w-full flex items-center justify-center p-4 min-h-[220px]">
                      <ClubLogo variant="banner" theme="white-bg" size="100%" />
                    </div>

                    <div className="w-full text-center text-xs text-slate-500 pt-3 border-t border-slate-100">
                      Displays in About Club section, certificates, and print media
                    </div>
                  </div>

                  {/* Dark / Royal Blue Header Preview */}
                  <div className="bg-[#002244] rounded-3xl p-6 border border-sky-500/30 shadow-md flex flex-col items-center justify-between text-white">
                    <div className="w-full flex items-center justify-between mb-4 border-b border-[#00386e] pb-3">
                      <span className="text-xs font-black uppercase tracking-wider text-sky-200">
                        Header / Navigation Display (നാവിഗേഷൻ ബാർ കാഴ്ച്ച)
                      </span>
                      <span className="text-[11px] font-mono text-sky-300 bg-sky-950 px-2 py-0.5 rounded-full font-bold">
                        Header Style
                      </span>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center gap-6 p-4 min-h-[220px]">
                      {/* Circular Emblem Preview */}
                      <div className="flex items-center gap-4 bg-[#001733] px-5 py-3 rounded-2xl border border-sky-500/20">
                        <ClubLogo variant="emblem" size={56} theme="blue-bg" />
                        <div>
                          <div className="font-black text-white text-base">സെലസ് ബ്രദേഴ്‌സ്</div>
                          <div className="text-[11px] text-sky-300 font-mono">ZEALOUS BROTHERS • 1994</div>
                        </div>
                      </div>

                      {/* Small circular nav badge preview */}
                      <div className="flex items-center gap-2 text-xs text-sky-200/80">
                        <ClubLogo variant="emblem" size={32} theme="blue-bg" />
                        <span>32px micro icon preview</span>
                      </div>
                    </div>

                    <div className="w-full text-center text-xs text-sky-200/70 pt-3 border-t border-[#00386e]">
                      Permanent in sticky top bar and mobile navigation menu
                    </div>
                  </div>
                </div>

                {/* Official Hero Banner Image Management */}
                <div className="bg-[#002244] border border-sky-500/30 rounded-3xl p-6 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black text-white flex items-center gap-2">
                        <span>Official Website Hero Banner Image</span>
                        <span className="text-xs font-normal text-sky-300 font-mono">
                          ● പുതുപൊന്നാനി അഴിമുഖ തീരം (Puthuponnani Estuary & Beach)
                        </span>
                      </h3>
                      <p className="text-xs text-sky-200/80 mt-1 max-w-2xl">
                        വെബ്സൈറ്റിന്റെ തലക്കെട്ട് ബാനറായി നൽകിയിട്ടുള്ള ഫോട്ടോ. പുതുപൊന്നാനി കടൽതീരത്തിന്റെയും അഴിമുഖത്തിന്റെയും യഥാർത്ഥ ചിത്രം.
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <label
                        className="px-4 py-2.5 bg-[#0072ce] hover:bg-[#005bb5] text-white text-xs font-black rounded-xl transition flex items-center gap-2 shadow-md cursor-pointer border border-sky-400/40"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload New Banner (ചിത്രം മാറ്റുക)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === 'string') {
                                uploadHeroBanner(reader.result);
                              }
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                      {heroBannerUrl !== '/hero-puthuponnani.jpg' && (
                        <button
                          type="button"
                          onClick={resetHeroBanner}
                          className="px-4 py-2.5 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-bold rounded-xl transition cursor-pointer"
                        >
                          Reset to Puthuponnani Photo
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Banner Preview */}
                  <div className="relative rounded-2xl overflow-hidden border border-sky-500/30 max-h-56">
                    <img
                      src={heroBannerUrl || '/hero-puthuponnani.jpg'}
                      alt="Current Hero Banner Preview"
                      className="w-full h-56 object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001733]/90 via-transparent to-transparent flex items-end p-4">
                      <div className="text-xs text-white font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>Active Hero Banner: Puthuponnani Estuary & Beach (പുതുപൊന്നാനി)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Organization Credential Badges */}
                <div className="bg-[#002244]/80 border border-sky-500/20 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-sky-200">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-white text-sm">ZEALOUS BROTHERS</span>
                    <span className="text-sky-400">•</span>
                    <span>കലാ സാംസ്കാരിക വേദി പുതുപൊന്നാനി</span>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-[11px] text-sky-300">
                    <span>Estd: 1994</span>
                    <span>Govt. Reg. No. 126/95</span>
                    <span>Aff. NYK. No. 429/96</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Magazine Management & Upload */}
            {activeTab === 'magazines' && (
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#001733]">
                <MagazineManagement />
              </div>
            )}

          </div>
        )}

      </div>

      {/* Manual Add Donor Modal for Admin */}
      {showAddDonorModal && (
        <div className="fixed inset-0 z-60 bg-[#001733]/90 flex items-center justify-center p-4">
          <div className="bg-[#002244] border border-sky-500/40 rounded-3xl max-w-md w-full p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white">Register Donor Manually (Admin Desk)</h4>
              <button onClick={() => setShowAddDonorModal(false)} className="text-sky-300 hover:text-white cursor-pointer">✕</button>
            </div>
            <form onSubmit={handleManualAddDonor} className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 font-bold text-sky-200">Full Name</label>
                <input
                  type="text"
                  required
                  value={manualDonorName}
                  onChange={(e) => setManualDonorName(e.target.value)}
                  className="w-full p-2.5 bg-[#001733] border border-sky-500/30 rounded-xl text-white focus:outline-none focus:border-sky-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-1 font-bold text-sky-200">Blood Group</label>
                  <select
                    value={manualDonorBg}
                    onChange={(e) => setManualDonorBg(e.target.value as BloodGroup)}
                    className="w-full p-2.5 bg-[#001733] border border-sky-500/30 rounded-xl text-white focus:outline-none focus:border-sky-400"
                  >
                    {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold text-sky-200">Phone</label>
                  <input
                    type="tel"
                    required
                    value={manualDonorPhone}
                    onChange={(e) => setManualDonorPhone(e.target.value)}
                    placeholder="+91 98471 00000"
                    className="w-full p-2.5 bg-[#001733] border border-sky-500/30 rounded-xl text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-bold text-sky-200">Location / Locality</label>
                <input
                  type="text"
                  required
                  value={manualDonorLocation}
                  onChange={(e) => setManualDonorLocation(e.target.value)}
                  placeholder="e.g. Puthuponnani, Ward 4"
                  className="w-full p-2.5 bg-[#001733] border border-sky-500/30 rounded-xl text-white focus:outline-none focus:border-sky-400"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDonorModal(false)}
                  className="px-4 py-2 bg-[#001733] rounded-xl text-sky-200 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0072ce] hover:bg-[#005bb5] rounded-xl font-bold text-white cursor-pointer shadow-md"
                >
                  Save Donor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
