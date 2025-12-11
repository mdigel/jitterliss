"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Content items for the wall of inspiration
const inspirationItems = [
  {
    id: "bryan-johnson",
    image: "/BryanJohnson.png",
    title: "Bryan Johnson",
    description: "Billionaire Venmo founder who has dedicated his life to living as long as possible doesn't consume caffeine. He tracks everything about his body and shares it with the world.",
    link: "https://youtu.be/3kAiPSEnrHI?t=353",
    linkText: "Watch his take on caffeine →",
    category: "celebrity",
  },
  {
    id: "peter-attia",
    image: "/PeterAttia.png",
    title: "Dr. Peter Attia",
    description: "Leading longevity expert explains how coffee's neuroprotective benefits come from compounds other than caffeine—meaning decaf provides the same brain protection.",
    link: "https://peterattiamd.com/coffee-and-neurodegenerative-disease/",
    linkText: "Read the research →",
    category: "expert",
  },
  {
    id: "huberman",
    image: "/huberman.png",
    title: "Andrew Huberman",
    description: "Stanford neuroscientist discusses the science of caffeine, its effects on sleep architecture, and optimal protocols for those who choose to consume it.",
    link: "https://podcastnotes.org/huberman-lab/episode-101-using-caffeine-to-optimize-mental-physical-performance-huberman-lab/",
    linkText: "Read the podcast notes →",
    category: "expert",
  },
  {
    id: "biolayne",
    image: "/Biolayne.png",
    title: "Dr. Layne Norton (BioLayne)",
    description: "PhD in Nutritional Sciences shares evidence-based information about caffeine's effects on performance and health.",
    link: "https://www.instagram.com/p/C5WKlu2rug1/?img_index=5",
    linkText: "View on Instagram →",
    category: "expert",
  },
  {
    id: "wsj-caffeine",
    image: "/WallStreetJournal.png",
    title: "Wall Street Journal",
    description: "WSJ covers the latest research on caffeine dosing, side effects, and its impact on sleep quality.",
    link: "https://www.wsj.com/health/wellness/caffeine-dosing-side-effects-sleep-567057b0",
    linkText: "Read the article →",
    category: "media",
  },
  {
    id: "wsj-humblebrag",
    image: "/WSJ_Humblebrag.png",
    title: "WSJ: The New Humblebrag",
    description: "Quitting coffee has become the new productivity flex. More professionals are ditching caffeine and talking about it.",
    link: "https://www.wsj.com/lifestyle/quitting-coffee-caffeine-free-productivity-799615c8",
    linkText: "Read the article →",
    category: "media",
  },
  {
    id: "bloomberg",
    image: "/Bloomberg.png",
    title: "Bloomberg",
    description: "Bloomberg covers the growing trend of professionals reconsidering their caffeine consumption.",
    link: "https://www.instagram.com/p/C5szax1RcWl/",
    linkText: "View on Instagram →",
    category: "media",
  },
  {
    id: "serene-life",
    image: "/MyTotallSereneLifeWithoutcaffeine.png",
    title: "My Totally Serene Life Without Caffeine",
    description: "A personal account of life after quitting caffeine—the peace, the clarity, and the unexpected benefits.",
    link: "https://devonprice.medium.com/my-totally-serene-life-without-caffeine-606ec6f0ea35",
    linkText: "Read on Medium →",
    category: "story",
  },
  {
    id: "reddit-therapy",
    image: "/reddit-therapy.png",
    title: "\"Better Than Years of Therapy\"",
    description: "Reddit user shares how quitting caffeine did more for their mental health than years of therapy.",
    link: "https://www.reddit.com/r/decaf/comments/1ccohsy/quitting_caffeine_has_done_more_for_me_than_years/",
    linkText: "Read on Reddit →",
    category: "story",
  },
  {
    id: "reddit-holy",
    image: "/reddit-holy.png",
    title: "\"Holy Shit\"",
    description: "The moment of realization when someone finally quits caffeine and feels the difference.",
    link: "https://www.reddit.com/r/decaf/comments/195dy01/holy_shit/",
    linkText: "Read on Reddit →",
    category: "story",
  },
  {
    id: "reddit-decided",
    image: "/Reddit-decidedtoquit.png",
    title: "\"Decided to Quit Because of This\"",
    description: "What finally convinced this person to quit caffeine for good.",
    link: "https://www.reddit.com/r/decaf/comments/185t0ua/decided_to_quit_caffeine_because_of_this/",
    linkText: "Read on Reddit →",
    category: "story",
  },
  {
    id: "reddit-decaf-convert",
    image: "/reddit-neverthought.png",
    title: "\"Never Thought I'd Become One of Those Decaf People\"",
    description: "A coffee lover's journey from skeptic to decaf convert.",
    link: "https://www.reddit.com/r/Coffee/comments/t7lzql/never_thought_id_become_one_of_those_decaf_people/",
    linkText: "Read on Reddit →",
    category: "story",
  },
];

const categories = [
  { id: "all", label: "All" },
  { id: "expert", label: "Experts" },
  { id: "media", label: "Media" },
  { id: "celebrity", label: "Celebrities" },
  { id: "story", label: "Stories" },
];

export default function WallOfInspirationPage() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
      }
    };
    if (lightboxImage) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage]);

  const filteredItems = activeCategory === "all"
    ? inspirationItems
    : inspirationItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/jit icon.png"
                alt="Jitterliss Icon"
                width={32}
                height={32}
                priority
                className="object-contain w-8 h-8 sm:w-10 sm:h-10 brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              />
              <Image
                src="/JITTERLISS.png"
                alt="Jitterliss Logo"
                width={120}
                height={32}
                priority
                className="object-contain w-[100px] h-auto sm:w-[120px] md:w-[150px] brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#37352F] mb-4">
            Wall of Inspiration
          </h1>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl">
            Experts, media coverage, and real stories from people who&apos;ve quit or reduced their caffeine intake. Click any image to enlarge.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-[#F67E62] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Clickable Image */}
                <button
                  onClick={() => setLightboxImage(item.image)}
                  className="w-full cursor-pointer hover:opacity-95 transition-opacity"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </button>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-[#37352F] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F67E62] text-sm font-medium hover:underline"
                    >
                      {item.linkText}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-[#37352F] rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
            <p className="text-gray-300 mb-6">
              Use our taper calculator to quit caffeine without withdrawal symptoms.
            </p>
            <Link
              href="/quitcaffeinecalculator"
              className="inline-block px-8 py-4 bg-[#F67E62] text-white font-semibold rounded-lg hover:bg-[#e56d4f] transition-colors"
            >
              Start Your Taper Plan →
            </Link>
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:opacity-70 transition-opacity"
            onClick={() => setLightboxImage(null)}
          >
            &times;
          </button>
          <Image
            src={lightboxImage}
            alt="Enlarged view"
            width={1200}
            height={1500}
            className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
