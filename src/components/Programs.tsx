import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Tag, 
  Phone, 
  Share2, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Filter,
  Sparkles,
  Trophy,
  Heart,
  Music
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { Program, ProgramCategory, ProgramStatus } from '../types';

export const Programs: React.FC = () => {
  const { programs, loadingPrograms } = useClub();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const categories = ['All', 'Sports', 'Charity', 'Cultural', 'Healthcare'];
  const statuses = ['All', 'Upcoming', 'Ongoing', 'Completed'];

  const filteredPrograms = programs.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  const getCategoryIcon = (cat: ProgramCategory) => {
    switch (cat) {
      case 'Sports': return Trophy;
      case 'Charity': return Heart;
      case 'Cultural': return Music;
      case 'Healthcare': return AlertCircle;
      default: return Sparkles;
    }
  };

  const getStatusBadgeClass = (status: ProgramStatus) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Ongoing':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse';
      case 'Completed':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <section id="programs" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#0072ce] text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              Club Activities & Calendar • പരിപാടികൾ
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Programs & Flagship Events
            </h2>
            <p className="text-base text-slate-600">
              From our famous 7s floodlit football tournament in Puthuponnani to educational kit distributions and arts fests, explore our active community initiatives.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0072ce] text-white shadow-md shadow-sky-900/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Status Secondary Filter Bar */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4 text-xs font-medium text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">Filter by Status:</span>
            <div className="flex items-center gap-1.5">
              {statuses.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2.5 py-1 rounded-md transition ${
                    selectedStatus === st
                      ? 'bg-slate-900 text-white font-bold'
                      : 'hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div>
            Showing <strong className="text-slate-900">{filteredPrograms.length}</strong> of{' '}
            <strong className="text-slate-900">{programs.length}</strong> total initiatives
          </div>
        </div>

        {/* Programs Grid */}
        {loadingPrograms ? (
          <div className="py-16 text-center text-slate-400 animate-pulse">
            Loading club programs & events...
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 rounded-2xl border border-slate-200 p-8">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No programs match this filter</h3>
            <p className="text-xs text-slate-500 mt-1">Try switching categories or check back soon for announcements.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedStatus('All');
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((prog) => {
              const CatIcon = getCategoryIcon(prog.category);
              return (
                <div
                  key={prog.id}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#0072ce]/40 transition-all duration-200 flex flex-col group"
                  id={`program-card-${prog.id}`}
                >
                  {/* Thumbnail Banner */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#001733]">
                    <img
                      src={prog.imageUrl || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'}
                      alt={prog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                    
                    {/* Top tags */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#002244]/90 text-white border border-sky-400/30 backdrop-blur-sm flex items-center gap-1">
                        <CatIcon className="w-3 h-3 text-sky-400" />
                        {prog.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${getStatusBadgeClass(prog.status)}`}>
                        {prog.status}
                      </span>
                    </div>

                    {/* Date label overlay */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(prog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        {prog.time && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {prog.time}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0072ce] transition-colors line-clamp-2">
                        {prog.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {prog.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#0072ce] shrink-0 mt-0.5" />
                        <span className="truncate font-medium text-slate-700">{prog.venue}</span>
                      </div>
                      {prog.organizerContact && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Contact: {prog.organizerContact}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Footer Action */}
                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProgram(prog)}
                        className="text-xs font-bold text-[#0072ce] hover:text-[#005bb5] flex items-center gap-1 group-hover:underline cursor-pointer"
                        id={`view-details-${prog.id}`}
                      >
                        View Full Program Details →
                      </button>
                      {prog.status === 'Upcoming' && (
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Registration Open
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            
            <div className="relative h-64 w-full bg-slate-900">
              <img
                src={selectedProgram.imageUrl || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'}
                alt={selectedProgram.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white w-9 h-9 rounded-full flex items-center justify-center transition"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-2 inline-block ${getStatusBadgeClass(selectedProgram.status)}`}>
                  {selectedProgram.status}
                </span>
                <h3 className="text-2xl font-bold leading-tight text-white">{selectedProgram.title}</h3>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-sky-50/70 border border-sky-100 text-xs">
                <div className="space-y-1">
                  <div className="text-slate-400 font-medium">Date & Schedule</div>
                  <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#0072ce]" />
                    {selectedProgram.date} {selectedProgram.time ? `• ${selectedProgram.time}` : ''}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-400 font-medium">Venue Location</div>
                  <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#0072ce]" />
                    {selectedProgram.venue}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-400 font-medium">Category Wing</div>
                  <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-[#0072ce]" />
                    {selectedProgram.category} Division
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-400 font-medium">Organizer Desk</div>
                  <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#0072ce]" />
                    {selectedProgram.organizerContact || '+91 98470 12345'}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900">Event Overview & Details</h4>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedProgram.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
                <a
                  href={`tel:${selectedProgram.organizerContact || '+919847012345'}`}
                  className="px-5 py-2.5 rounded-xl bg-[#0072ce] hover:bg-[#005bb5] text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  Contact Desk / Inquire
                </a>

                <button
                  onClick={() => setSelectedProgram(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
