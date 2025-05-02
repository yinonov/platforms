import { FASTElement, observable } from "@microsoft/fast-element";
import { FirebaseApp } from "firebase/app";

export class FirebaseAuth extends FASTElement {
  @observable app?: FirebaseApp;
}
