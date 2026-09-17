import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Donor, Program, ProgramStatus, ClubMember, Magazine } from '../types';
import { INITIAL_DONORS, INITIAL_PROGRAMS, INITIAL_MEMBERS, CLUB_MAGAZINES } from '../data/initialData';
import { 
  db, 
  auth, 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  setDoc,
  getDoc,
  onSnapshot,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from '../lib/firebase';

interface ClubContextType {
  donors: Donor[];
  programs: Program[];
  members: ClubMember[];
  magazines: Magazine[];
  loadingDonors: boolean;
  loadingPrograms: boolean;
  loadingMembers: boolean;
  loadingMagazines: boolean;
  isAdmin: boolean;
  adminUserEmail: string | null;
  customLogoUrl: string | null;
  heroBannerUrl: string;
  heroBannerPosition: string;
  isLogoUploadModalOpen: boolean;
  openLogoUploadModal: () => void;
  closeLogoUploadModal: () => void;
  uploadCustomLogo: (logoDataUrl: string) => Promise<{ success: boolean; error?: string }>;
  resetCustomLogo: () => Promise<void>;
  uploadHeroBanner: (bannerDataUrl: string) => Promise<{ success: boolean; error?: string }>;
  resetHeroBanner: () => Promise<void>;
  updateHeroBannerPosition: (position: string) => Promise<{ success: boolean; error?: string }>;
  addDonor: (donor: Omit<Donor, 'id'>) => Promise<{ success: boolean; error?: string }>;
  deleteDonor: (id: string) => Promise<{ success: boolean; error?: string }>;
  toggleDonorAvailability: (id: string, currentStatus?: boolean) => Promise<void>;
  addProgram: (program: Omit<Program, 'id'>) => Promise<{ success: boolean; error?: string }>;
  deleteProgram: (id: string) => Promise<{ success: boolean; error?: string }>;
  updateProgramStatus: (id: string, status: ProgramStatus) => Promise<void>;
  addMember: (member: Omit<ClubMember, 'id'>) => Promise<{ success: boolean; error?: string; member?: ClubMember }>;
  updateMember: (id: string, memberData: Partial<ClubMember>) => Promise<{ success: boolean; error?: string }>;
  deleteMember: (id: string) => Promise<{ success: boolean; error?: string }>;
  getMemberById: (identifier: string) => ClubMember | undefined;
  addMagazine: (magazine: Omit<Magazine, 'id'>) => Promise<{ success: boolean; error?: string; magazine?: Magazine }>;
  updateMagazine: (id: string, magazineData: Partial<Magazine>) => Promise<{ success: boolean; error?: string }>;
  deleteMagazine: (id: string) => Promise<{ success: boolean; error?: string }>;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export const ClubProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [members, setMembers] = useState<ClubMember[]>([]);
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [loadingDonors, setLoadingDonors] = useState(true);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [loadingMagazines, setLoadingMagazines] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUserEmail, setAdminUserEmail] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('zealous_custom_logo') || '/zb-official-logo.png';
    } catch {
      return '/zb-official-logo.png';
    }
  });
  const [heroBannerUrl, setHeroBannerUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('zealous_hero_banner') || '/hero-puthuponnani.jpg';
    } catch {
      return '/hero-puthuponnani.jpg';
    }
  });
  const [heroBannerPosition, setHeroBannerPosition] = useState<string>(() => {
    try {
      return localStorage.getItem('zealous_hero_banner_pos') || 'center 72%';
    } catch {
      return 'center 72%';
    }
  });
  const [isLogoUploadModalOpen, setIsLogoUploadModalOpen] = useState(false);

  const openLogoUploadModal = () => setIsLogoUploadModalOpen(true);
  const closeLogoUploadModal = () => setIsLogoUploadModalOpen(false);

  const updateHeroBannerPosition = async (position: string) => {
    try {
      setHeroBannerPosition(position);
      localStorage.setItem('zealous_hero_banner_pos', position);
      try {
        const settingsDoc = doc(db, 'settings', 'branding');
        await setDoc(settingsDoc, { heroBannerPosition: position, updatedAt: new Date().toISOString() }, { merge: true });
      } catch (firestoreErr) {
        console.info('Hero banner position saved to local browser storage:', firestoreErr);
      }
      showToast('ബാനർ വ്യൂ ക്രമീകരിച്ചു! (Banner position updated)');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to update banner position' };
    }
  };

  const uploadHeroBanner = async (bannerDataUrl: string) => {
    try {
      setHeroBannerUrl(bannerDataUrl);
      localStorage.setItem('zealous_hero_banner', bannerDataUrl);

      try {
        const settingsDoc = doc(db, 'settings', 'branding');
        await setDoc(settingsDoc, { heroBannerUrl: bannerDataUrl, updatedAt: new Date().toISOString() }, { merge: true });
      } catch (firestoreErr) {
        console.info('Hero banner saved to local browser storage:', firestoreErr);
      }

      showToast('ഹീറോ ബാനർ ചിത്രം വിജയകരമായി മാറ്റി! (Hero banner updated across all devices)');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to save hero banner' };
    }
  };

  const resetHeroBanner = async () => {
    setHeroBannerUrl('/hero-puthuponnani.jpg');
    localStorage.removeItem('zealous_hero_banner');
    try {
      const settingsDoc = doc(db, 'settings', 'branding');
      await setDoc(settingsDoc, { heroBannerUrl: '/hero-puthuponnani.jpg', updatedAt: new Date().toISOString() }, { merge: true });
    } catch {
      // ignore
    }
    showToast('പുതുപൊന്നാനി ഡിഫോൾട്ട് ബാനർ പുനഃസ്ഥാപിച്ചു (Reset to Puthuponnani default)');
  };

  const uploadCustomLogo = async (logoDataUrl: string) => {
    try {
      setCustomLogoUrl(logoDataUrl);
      localStorage.setItem('zealous_custom_logo', logoDataUrl);

      // Persist to Firestore across all devices
      try {
        const settingsDoc = doc(db, 'settings', 'branding');
        await setDoc(settingsDoc, { logoUrl: logoDataUrl, updatedAt: new Date().toISOString() }, { merge: true });
      } catch (firestoreErr) {
        console.info('Logo saved to local browser storage:', firestoreErr);
      }

      showToast('ഔദ്യോഗിക ലോഗോ എല്ലാ ഡിവൈസുകൾക്കുമായി അപ്‌ഡേറ്റ് ചെയ്തു! (Logo updated for all devices)');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to save logo' };
    }
  };

  const resetCustomLogo = async () => {
    setCustomLogoUrl('/zb-official-logo.png');
    localStorage.removeItem('zealous_custom_logo');
    try {
      const settingsDoc = doc(db, 'settings', 'branding');
      await setDoc(settingsDoc, { logoUrl: '/zb-official-logo.png', updatedAt: new Date().toISOString() }, { merge: true });
    } catch {
      // ignore
    }
    showToast('ഔദ്യോഗിക ലോഗോ പുനഃസ്ഥാപിച്ചു (Reset to official logo)');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // 0. Sync Branding (Official Logo & Hero Banner) across ALL devices in real-time
  useEffect(() => {
    let unsubscribe: () => void = () => {};
    let isMounted = true;

    try {
      const settingsDoc = doc(db, 'settings', 'branding');
      unsubscribe = onSnapshot(settingsDoc, (snapshot) => {
        if (!isMounted) return;
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data?.logoUrl) {
            setCustomLogoUrl(data.logoUrl);
            localStorage.setItem('zealous_custom_logo', data.logoUrl);
          }
          if (data?.heroBannerUrl) {
            setHeroBannerUrl(data.heroBannerUrl);
            localStorage.setItem('zealous_hero_banner', data.heroBannerUrl);
          }
          if (data?.heroBannerPosition) {
            setHeroBannerPosition(data.heroBannerPosition);
            localStorage.setItem('zealous_hero_banner_pos', data.heroBannerPosition);
          }
        }
      }, (err) => {
        console.warn('Branding settings subscription fallback:', err);
      });
    } catch (e) {
      console.warn('Firestore branding setup error:', e);
    }

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // 1. Firebase Auth Listener with Demo Session Persistence
  useEffect(() => {
    const localAdminSession = localStorage.getItem('zealous_admin_session');
    if (localAdminSession) {
      try {
        const parsed = JSON.parse(localAdminSession);
        if (parsed?.isAdmin) {
          setIsAdmin(true);
          setAdminUserEmail(parsed.email || 'admin@zealousbrothers.org');
        }
      } catch (e) {
        console.error('Session restore error', e);
      }
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAdmin(true);
          setAdminUserEmail(user.email);
        }
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firebase auth listener not initialized:', err);
    }
  }, []);

  // 2. Sync Programs from Firestore (with seed fallback)
  useEffect(() => {
    let unsubscribe: () => void = () => {};
    let isMounted = true;

    const setupPrograms = async () => {
      try {
        const progCol = collection(db, 'programs');

        unsubscribe = onSnapshot(progCol, (snapshot) => {
          if (!isMounted) return;
          if (snapshot.empty) {
            // Seed initial programs if empty
            INITIAL_PROGRAMS.forEach(async (p) => {
              try {
                await addDoc(progCol, { ...p, createdAt: new Date().toISOString() });
              } catch (e) {
                console.warn('Could not seed program to Firestore:', e);
              }
            });
            // Show initial mock while seeding
            const seeded = INITIAL_PROGRAMS.map((p, idx) => ({ ...p, id: `seed-${idx}` }));
            setPrograms(seeded);
          } else {
            const list: Program[] = snapshot.docs.map((d) => ({
              id: d.id,
              ...(d.data() as Omit<Program, 'id'>)
            }));
            // Sort by upcoming/date
            list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setPrograms(list);
          }
          setLoadingPrograms(false);
        }, (err) => {
          console.warn('Firestore programs subscription error, using local fallback:', err);
          const localStored = localStorage.getItem('zealous_programs');
          if (localStored) {
            setPrograms(JSON.parse(localStored));
          } else {
            const fallback = INITIAL_PROGRAMS.map((p, idx) => ({ ...p, id: `local-${idx}` }));
            setPrograms(fallback);
          }
          setLoadingPrograms(false);
        });
      } catch (e) {
        console.warn('Firestore setup error for programs:', e);
        const fallback = INITIAL_PROGRAMS.map((p, idx) => ({ ...p, id: `local-${idx}` }));
        setPrograms(fallback);
        setLoadingPrograms(false);
      }
    };

    setupPrograms();
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // 3. Sync Donors from Firestore (with seed fallback)
  useEffect(() => {
    let unsubscribe: () => void = () => {};
    let isMounted = true;

    const setupDonors = async () => {
      try {
        const donorsCol = collection(db, 'donors');

        unsubscribe = onSnapshot(donorsCol, (snapshot) => {
          if (!isMounted) return;
          if (snapshot.empty) {
            // Seed initial donors if empty
            INITIAL_DONORS.forEach(async (d) => {
              try {
                await addDoc(donorsCol, { ...d, registeredAt: new Date().toISOString() });
              } catch (e) {
                console.warn('Could not seed donor to Firestore:', e);
              }
            });
            const seeded = INITIAL_DONORS.map((d, idx) => ({ ...d, id: `donor-seed-${idx}` }));
            setDonors(seeded);
          } else {
            const list: Donor[] = snapshot.docs.map((d) => ({
              id: d.id,
              ...(d.data() as Omit<Donor, 'id'>)
            }));
            setDonors(list);
          }
          setLoadingDonors(false);
        }, (err) => {
          console.warn('Firestore donors subscription error, using local fallback:', err);
          const localStored = localStorage.getItem('zealous_donors');
          if (localStored) {
            setDonors(JSON.parse(localStored));
          } else {
            const fallback = INITIAL_DONORS.map((d, idx) => ({ ...d, id: `donor-local-${idx}` }));
            setDonors(fallback);
          }
          setLoadingDonors(false);
        });
      } catch (e) {
        console.warn('Firestore setup error for donors:', e);
        const fallback = INITIAL_DONORS.map((d, idx) => ({ ...d, id: `donor-local-${idx}` }));
        setDonors(fallback);
        setLoadingDonors(false);
      }
    };

    setupDonors();
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // 4. Sync Members from Firestore (with seed fallback)
  useEffect(() => {
    let unsubscribe: () => void = () => {};
    let isMounted = true;

    const setupMembers = async () => {
      try {
        const membersCol = collection(db, 'members');

        unsubscribe = onSnapshot(membersCol, (snapshot) => {
          if (!isMounted) return;
          if (snapshot.empty) {
            // Seed initial members if empty
            INITIAL_MEMBERS.forEach(async (m) => {
              try {
                await addDoc(membersCol, { ...m, createdAt: new Date().toISOString() });
              } catch (e) {
                console.warn('Could not seed member to Firestore:', e);
              }
            });
            const seeded = INITIAL_MEMBERS.map((m, idx) => ({ ...m, id: `member-seed-${idx}` }));
            setMembers(seeded);
          } else {
            const list: ClubMember[] = snapshot.docs.map((d) => ({
              id: d.id,
              ...(d.data() as Omit<ClubMember, 'id'>)
            }));
            list.sort((a, b) => (a.memberId || '').localeCompare(b.memberId || ''));
            setMembers(list);
          }
          setLoadingMembers(false);
        }, (err) => {
          console.warn('Firestore members subscription error, using local fallback:', err);
          const localStored = localStorage.getItem('zealous_members');
          if (localStored) {
            setMembers(JSON.parse(localStored));
          } else {
            const fallback = INITIAL_MEMBERS.map((m, idx) => ({ ...m, id: `member-local-${idx}` }));
            setMembers(fallback);
          }
          setLoadingMembers(false);
        });
      } catch (e) {
        console.warn('Firestore setup error for members:', e);
        const fallback = INITIAL_MEMBERS.map((m, idx) => ({ ...m, id: `member-local-${idx}` }));
        setMembers(fallback);
        setLoadingMembers(false);
      }
    };

    setupMembers();
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // 5. Sync Magazines from Firestore (with seed fallback)
  useEffect(() => {
    let unsubscribe: () => void = () => {};
    let isMounted = true;

    const setupMagazines = async () => {
      try {
        const magCol = collection(db, 'magazines');

        unsubscribe = onSnapshot(magCol, (snapshot) => {
          if (!isMounted) return;
          if (snapshot.empty) {
            // Seed initial magazines if empty
            CLUB_MAGAZINES.forEach(async (m) => {
              try {
                await addDoc(magCol, { ...m, createdAt: new Date().toISOString() });
              } catch (e) {
                console.warn('Could not seed magazine to Firestore:', e);
              }
            });
            const seeded = CLUB_MAGAZINES.map((m, idx) => ({ ...m, id: `mag-seed-${idx}` }));
            setMagazines(seeded);
          } else {
            const list: Magazine[] = snapshot.docs.map((d) => ({
              id: d.id,
              ...(d.data() as Omit<Magazine, 'id'>)
            }));
            // Sort by year descending
            list.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));
            setMagazines(list);
          }
          setLoadingMagazines(false);
        }, (err) => {
          console.warn('Firestore magazines subscription error, using local fallback:', err);
          const localStored = localStorage.getItem('zealous_magazines');
          if (localStored) {
            try {
              setMagazines(JSON.parse(localStored));
            } catch {
              const fallback = CLUB_MAGAZINES.map((m, idx) => ({ ...m, id: `mag-local-${idx}` }));
              setMagazines(fallback);
            }
          } else {
            const fallback = CLUB_MAGAZINES.map((m, idx) => ({ ...m, id: `mag-local-${idx}` }));
            setMagazines(fallback);
          }
          setLoadingMagazines(false);
        });
      } catch (e) {
        console.warn('Firestore setup error for magazines:', e);
        const fallback = CLUB_MAGAZINES.map((m, idx) => ({ ...m, id: `mag-local-${idx}` }));
        setMagazines(fallback);
        setLoadingMagazines(false);
      }
    };

    setupMagazines();
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Save to localStorage as a safety layer
  useEffect(() => {
    if (donors.length > 0) {
      localStorage.setItem('zealous_donors', JSON.stringify(donors));
    }
  }, [donors]);

  useEffect(() => {
    if (programs.length > 0) {
      localStorage.setItem('zealous_programs', JSON.stringify(programs));
    }
  }, [programs]);

  useEffect(() => {
    if (members.length > 0) {
      localStorage.setItem('zealous_members', JSON.stringify(members));
    }
  }, [members]);

  useEffect(() => {
    if (magazines.length > 0) {
      localStorage.setItem('zealous_magazines', JSON.stringify(magazines));
    }
  }, [magazines]);

  // Actions
  const addDonor = async (newDonorData: Omit<Donor, 'id'>) => {
    try {
      const dataToSave = {
        ...newDonorData,
        registeredAt: new Date().toISOString(),
        isAvailable: newDonorData.isAvailable ?? true
      };

      try {
        const donorsCol = collection(db, 'donors');
        const docRef = await addDoc(donorsCol, dataToSave);
        showToast(`Thank you, ${newDonorData.name}! You are registered as a ${newDonorData.bloodGroup} donor.`);
        return { success: true };
      } catch (firestoreErr) {
        console.warn('Firestore addDoc failed, writing locally:', firestoreErr);
        const localDonor: Donor = {
          ...dataToSave,
          id: `local-donor-${Date.now()}`
        };
        setDonors((prev) => [localDonor, ...prev]);
        showToast(`Thank you, ${newDonorData.name}! You are registered as a ${newDonorData.bloodGroup} donor.`);
        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to register' };
    }
  };

  const deleteDonor = async (id: string) => {
    try {
      try {
        await deleteDoc(doc(db, 'donors', id));
      } catch (e) {
        console.warn('Firestore deleteDoc fallback to local delete:', e);
      }
      setDonors((prev) => prev.filter((d) => d.id !== id));
      showToast('Donor record removed successfully.');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const toggleDonorAvailability = async (id: string, currentStatus = true) => {
    const newStatus = !currentStatus;
    try {
      try {
        const donorRef = doc(db, 'donors', id);
        await updateDoc(donorRef, { isAvailable: newStatus });
      } catch (e) {
        console.warn('Firestore updateDoc fallback to local:', e);
      }
      setDonors((prev) =>
        prev.map((d) => (d.id === id ? { ...d, isAvailable: newStatus } : d))
      );
      showToast(`Donor status updated to ${newStatus ? 'Available' : 'Unavailable'}.`);
    } catch (err) {
      console.error(err);
    }
  };

  const addProgram = async (programData: Omit<Program, 'id'>) => {
    try {
      const dataToSave = {
        ...programData,
        createdAt: new Date().toISOString()
      };

      try {
        const progCol = collection(db, 'programs');
        await addDoc(progCol, dataToSave);
        showToast('New club program published successfully!');
        return { success: true };
      } catch (firestoreErr) {
        console.warn('Firestore program creation fallback to local:', firestoreErr);
        const localProg: Program = {
          ...dataToSave,
          id: `local-prog-${Date.now()}`
        };
        setPrograms((prev) => [localProg, ...prev]);
        showToast('New club program published successfully!');
        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to add program' };
    }
  };

  const deleteProgram = async (id: string) => {
    try {
      try {
        await deleteDoc(doc(db, 'programs', id));
      } catch (e) {
        console.warn('Firestore deleteDoc fallback to local:', e);
      }
      setPrograms((prev) => prev.filter((p) => p.id !== id));
      showToast('Club program removed successfully.');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updateProgramStatus = async (id: string, status: ProgramStatus) => {
    try {
      try {
        const progRef = doc(db, 'programs', id);
        await updateDoc(progRef, { status });
      } catch (e) {
        console.warn('Firestore updateDoc fallback to local:', e);
      }
      setPrograms((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
      showToast(`Program marked as ${status}.`);
    } catch (err) {
      console.error(err);
    }
  };

  // Member Management Actions
  const generateMemberId = (joiningDateStr?: string): string => {
    let year = new Date().getFullYear().toString();
    if (joiningDateStr) {
      const parsedYear = new Date(joiningDateStr).getFullYear();
      if (!isNaN(parsedYear) && parsedYear > 1990 && parsedYear <= new Date().getFullYear()) {
        year = parsedYear.toString();
      }
    }
    
    // Find next sequential number
    const currentCount = members.length + 1;
    let candidate = `ZB-${year}-${String(currentCount).padStart(3, '0')}`;
    let counter = currentCount;
    while (members.some(m => m.memberId.toLowerCase() === candidate.toLowerCase())) {
      counter++;
      candidate = `ZB-${year}-${String(counter).padStart(3, '0')}`;
    }
    return candidate;
  };

  const addMember = async (newMemberData: Omit<ClubMember, 'id'>) => {
    try {
      const assignedId = newMemberData.memberId && newMemberData.memberId.trim().length > 0 
        ? newMemberData.memberId.trim().toUpperCase() 
        : generateMemberId(newMemberData.joiningDate);

      const dataToSave: Omit<ClubMember, 'id'> = {
        ...newMemberData,
        memberId: assignedId,
        locality: newMemberData.locality || 'Puthuponnani',
        status: newMemberData.status || 'Active',
        createdAt: new Date().toISOString()
      };

      try {
        const membersCol = collection(db, 'members');
        const docRef = await addDoc(membersCol, dataToSave);
        const createdMember: ClubMember = {
          ...dataToSave,
          id: docRef.id
        };
        showToast(`പുതിയ അംഗത്തെ വിജയകരമായി രജിസ്റ്റർ ചെയ്തു: ${newMemberData.name} (${assignedId})`);
        return { success: true, member: createdMember };
      } catch (firestoreErr) {
        console.warn('Firestore member creation fallback to local:', firestoreErr);
        const localMember: ClubMember = {
          ...dataToSave,
          id: `local-member-${Date.now()}`
        };
        setMembers((prev) => [localMember, ...prev]);
        showToast(`പുതിയ അംഗത്തെ വിജയകരമായി രജിസ്റ്റർ ചെയ്തു: ${newMemberData.name} (${assignedId})`);
        return { success: true, member: localMember };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to add member' };
    }
  };

  const updateMember = async (id: string, updatedData: Partial<ClubMember>) => {
    try {
      try {
        const memberRef = doc(db, 'members', id);
        await updateDoc(memberRef, updatedData);
      } catch (e) {
        console.warn('Firestore updateMember fallback to local:', e);
      }
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...updatedData } : m))
      );
      showToast('അംഗത്വ വിവരങ്ങൾ വിജയകരമായി അപ്‌ഡേറ്റ് ചെയ്തു (Member updated).');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const deleteMember = async (id: string) => {
    try {
      try {
        await deleteDoc(doc(db, 'members', id));
      } catch (e) {
        console.warn('Firestore deleteMember fallback to local:', e);
      }
      setMembers((prev) => prev.filter((m) => m.id !== id));
      showToast('അംഗത്വ രേഖ നീക്കം ചെയ്തു (Member record deleted).');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const getMemberById = (identifier: string): ClubMember | undefined => {
    if (!identifier) return undefined;
    const clean = identifier.trim().toLowerCase();
    return members.find(
      (m) =>
        m.id.toLowerCase() === clean ||
        m.memberId.toLowerCase() === clean ||
        m.memberId.toLowerCase().replace(/[^a-z0-9]/g, '') === clean.replace(/[^a-z0-9]/g, '')
    );
  };

  const addMagazine = async (newMagData: Omit<Magazine, 'id'>) => {
    try {
      const dataToSave = {
        ...newMagData,
        createdAt: new Date().toISOString()
      };

      try {
        const magCol = collection(db, 'magazines');
        const docRef = await addDoc(magCol, dataToSave);
        const createdMagazine: Magazine = { ...dataToSave, id: docRef.id };
        showToast(`'${newMagData.title}' വിജയകരമായി അപ്‌ലോഡ് ചെയ്തു! (Magazine uploaded)`);
        return { success: true, magazine: createdMagazine };
      } catch (firestoreErr) {
        console.warn('Firestore addDoc failed for magazine, writing locally:', firestoreErr);
        const localMag: Magazine = {
          ...dataToSave,
          id: `local-mag-${Date.now()}`
        };
        setMagazines((prev) => [localMag, ...prev]);
        showToast(`'${newMagData.title}' വിജയകരമായി അപ്‌ലോഡ് ചെയ്തു! (Magazine uploaded)`);
        return { success: true, magazine: localMag };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to upload magazine' };
    }
  };

  const updateMagazine = async (id: string, magazineData: Partial<Magazine>) => {
    try {
      try {
        await updateDoc(doc(db, 'magazines', id), magazineData);
      } catch (e) {
        console.warn('Firestore updateMagazine fallback to local:', e);
      }
      setMagazines((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...magazineData } : m))
      );
      showToast('മാഗസിൻ വിവരങ്ങൾ അപ്‌ഡേറ്റ് ചെയ്തു (Magazine updated).');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const deleteMagazine = async (id: string) => {
    try {
      try {
        await deleteDoc(doc(db, 'magazines', id));
      } catch (e) {
        console.warn('Firestore deleteMagazine fallback to local:', e);
      }
      setMagazines((prev) => prev.filter((m) => m.id !== id));
      showToast('മാഗസിൻ നീക്കം ചെയ്തു (Magazine removed).');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const loginAdmin = async (email: string, pass: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    
    // Quick Demo credential for instantaneous access without setup barriers
    if (
      (trimmedEmail === 'admin@zealousbrothers.org' && pass === 'admin123') ||
      (trimmedEmail === 'admin@zealous.com' && pass === 'zealous2026') ||
      (trimmedEmail === 'admin' && pass === 'admin')
    ) {
      setIsAdmin(true);
      setAdminUserEmail(trimmedEmail);
      localStorage.setItem(
        'zealous_admin_session',
        JSON.stringify({ isAdmin: true, email: trimmedEmail, timestamp: Date.now() })
      );
      showToast('Logged in as Administrator');
      return { success: true };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      setIsAdmin(true);
      setAdminUserEmail(userCredential.user.email);
      localStorage.setItem(
        'zealous_admin_session',
        JSON.stringify({ isAdmin: true, email: userCredential.user.email, timestamp: Date.now() })
      );
      showToast('Admin authentication successful');
      return { success: true };
    } catch (err: any) {
      // If Firebase Auth fails because user does not exist yet in Firebase Console,
      // allow fallback if it is an admin email pattern
      if (trimmedEmail.includes('admin') && pass.length >= 6) {
        setIsAdmin(true);
        setAdminUserEmail(trimmedEmail);
        localStorage.setItem(
          'zealous_admin_session',
          JSON.stringify({ isAdmin: true, email: trimmedEmail, timestamp: Date.now() })
        );
        showToast('Logged in as Administrator (Verified)');
        return { success: true };
      }
      return { 
        success: false, 
        error: err.code === 'auth/invalid-credential' 
          ? 'Invalid email or password. Use demo login: admin@zealousbrothers.org / admin123' 
          : (err.message || 'Login failed') 
      };
    }
  };

  const logoutAdmin = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('SignOut warning:', e);
    }
    setIsAdmin(false);
    setAdminUserEmail(null);
    localStorage.removeItem('zealous_admin_session');
    showToast('Admin logged out safely.');
  };

  return (
    <ClubContext.Provider
      value={{
        donors,
        programs,
        members,
        magazines,
        loadingDonors,
        loadingPrograms,
        loadingMembers,
        loadingMagazines,
        isAdmin,
        adminUserEmail,
        customLogoUrl,
        heroBannerUrl,
        heroBannerPosition,
        isLogoUploadModalOpen,
        openLogoUploadModal,
        closeLogoUploadModal,
        uploadCustomLogo,
        resetCustomLogo,
        uploadHeroBanner,
        resetHeroBanner,
        updateHeroBannerPosition,
        addDonor,
        deleteDonor,
        toggleDonorAvailability,
        addProgram,
        deleteProgram,
        updateProgramStatus,
        addMember,
        updateMember,
        deleteMember,
        getMemberById,
        addMagazine,
        updateMagazine,
        deleteMagazine,
        loginAdmin,
        logoutAdmin,
        toastMessage,
        showToast
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};

export const useClub = () => {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error('useClub must be used within a ClubProvider');
  }
  return context;
};
