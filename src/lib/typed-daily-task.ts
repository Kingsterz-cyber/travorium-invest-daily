import type { Ad } from "@/lib/ads";

export type DailyAdTask = {
  ad: Ad;
  progress: number; // 0-100 (for UI only; wallet completion is binary)
  earnings: number; // 0-500 (for UI)
  status: "pending" | "completed";
};

