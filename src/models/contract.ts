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

export interface ContractFormData {
  landlord: string;
  tenant: string;
  address: string;
  rent: string;
  period: string;
  startDate: string;
}
