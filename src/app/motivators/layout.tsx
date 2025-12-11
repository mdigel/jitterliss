import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5 Reasons to Quit or Detox Caffeine",
  description: "Discover the health and productivity benefits of quitting or reducing caffeine. From better sleep to reduced anxiety, learn why going caffeine-free could transform your life.",
  keywords: [
    "reasons to quit caffeine",
    "benefits of quitting coffee",
    "caffeine detox benefits",
    "why quit caffeine",
    "caffeine free benefits",
    "stop drinking coffee benefits",
    "caffeine and anxiety",
    "caffeine and sleep",
  ],
  openGraph: {
    title: "5 Reasons to Quit or Detox Caffeine | Jitterliss",
    description: "Discover the health and productivity benefits of quitting or reducing caffeine.",
    url: "https://jitterliss.com/motivators",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
