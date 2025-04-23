import * as functions from "firebase-functions";
import {VertexAI} from "@google-cloud/vertexai";

const project = "smart-contracts-254e8";
const location = "us-central1";

const vertexAI = new VertexAI({project, location});
const model = vertexAI.preview.getGenerativeModel({
  model: "gemini-1.5-pro",
});

type ContractFormData = {
  landlord: string;
  tenant: string;
  address: string;
  rent: string;
  period: string;
  startDate: string;
};

export const generateContract = functions.https.onCall<ContractFormData>(
  async (request) => {
    const {landlord, tenant, address, rent, period, startDate} = request.data;

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
- תקופת השכירות: ${period}
- תאריך התחלה: ${startDate}

יש לנסח את החוזה בצורה מקצועית, בשפה משפטית ברורה אך נגישה,
בסעיפים ממוספרים וללא תוספות מיותרות או הסברים כלליים.
החוזה יסתיים בסעיף חתימות עבור שני הצדדים.

השב רק עם טקסט החוזה עצמו, מוכן להצגה במסמך PDF או מסך.
`;

    try {
      const result = await model.generateContent({
        contents: [{role: "user", parts: [{text: prompt}]}],
      });

      const response =
        result.response.candidates?.[0]?.content?.parts?.[0]?.text;
      return {contractText: response || "לא התקבל טקסט מהמודל"};
    } catch (error) {
      if (error instanceof Error) {
        console.error("Gemini error:", error.message);
        console.error("Full error:", error);
      } else {
        console.error("שגיאה לא צפויה:", error);
      }

      return {contractText: "אירעה שגיאה ביצירת החוזה"};
    }
  }
);
