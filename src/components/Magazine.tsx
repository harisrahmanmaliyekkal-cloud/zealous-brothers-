import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Download, 
  Eye, 
  Sparkles, 
  FileText, 
  Check, 
  ArrowRight, 
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Share2
} from 'lucide-react';
import { CLUB_MAGAZINES } from '../data/initialData';
import { Magazine as MagazineType } from '../types';
import { useClub } from '../context/ClubContext';

export const Magazine: React.FC = () => {
  const { magazines } = useClub();
  const magazinesList = magazines && magazines.length > 0 ? magazines : CLUB_MAGAZINES;
  const [activeMagazine, setActiveMagazine] = useState<MagazineType>(magazinesList[0]);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [currentReaderPage, setCurrentReaderPage] = useState(0);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  // Sync active magazine when magazinesList updates
  useEffect(() => {
    if (magazinesList.length > 0) {
      const exists = magazinesList.find(m => m.id === activeMagazine?.id);
      if (!exists) {
        setActiveMagazine(magazinesList[0]);
      }
    }
  }, [magazinesList]);

  const previewPages = [
    {
      page: 1,
      tag: 'Cover Page',
      title: 'ZEAL 2025-26 - The Spirit of Brotherhood & Upliftment',
      subtitle: 'Annual Souvenir Edition • ZEALOUS BROTHERS PUTHUPONNANI',
      content: 'A comprehensive chronicle celebrating the socio-cultural milestones, blood donation saves, 7s football triumphs, and social welfare across Puthuponnani.'
    },
    {
      page: 2,
      tag: 'Presidential Address',
      title: 'United in Purpose: Three Decades of Unbroken Brotherhood',
      subtitle: 'By Club President & Cultural Secretariat',
      content: '"When Zealous Brothers was officially registered (Reg No: 126/95, 429/96), our founders envisioned a grassroots fraternity where no youth was left behind, and no hospital patient suffered for lack of blood. Today, standing as a pillar in Puthuponnani with sports, cultural arts, and round-the-clock charity, we reaffirm our pledge to our homeland."'
    },
    {
      page: 3,
      tag: 'Sports Special',
      title: 'Thunder Under the Floodlights: All-Kerala 7s Football',
      subtitle: 'Match Analysis, Golden Boot & Tactical Report',
      content: '24 top regional clubs clashed over 6 electrifying evenings at Puthuponnani. Relive the nail-biting final penalty shootout where Zealous FC clinched the championship rolling trophy before roaring crowds.'
    },
    {
      page: 4,
      tag: 'Social Service Chronicle',
      title: 'ZB Care Blood Wing: 420+ Emergency Units Mobilized',
      subtitle: 'Documenting Midnight Emergency Calls & Hospital Partnerships',
      content: 'Real stories of patients whose lives were saved through rapid volunteer blood donation in Ponnani, Edappal, and Malappuram trauma care facilities.'
    },
    {
      page: 5,
      tag: 'Member Contributions & Roll of Honor',
      title: 'Youth Reflections, Malayalam Poetry, Arts & Roll of Honor',
      subtitle: 'Voices of Tomorrow • സെലസ് ബ്രദേഴ്‌സ്',
      content: 'Showcasing original short stories, member poetry, cultural fest memoirs, and recognizing our top volunteer donors who reached milestones of 10+ voluntary blood donations.'
    }
  ];

  const handleDownload = (mag: MagazineType) => {
    setDownloadingId(mag.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccessId(mag.id);

      if (mag.pdfDataUrl) {
        const link = document.createElement('a');
        link.href = mag.pdfDataUrl;
        link.download = mag.pdfFileName || `${mag.title.replace(/\s+/g, '_')}_Magazine.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const dummyContent = `ZEALOUS BROTHERS - ANNUAL CLUB SOUVENIR MAGAZINE
Organization: ZEALOUS BROTHERS (Kala Samskarika Vedi Puthuponnani)
Registration No: 126/95, 429/96
Edition: ${mag.title} (${mag.edition})
Year: ${mag.year}
Pages: ${mag.pageCount}
PDF Size: ${mag.fileSize}

EDITORIAL OVERVIEW:
${mag.description}

TABLE OF CONTENTS & HIGHLIGHTS:
${mag.highlights?.map((h, i) => `${i + 1}. ${h}`).join('\n') || '1. Annual Club Chronicle\n2. ZB Care Blood Wing Report\n3. Sports & Tournaments'}

Published by: ZEALOUS BROTHERS Social & Cultural Organization
Location: Puthuponnani, Malappuram, Kerala - 679577
Website: https://zealousbrothers.org | 24/7 Helpline: +91 98470 12345
`;
        const blob = new Blob([dummyContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${mag.title.replace(/\s+/g, '_')}_Souvenir.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      setTimeout(() => setDownloadSuccessId(null), 4000);
    }, 1200);
  };

  return (
    <section id="magazine" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-100 text-[#0072ce] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Official Publication • ക്ലബ്ബ് മാഗസിൻ
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            The Annual Club Souvenir Magazine
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Read our annual souvenir containing in-depth reports of all social activities, sporting tournaments, member literature, and future development roadmaps for Puthuponnani.
          </p>
        </div>

        {/* Featured Magazine Hero Box */}
        <div className="rounded-3xl bg-[#002244] text-white p-8 sm:p-10 border border-sky-500/30 shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Magazine Cover Preview */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group cursor-pointer max-w-xs w-full" onClick={() => setIsReaderOpen(true)}>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#0072ce] to-sky-400 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-sky-400/40 aspect-[3/4] bg-[#001733]">
                  <img
                    src={activeMagazine.coverImage}
                    alt={activeMagazine.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0072ce] text-white uppercase tracking-wider">
                      Latest Issue
                    </span>
                    <h4 className="text-xl font-black mt-1">{activeMagazine.title}</h4>
                    <p className="text-xs text-sky-200">{activeMagazine.edition}</p>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#001733]/70 backdrop-blur-xs transition-opacity">
                    <span className="px-4 py-2 rounded-xl bg-white text-[#002244] font-bold text-xs flex items-center gap-2 shadow-lg">
                      <Eye className="w-4 h-4 text-[#0072ce]" />
                      Open Flip Reader
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Magazine Description and Highlights */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-300">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Release Year: {activeMagazine.year}</span>
                  <span>•</span>
                  <span>{activeMagazine.pageCount} Pages</span>
                  <span>•</span>
                  <span>PDF Size: {activeMagazine.fileSize}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {activeMagazine.title} : {activeMagazine.edition}
                </h3>
                <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed">
                  {activeMagazine.description}
                </p>
              </div>

              {/* Highlights list */}
              <div className="space-y-2.5">
                <h5 className="text-xs font-bold text-sky-300 uppercase tracking-wider">
                  Inside This Annual Souvenir:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-sky-100">
                  {activeMagazine.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-sky-500/20">
                      <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsReaderOpen(true)}
                  className="px-6 py-3 rounded-xl bg-[#0072ce] hover:bg-[#005bb5] text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-sky-950/60 flex items-center gap-2 cursor-pointer border border-sky-400/30"
                  id="view-magazine-reader-btn"
                >
                  <Eye className="w-4 h-4" />
                  <span>Interactive Reader & Highlights</span>
                </button>

                <button
                  onClick={() => handleDownload(activeMagazine)}
                  disabled={downloadingId === activeMagazine.id}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-sky-50 text-[#002244] font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-md"
                  id="download-magazine-btn"
                >
                  {downloadingId === activeMagazine.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#002244] border-t-transparent rounded-full animate-spin"></div>
                      <span>Preparing Download...</span>
                    </>
                  ) : downloadSuccessId === activeMagazine.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Downloaded Successfully!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#0072ce]" />
                      <span>Download Full Magazine ({activeMagazine.fileSize})</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Previous Editions Archive */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="text-lg font-bold text-slate-900">Archives & Previous Editions</h4>
            <span className="text-xs text-slate-500">Free PDF Access for Members & Public</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {magazinesList.map((mag) => (
              <div
                key={mag.id}
                className={`p-5 rounded-2xl bg-white border transition flex items-center justify-between gap-4 shadow-sm ${
                  activeMagazine.id === mag.id ? 'border-[#0072ce] ring-1 ring-[#0072ce]' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-16 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-slate-300">
                    <img src={mag.coverImage} alt={mag.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{mag.title}</h5>
                    <p className="text-xs text-slate-500">{mag.edition} • {mag.year}</p>
                    <span className="text-[11px] text-slate-400">{mag.pageCount} Pages • {mag.fileSize}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveMagazine(mag);
                      setIsReaderOpen(true);
                    }}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDownload(mag)}
                    className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#0072ce] text-xs font-bold transition cursor-pointer"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Magazine Interactive Flip Reader Modal */}
      {isReaderOpen && (
        <div className="fixed inset-0 z-50 bg-[#001733]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-sky-100 overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
            
            {/* Modal Top Bar */}
            <div className="p-4 sm:p-5 bg-[#002244] text-white flex items-center justify-between border-b border-[#00386e]">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-sky-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">{activeMagazine.title} - Digital Souvenir</h4>
                  <p className="text-[11px] text-sky-200">Page {currentReaderPage + 1} of {previewPages.length}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(activeMagazine)}
                  className="px-3.5 py-1.5 bg-[#0072ce] hover:bg-[#005bb5] text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
                <button
                  onClick={() => setIsReaderOpen(false)}
                  className="p-2 text-sky-200 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Reader Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-slate-50">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 max-w-2xl mx-auto">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-[#0072ce]">
                    {previewPages[currentReaderPage].tag}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ZEALOUS BROTHERS • PUTHUPONNANI
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {previewPages[currentReaderPage].title}
                  </h3>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#0072ce]">
                    {previewPages[currentReaderPage].subtitle}
                  </h4>
                </div>

                <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line border-l-3 border-[#0072ce] pl-4 py-1 italic">
                  {previewPages[currentReaderPage].content}
                </div>

                {/* Simulated Article Highlights */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-500">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-800">Editorial Wing:</strong>
                    Puthuponnani Cultural Board
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-800">Circulation:</strong>
                    2,500 Print Copies & Global PDF
                  </div>
                </div>

              </div>
            </div>

            {/* Reader Controls Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentReaderPage((p) => Math.max(0, p - 1))}
                disabled={currentReaderPage === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Page
              </button>

              <div className="flex items-center gap-1.5">
                {previewPages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentReaderPage(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentReaderPage === idx ? 'bg-[#0072ce] w-6' : 'bg-slate-300 w-2.5'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentReaderPage((p) => Math.min(previewPages.length - 1, p + 1))}
                disabled={currentReaderPage === previewPages.length - 1}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#002244] text-white hover:bg-[#002b5c] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 cursor-pointer"
              >
                Next Page
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
