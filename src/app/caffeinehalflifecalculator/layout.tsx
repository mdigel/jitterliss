import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Caffeine Half-Life Calculator - When Will Caffeine Leave Your System",
  description: "Calculate how long caffeine stays in your body. See your caffeine levels hour by hour and learn the best time to stop drinking coffee for better sleep.",
  keywords: [
    "caffeine half life calculator",
    "how long does caffeine last",
    "caffeine in system calculator",
    "when to stop drinking coffee",
    "caffeine metabolism",
    "caffeine and sleep",
    "coffee half life",
    "caffeine duration",
  ],
  openGraph: {
    title: "Caffeine Half-Life Calculator | Jitterliss",
    description: "Calculate how long caffeine stays in your body and when to stop for better sleep.",
    url: "https://jitterliss.com/caffeinehalflifecalculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
