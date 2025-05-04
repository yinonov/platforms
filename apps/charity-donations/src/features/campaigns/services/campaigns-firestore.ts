// Firestore helper functions for campaigns
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { app } from "@services/firebase-config";

const db = getFirestore(app);
const campaignsCollection = collection(db, "campaigns");

export async function getCampaigns(): Promise<QuerySnapshot<DocumentData>> {
  return await getDocs(campaignsCollection);
}

export async function getCampaignById(id: string) {
  const campaignDoc = doc(campaignsCollection, id);
  return await getDoc(campaignDoc);
}

export async function createCampaign(data: any) {
  return await addDoc(campaignsCollection, data);
}

export async function updateCampaign(id: string, data: any) {
  const campaignDoc = doc(campaignsCollection, id);
  return await updateDoc(campaignDoc, data);
}

export async function deleteCampaign(id: string) {
  const campaignDoc = doc(campaignsCollection, id);
  return await deleteDoc(campaignDoc);
}
