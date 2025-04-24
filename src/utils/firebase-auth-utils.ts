// firebase-auth-utils.ts
import { RecaptchaVerifier } from "firebase/auth";
import { FASTElement } from "@microsoft/fast-element";
import { auth } from "../firebase/firebase-config";

/**
 * Updates a field's value based on an input event.
 */
export function handleInputValue<T>(target: T, field: keyof T, event: Event) {
  const input = event.target as HTMLInputElement;
  target[field] = input.value as any;
}

/**
 * Creates and appends a new div element for RecaptchaVerifier, with a data attribute for debug.
 */
export function createRecaptchaContainer(name = "recaptcha"): HTMLDivElement {
  const div = document.createElement("div");
  div.setAttribute(`data-${name}`, "true");
  document.body.appendChild(div);
  return div;
}

/**
 * Cleans up a RecaptchaVerifier instance and removes its container element from the DOM.
 */
export function cleanupRecaptcha(
  element?: HTMLElement | null,
  verifier?: RecaptchaVerifier | null
) {
  if (verifier) verifier.clear();
  if (element?.parentNode) element.remove();
}

/**
 * Base class for components that use Firebase Phone Auth with reCAPTCHA.
 */
export class PhoneAuthElement extends FASTElement {
  protected recaptchaElement: HTMLElement | null = null;
  protected recaptchaVerifier: RecaptchaVerifier | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.recaptchaElement = createRecaptchaContainer("recaptcha");
    this.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      this.recaptchaElement,
      { size: "invisible" }
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    cleanupRecaptcha(this.recaptchaElement, this.recaptchaVerifier);
  }

  handleInput(field: string, event: Event) {
    handleInputValue(this, field as keyof this, event);
  }
}
