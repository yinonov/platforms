// src/templates/contractTemplates.ts

import { Timestamp } from "firebase/firestore";

export enum FieldType {
  Text = "text",
  Number = "number",
  Date = "date",
}

export interface ContractField<T = any> {
  name: string;
  label: string;
  type: FieldType;
  value?: T;
}

export abstract class ContractTemplate<T extends Record<string, any>> {
  abstract type: string;
  abstract label: string;
  abstract title: string;
  abstract metadata: ContractField[];
}

export interface RentalMetadata {
  landlord: string;
  tenant: string;
  address: string;
  rent: number;
  startDate: Timestamp;
  endDate: Timestamp;
  date: Timestamp;
}

export class RentalContractTemplate extends ContractTemplate<RentalMetadata> {
  type = "rental";
  label = "חוזה שכירות";
  title = "הסכם שכירות";
  metadata = [
    { name: "landlord", label: "המשכיר", type: FieldType.Text },
    { name: "tenant", label: "השוכר", type: FieldType.Text },
    { name: "address", label: "כתובת הנכס", type: FieldType.Text },
    {
      name: "rent",
      label: "דמי שכירות חודשי",
      type: FieldType.Number,
      value: 0,
    },
    {
      name: "startDate",
      label: "תאריך התחלה",
      type: FieldType.Date,
      value: Timestamp.fromDate(new Date()),
    },
    {
      name: "endDate",
      label: "תאריך סיום",
      type: FieldType.Date,
      value: Timestamp.fromDate(new Date()),
    },
    {
      name: "date",
      label: "תאריך יצירה",
      type: FieldType.Date,
      value: Timestamp.fromDate(new Date()),
    },
  ];
}

export interface ServiceMetadata {
  provider: string;
  client: string;
  amount: number;
  startDate: Timestamp;
  endDate: Timestamp;
  date: Timestamp;
}

export class ServiceContractTemplate extends ContractTemplate<ServiceMetadata> {
  type = "service";
  label = "הסכם שירות";
  title = "הסכם מתן שירותים";
  metadata = [
    { name: "provider", label: "הספק", type: FieldType.Text },
    { name: "client", label: "הלקוח", type: FieldType.Text },
    { name: "amount", label: "סכום", type: FieldType.Number, value: 0 },
    {
      name: "startDate",
      label: "תאריך התחלה",
      type: FieldType.Date,
      value: Timestamp.fromDate(new Date()),
    },
    {
      name: "endDate",
      label: "תאריך סיום",
      type: FieldType.Date,
      value: Timestamp.fromDate(new Date()),
    },
    {
      name: "date",
      label: "תאריך יצירה",
      type: FieldType.Date,
      value: Timestamp.fromDate(new Date()),
    },
  ];
}

export const contractTemplates = [
  new RentalContractTemplate(),
  new ServiceContractTemplate(),
];
