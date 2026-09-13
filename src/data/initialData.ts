import { Program, Donor, Magazine, GalleryItem, EmergencyContact, ClubMember } from '../types';

export const INITIAL_PROGRAMS: Omit<Program, 'id'>[] = [
  {
    title: 'ZEALOUS Champions Trophy 2026 - All Kerala 7s Football Tournament',
    category: 'Sports',
    date: '2026-04-12',
    time: '06:30 PM Onwards',
    venue: 'Town Stadium, Floodlit Arena',
    description: 'The premier annual 7-a-side football championship featuring 24 top clubs competing for the prestigious Zealous Rolling Trophy, cash awards, and individual player recognitions.',
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    organizerContact: '+91 98470 12345'
  },
  {
    title: 'Akshara Jyothi 2026: Educational Study Kit & Bag Distribution',
    category: 'Charity',
    date: '2026-05-24',
    time: '10:00 AM',
    venue: 'Community Hall & Govt High School Auditorium',
    description: 'Providing comprehensive school supply kits (backpacks, notebooks, geometry boxes, umbrellas, and stationery) to 350+ deserving students ahead of the academic school reopening.',
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    organizerContact: '+91 94471 67890'
  },
  {
    title: 'Sargotsav 2026: Youth Arts, Music & Cultural Fest',
    category: 'Cultural',
    date: '2026-03-28',
    time: '04:00 PM',
    venue: 'Zealous Open Air Amphitheatre',
    description: 'A 2-day cultural extravaganza celebrating local folk traditions, instrumental fusion music, theater drama, speech competitions, and youth talent showcases.',
    status: 'Ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    organizerContact: '+91 98952 34567'
  },
  {
    title: 'ZB Care Blood Donation & Free Health Screening Camp',
    category: 'Healthcare',
    date: '2026-02-15',
    time: '09:00 AM - 02:00 PM',
    venue: 'Zealous Club Headquarters',
    description: 'Joint voluntary blood donation drive organized in association with the District Blood Bank. Collected 148 units of blood and provided free sugar, BP, and ECG checks.',
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80',
    organizerContact: '+91 98470 12345'
  },
  {
    title: 'Green Valley Eco-Drive: 1000 Tree Saplings Plantation',
    category: 'Charity',
    date: '2026-01-26',
    time: '07:30 AM',
    venue: 'Riverbank Road & School Campuses',
    description: 'Republic Day special environmental restoration drive planting fruit-bearing and shade trees along degraded public roadsides and public parks.',
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    organizerContact: '+91 97455 89012'
  }
];

export const INITIAL_DONORS: Omit<Donor, 'id'>[] = [
  {
    name: 'Muhammed Shamim',
    bloodGroup: 'O+',
    phone: '+91 98471 22334',
    location: 'Town Center, Ward 4',
    age: 27,
    lastDonationDate: '2025-11-20',
    isAvailable: true,
    registeredAt: '2026-01-10T10:00:00.000Z'
  },
  {
    name: 'Rahul Krishnan',
    bloodGroup: 'A+',
    phone: '+91 97455 44556',
    location: 'North Junction, Station Road',
    age: 24,
    lastDonationDate: '2025-12-14',
    isAvailable: true,
    registeredAt: '2026-01-15T11:30:00.000Z'
  },
  {
    name: 'Fasalu Rahman',
    bloodGroup: 'B+',
    phone: '+91 98950 66778',
    location: 'Valley View Colony',
    age: 29,
    lastDonationDate: '2026-01-05',
    isAvailable: true,
    registeredAt: '2026-01-20T14:15:00.000Z'
  },
  {
    name: 'Arjun Somnath',
    bloodGroup: 'AB+',
    phone: '+91 94473 88990',
    location: 'East Gate, Industrial Area',
    age: 26,
    lastDonationDate: '2025-09-18',
    isAvailable: true,
    registeredAt: '2026-01-22T09:40:00.000Z'
  },
  {
    name: 'Nikhil Joseph',
    bloodGroup: 'O-',
    phone: '+91 98462 11223',
    location: 'Hill Top Gardens',
    age: 31,
    lastDonationDate: '2025-10-30',
    isAvailable: true,
    registeredAt: '2026-02-01T16:20:00.000Z'
  },
  {
    name: 'Anas Maliyekkal',
    bloodGroup: 'A-',
    phone: '+91 97461 33445',
    location: 'Central Bazaar, Main Street',
    age: 25,
    lastDonationDate: '2025-11-08',
    isAvailable: true,
    registeredAt: '2026-02-04T12:00:00.000Z'
  },
  {
    name: 'Vipin Das',
    bloodGroup: 'B-',
    phone: '+91 98958 55667',
    location: 'South Avenue, College Road',
    age: 28,
    lastDonationDate: '2025-12-28',
    isAvailable: true,
    registeredAt: '2026-02-10T13:45:00.000Z'
  },
  {
    name: 'Irfan Kabeer',
    bloodGroup: 'AB-',
    phone: '+91 94467 77889',
    location: 'Town Center, Ward 2',
    age: 23,
    lastDonationDate: '2026-01-18',
    isAvailable: true,
    registeredAt: '2026-02-14T10:10:00.000Z'
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: '1',
    name: 'Salman Faris',
    role: 'Chief Blood Wing Coordinator',
    phone: '+91 98470 12345',
    zone: 'Town & Central Zone',
    available: '24/7 Hotline'
  },
  {
    id: '2',
    name: 'Dr. Akhil Menon',
    role: 'Medical Liaison & Hospital Desk',
    phone: '+91 94471 99887',
    zone: 'District General Hospital Desk',
    available: '24/7 Hotline'
  },
  {
    id: '3',
    name: 'Jithin Thomas',
    role: 'Emergency Volunteer Captain',
    phone: '+91 98952 77665',
    zone: 'North & East Suburbs',
    available: '24/7 Hotline'
  }
];

