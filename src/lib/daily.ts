import { getDayKey, getDailyAds, type Ad } from "@/lib/ads";

export function getTodayDayKey() {
  return getDayKey(new Date());
}

export function getTodayDailyAds(): Ad[] {
  return getDailyAds(new Date(), 5);
}


