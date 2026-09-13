import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  X, 
  Maximize2, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/initialData';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const filters = ['All', 'Sports', 'Charity', 'Cultural', 'Youth'];

  const filteredPhotos = GALLERY_ITEMS.filter((item) => {
    if (selectedFilter === 'All') return true;
    return item.category === selectedFilter;
  });

  return (
    <section id="gallery" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-100 text-[#0072ce] text-xs font-bold uppercase tracking-wider">
              <ImageIcon className="w-3.5 h-3.5" />
              Memories & Moments • ചിത്രശാല
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Club Moments Gallery
            </h2>
            <p className="text-base text-slate-600">
              Capturing our brotherhood across the football turf, relief drives, cultural festivals, and community programs in Puthuponnani.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((flt) => (
              <button
                key={flt}
                onClick={() => setSelectedFilter(flt)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedFilter === flt
                    ? 'bg-[#0072ce] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {flt}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative rounded-3xl overflow-hidden bg-[#001733] cursor-pointer aspect-[4/3] shadow-sm hover:shadow-xl border border-slate-200 hover:border-[#0072ce]/60 transition-all duration-300"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001733] via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"></div>

              {/* Tag */}
              <div className="absolute top-3.5 left-3.5">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#002244]/90 text-white border border-sky-400/30 backdrop-blur-sm">
                  {photo.category}
                </span>
              </div>

              {/* Date */}
              <div className="absolute top-3.5 right-3.5 text-sky-200 text-[11px] font-medium flex items-center gap-1 bg-[#001733]/70 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-sky-500/20">
                <Calendar className="w-3 h-3 text-sky-300" />
                <span>{photo.date}</span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                  {photo.title}
                </h4>
                <p className="text-xs text-sky-100/75 line-clamp-2 leading-relaxed">
                  {photo.caption}
                </p>
              </div>

              {/* Hover icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/40 shadow-lg">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-[#001733]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#002244] rounded-3xl overflow-hidden border border-sky-500/40 shadow-2xl animate-in zoom-in-95 duration-150">
            
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#001733]/80 text-white flex items-center justify-center hover:bg-[#0072ce] transition cursor-pointer"
              aria-label="Close image"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-[#002244] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#00386e]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0072ce] text-white uppercase tracking-wider">
                    {activePhoto.category}
                  </span>
                  <span className="text-xs text-sky-200 font-mono">{activePhoto.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{activePhoto.title}</h3>
                <p className="text-xs sm:text-sm text-sky-100/80 mt-1">{activePhoto.caption}</p>
              </div>

              <button
                onClick={() => setActivePhoto(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition self-start sm:self-auto cursor-pointer"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
