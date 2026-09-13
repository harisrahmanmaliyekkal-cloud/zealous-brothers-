export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  phone: string;
  location: string;
  age?: number;
  lastDonationDate?: string;
  isAvailable?: boolean;
  registeredAt?: string | number | Date;
}

export type ProgramCategory = 'Sports' | 'Charity' | 'Cultural' | 'Healthcare' | 'Youth';
export type ProgramStatus = 'Upcoming' | 'Ongoing' | 'Completed';

export interface Program {
  id: string;
  title: string;
  category: ProgramCategory;
  date: string;
  time?: string;
  venue: string;
  description: string;
  status: ProgramStatus;
  imageUrl?: string;
  organizerContact?: string;
  createdAt?: string | number | Date;
}

export interface Magazine {
  id: string;
  title: string;
  edition: string;
  year: string;
  coverImage: string;
  description: string;
  pageCount: number;
  fileSize: string;
  downloadUrl: string;
  highlights: string[];
  pdfDataUrl?: string;
  pdfFileName?: string;
  createdAt?: string | number | Date;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Sports' | 'Charity' | 'Cultural' | 'Youth';
  imageUrl: string;
  date: string;
  caption: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  zone: string;
  available: string;
}

export type MemberRole = 
  | 'Member' 
  | 'Executive Member' 
  | 'Committee Member' 
  | 'Convener' 
  | 'Joint Convener' 
  | 'President' 
  | 'Vice President' 
  | 'General Secretary' 
  | 'Joint Secretary' 
  | 'Treasurer' 
  | 'Sports Captain' 
  | 'Youth Wing Lead' 
  | 'Blood Wing Coordinator'
  | 'Advisory Board';

export interface ClubMember {
  id: string;
  memberId: string; // e.g. "ZB-1994-001", "ZB-2024-012"
  name: string;
  role: MemberRole | string;
  bloodGroup: BloodGroup;
  phone: string;
  joiningDate: string; // "YYYY-MM-DD" or year
  photoUrl?: string; // Data URL or external image URL
  address?: string;
  locality?: string; // e.g. "Puthuponnani", "Ward 4"
  status: 'Active' | 'Honorary' | 'Alumni';
  email?: string;
  createdAt?: string | number | Date;
}