export const CLUB_MAGAZINES: Magazine[] = [
  {
    id: 'mag-2026',
    title: 'ZEAL 2025-26',
    edition: '12th Annual Edition',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description: 'Reflecting a landmark year of brotherhood, high-octane sports triumphs, expansive medical outreach, and youth empowerment initiatives across the region.',
    pageCount: 68,
    fileSize: '14.2 MB',
    downloadUrl: '#',
    highlights: [
      'President’s Annual Review: Building Together',
      'The 7s Football Glory: Match Reports & Tactics',
      'ZB Care Blood Wing: 420+ Units Sourced in Crisis',
      'Akshara Jyothi: Stories from the Desks of Young Dreamers',
      'Artistic Gallery & Member Literary Contributions'
    ]
  },
  {
    id: 'mag-2025',
    title: 'THE ZEALOUS PRIDE 2024-25',
    edition: '11th Annual Edition',
    year: '2025',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    description: 'Celebrating 10 years of unbroken fraternity, community welfare drives, disaster relief assistance, and sportsmanship.',
    pageCount: 56,
    fileSize: '11.8 MB',
    downloadUrl: '#',
    highlights: [
      'Decade Milestone: 2015-2025 Retrospective',
      'Honoring Our Senior Founders and Mentors',
      'Flood Relief Action Team Memorial Article',
      'Cultural Sargam Night Recaps'
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Zealous 7s Grand Finale',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
    date: 'April 2025',
    caption: 'Tense moments during the nail-biting penalty shootout under floodlights.'
  },
  {
    id: 'g2',
    title: 'Trophy Lifting Ceremony',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1000&q=80',
    date: 'April 2025',
    caption: 'Champions lifting the coveted Zealous Brothers Rolling Cup with roaring crowds.'
  },
  {
    id: 'g3',
    title: 'Akshara Jyothi Kit Handover',
    category: 'Charity',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80',
    date: 'June 2025',
    caption: 'Distributing bags and study material kits to smiling young students.'
  },
  {
    id: 'g4',
    title: 'ZB Care Blood Donation Desk',
    category: 'Charity',
    imageUrl: 'https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&w=1000&q=80',
    date: 'August 2025',
    caption: 'Volunteers and youth donating whole blood at the community medical camp.'
  },
  {
    id: 'g5',
    title: 'Sargotsav Folk Percussion Melam',
    category: 'Cultural',
    imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1000&q=80',
    date: 'January 2026',
    caption: 'Mesmerizing traditional rhythm ensemble leading the festival opening procession.'
  },
  {
    id: 'g6',
    title: 'Annual General Body & Youth Meet',
    category: 'Youth',
    imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80',
    date: 'December 2025',
    caption: 'Zealous Brothers brotherhood congregation planning the 2026 social charter.'
  }
];

export const INITIAL_MEMBERS: Omit<ClubMember, 'id'>[] = [
  {
    memberId: 'ZB-1994-001',
    name: 'Muhammed Haris',
    role: 'President',
    bloodGroup: 'O+',
    phone: '+91 98470 12345',
    joiningDate: '1994-08-15',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    address: 'Maliyekkal House, Beach Road',
    locality: 'Puthuponnani',
    status: 'Active'
  },
  {
    memberId: 'ZB-1995-012',
    name: 'Abdul Rasheed K.P.',
    role: 'General Secretary',
    bloodGroup: 'B+',
    phone: '+91 94471 67890',
    joiningDate: '1995-02-10',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    address: 'K.P. Manzil, South Ward',
    locality: 'Puthuponnani',
    status: 'Active'
  },
  {
    memberId: 'ZB-2002-045',
    name: 'Faisal P.V.',
    role: 'Treasurer',
    bloodGroup: 'A+',
    phone: '+91 98952 34567',
    joiningDate: '2002-06-20',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    address: 'P.V. Nivas, Near Port Office',
    locality: 'Puthuponnani',
    status: 'Active'
  },
  {
    memberId: 'ZB-2012-088',
    name: 'Niyas Puthuponnani',
    role: 'Convener',
    bloodGroup: 'O+',
    phone: '+91 97455 89012',
    joiningDate: '2012-11-01',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    address: 'Kadalora Lane, Ward 6',
    locality: 'Puthuponnani',
    status: 'Active'
  },
  {
    memberId: 'ZB-2018-124',
    name: 'Shafeeq Rahman',
    role: 'Blood Wing Coordinator',
    bloodGroup: 'O-',
    phone: '+91 99460 23456',
    joiningDate: '2018-04-14',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    address: 'Rahman Villa, Light House Road',
    locality: 'Puthuponnani',
    status: 'Active'
  },
  {
    memberId: 'ZB-2021-175',
    name: 'Salman Faris',
    role: 'Sports Captain',
    bloodGroup: 'AB+',
    phone: '+91 95678 90123',
    joiningDate: '2021-01-10',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    address: 'Baitul Noor, Ground Junction',
    locality: 'Puthuponnani',
    status: 'Active'
  }
];

