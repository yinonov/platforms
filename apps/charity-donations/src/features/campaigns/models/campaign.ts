// Campaign model for Firestore and app usage
export interface Campaign {
  id?: string; // Firestore document ID (optional for new campaigns)
  title: string;
  description: string;
  goal: number;
  createdAt: string; // ISO date string
  // Optionally add more fields: imageUrl, ownerId, status, etc.
}
