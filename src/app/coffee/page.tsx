"use client";

import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

export default function CoffeePage() {
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#37352F] mb-6">
            We No Longer Sell Coffee
          </h1>

          <div className="text-lg text-gray-600 leading-relaxed space-y-6">
            <p>
              Jitterliss used to sell specialty low caffeine coffee, but we&apos;ve since shifted our focus
              to helping people quit and detox their caffeine consumption.
            </p>

            {/* Oren's Coffee Recommendation - Inspired by orenscoffee.com */}
            <div className="bg-[#3A4F69] rounded-xl overflow-hidden my-8">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <p className="text-[#FED330] text-sm font-medium uppercase tracking-wide mb-2">
                    Our Recommendation
                  </p>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                    Oren&apos;s Coffee
                  </h2>
                  <p className="text-white/80 mb-6">
                    If you enjoyed Jitterliss coffee and are looking for something similar,
                    we recommend Oren&apos;s Coffee. They offer high-quality specialty decaf
                    coffee that we think you&apos;ll love.
                  </p>
                  <a
                    href="https://orenscoffee.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      posthog.capture("orens_coffee_clicked", {
                        source: "coffee_page",
                        link_url: "https://orenscoffee.com/",
                      });
                    }}
                    className="inline-block w-fit px-6 py-3 bg-[#FED330] text-[#3A4F69] font-semibold rounded-lg hover:bg-[#f5c820] transition-colors"
                  >
                    Visit Oren&apos;s Coffee →
                  </a>
                  <p className="text-white/60 text-sm mt-4">
                    If you still really want Jitterliss coffee, you can text us at (908) 274-1895 (or Matt if you have his number) for a custom bulk order.
                  </p>
                </div>
                <div className="relative h-64 md:h-auto">
                  <Image
                    src="/OrensCoffee1.png"
                    alt="Oren's Coffee"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <p>
              In the meantime, if you&apos;re curious about reducing or quitting caffeine,
              we have several free tools to help you on your journey.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-[#37352F] rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Explore Our Tools</h3>
            <p className="text-gray-300 mb-6">
              From caffeine calculators to personalized quit plans, we have everything you need
              to take control of your caffeine consumption.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-[#F67E62] text-white font-semibold rounded-lg hover:bg-[#e56d4f] transition-colors"
            >
              View All Tools →
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
    </div>
  );
}
