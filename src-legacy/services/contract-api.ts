import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase/firebase-config";

export async function generateContractFromForm(data: any) {
  const call = httpsCallable(functions, "generateContract");
  const response: any = await call(data);
  return response.data.contractText;
}
