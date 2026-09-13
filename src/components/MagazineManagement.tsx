import React, { useState, useRef } from 'react';
import { 
  BookOpen, 
  Upload, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Download, 
  Check, 
  AlertCircle, 
  FileText, 
  Calendar, 
  Sparkles, 
  X,
  FileCheck,
  ExternalLink,
  Layers,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { Magazine } from '../types';

const PRESET_COVERS = [
  {
    name: 'Blue Souvenir',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Golden Heritage',
    url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sports & Energy',
    url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Literature & Arts',
    url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
  }
];

const SUGGESTED_HIGHLIGHTS = [
  'President’s Address & Editorial Review',
  'ZB Care Blood Wing: Emergency Saves Report',
  'All-Kerala 7s Football Championship Chronicle',
  'Akshara Jyothi Educational Kit Distribution',
  'Kala Samskarika Sargotsav & Cultural Fest',
  'Roll of Honor & Star Volunteer Citations',
  'Puthuponnani Socio-Cultural History'
];

export const MagazineManagement: React.FC = () => {
  const { magazines, addMagazine, updateMagazine, deleteMagazine } = useClub();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMagazineId, setEditingMagazineId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [edition, setEdition] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [description, setDescription] = useState('');
  const [pageCount, setPageCount] = useState<number>(60);
  const [fileSize, setFileSize] = useState('12.5 MB');
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0].url);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [pdfDataUrl, setPdfDataUrl] = useState<string | undefined>(undefined);
  const [pdfFileName, setPdfFileName] = useState<string | undefined>(undefined);
  const [highlights, setHighlights] = useState<string[]>([
    'President’s Address & Editorial Review',
    'ZB Care Blood Wing: Emergency Saves Report',
    'All-Kerala 7s Football Championship Chronicle'
  ]);
  const [highlightInput, setHighlightInput] = useState('');

  // Reader Preview Modal inside Admin
  const [previewMag, setPreviewMag] = useState<Magazine | null>(null);
  const [previewPage, setPreviewPage] = useState(0);

  // File input refs
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const pdfFileInputRef = useRef<HTMLInputElement>(null);

  // Handle cover image upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP) for the magazine cover.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setCoverImage(result);
        setErrorMessage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle PDF document file upload
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Estimate file size in MB or KB
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    const calculatedSize = file.size > 1024 * 1024 ? `${sizeInMb} MB` : `${Math.round(file.size / 1024)} KB`;
    setFileSize(calculatedSize);
    setPdfFileName(file.name);

    // Read as DataURL for offline/download capability
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setPdfDataUrl(result);
        setErrorMessage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Add highlight tag
  const handleAddHighlight = (textToAdd?: string) => {
    const text = (textToAdd || highlightInput).trim();
    if (!text) return;
    if (!highlights.includes(text)) {
      setHighlights((prev) => [...prev, text]);
    }
    if (!textToAdd) {
      setHighlightInput('');
    }
  };

  // Remove highlight tag
  const handleRemoveHighlight = (index: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== index));
  };

  // Open edit mode
  const handleStartEdit = (mag: Magazine) => {
    setEditingMagazineId(mag.id);
    setTitle(mag.title);
    setEdition(mag.edition);
    setYear(mag.year);
    setDescription(mag.description);
    setPageCount(mag.pageCount);
    setFileSize(mag.fileSize);
    setCoverImage(mag.coverImage);
    setDownloadUrl(mag.downloadUrl || '');
    setPdfDataUrl(mag.pdfDataUrl);
    setPdfFileName(mag.pdfFileName);
    setHighlights(mag.highlights || []);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset form
  const handleResetForm = () => {
    setEditingMagazineId(null);
    setTitle('');
    setEdition('');
    setYear(new Date().getFullYear().toString());
    setDescription('');
    setPageCount(64);
    setFileSize('12.5 MB');
    setCoverImage(PRESET_COVERS[0].url);
    setDownloadUrl('');
    setPdfDataUrl(undefined);
    setPdfFileName(undefined);
    setHighlights([
      'President’s Address & Editorial Review',
      'ZB Care Blood Wing: Emergency Saves Report',
      'All-Kerala 7s Football Championship Chronicle'
    ]);
    setHighlightInput('');
    setErrorMessage(null);
    setIsFormOpen(false);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage('Please enter the magazine title.');
      return;
    }
    if (!edition.trim()) {
      setErrorMessage('Please enter the edition/volume name.');
      return;
    }
    if (!year.trim()) {
      setErrorMessage('Please enter the publication year.');
      return;
    }
    if (!description.trim()) {
      setErrorMessage('Please provide a short description or editorial summary.');
      return;
    }

    setIsSubmitting(true);

    try {
      const magPayload = {
        title: title.trim(),
        edition: edition.trim(),
        year: year.trim(),
        description: description.trim(),
        pageCount: Number(pageCount) || 50,
        fileSize: fileSize.trim() || '10 MB',
        coverImage: coverImage || PRESET_COVERS[0].url,
        downloadUrl: downloadUrl.trim() || '#',
        highlights: highlights.length > 0 ? highlights : ['Official Annual Club Souvenir'],
        pdfDataUrl: pdfDataUrl,
        pdfFileName: pdfFileName || `${title.replace(/\s+/g, '_')}_Magazine.pdf`
      };

      if (editingMagazineId) {
        const result = await updateMagazine(editingMagazineId, magPayload);
        if (!result.success) {
          setErrorMessage(result.error || 'Failed to update magazine.');
          setIsSubmitting(false);
          return;
        }
      } else {
        const result = await addMagazine(magPayload);
        if (!result.success) {
          setErrorMessage(result.error || 'Failed to add magazine.');
          setIsSubmitting(false);
          return;
        }
      }

      handleResetForm();
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle direct download test
  const handleTestDownload = (mag: Magazine) => {
    if (mag.pdfDataUrl) {
      const link = document.createElement('a');
      link.href = mag.pdfDataUrl;
      link.download = mag.pdfFileName || `${mag.title.replace(/\s+/g, '_')}_Magazine.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Otherwise generate document
    const content = `ZEALOUS BROTHERS - ANNUAL CLUB SOUVENIR MAGAZINE
Organization: ZEALOUS BROTHERS (Kala Samskarika Vedi Puthuponnani)
Registration No: 126/95, 429/96
Edition: ${mag.title} (${mag.edition})
Publication Year: ${mag.year}
Page Count: ${mag.pageCount} Pages
File Notation: ${mag.fileSize}

OVERVIEW:
${mag.description}

TABLE OF CONTENTS & HIGHLIGHTS:
${mag.highlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}

Published by: ZEALOUS BROTHERS Social & Cultural Organization
Location: Puthuponnani, Malappuram, Kerala - 679577
Official Website: https://zealousbrothers.org | 24/7 Helpline: +91 98470 12345
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mag.title.replace(/\s+/g, '_')}_Souvenir.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#002244] border border-sky-500/30 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-sky-500/20 text-sky-300">
              <BookOpen className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-white">
              Annual Club Magazine & Souvenir Management
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0072ce] text-white uppercase">
              മാഗസിൻ
            </span>
          </div>
          <p className="text-xs text-sky-200/80 max-w-xl">
            Upload and publish the official club souvenirs, annual magazines, and special edition publications for Zealous Brothers Puthuponnani with PDF downloads and flip reader previews.
          </p>
        </div>

        <button
          onClick={() => {
            if (isFormOpen) {
              handleResetForm();
            } else {
              setIsFormOpen(true);
            }
          }}
          className="px-4 py-2.5 rounded-xl bg-[#0072ce] hover:bg-[#005bb5] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer shrink-0 border border-sky-400/40"
          id="toggle-upload-magazine-form-btn"
        >
          {isFormOpen ? (
            <>
              <X className="w-4 h-4" />
              <span>Cancel / Close Form</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>+ Upload New Magazine (പുതിയ മാഗസിൻ)</span>
            </>
          )}
        </button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#002244] border border-sky-500/20">
          <div className="text-[11px] text-sky-200/70 font-medium">Published Editions</div>
          <div className="text-xl font-black text-white mt-0.5 flex items-center justify-between">
            <span>{magazines.length}</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded">Active</span>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#002244] border border-sky-500/20">
          <div className="text-[11px] text-sky-200/70 font-medium">Latest Publication</div>
          <div className="text-sm font-bold text-amber-300 mt-1 truncate">
            {magazines[0]?.title || 'None'}
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#002244] border border-sky-500/20">
          <div className="text-[11px] text-sky-200/70 font-medium">Combined Pages</div>
          <div className="text-xl font-black text-sky-300 mt-0.5">
            {magazines.reduce((acc, m) => acc + (m.pageCount || 0), 0)} p.
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#002244] border border-sky-500/20">
          <div className="text-[11px] text-sky-200/70 font-medium">Public Free PDF Access</div>
          <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>Live on Website</span>
          </div>
        </div>
      </div>

      {/* Upload / Edit Form Drawer/Card */}
      {isFormOpen && (
        <form 
          onSubmit={handleSubmit}
          className="p-5 sm:p-6 rounded-3xl bg-[#002244] border-2 border-sky-400/50 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150"
          id="magazine-upload-form"
        >
          <div className="flex items-center justify-between border-b border-[#00386e] pb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-[#0072ce] text-white">
                <Upload className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-base font-black text-white">
                  {editingMagazineId ? 'Edit Magazine Publication' : 'Upload & Publish Club Souvenir Magazine'}
                </h4>
                <p className="text-xs text-sky-200/70">
                  {editingMagazineId ? 'Update issue specifications or re-upload files' : 'Fill in the souvenir details and attach the cover artwork & PDF document'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetForm}
              className="p-2 text-sky-200 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Cover Preview & Upload (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <label className="block text-xs font-bold text-sky-200 uppercase tracking-wider">
                Magazine Cover Artwork
              </label>

              {/* Cover Preview Card */}
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#001733] border-2 border-dashed border-sky-400/50 flex flex-col items-center justify-center group shadow-xl">
                {coverImage ? (
                  <>
                    <img 
                      src={coverImage} 
                      alt="Cover preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001733] via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0072ce] text-white uppercase tracking-wider">
                        {year} Edition
                      </span>
                      <h5 className="text-base font-black mt-1 truncate">{title || 'ZEALOUS SOUVENIR'}</h5>
                      <p className="text-[11px] text-sky-200 truncate">{edition || 'Annual Publication'}</p>
                    </div>

                    {/* Change Cover Hover Overlay */}
                    <button
                      type="button"
                      onClick={() => coverFileInputRef.current?.click()}
                      className="absolute inset-0 bg-[#001733]/80 backdrop-blur-xs flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white gap-2 cursor-pointer p-4 text-center"
                    >
                      <Upload className="w-6 h-6 text-sky-400" />
                      <span className="text-xs font-bold">Click to Change Cover Image</span>
                      <span className="text-[10px] text-sky-200">Supports JPG, PNG, WEBP</span>
                    </button>
                  </>
                ) : (
                  <div 
                    onClick={() => coverFileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center p-6 text-center cursor-pointer space-y-2 text-sky-300"
                  >
                    <Upload className="w-8 h-8 text-sky-400 animate-bounce" />
                    <span className="text-xs font-bold">Upload Cover Page</span>
                    <span className="text-[11px] text-sky-200/70">Click or Drag Image Here</span>
                  </div>
                )}
              </div>

              {/* Hidden file input for cover */}
              <input
                ref={coverFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
                id="magazine-cover-file-input"
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => coverFileInputRef.current?.click()}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#001733] hover:bg-sky-950 border border-sky-500/30 text-xs font-semibold text-sky-200 hover:text-white transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-sky-400" />
                  <span>Choose Cover from Computer</span>
                </button>
              </div>

              {/* Preset cover quick picks */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] text-sky-200/70 block">Or pick from sample library covers:</span>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_COVERS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCoverImage(preset.url)}
                      className={`relative rounded-lg overflow-hidden aspect-[3/4] border transition cursor-pointer ${
                        coverImage === preset.url ? 'border-sky-400 ring-2 ring-sky-400' : 'border-sky-500/30 opacity-70 hover:opacity-100'
                      }`}
                      title={preset.name}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Publication Details & PDF File Upload (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Title & Edition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-sky-200 mb-1">
                    Magazine Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. ZEAL 2026 / സെലസ് സ്മരണിക"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#001733] border border-sky-500/40 text-xs text-white placeholder-sky-200/40 focus:outline-none focus:border-sky-400"
                    id="magazine-title-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-sky-200 mb-1">
                    Edition / Volume *
                  </label>
                  <input
                    type="text"
                    required
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                    placeholder="e.g. 13th Annual Souvenir Edition"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#001733] border border-sky-500/40 text-xs text-white placeholder-sky-200/40 focus:outline-none focus:border-sky-400"
                    id="magazine-edition-input"
                  />
                </div>
              </div>

              {/* Year, Page Count, File Size */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-sky-200 mb-1">
                    Release Year *
                  </label>
                  <input
                    type="text"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#001733] border border-sky-500/40 text-xs text-white placeholder-sky-200/40 focus:outline-none focus:border-sky-400"
                    id="magazine-year-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-sky-200 mb-1">
                    Total Pages
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={pageCount}
                    onChange={(e) => setPageCount(Number(e.target.value))}
                    placeholder="64"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#001733] border border-sky-500/40 text-xs text-white placeholder-sky-200/40 focus:outline-none focus:border-sky-400"
                    id="magazine-pages-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-sky-200 mb-1">
                    File Size Label
                  </label>
                  <input
                    type="text"
                    value={fileSize}
                    onChange={(e) => setFileSize(e.target.value)}
                    placeholder="12.5 MB"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#001733] border border-sky-500/40 text-xs text-white placeholder-sky-200/40 focus:outline-none focus:border-sky-400"
                    id="magazine-size-input"
                  />
                </div>
              </div>

              {/* Magazine Document / PDF File Upload Box */}
              <div className="p-4 rounded-2xl bg-[#001733] border border-sky-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-sky-200 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-sky-400" />
                    <span>Upload Magazine Document (PDF / Souvenir File)</span>
                  </label>
                  {pdfDataUrl && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded flex items-center gap-1">
                      <FileCheck className="w-3 h-3" />
                      File Attached
                    </span>
                  )}
                </div>

                <div 
                  onClick={() => pdfFileInputRef.current?.click()}
                  className={`p-4 rounded-xl border-2 border-dashed transition flex flex-col items-center justify-center text-center cursor-pointer gap-2 ${
                    pdfDataUrl 
                      ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300' 
                      : 'border-sky-500/40 hover:border-sky-400 bg-[#002244]/60 text-sky-200'
                  }`}
                >
                  <Upload className={`w-6 h-6 ${pdfDataUrl ? 'text-emerald-400' : 'text-sky-400'}`} />
                  {pdfDataUrl ? (
                    <div>
                      <div className="text-xs font-bold text-white truncate max-w-xs">{pdfFileName || 'Attached Magazine File'}</div>
                      <div className="text-[11px] text-emerald-400">File attached successfully ({fileSize}) • Click to replace</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-xs font-bold text-white">Click to Select Magazine PDF / Document</div>
                      <div className="text-[11px] text-sky-200/70">Select file from device (.pdf, .doc, .docx)</div>
                    </div>
                  )}
                </div>

                {/* Hidden PDF file input */}
                <input
                  ref={pdfFileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                  id="magazine-pdf-file-input"
                />

                {/* External link fallback */}
                <div>
                  <span className="text-[11px] text-sky-200/70 block mb-1">
                    Or external Google Drive / Cloud Download URL (Optional):
                  </span>
                  <input
                    type="url"
                    value={downloadUrl}
                    onChange={(e) => setDownloadUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/... or https://..."
                    className="w-full px-3 py-2 rounded-xl bg-[#002244] border border-sky-500/30 text-xs text-white placeholder-sky-200/40 focus:outline-none focus:border-sky-400"
                    id="magazine-external-url-input"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-sky-200 mb-1">
                  Description / Editorial Overview *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of annual activities, sports championships, blood donation milestones, and editorial messages..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#001733] border border-sky-500/40 text-xs text-white placeholder-sky-200/40 focus:outline-none focus:border-sky-400 resize-none"
                  id="magazine-desc-input"
                />
              </div>

              {/* Key Highlights / Table of Contents */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-sky-200">
                    Inside This Souvenir (Key Articles & Highlights)
                  </label>
                  <span className="text-[10px] text-sky-200/60">{highlights.length} added</span>
                </div>

                {/* Tags List */}
                <div className="flex flex-wrap gap-1.5 min-h-[38px] p-2 rounded-xl bg-[#001733] border border-sky-500/30">
                  {highlights.map((h, index) => (
                    <span 
                      key={index}
                      className="px-2.5 py-1 rounded-lg bg-[#002244] border border-sky-500/30 text-xs text-sky-100 flex items-center gap-1.5"
                    >
                      <span className="truncate max-w-[200px]">{h}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(index)}
                        className="text-sky-300 hover:text-red-400 p-0.5 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {highlights.length === 0 && (
                    <span className="text-xs text-sky-200/40 italic p-1">No highlights added yet</span>
                  )}
                </div>

                {/* Add new tag input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddHighlight();
                      }
                    }}
                    placeholder="Add article title or chapter name..."
                    className="flex-1 px-3 py-2 rounded-xl bg-[#001733] border border-sky-500/40 text-xs text-white placeholder-sky-200/40 focus:outline-none focus:border-sky-400"
                    id="magazine-highlight-input"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddHighlight()}
                    className="px-3.5 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/30 text-xs font-bold transition cursor-pointer"
                  >
                    + Add
                  </button>
                </div>

                {/* Quick suggestions */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-sky-200/60 mr-1">Quick Suggestions:</span>
                  {SUGGESTED_HIGHLIGHTS.slice(0, 4).map((suggested, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddHighlight(suggested)}
                      className="px-2 py-0.5 rounded text-[10px] bg-[#001733] hover:bg-[#002244] text-sky-300 border border-sky-500/20 transition cursor-pointer truncate max-w-[180px]"
                    >
                      + {suggested}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#00386e]">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2.5 rounded-xl bg-[#001733] hover:bg-white/10 text-sky-200 text-xs font-bold transition cursor-pointer border border-sky-500/20"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#0072ce] hover:bg-[#005bb5] disabled:opacity-50 text-white text-xs font-bold transition shadow-lg flex items-center gap-2 cursor-pointer border border-sky-400/40"
                  id="submit-magazine-btn"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Publishing Magazine...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingMagazineId ? 'Save Changes' : 'Upload & Publish Magazine (പ്രസിദ്ധീകരിക്കുക)'}</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </form>
      )}

      {/* Published Magazines List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#00386e] pb-2">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Published Club Magazines & Archives
            </h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300">
              {magazines.length} Publications
            </span>
          </div>
          <span className="text-[11px] text-sky-200/60">
            Click Download or Preview to test public visitor experience
          </span>
        </div>

        {magazines.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#002244] border border-sky-500/20 space-y-3">
            <BookOpen className="w-10 h-10 text-sky-400 mx-auto opacity-60" />
            <div className="text-sm font-bold text-white">No Magazines Published Yet</div>
            <p className="text-xs text-sky-200/70 max-w-sm mx-auto">
              Upload the first club souvenir edition to make it accessible to members and the public.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-2 px-4 py-2 rounded-xl bg-[#0072ce] hover:bg-[#005bb5] text-white text-xs font-bold transition cursor-pointer"
            >
              + Upload First Magazine
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {magazines.map((mag, idx) => (
              <div
                key={mag.id}
                className="p-4 rounded-2xl bg-[#002244] border border-sky-500/30 hover:border-sky-400/60 transition flex flex-col justify-between gap-4 shadow-md group relative overflow-hidden"
              >
                {/* Top Badge for latest */}
                {idx === 0 && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 rounded text-[9px] font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 uppercase tracking-wider shadow">
                      Latest Edition
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Thumbnail Cover */}
                  <div className="w-20 h-28 rounded-xl bg-[#001733] overflow-hidden shrink-0 border border-sky-400/30 shadow-md relative group/thumb">
                    <img
                      src={mag.coverImage}
                      alt={mag.title}
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform"
                    />
                    {mag.pdfDataUrl && (
                      <div className="absolute bottom-1 right-1 bg-emerald-500 text-white rounded p-0.5 shadow" title="Direct PDF Attached">
                        <FileCheck className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-1.5 flex-1 min-w-0 pr-12">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#001733] text-sky-300 border border-sky-500/30">
                        {mag.year}
                      </span>
                      <span className="text-[11px] text-sky-200/70 truncate">
                        {mag.edition}
                      </span>
                    </div>

                    <h5 className="text-base font-black text-white truncate group-hover:text-sky-300 transition-colors">
                      {mag.title}
                    </h5>

                    <p className="text-xs text-sky-200/80 line-clamp-2 leading-relaxed">
                      {mag.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-sky-300/80 pt-1">
                      <span>{mag.pageCount} Pages</span>
                      <span>•</span>
                      <span>{mag.fileSize}</span>
                      {mag.highlights && (
                        <>
                          <span>•</span>
                          <span>{mag.highlights.length} Highlights</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Highlights preview */}
                {mag.highlights && mag.highlights.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-[#001733] border border-sky-500/20 text-[11px] space-y-1">
                    <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider block">
                      Inside Contents:
                    </span>
                    <div className="text-sky-200/80 truncate">
                      • {mag.highlights.slice(0, 2).join(' • ')}
                      {mag.highlights.length > 2 && ` (+${mag.highlights.length - 2} more)`}
                    </div>
                  </div>
                )}

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-[#00386e]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setPreviewMag(mag);
                        setPreviewPage(0);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#001733] hover:bg-sky-950 text-sky-200 hover:text-white text-xs font-semibold border border-sky-500/30 transition flex items-center gap-1.5 cursor-pointer"
                      title="Open Interactive Reader Preview"
                    >
                      <Eye className="w-3.5 h-3.5 text-sky-400" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => handleTestDownload(mag)}
                      className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-semibold border border-sky-400/30 transition flex items-center gap-1.5 cursor-pointer"
                      title="Test Download File"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-300" />
                      <span>Download ({mag.fileSize})</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStartEdit(mag)}
                      className="p-2 rounded-lg bg-[#001733] hover:bg-white/10 text-sky-200 hover:text-white transition cursor-pointer"
                      title="Edit Magazine Details"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete '${mag.title}'? This will remove it from public view.`)) {
                          deleteMagazine(mag.id);
                        }
                      }}
                      className="p-2 rounded-lg bg-[#001733] hover:bg-red-900/40 text-sky-200 hover:text-red-300 transition cursor-pointer"
                      title="Delete Magazine"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reader Preview Modal */}
      {previewMag && (
        <div className="fixed inset-0 z-60 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#001733] rounded-3xl max-w-2xl w-full border border-sky-400/40 text-white shadow-2xl overflow-hidden relative space-y-4 p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#00386e] pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-400" />
                <div>
                  <h4 className="text-base font-black text-white">{previewMag.title}</h4>
                  <p className="text-xs text-sky-200/70">{previewMag.edition} • {previewMag.year}</p>
                </div>
              </div>

              <button
                onClick={() => setPreviewMag(null)}
                className="p-2 text-sky-200 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Reader View */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-5 flex justify-center">
                <div className="rounded-xl overflow-hidden aspect-[3/4] border-2 border-sky-400/40 shadow-xl max-w-[200px] w-full">
                  <img src={previewMag.coverImage} alt={previewMag.title} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="sm:col-span-7 space-y-3 text-xs text-sky-100">
                <div className="p-3 rounded-xl bg-[#002244] border border-sky-500/30">
                  <span className="font-bold text-sky-300 block mb-1">Editorial Synopsis:</span>
                  <p className="text-sky-200/90 leading-relaxed">{previewMag.description}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#002244] border border-sky-500/30 space-y-1.5">
                  <span className="font-bold text-sky-300 block">Table of Contents & Highlights:</span>
                  <div className="space-y-1 max-h-36 overflow-y-auto">
                    {previewMag.highlights?.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-sky-200/90">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-sky-300/80 pt-1">
                  <span>{previewMag.pageCount} Pages</span>
                  <span>{previewMag.fileSize}</span>
                  <button
                    onClick={() => handleTestDownload(previewMag)}
                    className="px-3 py-1.5 rounded-lg bg-[#0072ce] hover:bg-[#005bb5] text-white font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-[#00386e] pt-3 text-center">
              <button
                onClick={() => setPreviewMag(null)}
                className="px-5 py-2 rounded-xl bg-[#002244] hover:bg-[#00386e] text-sky-200 text-xs font-bold transition cursor-pointer border border-sky-500/30"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
