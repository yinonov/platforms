import * as functions from "firebase-functions";
import {VertexAI} from "@google-cloud/vertexai";

const project = "smart-contracts-254e8";
const location = "us-central1";

const vertexAI = new VertexAI({project, location});
const model = vertexAI.preview.getGenerativeModel({
  model: "gemini-1.5-pro",
});

/**
 * Generates contract text based on a given prompt using the Vertex AI model.
 * @param {string} prompt - The input prompt describing the contract
 * requirements.
 * @param {string} errorMsg - The error message to return in case of failure.
 * @return {Promise<{contractText: string}>} - An object containing the
 * generated contract text or the error message.
 */
async function generateContractText(prompt: string, errorMsg: string) {
  try {
    const result = await model.generateContent({
      contents: [{role: "user", parts: [{text: prompt}]}],
    });
    const response = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
    return {contractText: response || "לא התקבל טקסט מהמודל"};
  } catch (error) {
    return {contractText: errorMsg};
  }
}

// Rental contract generator
export const generateRentalContract = functions.https.onCall(
  async (request) => {
    const {landlord, tenant, address, rent, startDate, endDate} =
      request.data;
    const prompt = `
אתה משמש כעורך דין מומחה לדיני מקרקעין ושכירות בישראל,
עם ניסיון רב בניסוח חוזים תקניים למגורים.
כתוב חוזה שכירות לדירה בהתאם למבנה המקובל על לשכת עורכי הדין בישראל,
בהשראת חוזה השכירות לדוגמה של עיריית תל אביב (2023).

מטרתך: ליצור חוזה ברור, מדויק ומלא,
המיועד לשימוש מעשי בין שני צדדים, כולל כל הסעיפים הבאים:

1. פרטי הצדדים
2. תיאור הנכס
3. מועד תחילת וסיום תקופת השכירות
4. דמי שכירות, אופן תשלום, עדכון
5. ערבויות וביטחונות
6. תיקונים, תחזוקה ושיפוצים
7. הגבלת שימוש והחזקת בעלי חיים
8. אחריות לנזקים וביטוחים
9. פינוי מוקדם / הפרת חוזה
10. סמכות שיפוט וחתימות

פרטי השכירות:
- משכיר: ${landlord}
- שוכר: ${tenant}
- כתובת הנכס: ${address}
- דמי שכירות חודשיים: ${rent} ש"ח
- תאריך התחלה: ${startDate}
- תאריך סיום: ${endDate}

יש לנסח את החוזה בצורה מקצועית, בשפה משפטית ברורה אך נגישה,
בסעיפים ממוספרים וללא תוספות מיותרות או הסברים כלליים.
החוזה יסתיים בסעיף חתימות עבור שני הצדדים.

השב רק עם טקסט החוזה עצמו, מוכן להצגה במסמך PDF או מסך.
`;
    return generateContractText(prompt, "אירעה שגיאה ביצירת החוזה");
  }
);

// Service contract generator
export const generateServiceContract = functions.https.onCall(
  async (request) => {
    const {provider, client, amount, startDate, endDate} = request.data;
    const prompt = `
אתה משמש כעורך דין מומחה לדיני חוזים ושירותים בישראל.
כתוב הסכם מתן שירותים מקצועי וברור בין ספק ללקוח, כולל הסעיפים הבאים:

1. פרטי הצדדים
2. תיאור השירותים
3. תקופת ההסכם (תאריך התחלה: ${startDate}, תאריך סיום: ${endDate})
4. סכום ותנאי תשלום: ${amount} ש"ח
5. אחריות, סודיות, קניין רוחני
6. סיום מוקדם, הפרות וסעדים
7. סמכות שיפוט וחתימות

פרטי ההסכם:
- ספק: ${provider}
- לקוח: ${client}

יש לנסח את ההסכם בשפה משפטית ברורה, בסעיפים ממוספרים, וללא הסברים כלליים.
ההסכם יסתיים בסעיף חתימות עבור שני הצדדים.

השב רק עם טקסט ההסכם עצמו, מוכן להצגה במסמך PDF או מסך.
`;
    return generateContractText(prompt, "אירעה שגיאה ביצירת ההסכם");
  }
);
