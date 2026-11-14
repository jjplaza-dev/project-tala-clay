import type {
  IntegrationStatus,
  NotificationKind,
  SupportChannelKind,
} from "./primitives";

export interface NotificationBlock {
  type: "heading" | "paragraph" | "list" | "summary" | "note";
  text?: string;
  items?: string[];
}

export interface NotificationTemplate {
  id: string;
  kind: NotificationKind;
  subject: string;
  bodyBlocks: NotificationBlock[];
}

export interface WholesaleInquiry {
  name: string;
  business: string;
  location: string;
  interests: string[];
  message: string;
}

/** Fictional placeholder entries only (A3). */
export interface Stockist {
  id: string;
  name: string;
  city: string;
  note: string;
  isSample: true;
}

export interface ContactMessage {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export type FAQGroup =
  | "ordering"
  | "made-to-order"
  | "gifts"
  | "shipping"
  | "care"
  | "wholesale";

export interface FAQItem {
  id: string;
  group: FAQGroup;
  question: string;
  answer: string;
}

export interface StudioProfile {
  name: string;
  tagline: string;
  location: string;
  blurb: string;
  contactEmail: string;
  responseTimeNote: string;
  /** True while any value is a placeholder for the studio to replace. */
  isPlaceholder: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SupportChannel {
  kind: SupportChannelKind;
  label: string;
  status: IntegrationStatus;
  href?: string;
}
