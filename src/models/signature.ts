export interface SignedEventDetail {
  signerName: string;
  signedAt: string;
  phone: string;
  isApproved: boolean;
}

// models.ts (הרחבה לתוך קובץ קיים)
export interface SignatureData {
  signerName: string;
  phone: string;
  signedAt: string;
  isApproved: boolean;
}
