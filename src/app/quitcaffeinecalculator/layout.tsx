import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Caffeine Detox Calculator - 14-Day Quit Plan",
  description: "Create your personalized 14-day caffeine taper plan. Quit caffeine without withdrawal symptoms using our science-backed Zero-Shock method. Get a downloadable PDF of your plan.",
  keywords: [
    "caffeine detox calculator",
    "quit caffeine plan",
    "caffeine taper schedule",
    "caffeine withdrawal calculator",
    "14 day caffeine detox",
    "how to quit caffeine",
    "caffeine quit plan",
    "stop caffeine without withdrawal",
  ],
  openGraph: {
    title: "Caffeine Detox Calculator - 14-Day Quit Plan | Jitterliss",
    description: "Create your personalized 14-day caffeine taper plan. Quit caffeine without withdrawal symptoms.",
    url: "https://jitterliss.com/quitcaffeinecalculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
