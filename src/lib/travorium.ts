export const WHATSAPP_NUMBER = "";
export const MANAGER_PHONE_DISPLAY = "";

export type TravoriumUser = {
  fullName: string;
  phone: string;
  email?: string;
  district: string;
  registeredAt: string;
};

export type TravoriumPayment = {
  amount: number;
  method: "MTN" | "AIRTEL" | "";
  screenshot: string; // base64
  submittedAt: string;
};

const USER_KEY = "travorium_user";
const PAYMENT_KEY = "travorium_payment";

export function saveUser(u: TravoriumUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(u));
}
export function getUser(): TravoriumUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as TravoriumUser) : null;
}
export function savePayment(p: TravoriumPayment) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PAYMENT_KEY, JSON.stringify(p));
}
export function getPayment(): TravoriumPayment | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PAYMENT_KEY);
  return raw ? (JSON.parse(raw) as TravoriumPayment) : null;
}

export function buildWhatsappMessage(name: string) {
  return `Muraho, ndi ${name} numaze kwishyura 3,900 FRW kuri TRAVORIUM. Hano hari screenshot yanjye.`;
}
export function buildWhatsappUrl(name: string) {
  const numberPart = WHATSAPP_NUMBER ? `${WHATSAPP_NUMBER}` : "";
  const separator = numberPart ? "/" : "";
  return `https://wa.me/${separator}${numberPart}?text=${encodeURIComponent(buildWhatsappMessage(name))}`;
}
