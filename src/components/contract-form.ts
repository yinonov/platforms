import {
  FASTElement,
  html,
  css,
  observable,
  when,
} from "@microsoft/fast-element";
import { functions } from "../firebase-config"; // ודא שזה הנתיב שלך
import { httpsCallable } from "firebase/functions";
import html2pdf from "html2pdf.js";

const names = ["ינון עובד", "דנה לוי", "יוסי כהן", "נועה ברמן", "מיכל פרץ"];
const addresses = [
  "הרצל 10, תל אביב",
  "שדרות ירושלים 42, חולון",
  "אלנבי 55, תל אביב",
  "החרש 12, פתח תקווה",
];
const getRandom = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];
const getRandomRent = () =>
  (Math.floor(Math.random() * 3000) + 3000).toString();

const template = html<ContractForm>`
  <form @submit="${(x, c) => x.handleSubmit(c.event)}">
    <label>
      משכיר:
      <input
        type="text"
        value="${(x) => x.landlord}"
        @input="${(x, c) => x.handleInput("landlord", c.event)}"
        required
      />
    </label>
    <label>
      שוכר:
      <input
        type="text"
        value="${(x) => x.tenant}"
        @input="${(x, c) => x.handleInput("tenant", c.event)}"
        required
      />
    </label>
    <label>
      כתובת:
      <input
        type="text"
        value="${(x) => x.address}"
        @input="${(x, c) => x.handleInput("address", c.event)}"
        required
      />
    </label>
    <label>
      שכר דירה:
      <input
        type="text"
        value="${(x) => x.rent}"
        @input="${(x, c) => x.handleInput("rent", c.event)}"
        required
      />
    </label>
    <label>
      תקופה:
      <input
        type="text"
        value="${(x) => x.period}"
        @input="${(x, c) => x.handleInput("period", c.event)}"
        required
      />
    </label>
    <label>
      תאריך התחלה:
      <input
        type="date"
        value="${(x) => x.startDate}"
        @input="${(x, c) => x.handleInput("startDate", c.event)}"
        required
      />
    </label>

    <button type="submit">צור חוזה</button>
  </form>

  ${when(
    (x) => x.isLoading,
    html`
      <p style="text-align: center; font-style: italic;">
        יוצר חוזה... אנא המתן
      </p>
    `
  )}
  ${when(
    (x) => x.generatedContract,
    html`
      <hr />
      <h3>חוזה שנוצר:</h3>
      <pre id="contract" style="white-space: pre-wrap; direction: rtl;">
(מבוסס על מבנה חוזה מקובל לפי לשכת עורכי הדין בישראל)

${(x) => x.generatedContract}
    </pre
      >
      <button @click="${(x) => x.downloadAsPDF()}">הורד כ-PDF</button>
    `
  )}
`;

const styles = css`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 2rem auto;
    font-family: sans-serif;
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
  }

  button {
    padding: 0.5rem;
    font-size: 1rem;
    background-color: #0d6efd;
    color: white;
    border: none;
    cursor: pointer;
  }

  pre {
    background: #f8f9fa;
    padding: 1rem;
    border: 1px solid #ddd;
    font-family: inherit;
  }
`;

export class ContractForm extends FASTElement {
  @observable landlord: string = getRandom(names);
  @observable tenant: string = getRandom(names);
  @observable address: string = getRandom(addresses);
  @observable rent: string = getRandomRent();
  @observable period: string = "12 חודשים";
  @observable startDate: string = new Date().toISOString().slice(0, 10);
  @observable generatedContract: string = "";
  @observable isLoading: boolean = false;

  handleInput(field: string, event: Event) {
    const target = event.target as HTMLInputElement;
    (this as any)[field] = target.value;
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    this.generatedContract = "";

    try {
      const generateContract = httpsCallable(functions, "generateContract");
      const result: any = await generateContract({
        landlord: this.landlord,
        tenant: this.tenant,
        address: this.address,
        rent: this.rent,
        period: this.period,
        startDate: this.startDate,
      });

      this.generatedContract = result.data.contractText || "לא התקבל חוזה.";
    } catch (err) {
      console.error("שגיאה בקריאת הפונקציה:", err);
      this.generatedContract = "אירעה שגיאה ביצירת החוזה.";
    } finally {
      this.isLoading = false;
    }
  }

  downloadAsPDF() {
    const element = this.shadowRoot?.getElementById("contract");
    if (!element) return;

    html2pdf()
      .set({
        margin: 1,
        filename: "חוזה_שכירות.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  }
}

ContractForm.define({
  name: "contract-form",
  template,
  styles,
});
