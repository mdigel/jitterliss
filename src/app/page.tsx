"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import posthog from "posthog-js";

// SVG Icon Components
const BedIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16" />
    <path d="M2 8h18a2 2 0 0 1 2 2v10" />
    <path d="M2 17h20" />
    <path d="M6 8v9" />
    <circle cx="9" cy="5" r="1" />
    <path d="M9 6v2" />
  </svg>
);

const PeaceIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v20" />
    <path d="M12 12l-7 7" />
    <path d="M12 12l7 7" />
  </svg>
);

const MoneyIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12" />
    <path d="M15 9.5c0-1.5-1.5-2.5-3-2.5s-3 1-3 2.5 1.5 2 3 2.5 3 1 3 2.5-1.5 2.5-3 2.5-3-1-3-2.5" />
  </svg>
);

const ListIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 6h13" />
    <path d="M8 12h13" />
    <path d="M8 18h13" />
    <circle cx="4" cy="6" r="1" fill="currentColor" />
    <circle cx="4" cy="12" r="1" fill="currentColor" />
    <circle cx="4" cy="18" r="1" fill="currentColor" />
  </svg>
);

const BrainIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M12 5v13" />
    <path d="M7 10h10" />
    <path d="M7 14h10" />
  </svg>
);

const LemonSliceIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Outer circle - the lemon slice */}
    <circle cx="12" cy="12" r="10" />
    {/* Inner circle - the pith */}
    <circle cx="12" cy="12" r="6" />
    {/* Segments radiating from center */}
    <path d="M12 6v6" />
    <path d="M12 12l4.24-4.24" />
    <path d="M18 12h-6" />
    <path d="M12 12l4.24 4.24" />
    <path d="M12 18v-6" />
    <path d="M12 12l-4.24 4.24" />
    <path d="M6 12h6" />
    <path d="M12 12l-4.24-4.24" />
  </svg>
);

const HeartIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

type ToolIconType = "bed" | "peace" | "money" | "list" | "brain" | "lemonslice" | "heart";

const ToolIcon = ({ type, className = "w-8 h-8" }: { type: ToolIconType; className?: string }) => {
  switch (type) {
    case "bed": return <BedIcon className={className} />;
    case "peace": return <PeaceIcon className={className} />;
    case "money": return <MoneyIcon className={className} />;
    case "list": return <ListIcon className={className} />;
    case "brain": return <BrainIcon className={className} />;
    case "lemonslice": return <LemonSliceIcon className={className} />;
    case "heart": return <HeartIcon className={className} />;
  }
};

