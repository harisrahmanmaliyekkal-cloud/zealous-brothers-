import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  X, 
  Download, 
  Printer, 
  Share2, 
  Copy, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink,
  Award,
  Phone,
  Droplet,
  Calendar,
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';
import { ClubMember } from '../types';
import { useClub } from '../context/ClubContext';
import { ClubLogo } from './ClubLogo';

interface MemberIdCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: ClubMember | null;
  onOpenVerification?: (memberId: string) => void;
}

export const MemberIdCardModal: React.FC<MemberIdCardModalProps> = ({
  isOpen,
  onClose,
  member,
  onOpenVerification
}) => {
  const { customLogoUrl, showToast } = useClub();
  const [activeSide, setActiveSide] = useState<'front' | 'back' | 'both'>('front');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isGeneratingDownload, setIsGeneratingDownload] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const verificationUrl = member 
    ? `${window.location.origin}${window.location.pathname}?verify=${encodeURIComponent(member.memberId)}`
    : '';

  // Generate QR Code data URL whenever member changes
  useEffect(() => {
    if (member && verificationUrl) {
      QRCode.toDataURL(verificationUrl, {
        width: 320,
        margin: 1,
        color: {
          dark: '#002244',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
    }
  }, [member, verificationUrl]);

  if (!isOpen || !member) return null;

  // Copy Verification Link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(verificationUrl);
      setCopiedLink(true);
      showToast('പരിശോധനാ ലിങ്ക് കോപ്പി ചെയ്തു! (Verification link copied)');
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      showToast('Could not copy link to clipboard');
    }
  };

  // WhatsApp Share Action
  const handleShareWhatsApp = () => {
    let cleanPhone = member.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }
    
    const message = 
`🤝 *സെലസ് ബ്രദേഴ്സ് കലാ സാംസ്കാരിക വേദി പുതുപൊന്നാനി*
*(ZEALOUS BROTHERS CULTURAL & SPORTS WING)*
_Estd. 1994 | Govt Reg: 126/95 | NYK: 429/96_

പ്രിയ സുഹൃത്തേ *${member.name}*,
താങ്കളുടെ ഔദ്യോഗിക ഡിജിറ്റൽ മെമ്പർഷിപ്പ് കാർഡ് (Digital Membership ID Card) സജ്ജമായിരിക്കുന്നു!

🆔 *Member ID:* ${member.memberId}
👤 *Designation:* ${member.role}
🩸 *Blood Group:* ${member.bloodGroup}
📅 *Member Since:* ${member.joiningDate}
📍 *Locality:* ${member.locality || 'Puthuponnani'}

🔍 *ഡിജിറ്റൽ കാർഡ് കാണാനും വെരിഫൈ ചെയ്യാനും താഴെയുള്ള ലിങ്കിൽ ക്ലിക്ക് ചെയ്യുക:*
${verificationUrl}

_താങ്കളുടെ ഔദ്യോഗിക ഐഡി കാർഡ് ഡൗൺലോഡ് ചെയ്യാനും പ്രിന്റ് ചെയ്യാനും മുകളിലെ ലിങ്ക് ഉപയോഗിക്കാവുന്നതാണ്._

നന്ദി,
*സെലസ് ബ്രദേഴ്സ് മാനേജ്‌മെന്റ് കമ്മിറ്റി*`;

    const whatsappUrl = `https://wa.me/${cleanPhone ? cleanPhone : ''}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Print Action
  const handlePrint = () => {
    window.print();
  };

  // High-Resolution PNG Canvas Generator
  const handleDownloadPng = async () => {
    setIsGeneratingDownload(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

      // 1050 x 660 px for ultra-crisp 300dpi ID card resolution
      const width = 1050;
      const height = 660;
      canvas.width = width;
      canvas.height = height;

      // 1. Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#00142b');
      bgGrad.addColorStop(0.45, '#002552');
      bgGrad.addColorStop(1, '#003a7a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle decorative wave lines / watermark
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1.5;
      for (let i = -200; i < width + 400; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.bezierCurveTo(i + 150, height * 0.3, i - 150, height * 0.7, i, height);
        ctx.stroke();
      }

      // 3. Top Royal Accent Ribbon
      const ribbonGrad = ctx.createLinearGradient(0, 0, width, 0);
      ribbonGrad.addColorStop(0, '#0072ce');
      ribbonGrad.addColorStop(0.5, '#00a3ff');
      ribbonGrad.addColorStop(1, '#0072ce');
      ctx.fillStyle = ribbonGrad;
      ctx.fillRect(0, 0, width, 14);

      // Gold bottom line
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(0, height - 12, width, 12);

      // 4. Header Bar
      ctx.fillStyle = 'rgba(0, 16, 36, 0.65)';
      ctx.fillRect(0, 14, width, 110);
      ctx.strokeStyle = 'rgba(0, 163, 255, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 124);
      ctx.lineTo(width, 124);
      ctx.stroke();

      // Malayalam Header
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText('സെലസ് ബ്രദേഴ്സ് കലാ സാംസ്കാരിക വേദി പുതുപൊന്നാനി', 130, 52);

      // English Header
      ctx.fillStyle = '#60a5fa';
      ctx.font = '900 24px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText('ZEALOUS BROTHERS CULTURAL & SPORTS WING', 130, 84);

      // Subtext
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.font = '600 13px system-ui, sans-serif';
      ctx.fillText('ESTD: 1994  •  GOVT. REGD NO: 126/95  •  AFFIL: NYK 429/96  •  PUTHUPONNANI', 130, 108);

      // Member ID Badge in top-right
      ctx.fillStyle = 'rgba(0, 114, 206, 0.4)';
      ctx.beginPath();
      ctx.roundRect(width - 230, 36, 200, 52, 10);
      ctx.fill();
      ctx.strokeStyle = '#00a3ff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#93c5fd';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText('MEMBER IDENTIFICATION', width - 215, 54);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px monospace';
      ctx.fillText(member.memberId, width - 215, 76);

      // 5. Draw Photo or Avatar Frame
      const photoX = 45;
      const photoY = 155;
      const photoW = 200;
      const photoH = 240;

      // Photo Frame Shadow & Border
      ctx.fillStyle = '#001428';
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoW, photoH, 16);
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Load and draw photo if available, else placeholder avatar
      let photoDrawn = false;
      if (member.photoUrl) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = member.photoUrl;
          await new Promise((resolve) => {
            img.onload = () => {
              ctx.save();
              ctx.beginPath();
              ctx.roundRect(photoX, photoY, photoW, photoH, 16);
              ctx.clip();
              ctx.drawImage(img, photoX, photoY, photoW, photoH);
              ctx.restore();
              photoDrawn = true;
              resolve(true);
            };
            img.onerror = () => resolve(false);
          });
        } catch {
          // ignore
        }
      }

      if (!photoDrawn) {
        // Fallback initials avatar
        ctx.fillStyle = '#0072ce';
        ctx.beginPath();
        ctx.roundRect(photoX, photoY, photoW, photoH, 16);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 64px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(member.name.charAt(0).toUpperCase(), photoX + photoW / 2, photoY + photoH / 2 + 22);
        ctx.textAlign = 'left';
      }

      // Role Ribbon under photo
      ctx.fillStyle = '#0072ce';
      ctx.beginPath();
      ctx.roundRect(photoX - 10, photoY + photoH + 15, photoW + 20, 44, 8);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(member.role.toUpperCase(), photoX + photoW / 2, photoY + photoH + 43);
      ctx.textAlign = 'left';

      // 6. Member Details Column
      const detailsX = 280;
      let curY = 185;

      // Full Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(member.name, detailsX, curY);

      // Verified Active Tag
      curY += 38;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.roundRect(detailsX, curY - 22, 180, 30, 6);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText('✓ VERIFIED MEMBER', detailsX + 16, curY - 2);

      // Blood Group Badge next to it
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.roundRect(detailsX + 195, curY - 22, 110, 30, 6);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText(`🩸 ${member.bloodGroup}`, detailsX + 215, curY - 2);

      // Detail Rows
      const drawDetail = (label: string, value: string, y: number) => {
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.fillText(label.toUpperCase(), detailsX, y);

        ctx.fillStyle = '#f8fafc';
        ctx.font = '600 18px "Plus Jakarta Sans", system-ui, sans-serif';
        ctx.fillText(value, detailsX, y + 24);
      };

      curY += 45;
      drawDetail('Phone / WhatsApp', member.phone, curY);
      drawDetail('Member Since', member.joiningDate || '1994', curY + 60);
      drawDetail('Address / Locality', `${member.address ? member.address + ', ' : ''}${member.locality || 'Puthuponnani'}`, curY + 120);

      // 7. Right Column: QR Code + Verification Box
      const qrBoxX = width - 250;
      const qrBoxY = 155;
      const qrSize = 190;

      // QR container
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(qrBoxX, qrBoxY, 210, 260, 14);
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw QR Code Image if available
      if (qrDataUrl) {
        const qrImg = new Image();
        qrImg.src = qrDataUrl;
        await new Promise((resolve) => {
          qrImg.onload = () => {
            ctx.drawImage(qrImg, qrBoxX + 15, qrBoxY + 15, 180, 180);
            resolve(true);
          };
          qrImg.onerror = () => resolve(false);
        });
      }

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SCAN TO VERIFY', qrBoxX + 105, qrBoxY + 215);

      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(member.memberId, qrBoxX + 105, qrBoxY + 235);
      ctx.textAlign = 'left';

      // 8. Signatures & Hologram Seal at bottom
      const botY = height - 60;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.roundRect(detailsX, botY - 35, 450, 65, 8);
      ctx.fill();

      // Holographic Security Badge
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText('★ OFFICIAL ZEALOUS BROTHERS SECURITY SEAL ★', detailsX + 20, botY - 14);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillText('Authorized Signature: General Secretary / President', detailsX + 20, botY + 12);

      // Trigger Instant Download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${member.memberId}_ZealousBrothers_IDCard.png`;
      link.href = dataUrl;
      link.click();

      showToast(`ഐഡി കാർഡ് ഡൗൺലോഡ് ചെയ്തു: ${member.name} (${member.memberId})`);
    } catch (err) {
      console.error('Download card error', err);
      showToast('Error creating card image, please try print instead.');
    } finally {
      setIsGeneratingDownload(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-sky-500/40 rounded-3xl shadow-2xl overflow-hidden text-white my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Modal Bar */}
        <div className="px-6 py-4 bg-[#001b3a] border-b border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0072ce] flex items-center justify-center text-white shadow-md p-1 border border-white/20">
              <ClubLogo variant="emblem" theme="transparent-white" size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">Digital Membership ID Card</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Active Member
                </span>
              </div>
              <p className="text-xs text-sky-200/70">
                സെലസ് ബ്രദേഴ്സ് ഔദ്യോഗിക ഡിജിറ്റൽ തിരിച്ചറിയൽ കാർഡ് • {member.name} ({member.memberId})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-sky-200 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card View Mode Selector */}
        <div className="px-6 py-3 bg-[#00142b] border-b border-sky-900/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveSide('front')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                activeSide === 'front' 
                  ? 'bg-[#0072ce] text-white shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Front Side (മുൻവശം)</span>
            </button>
            <button
              onClick={() => setActiveSide('back')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                activeSide === 'back' 
                  ? 'bg-[#0072ce] text-white shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Back Side (പിൻവശം)</span>
            </button>
          </div>

          {/* Quick Actions at Top Right */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
              title="Copy Public Verification URL"
            >
              {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>

            {onOpenVerification && (
              <button
                onClick={() => onOpenVerification(member.memberId)}
                className="px-3 py-1.5 bg-[#0072ce]/20 hover:bg-[#0072ce]/40 text-sky-200 text-xs font-semibold rounded-xl border border-sky-500/40 transition flex items-center gap-1.5 cursor-pointer"
                title="Preview public verification page"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verify Online</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Body: Card Preview Area */}
        <div className="p-4 sm:p-8 flex flex-col items-center justify-center bg-radial from-slate-900 via-[#001026] to-[#000814] min-h-[420px]">
          
          <div ref={printRef} className="w-full max-w-2xl transition-all">
            
            {/* FRONT SIDE OF ID CARD */}
            {activeSide === 'front' && (
              <div 
                id="zealous-membership-card-front"
                className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#0072ce]/50 text-white select-none transition-all"
                style={{
                  background: 'linear-gradient(135deg, #001733 0%, #002b5e 45%, #001f44 100%)',
                  aspectRatio: '1.586 / 1'
                }}
              >
                {/* Decorative Pattern Lines / Guilloche Effect */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px), radial-gradient(circle at 0% 0%, #00a3ff 1px, transparent 1px)',
                    backgroundSize: '16px 16px, 32px 32px'
                  }}
                />

                {/* Top Royal Blue & Cyan Header Ribbon */}
                <div className="h-2 w-full bg-gradient-to-r from-[#0072ce] via-sky-400 to-[#0072ce]" />

                {/* Header Section */}
                <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-black/40 border-b border-sky-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0072ce] p-1 flex items-center justify-center shrink-0 shadow-lg border border-white/30">
                      <ClubLogo variant="emblem" theme="transparent-white" size={38} />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs font-bold text-sky-200 tracking-tight leading-none">
                        സെലസ് ബ്രദേഴ്സ് കലാ സാംസ്കാരിക വേദി
                      </div>
                      <h4 className="text-xs sm:text-base font-black text-white tracking-wide uppercase mt-0.5 leading-tight">
                        ZEALOUS BROTHERS
                      </h4>
                      <div className="text-[8px] sm:text-[10px] text-sky-300/80 font-medium flex flex-wrap items-center gap-1 sm:gap-2 leading-none mt-0.5">
                        <span>ESTD 1994</span>
                        <span>•</span>
                        <span>REG: 126/95</span>
                        <span>•</span>
                        <span>NYK: 429/96</span>
                        <span>•</span>
                        <span>PUTHUPONNANI</span>
                      </div>
                    </div>
                  </div>

                  {/* ID Tag */}
                  <div className="text-right shrink-0">
                    <span className="block text-[8px] sm:text-[9px] font-bold text-sky-300 uppercase tracking-wider">
                      MEMBER ID
                    </span>
                    <span className="font-mono font-black text-xs sm:text-sm text-white px-2 py-0.5 rounded bg-sky-950/80 border border-sky-500/40">
                      {member.memberId}
                    </span>
                  </div>
                </div>

                {/* Card Content Grid */}
                <div className="p-3 sm:p-5 flex gap-3 sm:gap-5 items-center justify-between">
                  
                  {/* Left Column: Member Photo + Role Ribbon */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-20 h-24 sm:w-28 sm:h-36 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-amber-400/90 shadow-xl bg-slate-950 relative flex items-center justify-center">
                      {member.photoUrl ? (
                        <img 
                          src={member.photoUrl} 
                          alt={member.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0072ce] to-[#002244] flex items-center justify-center text-white text-3xl sm:text-4xl font-black">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      
                      {/* Corner Security Watermark Icon */}
                      <div className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-amber-400">
                        <Sparkles className="w-2.5 h-2.5" />
                      </div>
                    </div>

                    <div className="mt-1.5 sm:mt-2 px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-[#0072ce] text-white font-bold text-[9px] sm:text-xs shadow-md border border-sky-300/40 uppercase tracking-wider text-center max-w-[120px] truncate">
                      {member.role}
                    </div>
                  </div>

                  {/* Middle Column: Member Personal Details */}
                  <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2 text-left">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm sm:text-xl font-black text-white truncate leading-tight">
                          {member.name}
                        </h3>
                        <span className="shrink-0 inline-flex items-center px-1.5 py-0.2 rounded text-[8px] sm:text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          Active
                        </span>
                      </div>
                      <p className="text-[9px] sm:text-xs text-sky-200/80 font-medium">
                        {member.locality || 'Puthuponnani, Malappuram'}
                      </p>
                    </div>

                    {/* Metadata Badges */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-0.5">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-black/30 border border-white/10">
                        <span className="block text-[7px] sm:text-[9px] text-sky-300/70 font-semibold uppercase flex items-center gap-1">
                          <Droplet className="w-2.5 h-2.5 text-red-400" />
                          Blood Group
                        </span>
                        <span className="text-xs sm:text-sm font-black text-red-400 font-mono">
                          {member.bloodGroup}
                        </span>
                      </div>

                      <div className="p-1.5 sm:p-2 rounded-lg bg-black/30 border border-white/10">
                        <span className="block text-[7px] sm:text-[9px] text-sky-300/70 font-semibold uppercase flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5 text-sky-400" />
                          Member Since
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-white truncate">
                          {member.joiningDate || '1994'}
                        </span>
                      </div>
                    </div>

                    <div className="p-1.5 sm:p-2 rounded-lg bg-black/30 border border-white/10 flex items-center justify-between">
                      <div>
                        <span className="block text-[7px] sm:text-[9px] text-sky-300/70 font-semibold uppercase flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5 text-emerald-400" />
                          Phone Number
                        </span>
                        <span className="text-[10px] sm:text-xs font-semibold text-slate-100 font-mono">
                          {member.phone}
                        </span>
                      </div>
                      <div className="hidden sm:block text-right">
                        <span className="text-[8px] text-amber-300/80 font-semibold uppercase block">Validity</span>
                        <span className="text-[10px] text-emerald-400 font-bold">Lifetime / Official</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: QR Code for Verification */}
                  <div className="flex flex-col items-center shrink-0 pl-1">
                    <div className="p-1.5 sm:p-2 bg-white rounded-xl shadow-lg border border-slate-200 flex items-center justify-center">
                      {qrDataUrl ? (
                        <img 
                          src={qrDataUrl} 
                          alt="Verification QR Code"
                          className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
                        />
                      ) : (
                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-100 flex items-center justify-center text-slate-400 text-[8px] text-center">
                          Generating QR...
                        </div>
                      )}
                    </div>
                    <span className="text-[7px] sm:text-[9px] text-sky-200 font-bold uppercase tracking-wider mt-1 text-center">
                      Scan to Verify
                    </span>
                    <span className="text-[6px] sm:text-[8px] text-amber-400 font-mono">
                      Govt Regd 126/95
                    </span>
                  </div>

                </div>

                {/* Bottom Gold Accent & Signatures Bar */}
                <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-black/60 border-t border-sky-500/20 flex items-center justify-between text-[8px] sm:text-[10px] text-sky-200/80">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Official Identity • Zealous Brothers Arts & Cultural Wing</span>
                  </div>
                  <div className="font-semibold text-amber-300/90 tracking-wide">
                    Authorized Signatory
                  </div>
                </div>

                <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />
              </div>
            )}

            {/* BACK SIDE OF ID CARD */}
            {activeSide === 'back' && (
              <div 
                id="zealous-membership-card-back"
                className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#0072ce]/50 text-white select-none transition-all p-4 sm:p-6 flex flex-col justify-between"
                style={{
                  background: 'linear-gradient(135deg, #001226 0%, #001f44 50%, #001024 100%)',
                  aspectRatio: '1.586 / 1'
                }}
              >
                {/* Top Bar */}
                <div className="flex items-center justify-between border-b border-sky-500/30 pb-2.5">
                  <div className="flex items-center gap-2">
                    <ClubLogo variant="emblem" theme="transparent-white" size={28} />
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-white">ZEALOUS BROTHERS CLUB</h4>
                      <p className="text-[8px] sm:text-[10px] text-sky-300">Terms of Membership & Constitution</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] sm:text-[10px] text-sky-200/70 block">Blood Helpline</span>
                    <span className="text-xs font-mono font-bold text-red-400">+91 98470 12345</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="space-y-2 my-auto text-[8px] sm:text-[11px] text-slate-300 leading-relaxed">
                  <p>
                    1. This digital credential verifies that the bearer is an accredited active member of <strong className="text-white">ZEALOUS BROTHERS</strong> (സെലസ് ബ്രദേഴ്സ് കലാ സാംസ്കാരിക വേദി പുതുപൊന്നാനി).
                  </p>
                  <p>
                    2. Members are pledged to uphold social welfare, voluntary emergency blood donation (ZB Care Blood Wing), youth cultural leadership, and sports development.
                  </p>
                  <p>
                    3. If found, please return this card to Zealous Brothers Headquarters, Near Kadalora Road, Puthuponnani, Malappuram District, Kerala - 679586.
                  </p>
                </div>

                {/* Emergency Contact & Address Bar */}
                <div className="pt-2 border-t border-sky-500/30 flex items-center justify-between text-[8px] sm:text-[10px] text-sky-200/70">
                  <div>
                    <span className="font-bold text-white block">Headquarters Address:</span>
                    <span>Puthuponnani, Ponnani, Malappuram Dt, Kerala - 679586</span>
                  </div>
                  <div className="text-right font-mono text-[9px] text-amber-400">
                    AUTH-ID: {member.memberId}-SEC
                  </div>
                </div>
              </div>
            )}

          </div>

          <p className="text-xs text-sky-300/60 mt-4 text-center">
            * ഈ ഐഡി കാർഡ് ക്ലബ്ബിന്റെ ഔദ്യോഗിക ഡിജിറ്റൽ അംഗത്വ രേഖയാണ്. QR കോഡ് സ്കാൻ ചെയ്താൽ വെരിഫിക്കേഷൻ പേജ് ലഭിക്കുന്നതാണ്.
          </p>
        </div>

        {/* Footer Actions: Download, Print, WhatsApp Delivery */}
        <div className="p-4 sm:p-6 bg-[#001733] border-t border-sky-500/30 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/40 transition flex items-center gap-2 cursor-pointer"
              id="id-card-send-whatsapp-btn"
            >
              <Share2 className="w-4 h-4" />
              <span>Send to WhatsApp (അംഗത്തിന് അയക്കുക)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPng}
              disabled={isGeneratingDownload}
              className="px-4 py-2.5 bg-[#0072ce] hover:bg-[#0086f0] disabled:bg-slate-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-sky-950/40 transition flex items-center gap-2 cursor-pointer"
              id="id-card-download-png-btn"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingDownload ? 'Generating PNG...' : 'Download ID Card (PNG)'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs sm:text-sm font-bold border border-slate-700 transition flex items-center gap-2 cursor-pointer"
              id="id-card-print-btn"
            >
              <Printer className="w-4 h-4" />
              <span>Print (പ്രിന്റ് ചെയ്യുക)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
