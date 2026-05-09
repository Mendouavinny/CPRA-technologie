export const BRAND_NAME = "CPRA TECHNOLOGY";
export const LEGAL_NAME = "ChemProcess Africa Technology SARL";
export const CONTACT_EMAIL = "contactcpratech@gmail.com";
export const CONTACT_PHONE = "+237 670 190 270";
export const CONTACT_PHONE_HREF = "tel:+237670190270";
export const WHATSAPP_URL = "https://wa.me/237670190270";

export function buildMailtoUrl(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
