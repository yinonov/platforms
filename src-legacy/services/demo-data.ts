// services/demo-data.ts
import type { ContractFormData } from "../models";

const names = ["ינון עובד", "דנה לוי", "יוסי כהן", "נועה ברמן", "מיכל פרץ"];
const addresses = [
  "הרצל 10, תל אביב",
  "שדרות ירושלים 42, חולון",
  "אלנבי 55, תל אביב",
  "החרש 12, פתח תקווה",
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomContractData(): ContractFormData {
  return {
    landlord: getRandom(names),
    tenant: getRandom(names),
    address: getRandom(addresses),
    rent: (Math.floor(Math.random() * 3000) + 3000).toString(),
    period: "12 חודשים",
    startDate: new Date().toISOString().slice(0, 10),
  };
}
