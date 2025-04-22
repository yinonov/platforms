import * as functions from "firebase-functions";
import {VertexAI} from "@google-cloud/vertexai";

const project = "smart-contracts-254e8";
const location = "europe-west1";

const vertexAI = new VertexAI({project, location});
const model = vertexAI.preview.getGenerativeModel({
  model: "gemini-1.5-pro",
});

export const generateContract = functions.https.onCall(async (data, context) => {
  const {
    landlord,
    tenant,
    address,
    rent,
    period,
    startDate,
  } = data;

  const prompt = `
אתה משמש כיועץ משפטי מומחה לדיני שכירות בישראל. נסח חוזה שכירות מקצועי ומלא למגורים פרטיים, כולל כל הסעיפים המקובלים לפי הדין:

- משכיר: ${landlord}
- שוכר: ${tenant}
- כתובת: ${address}
- דמי שכירות: ${rent} ש"ח לחודש
- תקופת שכירות: ${period}
- תאריך התחלה: ${startDate}

יש לכתוב את החוזה בעברית תקנית, עם סעיפים ממוספרים, כותרת, ונוסח משפטי ברור.
  `;

  try {
    const result = await model.generateContent({
      contents: [{role: "user", parts: [{text: prompt}]}],
    });

    const response = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
    return {contractText: response || "לא התקבל טקסט מהמודל"};
  } catch (error: any) {
    console.error("Gemini error:", error.message);
    throw new functions.https.HttpsError("internal", "שגיאה ביצירת החוזה");
  }
});
