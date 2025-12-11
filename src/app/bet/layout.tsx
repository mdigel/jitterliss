import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make a Bet - Accountability for Quitting Caffeine",
  description: "Put your money where your mouth is. Make an accountability bet with a friend to stay committed to your caffeine detox journey.",
  openGraph: {
    title: "Make a Bet | Jitterliss",
    description: "Stay accountable to your caffeine detox with a friendly wager.",
    url: "https://jitterliss.com/bet",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
