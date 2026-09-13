import React, { useState } from 'react';
import { 
  HeartHandshake, 
  X, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { BloodGroup } from '../types';

interface RegisterDonorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterDonorModal: React.FC<RegisterDonorModalProps> = ({ isOpen, onClose }) => {
  const { addDonor } = useClub();

  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState<string>('24');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successState, setSuccessState] = useState(false);

  if (!isOpen) return null;

  const bloodGroups: BloodGroup[] = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMsg('Please enter a valid phone number (minimum 7 digits)');
      return;
    }
    if (!location.trim()) {
      setErrorMsg('Please enter your locality or town (e.g. Puthuponnani, Ward 3)');
      return;
    }

    setIsSubmitting(true);
    const res = await addDonor({
      name: name.trim(),
      bloodGroup,
      phone: phone.trim(),
      location: location.trim(),
      age: age ? parseInt(age, 10) : undefined,
      lastDonationDate: lastDonationDate || undefined,
      isAvailable: true
    });

    setIsSubmitting(false);

    if (res.success) {
      setSuccessState(true);
      setTimeout(() => {
        setSuccessState(false);
        onClose();
        setName('');
        setPhone('');
        setLocation('');
      }, 2400);
    } else {
      setErrorMsg(res.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#001733]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-sky-100 overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002244] to-[#0072ce] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#0072ce] flex items-center justify-center shadow-md">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                ZB Care Blood Registry • പുതുപൊന്നാനി
              </span>
              <h3 className="text-xl font-black text-white">Register as a Blood Donor</h3>
            </div>
          </div>
          <p className="text-xs text-sky-100/80 mt-2 leading-relaxed">
            Your voluntary pledge helps emergency patients, accident victims, and surgery cases across Puthuponnani and nearby hospitals.
          </p>
        </div>

        {/* Content */}
        {successState ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-slate-900">Registration Complete!</h4>
            <p className="text-sm text-slate-600">
              Thank you, <strong>{name}</strong>! You have been successfully enrolled in the Zealous Brothers Blood Donor Registry ({bloodGroup}).
            </p>
            <p className="text-xs text-slate-400">
              Our emergency coordinators will reach out when urgent blood requests arise.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#0072ce]" />
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Muhammed Haris"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0072ce] focus:border-[#0072ce]"
                id="donor-input-name"
              />
            </div>

            {/* Blood Group Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Blood Group *
              </label>
              <div className="grid grid-cols-4 gap-2">
                {bloodGroups.map((bg) => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => setBloodGroup(bg)}
                    className={`py-2 text-sm font-black rounded-xl border transition cursor-pointer ${
                      bloodGroup === bg
                        ? 'bg-[#0072ce] text-white border-[#0072ce] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0072ce]" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98470 12345"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0072ce] focus:border-[#0072ce]"
                  id="donor-input-phone"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0072ce]" />
                  Locality / Town *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Puthuponnani, Ward 4"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0072ce] focus:border-[#0072ce]"
                  id="donor-input-location"
                />
              </div>
            </div>

            {/* Optional Age & Last Donation Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Age (Years)
                </label>
                <input
                  type="number"
                  min="18"
                  max="65"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 24"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0072ce]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Last Donated (If any)
                </label>
                <input
                  type="date"
                  value={lastDonationDate}
                  onChange={(e) => setLastDonationDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0072ce]"
                />
              </div>
            </div>

            {/* Trust disclaimer */}
            <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-[11px] text-slate-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0072ce] shrink-0 mt-0.5" />
              <span>
                Your phone number is kept secure and accessed by coordinators exclusively for emergency blood dispatch.
              </span>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-[#0072ce] hover:bg-[#005bb5] disabled:opacity-50 text-white text-xs font-bold transition shadow-md shadow-sky-950/40 cursor-pointer"
                id="submit-donor-registration-btn"
              >
                {isSubmitting ? 'Saving to Registry...' : 'Complete Registration'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