const tools: { title: string; subtitle: string; href: string; icon: ToolIconType }[] = [
  {
    title: "Caffeine Half-Life Calculator",
    subtitle: "See how much caffeine is in your system at any time",
    href: "/caffeinehalflifecalculator",
    icon: "bed",
  },
  {
    title: "Quit Caffeine Calculator",
    subtitle: "Get a personalized 14-day plan to quit without withdrawal",
    href: "/quitcaffeinecalculator",
    icon: "peace",
  },
  {
    title: "Make a Bet",
    subtitle: "Pick a friend. Set a deadline and a price. If you fail to quit, you pay.",
    href: "/bet",
    icon: "money",
  },
  {
    title: "Ultimate Caffeine List",
    subtitle: "Every caffeinated product sorted by mg",
    href: "/caffeinelist",
    icon: "list",
  },
  {
    title: "5 Reasons to Quit or Detox",
    subtitle: "Motivators to change your caffeine habits",
    href: "/motivators",
    icon: "brain",
  },
  {
    title: "Insane Health Benefits of Decaf Coffee",
    subtitle: "According to Peter Attia, Huberman, BioLayne, and other studies",
    href: "/decaf-benefits",
    icon: "heart",
  },
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Auto-play video on mount with 2 second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 1.2;
        videoRef.current.play();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Coffee Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#F67E62] text-white text-center py-2 px-4">
        <Link
          href="/coffee"
          onClick={() => {
            posthog.capture("coffee_banner_clicked", {
              source: "homepage_banner",
            });
          }}
          className="text-sm sm:text-base hover:underline"
        >
          Looking for Jitterliss coffee? →
        </Link>
      </div>

      {/* Navigation */}
      <nav className="fixed top-10 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
          <div className="flex items-center justify-between">
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
            <a
              href="#about"
              className="text-white font-medium hover:opacity-80 transition-opacity drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            >
              About
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Exploding Objects Video Generation.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 pb-24">
          <p className="text-lg sm:text-xl text-white/80 mb-2 drop-shadow-lg">
            Tools to help you
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 sm:mb-10 drop-shadow-lg">
            Quit or Detox Caffeine
          </h1>

          {/* Tool Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {tools.map((tool) => (
              <div key={tool.href} className="relative group h-full">
                {/* Orange shadow layer */}
                <div className="absolute inset-0 bg-[#F67E62] rounded-2xl translate-x-1.5 translate-y-1.5 sm:translate-x-2 sm:translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                {/* Main card */}
                <Link
                  href={tool.href}
                  onClick={() => {
                    posthog.capture("tool_card_clicked", {
                      tool_name: tool.title,
                      tool_href: tool.href,
                    });
                  }}
                  className="relative flex flex-col h-full bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 text-left transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    {/* Icon */}
                    <div className="text-[#37352F]">
                      <ToolIcon type={tool.icon} className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    {/* Carrot */}
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-gray-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-semibold text-[#37352F] leading-tight">
                    {tool.title}
                  </h3>
                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    {tool.subtitle}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          {/* Wall of Inspiration - Full Width Card */}
          <div className="mt-4 sm:mt-6 relative group">
            {/* Orange shadow layer */}
            <div className="absolute inset-0 bg-[#F67E62] rounded-2xl translate-x-1.5 translate-y-1.5 sm:translate-x-2 sm:translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            {/* Main card */}
            <Link
              href="/wall-of-inspiration"
              onClick={() => {
                posthog.capture("tool_card_clicked", {
                  tool_name: "Wall of Inspiration",
                  tool_href: "/wall-of-inspiration",
                });
              }}
              className="relative flex items-center gap-3 sm:gap-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 transition-all duration-200"
            >
              {/* Icon */}
              <div className="text-[#37352F] flex-shrink-0">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="text-left flex-1">
                <h3 className="text-sm sm:text-base font-semibold text-[#37352F] leading-tight">
                  Wall of Inspiration
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Random things that might inspire you to quit/detox
                </p>
              </div>
              {/* Carrot */}
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-gray-400 transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Tapered Coffee Image Section */}
      <section className="w-full">
        <Image
          src="/TaperedCoffee.png"
          alt="Tapered Coffee"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </section>

      {/* About Us Section */}
      <section id="about" className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 bg-white scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#37352F] mb-8">
            We used to sell a thing called the Caffeine Rehab Kit
          </h2>

         
          <div className="text-base sm:text-lg text-[#37352F] leading-[1.6] space-y-6">
          <p>It was a box of specialty-grade coffee designed to make tapering off caffeine simple and painless.</p>

            {/* Caffeine Rehab Kit Photo */}
            <div className="my-8">
              <Image
                src="/Caf Rehab copy 2.png"
                alt="Caffeine Rehab Kit"
                width={900}
                height={600}
                className="w-full h-auto rounded-xl"
              />
            </div>

            <p>
            People found it useful. In total, we generated over $20k from this coffee business.
            </p>

            <p className="hidden sm:block">
              Here were some text messages from our early participates:
            </p>

            {/* Testimonial Photos - Desktop Only */}
            <div className="hidden sm:grid my-8 grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setLightboxImage("/Post 3.6.23 - 4.png");
                  posthog.capture("testimonial_lightbox_opened", {
                    image: "/Post 3.6.23 - 4.png",
                    testimonial_index: 1,
                  });
                }}
                className="cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/Post 3.6.23 - 4.png"
                  alt="Customer testimonial"
                  width={400}
                  height={500}
                  className="w-full h-auto rounded-xl"
                />
              </button>
              <button
                onClick={() => {
                  setLightboxImage("/Post 3.6.23 - 6.png");
                  posthog.capture("testimonial_lightbox_opened", {
                    image: "/Post 3.6.23 - 6.png",
                    testimonial_index: 2,
                  });
                }}
                className="cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/Post 3.6.23 - 6.png"
                  alt="Customer testimonial"
                  width={400}
                  height={500}
                  className="w-full h-auto rounded-xl"
                />
              </button>
              <button
                onClick={() => {
                  setLightboxImage("/Post 3.6.23 - 8.png");
                  posthog.capture("testimonial_lightbox_opened", {
                    image: "/Post 3.6.23 - 8.png",
                    testimonial_index: 3,
                  });
                }}
                className="cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/Post 3.6.23 - 8.png"
                  alt="Customer testimonial"
                  width={400}
                  height={500}
                  className="w-full h-auto rounded-xl"
                />
              </button>
            </div>

            <p>
              But as a fully bootstrapped, nights-and-weekends project, we quickly realized something important: selling physical products sustainably requires time and marketing resources we just didn&apos;t have.
            </p>

            <p>
              So we pivoted.
            </p>

            <p>
              Today, instead of selling coffee, Jitterliss exists as a simple, supportive resource to help you decrease your dependence on caffeine.
            </p>

            <p>
              One taper at a time.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-12 flex justify-start">
            <Image
              src="/Online Signature.png"
              alt="Matt & Chloe"
              width={200}
              height={60}
              className="h-auto w-[150px] sm:w-[200px]"
            />
          </div>

          {/* Archived Collection Image */}
          <div className="mt-12 flex justify-center">
            <Image
              src="/archived2.png"
              alt="Jitterliss Archived Collection 2023-2025"
              width={900}
              height={600}
              className="w-full h-auto rounded-xl"
            />
          </div>

          {/* CTA to Calculator */}
          <div className="mt-8 text-center">
            <Link
              href="/quitcaffeinecalculator"
              onClick={() => {
                posthog.capture("about_section_cta_clicked", {
                  cta_text: "Quit Caffeine Calculator",
                  source: "about_section",
                });
              }}
              className="inline-block px-8 py-4 bg-[#F67E62] text-white font-semibold rounded-lg hover:bg-[#e56d4f] transition-colors text-lg"
            >
              Quit Caffeine Calculator →
            </Link>
          </div>
        </div>
      </section>

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
            alt="Testimonial enlarged"
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
