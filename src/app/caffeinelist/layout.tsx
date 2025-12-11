import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ultimate Caffeine List - 660+ Drinks, Foods & Products",
  description: "Comprehensive database of caffeine content in 660+ drinks, foods, and products. Search coffee, tea, energy drinks, sodas, chocolate, supplements, and edibles.",
  keywords: [
    "caffeine content list",
    "caffeine in coffee",
    "caffeine in tea",
    "caffeine in energy drinks",
    "caffeine database",
    "how much caffeine",
    "caffeine chart",
    "caffeine mg list",
    "caffeine comparison",
  ],
  openGraph: {
    title: "Ultimate Caffeine List - 660+ Products | Jitterliss",
    description: "Comprehensive database of caffeine content in 660+ drinks, foods, and products.",
    url: "https://jitterliss.com/caffeinelist",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
