import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Trash2, 
  Share2, 
  CreditCard, 
  ShieldCheck, 
  Droplet, 
  Phone, 
  Calendar, 
  MapPin, 
  X, 
  Upload, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  Sparkles,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { ClubMember, BloodGroup, MemberRole } from '../types';
import { MemberIdCardModal } from './MemberIdCardModal';

const ROLE_OPTIONS: MemberRole[] = [
  'Member',
  'Committee Member',
  'Convener',
  'Joint Convener',
  'President',
  'Vice President',
  'General Secretary',
  'Joint Secretary',
  'Treasurer',
  'Sports Captain',
  'Youth Wing Lead',
  'Blood Wing Coordinator',
  'Executive Member',
  'Advisory Board'
];

const BLOOD_GROUPS: BloodGroup[] = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

interface MemberManagementProps {
  onOpenVerification?: (memberId: string) => void;
}

export const MemberManagement: React.FC<MemberManagementProps> = ({ onOpenVerification }) => {
  const { members, addMember, deleteMember, showToast } = useClub();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [bloodFilter, setBloodFilter] = useState<string>('All');

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMemberForCard, setSelectedMemberForCard] = useState<ClubMember | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState<string>('Member');
  const [formBloodGroup, setFormBloodGroup] = useState<BloodGroup>('O+');
  const [formPhone, setFormPhone] = useState('+91 ');
  const [formJoiningDate, setFormJoiningDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [formPhotoUrl, setFormPhotoUrl] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formLocality, setFormLocality] = useState('Puthuponnani');
  const [formMemberId, setFormMemberId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Photo Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setFormError('Image size should be less than 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Create an image to compress and square-crop
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 600;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, w, h);
            const compressed = canvas.toDataURL('image/jpeg', 0.85);
            setFormPhotoUrl(compressed);
            setFormError('');
          } else {
            setFormPhotoUrl(reader.result as string);
          }
        };
        img.src = reader.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetForm = () => {
    setFormName('');
    setFormRole('Member');
    setFormBloodGroup('O+');
    setFormPhone('+91 ');
    setFormJoiningDate(new Date().toISOString().split('T')[0]);
    setFormPhotoUrl('');
    setFormAddress('');
    setFormLocality('Puthuponnani');
    setFormMemberId('');
    setFormError('');
  };

  const handleSubmitNewMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setFormError('Please enter member name.');
      return;
    }
    if (!formPhone.trim() || formPhone.trim() === '+91') {
      setFormError('Please provide a valid contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    const res = await addMember({
      memberId: formMemberId.trim(),
      name: formName.trim(),
      role: formRole,
      bloodGroup: formBloodGroup,
      phone: formPhone.trim(),
      joiningDate: formJoiningDate,
      photoUrl: formPhotoUrl || undefined,
      address: formAddress.trim() || undefined,
      locality: formLocality.trim() || 'Puthuponnani',
      status: 'Active'
    });

    setIsSubmitting(false);

    if (res.success) {
      handleResetForm();
      setShowAddModal(false);
      if (res.member) {
        // Automatically open the ID Card preview for the newly added member
        setSelectedMemberForCard(res.member);
      }
    } else {
      setFormError(res.error || 'Failed to add member');
    }
  };

  // Quick WhatsApp Trigger
  const handleQuickWhatsApp = (member: ClubMember) => {
    let cleanPhone = member.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }

    const verificationUrl = `${window.location.origin}${window.location.pathname}?verify=${encodeURIComponent(member.memberId)}`;
    const msg = 
