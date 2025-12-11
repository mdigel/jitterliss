import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Benefits of Decaf Coffee - Science-Backed Research",
  description: "Discover the surprising health benefits of decaf coffee backed by scientific research. From longevity to better sleep, learn why decaf might be the healthier choice.",
  keywords: [
    "decaf coffee benefits",
    "is decaf coffee healthy",
    "decaf vs regular coffee",
    "health benefits of decaf",
    "decaf coffee good for you",
    "decaf antioxidants",
    "decaf and sleep",
    "decaf coffee research",
  ],
  openGraph: {
    title: "Health Benefits of Decaf Coffee | Jitterliss",
    description: "Discover the surprising health benefits of decaf coffee backed by scientific research.",
    url: "https://jitterliss.com/decaf-benefits",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
