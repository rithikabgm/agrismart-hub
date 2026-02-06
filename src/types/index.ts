export type UserRole = 'farmer' | 'officer' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface LandRecord {
  id: string;
  ownerName: string;
  ownerId: string;
  landSize: number;
  landUnit: 'acres' | 'hectares';
  cropType: string;
  location: string;
  district: string;
  state: string;
  coordinates: { lat: number; lng: number };
  surveyNumber: string;
  registrationDate: string;
  verified: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: 'land_title' | 'sale_deed' | 'mutation' | 'other';
  uploadDate: string;
  status: 'pending' | 'verified' | 'rejected';
  confidenceScore?: number;
  landRecordId?: string;
}

export interface Loan {
  id: string;
  farmerId: string;
  amount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  startDate: string;
  status: 'active' | 'completed' | 'defaulted';
  paidEmis: number;
  totalEmis: number;
  purpose: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  benefits: string;
  deadline?: string;
  category: 'subsidy' | 'loan' | 'insurance' | 'training' | 'equipment';
  isEligible?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timestamp: string;
  read: boolean;
  category: 'document' | 'scheme' | 'loan' | 'system';
}
