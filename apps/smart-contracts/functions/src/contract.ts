import * as functions from "firebase-functions";
import { VertexAI } from "@google-cloud/vertexai";
import * as admin from "firebase-admin";

const project = "smart-contracts-254e8";
const location = "us-central1";

const vertexAI = new VertexAI({ project, location });
const model = vertexAI.preview.getGenerativeModel({
  model: "gemini-2.5-flash-preview-05-20",
});

if (!admin.apps.length) {
  admin.initializeApp();
}

const htmlInstruction = `
השב רק עם קוד HTML של גוף ההסכם/החוזה/הצוואה בלבד,
ללא תגיות <html>, <head> או <body>,
רק התוכן הפנימי (למשל <h1>, <h2>, <ol>, <li>, <p> וכו').
הקפד שהתוכן יהיה מוכן להטמעה ישירה בדף קיים עם עיצוב חיצוני.
אין להוסיף הסברים או טקסט נוסף מעבר למסמך עצמו.
`;

/**
 * Generates contract text based on a given prompt using the Vertex AI model.
 * @param {string} prompt - The input prompt describing the contract
 * requirements.
 * @param {string} errorMsg - The error message to return in case of failure.
 * @return {Promise<{contractText: string}>} - An object containing the
 * generated contract text or the error message.
 */
async function generateContractText(
  prompt: string,
  errorMsg: string
): Promise<{ contractText: string }> {
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const response = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
    return { contractText: response || "לא התקבל טקסט מהמודל" };
  } catch (error) {
    return { contractText: errorMsg };
  }
}

// Rental contract generator
export const generateRentalContract = functions.https.onCall(async () => {
  const prompt = `
אתה משמש כעורך דין מומחה לדיני מקרקעין ושכירות בישראל,
עם ניסיון רב בניסוח חוזים תקניים למגורים.
כתוב חוזה שכירות לדירה בהתאם למבנה ולניסוח
של חוזה השכירות לדוגמה של עיריית תל אביב (2023),
הנמצא בקישור: https://www.tel-aviv.gov.il/Forms/%D7%97%D7%95%D7%96%D7%94%20%D7%A2%D7%99%D7%A8%D7%95%D7%A0%D7%99%20%D7%9E%D7%95%D7%9E%D7%9C%D7%A5%20-%20%D7%A2%D7%93%D7%9B%D7%95%D7%9F%202023.pdf

מטרתך: ליצור חוזה ברור, מדויק ומלא, המיועד לשימוש מעשי בין שני צדדים,
תוך שמירה על מבנה, כותרות וסעיפים כפי שמופיעים בחוזה המקורי.

פרטי השכירות:
- משכיר: {{landlord}}
- שוכר: {{tenant}}
- כתובת הנכס: {{address}}
- דמי שכירות חודשיים: {{rent}} ש"ח
- תאריך התחלה: {{startDate}}
- תאריך סיום: {{endDate}}

יש לנסח את החוזה בצורה מקצועית, בשפה משפטית ברורה אך נגישה,
בסעיפים ממוספרים וללא תוספות מיותרות או הסברים כלליים.
החוזה יסתיים בסעיף חתימות עבור שני הצדדים.

${htmlInstruction}`;
  return generateContractText(prompt, "אירעה שגיאה ביצירת החוזה");
});

// Service contract generator
export const generateServiceContract = functions.https.onCall(async () => {
  const prompt = `
אתה משמש כעורך דין מומחה לדיני חוזים ושירותים בישראל.
כתוב הסכם מתן שירותים מקצועי וברור בין ספק ללקוח, כולל הסעיפים הבאים:

1. פרטי הצדדים
2. תיאור השירותים
3. תקופת ההסכם (תאריך התחלה: {{startDate}}, תאריך סיום: {{endDate}})
4. סכום ותנאי תשלום: {{amount}} ש"ח
5. אחריות, סודיות, קניין רוחני
6. סיום מוקדם, הפרות וסעדים
7. סמכות שיפוט וחתימות

פרטי ההסכם:
- ספק: {{provider}}
- לקוח: {{client}}

יש לנסח את ההסכם בשפה משפטית ברורה, בסעיפים ממוספרים, וללא הסברים כלליים.
ההסכם יסתיים בסעיף חתימות עבור שני הצדדים.

${htmlInstruction}`;
  return generateContractText(prompt, "אירעה שגיאה ביצירת ההסכם");
});

// Last will contract generator
export const generateLastWillContract = functions.https.onCall(async () => {
  const prompt = `
אתה משמש כעורך דין מומחה לדיני ירושה וצוואות בישראל.
כתוב נוסח צוואה תקני וברור, הכולל את הסעיפים הבאים:

1. פרטי המצווה: {{testator}}
2. פרטי היורשים: {{heirs}}
3. מינוי מבצע צוואה: {{executor}}
4. פירוט הנכסים והרכוש: {{assets}}
5. תאריך עריכת הצוואה: {{date}}

הצוואה תכלול הצהרה על כשירות המצווה, רצונו החופשי,
חלוקת הרכוש, הוראות מיוחדות (אם יש), מינוי מבצע,
ותסתיים בסעיף חתימה.

יש לנסח את הצוואה בשפה משפטית ברורה, בסעיפים ממוספרים, וללא הסברים כלליים.

${htmlInstruction}`;
  return generateContractText(prompt, "אירעה שגיאה ביצירת הצוואה");
});

// Create contract and contractAccess atomically
export const createContractWithAccess = functions.https.onCall(
  async (request) => {
    if (!request.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated"
      );
    }
    const uid = request.auth.uid;
    const { contractData } = request.data;

    const db = admin.firestore();
    const contractRef = db.collection("contracts").doc();
    const accessRef = db
      .collection("contractAccess")
      .doc(`${contractRef.id}_${uid}`);
    const now = new Date().toISOString();

    const contract = {
      ...contractData,
      createdAt: now,
    };
    const access = {
      contractId: contractRef.id,
      uid,
      role: "owner",
      addedAt: now,
    };

    const batch = db.batch();
    batch.set(contractRef, contract);
    batch.set(accessRef, access);
    await batch.commit();

    return { contractId: contractRef.id };
  }
);
