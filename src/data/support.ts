import type { SupportChannel } from "@/domain";

// Preview only in Phase 2: nothing is connected.
export const supportChannels: SupportChannel[] = [
  { kind: "crisp", label: "Chat with the studio", status: "preview" },
  { kind: "messenger", label: "Message us on Messenger", status: "preview" },
];
