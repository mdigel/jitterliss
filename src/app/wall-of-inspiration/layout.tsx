import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wall of Inspiration - Caffeine-Free Success Stories",
  description: "Stories and motivation from people who have successfully quit or reduced their caffeine intake. Get inspired to start your own caffeine-free journey.",
  keywords: [
    "quit caffeine success stories",
    "caffeine free testimonials",
    "quitting coffee stories",
    "caffeine detox inspiration",
    "life without caffeine",
  ],
  openGraph: {
    title: "Wall of Inspiration | Jitterliss",
    description: "Stories and motivation from people who have successfully quit or reduced caffeine.",
    url: "https://jitterliss.com/wall-of-inspiration",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
