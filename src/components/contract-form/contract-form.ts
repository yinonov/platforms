import { FASTElement, observable } from "@microsoft/fast-element";
import { generateContractFromForm } from "../../services/contract-api";
import html2pdf from "html2pdf.js";

export class ContractForm extends FASTElement {
  @observable landlord: string = "";
  @observable tenant: string = "";
  @observable address: string = "";
  @observable rent: string = "";
  @observable period: string = "";
  @observable startDate: string = "";
  @observable generatedContract: string = "";
  @observable isLoading: boolean = false;
  @observable signerName: string = "";
  @observable signedAt: string = "";
  @observable phone: string = "";
  @observable isApproved: boolean = false;

  connectedCallback() {
    super.connectedCallback();
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

    this.landlord = getRandom(names);
    this.tenant = getRandom(names);
    this.address = getRandom(addresses);
    this.rent = getRandomRent();
    this.period = "12 חודשים";
    this.startDate = new Date().toISOString().slice(0, 10);
  }

  handleInput(field: string, event: Event) {
    const target = event.target as HTMLInputElement;
    (this as any)[field] = target.value;
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    this.generatedContract = "";

    try {
      const contractText = await generateContractFromForm({
        landlord: this.landlord,
        tenant: this.tenant,
        address: this.address,
        rent: this.rent,
        period: this.period,
        startDate: this.startDate,
      });

      this.generatedContract = contractText || "לא התקבל חוזה.";
    } catch (err) {
      console.error("שגיאה:", err);
      this.generatedContract = "אירעה שגיאה ביצירת החוזה.";
    } finally {
      this.isLoading = false;
    }
  }

  handleSigned(event: CustomEvent) {
    const { signerName, signedAt, phone, isApproved } = event.detail;
    this.signerName = signerName;
    this.signedAt = signedAt;
    this.phone = phone;
    this.isApproved = isApproved;
  }

  downloadAsSignedPDF() {
    const element = this.shadowRoot?.getElementById("contract");
    if (!element) return;

    const clone = element.cloneNode(true) as HTMLElement;
    const footer = document.createElement("div");
    footer.innerHTML = `
    <hr/>
    <p style="direction: rtl; font-style: italic;">
      נחתם ע״י: ${this.signerName}<br/>
      מספר טלפון מאומת: ${this.phone}<br/>
      תאריך: ${this.signedAt}
    </p>
  `;
    clone.appendChild(footer);

    html2pdf()
      .set({
        margin: 1,
        filename: "חוזה_שכירות_חתום.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
      })
      .from(clone)
      .save();
  }
}
