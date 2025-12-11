import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee",
  description: "Jitterliss has shifted focus from selling specialty low-caffeine coffee to helping people quit and detox their caffeine consumption. Discover our recommended alternatives.",
  openGraph: {
    title: "Coffee | Jitterliss",
    description: "Jitterliss has shifted focus to helping people quit and detox caffeine.",
    url: "https://jitterliss.com/coffee",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
