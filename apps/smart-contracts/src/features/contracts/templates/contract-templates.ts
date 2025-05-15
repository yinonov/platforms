// src/templates/contractTemplates.ts

import { Timestamp } from "firebase/firestore";

export enum FieldType {
  Text = "text",
  Number = "number",
  Date = "date",
}

export interface ContractField {
  name: string;
  label: string;
  type: FieldType;
  value?: any;
}

export interface ContractStep {
  title: string;
  fields: ContractField[];
}

export abstract class ContractTemplate {
  abstract type: string;
  abstract title: string;
  abstract steps: ContractStep[];
}

export class RentalContractTemplate extends ContractTemplate {
  type = "rental";
  title = "הסכם שכירות";
  steps = [
    {
      title: "פרטי הצדדים",
      fields: [
        { name: "landlord", label: "המשכיר", type: FieldType.Text },
        { name: "tenant", label: "השוכר", type: FieldType.Text },
      ],
    },
    {
      title: "פרטי הנכס",
      fields: [{ name: "address", label: "כתובת הנכס", type: FieldType.Text }],
    },
    {
      title: "פרטי השכירות",
      fields: [
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
      ],
    },
    {
      title: "תאריך יצירה",
      fields: [
        {
          name: "date",
          label: "תאריך יצירה",
          type: FieldType.Date,
          value: Timestamp.fromDate(new Date()),
        },
      ],
    },
  ];
}

export class ServiceContractTemplate extends ContractTemplate {
  type = "service";
  title = "הסכם מתן שירותים";
  steps = [
    {
      title: "פרטי הצדדים",
      fields: [
        { name: "provider", label: "הספק", type: FieldType.Text },
        { name: "client", label: "הלקוח", type: FieldType.Text },
      ],
    },
    {
      title: "פרטי השירות",
      fields: [
        { name: "amount", label: "סכום", type: FieldType.Number, value: 0 },
      ],
    },
    {
      title: "תקופת השירות",
      fields: [
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
      ],
    },
    {
      title: "תאריך יצירה",
      fields: [
        {
          name: "date",
          label: "תאריך יצירה",
          type: FieldType.Date,
          value: Timestamp.fromDate(new Date()),
        },
      ],
    },
  ];
}

export class LastWillContractTemplate extends ContractTemplate {
  type = "last-will";
  title = "צוואה";
  steps = [
    {
      title: "פרטי המצווה",
      fields: [{ name: "testator", label: "המצווה", type: FieldType.Text }],
    },
    {
      title: "פרטי היורשים",
      fields: [{ name: "heirs", label: "יורשים", type: FieldType.Text }],
    },
    {
      title: "פרטי המוציא לפועל",
      fields: [{ name: "executor", label: "מבצע צוואה", type: FieldType.Text }],
    },
    {
      title: "נכסים/רכוש",
      fields: [{ name: "assets", label: "נכסים/רכוש", type: FieldType.Text }],
    },
    {
      title: "תאריך עריכת הצוואה",
      fields: [
        {
          name: "date",
          label: "תאריך עריכת הצוואה",
          type: FieldType.Date,
          value: Timestamp.fromDate(new Date()),
        },
      ],
    },
  ];
}

export const contractTemplateMap: Record<string, ContractTemplate> = {
  rental: new RentalContractTemplate(),
  service: new ServiceContractTemplate(),
  "last-will": new LastWillContractTemplate(),
};
