import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  CheckCircle, 
  RefreshCw, 
  Eye, 
  Sparkles, 
  Download, 
  FileCheck,
  BadgeCheck
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { ClubLogo } from './ClubLogo';

interface LogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({ isOpen, onClose }) => {
  const { customLogoUrl, uploadCustomLogo, resetCustomLogo, showToast, isAdmin } = useClub();
  
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(customLogoUrl);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [previewBg, setPreviewBg] = useState<'white' | 'blue' | 'dark'>('white');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Strictly restrict logo uploading to authenticated admin sessions
  if (!isOpen || !isAdmin) return null;

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WEBP, or SVG)');
      return;
    }

    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(1) + ' KB');

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawResult = e.target?.result as string;

      // SVG files can be used directly without rasterization
      if (file.type === 'image/svg+xml') {
        setPreviewUrl(rawResult);
        return;
      }

      // Optimize raster images client-side so they fit comfortably in Firestore & localStorage
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const format = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const optimizedDataUrl = canvas.toDataURL(format, 0.9);
          setPreviewUrl(optimizedDataUrl);
        } else {
          setPreviewUrl(rawResult);
        }
      };
      img.onerror = () => {
        setPreviewUrl(rawResult);
      };
      img.src = rawResult;
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!previewUrl) return;
    setIsSaving(true);
    const res = await uploadCustomLogo(previewUrl);
    setIsSaving(false);
    if (res.success) {
      showToast('ലോഗോ വിജയകരമായി അപ്‌ലോഡ് ചെയ്തു! (Logo applied successfully)');
      onClose();
    } else {
      showToast(res.error || 'Failed to save logo');
    }
  };

  const handleReset = async () => {
    await resetCustomLogo();
    setPreviewUrl(null);
    setFileName(null);
    setFileSize(null);
    showToast('ഔദ്യോഗിക 1994 വെക്ടർ ലോഗോ പുനഃസ്ഥാപിച്ചു (Reset to official vector logo)');
    onClose();
  };

  const useOfficialBannerAsset = () => {
    setPreviewUrl('/official-logo-banner.svg');
    setFileName('official-logo-banner.svg');
    setFileSize('18.4 KB');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      id="logo-upload-modal-overlay"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        id="logo-upload-modal"
      >
        {/* Modal Header */}
        <div className="bg-[#0072ce] text-white px-6 py-5 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ImageIcon className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                Official Logo Upload • ഔദ്യോഗിക ലോഗോ
              </h3>
              <p className="text-xs text-sky-100 font-medium">
                സെലസ് ബ്രദേഴ്‌സ് കലാ സാംസ്കാരിക വേദി പുതുപൊന്നാനി
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            id="close-logo-modal-btn"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* User Request Note Banner */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#0072ce] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed space-y-1">
              <p className="font-bold text-[#0072ce]">
                റീ-എഡിറ്റ് ചെയ്യാതെ നേരിട്ട് അപ്‌ലോഡ് ചെയ്യാം (Direct Upload without re-editing)
              </p>
              <p>
                താങ്കളുടെ കൈവശമുള്ള ലോഗോ ഫയൽ (JPG, PNG, WEBP, SVG) ക്രോപ്പ് ചെയ്യാതെയോ എഡിറ്റ് ചെയ്യാതെയോ നേരിട്ട് ഇവിടെ അപ്‌ലോഡ് ചെയ്യാം. അത് വെബ്സൈറ്റിൽ ഹെഡറിലും ബാനറിലും യഥാർത്ഥ അനുപാതത്തിൽ സ്വയം ഫിറ്റ് ആകുന്നതാണ്.
              </p>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-[#0072ce]" />
              <span className="text-xs font-bold text-slate-700">Official Assets:</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={useOfficialBannerAsset}
                className="px-3 py-1 bg-white hover:bg-sky-50 text-[#0072ce] border border-sky-200 text-xs font-bold rounded-lg shadow-2xs transition cursor-pointer"
              >
                Use 1994 Official Banner
              </button>
              <a
                href="/official-logo-banner.svg"
                download="Zealous-Brothers-Official-Banner.svg"
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition inline-flex items-center gap-1"
                title="Download SVG Banner"
              >
                <Download className="w-3 h-3" />
                <span>Download SVG</span>
              </a>
            </div>
          </div>

          {/* Drag and Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
              dragActive 
                ? 'border-[#0072ce] bg-sky-50 scale-[1.01]' 
                : 'border-slate-300 hover:border-[#0072ce] hover:bg-slate-50'
            }`}
            id="logo-dropzone"
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleInputChange} 
              className="hidden" 
              id="logo-file-input"
            />
            <div className="w-14 h-14 rounded-2xl bg-sky-100 text-[#0072ce] flex items-center justify-center shadow-inner">
              <Upload className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                ലോഗോ ഫയൽ തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ ഇവിടെ ഡ്രോപ്പ് ചെയ്യുക
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Click to browse or drag & drop (JPG, PNG, WEBP, SVG)
              </p>
            </div>
            {fileName && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                <FileCheck className="w-4 h-4" />
                <span>{fileName} ({fileSize})</span>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#0072ce]" />
                Live Preview (തത്സമയ കാഴ്ച്ച)
              </span>

              {/* Background Color Switcher */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPreviewBg('white')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                    previewBg === 'white' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  White
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewBg('blue')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                    previewBg === 'blue' ? 'bg-[#0072ce] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Blue
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewBg('dark')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                    previewBg === 'dark' ? 'bg-[#001733] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>

            {/* Preview Box */}
            <div 
              className={`rounded-2xl p-6 flex flex-col items-center justify-center min-h-[190px] transition-colors border ${
                previewBg === 'white' 
                  ? 'bg-white border-slate-200 shadow-sm' 
                  : previewBg === 'blue' 
                  ? 'bg-[#0072ce] border-sky-400 text-white' 
                  : 'bg-[#001733] border-slate-700 text-white'
              }`}
            >
              {previewUrl ? (
                <div className="max-w-md w-full flex flex-col items-center">
                  <img 
                    src={previewUrl} 
                    alt="Logo Preview" 
                    className="max-h-48 max-w-full object-contain drop-shadow-md rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[11px] font-mono mt-3 opacity-75">
                    {previewBg === 'white' ? 'Display on light pages' : 'Display on hero & dark headers'}
                  </span>
                </div>
              ) : (
                <div className="max-w-md w-full flex flex-col items-center">
                  <ClubLogo 
                    variant="banner" 
                    theme={previewBg === 'white' ? 'white-bg' : 'transparent-white'} 
                    size="100%" 
                  />
                  <span className="text-[11px] font-mono mt-2 opacity-70">
                    Official 1994 Vector Artwork
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Official Registration Reference Bar */}
          <div className="bg-slate-100 rounded-xl p-3 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
            <span className="font-bold text-slate-800">Estd: 1994</span>
            <span className="font-mono">Govt. Reg. No. 126/95</span>
            <span className="font-mono">Aff. NYK. No. 429/96</span>
            <span className="text-sky-700 font-semibold">Puthuponnani</span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            id="reset-logo-btn"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset to 1994 Vector
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              id="cancel-logo-btn"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!previewUrl || isSaving}
              className="px-5 py-2 text-xs font-black text-white bg-[#0072ce] hover:bg-sky-600 disabled:opacity-50 rounded-xl transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
              id="save-logo-btn"
            >
              <CheckCircle className="w-4 h-4" />
              {isSaving ? 'Applying...' : 'Apply Logo (ലോഗോ നിലവിൽ വരുത്തുക)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
