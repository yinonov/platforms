export interface Contract {
  id?: string;
  content: string;
  createdBy: string;
  signers: {
    uid: string;
    name: string;
    signedAt?: string;
  }[];
  createdAt: string;
}
