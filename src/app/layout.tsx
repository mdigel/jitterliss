import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jitterliss.com"),
  title: {
    default: "Jitterliss - Your Homebase for Quitting Caffeine",
    template: "%s | Jitterliss",
  },
  description: "Free tools and resources to help you quit or reduce caffeine without withdrawal symptoms. Personalized taper plans, caffeine calculators, and expert guidance.",
  keywords: [
    "quit caffeine",
    "caffeine detox",
    "caffeine withdrawal",
    "reduce caffeine",
    "decaf coffee",
    "caffeine free",
    "caffeine taper",
    "caffeine calculator",
    "caffeine half life",
    "stop drinking coffee",
    "caffeine addiction",
    "caffeine sensitivity",
    "better sleep",
    "reduce anxiety",
  ],
  authors: [{ name: "Jitterliss", url: "https://jitterliss.com" }],
  creator: "Jitterliss",
  publisher: "Jitterliss",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jitterliss.com",
    siteName: "Jitterliss",
    title: "Jitterliss - Your Homebase for Quitting Caffeine",
    description: "Free tools and resources to help you quit or reduce caffeine without withdrawal symptoms. Personalized taper plans, caffeine calculators, and expert guidance.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jitterliss - Quit Caffeine Without the Pain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jitterliss - Your Homebase for Quitting Caffeine",
    description: "Free tools and resources to help you quit or reduce caffeine without withdrawal symptoms.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

// JSON-LD structured data for the website
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Jitterliss",
  url: "https://jitterliss.com",
  description: "Free tools and resources to help you quit or reduce caffeine without withdrawal symptoms.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://jitterliss.com/caffeinelist?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Jitterliss",
  url: "https://jitterliss.com",
  logo: "https://jitterliss.com/JITTERLISS.png",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-908-274-1895",
    contactType: "customer service",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
