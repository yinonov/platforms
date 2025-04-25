// rent-template.ts

export const rentContractTemplate = ({
  landlord,
  tenant,
  address,
  rent,
}: {
  landlord: string;
  tenant: string;
  address: string;
  rent: string;
}) => `
הסכם שכירות
בין ${landlord} לבין ${tenant},
בנוגע לנכס בכתובת: ${address},
בשכר דירה חודשי של ${rent} ש"ח.

צדדים לחוזה מאשרים את פרטיהם ומתחייבים לפעול בהתאם להוראותיו.

חתימות:
המשכיר: ________________   השוכר: ________________
`;
