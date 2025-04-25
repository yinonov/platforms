// src/templates/contractTemplates.ts

export interface ContractTemplate {
  type: string;
  label: string;
  defaultTitle: string;
  defaultContent: string;
  defaultMetadata: Record<string, string>;
}

export const contractTemplates: ContractTemplate[] = [
  {
    type: "rental",
    label: "חוזה שכירות",
    defaultTitle: "הסכם שכירות",
    defaultContent: `הסכם זה נערך ונחתם ביום {{date}} בין {{landlord}} (להלן: "המשכיר") ובין {{tenant}} (להלן: "השוכר") בכתובת {{address}}.

השוכר ישלם דמי שכירות חודשיים בסך {{rent}} ₪ לתקופה של {{period}} חודשים.

הצדדים מסכימים לתנאים המפורטים לעיל.`,
    defaultMetadata: {
      landlord: "",
      tenant: "",
      address: "",
      rent: "",
      period: "",
      date: new Date().toLocaleDateString("he-IL"),
    },
  },
  {
    type: "service",
    label: "הסכם שירות",
    defaultTitle: "הסכם מתן שירותים",
    defaultContent: `הסכם זה נערך ביום {{date}} בין {{provider}} (להלן: "הספק") ובין {{client}} (להלן: "הלקוח").

הספק יעניק שירותים בכתובת {{location}} לפי הצורך ולתמורה של {{amount}} ₪ לחודש, לתקופה של {{period}} חודשים.`,
    defaultMetadata: {
      provider: "",
      client: "",
      location: "",
      amount: "",
      period: "",
      date: new Date().toLocaleDateString("he-IL"),
    },
  },
];