`🤝 *സെലസ് ബ്രദേഴ്സ് കലാ സാംസ്കാരിക വേദി പുതുപൊന്നാനി*
*(ZEALOUS BROTHERS)*

പ്രിയ *${member.name}*,
താങ്കളുടെ ഔദ്യോഗിക ഡിജിറ്റൽ മെമ്പർഷിപ്പ് കാർഡ് തയ്യാറാണ്:

🆔 Member ID: ${member.memberId}
👤 Role: ${member.role}
🩸 Blood Group: ${member.bloodGroup}

🔍 താങ്കളുടെ കാർഡ് കാണാനും ഡൗൺലോഡ് ചെയ്യാനും താഴെയുള്ള ലിങ്കിൽ ക്ലിക്ക് ചെയ്യുക:
${verificationUrl}`;

    window.open(`https://wa.me/${cleanPhone ? cleanPhone : ''}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Filtered Members
  const filteredMembers = members.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.role && m.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (m.locality && m.locality.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === 'All' || m.role === roleFilter;
    const matchesBlood = bloodFilter === 'All' || m.bloodGroup === bloodFilter;

    return matchesSearch && matchesRole && matchesBlood;
  });

  return (
    <div className="space-y-4">
      
      {/* Top Banner & Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#002244] border border-sky-500/30">
          <div className="text-xs text-sky-200/70 font-medium">Total Members</div>
          <div className="text-xl font-black text-white mt-0.5">{members.length}</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#002244] border border-sky-500/30">
          <div className="text-xs text-sky-200/70 font-medium">Active Status</div>
          <div className="text-xl font-black text-emerald-400 mt-0.5">
            {members.filter(m => m.status === 'Active' || !m.status).length}
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#002244] border border-sky-500/30">
          <div className="text-xs text-sky-200/70 font-medium">Committee / Conveners</div>
          <div className="text-xl font-black text-sky-300 mt-0.5">
            {members.filter(m => m.role.toLowerCase().includes('convener') || m.role.toLowerCase().includes('committee') || m.role.toLowerCase().includes('president') || m.role.toLowerCase().includes('secretary')).length}
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#002244] border border-sky-500/30">
          <div className="text-xs text-sky-200/70 font-medium">Puthuponnani Locality</div>
          <div className="text-xl font-black text-amber-300 mt-0.5">100%</div>
        </div>
      </div>

      {/* Action Bar: Search, Filters & Add Member Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#002244] p-3 sm:p-4 rounded-2xl border border-sky-500/30">
        
        {/* Search & Filters */}
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search member by name, ID, phone, role..."
              className="w-full pl-9 pr-3 py-2 bg-[#001733] border border-sky-500/30 rounded-xl text-xs text-white placeholder-sky-200/40 focus:outline-none focus:border-sky-400"
              id="admin-members-search-input"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-[#001733] border border-sky-500/30 rounded-xl text-xs text-sky-200 focus:outline-none focus:border-sky-400 cursor-pointer"
            id="admin-members-role-filter"
          >
            <option value="All">All Roles (എല്ലാ സ്ഥാനങ്ങളും)</option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <select
            value={bloodFilter}
            onChange={(e) => setBloodFilter(e.target.value)}
            className="px-3 py-2 bg-[#001733] border border-sky-500/30 rounded-xl text-xs text-sky-200 focus:outline-none focus:border-sky-400 cursor-pointer"
            id="admin-members-blood-filter"
          >
            <option value="All">All Blood Groups</option>
            {BLOOD_GROUPS.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        {/* Add Member Button */}
        <div>
          <button
            onClick={() => {
              handleResetForm();
              setShowAddModal(true);
            }}
            className="w-full sm:w-auto px-4 py-2 bg-[#0072ce] hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-sky-950/40 transition flex items-center justify-center gap-1.5 cursor-pointer"
            id="admin-add-member-btn"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Member (പുതിയ അംഗം)</span>
          </button>
        </div>

      </div>

      {/* Members Grid / List */}
      {filteredMembers.length === 0 ? (
        <div className="p-8 sm:p-12 text-center rounded-2xl bg-[#002244] border border-sky-500/30 text-sky-200/70 space-y-3">
          <Users className="w-10 h-10 mx-auto text-sky-400/50" />
          <p className="text-sm font-semibold text-white">No members found matching your search criteria.</p>
          <p className="text-xs text-sky-300/60">Try clearing filters or add a new club member using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredMembers.map((member) => (
            <div 
              key={member.id}
              className="p-4 rounded-2xl bg-[#002244] border border-sky-500/30 hover:border-sky-400/60 transition shadow-lg flex flex-col justify-between space-y-3 group"
            >
              
              {/* Card Header: Photo + Name + Role */}
              <div className="flex items-start gap-3">
                <div className="w-14 h-16 rounded-xl overflow-hidden bg-[#001733] border-2 border-amber-400/90 shrink-0 flex items-center justify-center text-white font-black text-xl shadow-md relative">
                  {member.photoUrl ? (
                    <img 
                      src={member.photoUrl} 
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sky-300">{member.name.charAt(0)}</span>
                  )}
                  <span className="absolute bottom-0 inset-x-0 bg-red-600 text-white text-[7px] font-bold text-center py-0.2">
                    {member.bloodGroup}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[10px] font-bold text-amber-400 bg-black/40 px-1.5 py-0.5 rounded border border-amber-400/30">
                      {member.memberId}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      Active
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-white truncate mt-1 group-hover:text-sky-300 transition">
                    {member.name}
                  </h4>

                  <div className="inline-block px-2 py-0.5 rounded bg-[#0072ce]/40 text-sky-200 text-[10px] font-semibold border border-sky-400/30 mt-0.5 truncate max-w-full">
                    {member.role}
                  </div>
                </div>
              </div>

              {/* Details Rows */}
              <div className="text-[11px] text-sky-200/80 space-y-1 bg-[#001733] p-2.5 rounded-xl border border-sky-500/20">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Phone className="w-3 h-3 text-emerald-400" />
                    Phone:
                  </span>
                  <span className="font-mono text-white font-medium">{member.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3 text-sky-400" />
                    Joined:
                  </span>
                  <span className="text-white font-medium">{member.joiningDate || '1994'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    Locality:
                  </span>
                  <span className="text-white font-medium truncate max-w-[150px]">{member.locality || 'Puthuponnani'}</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-sky-500/20">
                <button
                  onClick={() => setSelectedMemberForCard(member)}
                  className="flex-1 py-1.5 px-2 bg-[#0072ce] hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 shadow cursor-pointer"
                  title="Generate Digital ID Card with QR"
                  id={`btn-id-card-${member.id}`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>ID Card</span>
                </button>

                <button
                  onClick={() => handleQuickWhatsApp(member)}
                  className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition shadow cursor-pointer"
                  title="Send ID Card to WhatsApp"
                  id={`btn-whatsapp-${member.id}`}
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>

                {onOpenVerification && (
                  <button
                    onClick={() => onOpenVerification(member.memberId)}
                    className="p-2 bg-sky-900/60 hover:bg-sky-800 text-sky-200 hover:text-white rounded-lg transition border border-sky-500/30 cursor-pointer"
                    title="Verify Publicly"
                    id={`btn-verify-${member.id}`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                )}

                <button
                  onClick={async () => {
                    if (window.confirm(`Are you sure you want to remove member ${member.name} (${member.memberId})?`)) {
                      await deleteMember(member.id);
                    }
                  }}
                  className="p-2 bg-red-950/60 hover:bg-red-900 text-red-300 hover:text-red-100 rounded-lg transition border border-red-800/40 cursor-pointer"
                  title="Delete Member"
                  id={`btn-delete-${member.id}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ADD MEMBER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#001733] border border-sky-500/40 rounded-3xl shadow-2xl text-white my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#002244] border-b border-sky-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0072ce] flex items-center justify-center text-white shadow">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Add New Club Member</h3>
                  <p className="text-xs text-sky-200/70">
                    സെലസ് ബ്രദേഴ്സ് പുതിയ അംഗത്തെ ചേർക്കുക & ഐഡി കാർഡ് തയ്യാറാക്കുക
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-sky-200 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Form */}
            <form onSubmit={handleSubmitNewMember} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              {formError && (
                <div className="p-3 rounded-xl bg-red-950 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Photo Upload Section */}
              <div className="p-4 rounded-2xl bg-[#001226] border border-sky-500/30 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-24 h-28 rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-400 shadow-lg flex items-center justify-center shrink-0">
                  {formPhotoUrl ? (
                    <img src={formPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-2 text-sky-300/60">
                      <Camera className="w-8 h-8 mx-auto mb-1 text-sky-400/50" />
                      <span className="text-[9px] block">No Photo</span>
                    </div>
                  )}
                  {formPhotoUrl && (
                    <button
                      type="button"
                      onClick={() => setFormPhotoUrl('')}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-500"
                      title="Remove photo"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="flex-1 space-y-1.5 text-center sm:text-left">
                  <label className="text-xs font-bold text-sky-200 uppercase tracking-wide block">
                    Member Photograph (അംഗത്തിന്റെ ഫോട്ടോ)
                  </label>
                  <p className="text-[11px] text-sky-200/60 leading-relaxed">
                    Upload passport size photo. Supports JPG, PNG or WebP. Auto-formatted for the digital ID card.
                  </p>
                  <div className="pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <label className="px-3.5 py-1.5 bg-[#0072ce] hover:bg-sky-500 text-white text-xs font-bold rounded-xl cursor-pointer transition inline-flex items-center gap-1.5 shadow">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                    {formPhotoUrl && (
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ready</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Full Name & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sky-200 uppercase tracking-wide">
                    Full Name (പേര്) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Muhammed Haris"
                    className="w-full px-3.5 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 placeholder-sky-200/30"
                    id="new-member-name-input"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sky-200 uppercase tracking-wide">
                    Role / Designation (സ്ഥാനം) *
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 cursor-pointer"
                    id="new-member-role-select"
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Blood Group & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sky-200 uppercase tracking-wide flex items-center gap-1">
                    <Droplet className="w-3.5 h-3.5 text-red-400" />
                    Blood Group (രക്തഗ്രൂപ്പ്) *
                  </label>
                  <select
                    value={formBloodGroup}
                    onChange={(e) => setFormBloodGroup(e.target.value as BloodGroup)}
                    className="w-full px-3.5 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 font-mono font-bold cursor-pointer"
                    id="new-member-blood-group-select"
                  >
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sky-200 uppercase tracking-wide flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+91 98470 12345"
                    className="w-full px-3.5 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 placeholder-sky-200/30 font-mono"
                    id="new-member-phone-input"
                  />
                </div>
              </div>

              {/* Joining Date & Member ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sky-200 uppercase tracking-wide flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    Joining Date (ചേർന്ന തീയതി)
                  </label>
                  <input
                    type="date"
                    value={formJoiningDate}
                    onChange={(e) => setFormJoiningDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 cursor-pointer"
                    id="new-member-joining-date-input"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sky-200 uppercase tracking-wide flex items-center justify-between">
                    <span>Member ID (അംഗത്വ നമ്പർ)</span>
                    <span className="text-[10px] text-sky-400/80 font-normal">Leave blank for auto</span>
                  </label>
                  <input
                    type="text"
                    value={formMemberId}
                    onChange={(e) => setFormMemberId(e.target.value)}
                    placeholder="e.g. ZB-2026-042 (Auto-generated if empty)"
                    className="w-full px-3.5 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 placeholder-sky-200/30 font-mono uppercase"
                    id="new-member-id-input"
                  />
                </div>
              </div>

              {/* Address & Locality */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sky-200 uppercase tracking-wide">
                    Address / House Name
                  </label>
                  <input
                    type="text"
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    placeholder="e.g. Maliyekkal House, Beach Road"
                    className="w-full px-3.5 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 placeholder-sky-200/30"
                    id="new-member-address-input"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sky-200 uppercase tracking-wide">
                    Locality / Ward
                  </label>
                  <input
                    type="text"
                    value={formLocality}
                    onChange={(e) => setFormLocality(e.target.value)}
                    placeholder="Puthuponnani"
                    className="w-full px-3.5 py-2.5 bg-[#002244] border border-sky-500/30 rounded-xl text-sm text-white focus:outline-none focus:border-sky-400 placeholder-sky-200/30"
                    id="new-member-locality-input"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-sky-500/20 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-[#0072ce] hover:bg-sky-500 disabled:bg-slate-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition flex items-center gap-1.5 cursor-pointer"
                  id="submit-add-member-btn"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isSubmitting ? 'Registering...' : 'Save & Generate ID Card'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* DIGITAL ID CARD MODAL */}
      <MemberIdCardModal
        isOpen={!!selectedMemberForCard}
        onClose={() => setSelectedMemberForCard(null)}
        member={selectedMemberForCard}
        onOpenVerification={onOpenVerification}
      />

    </div>
  );
};
