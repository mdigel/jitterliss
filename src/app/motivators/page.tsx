"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

const quitMotivators = [
  {
    number: 1,
    title: "Break Free From Dependency",
    description: "Caffeine creates a physical dependency that controls your energy levels. Without it, you feel tired and foggy. Quitting means you'll have natural, stable energy that doesn't require a substance to function. You'll feel like yourself again - not a version that needs caffeine to operate.",
    icon: "🔓"
  },
  {
    number: 2,
    title: "Better, Deeper Sleep",
    description: "Caffeine has a half-life of 5-6 hours, meaning that afternoon coffee is still affecting you at midnight. Quitting leads to falling asleep faster, deeper sleep cycles, and waking up actually refreshed. Many people don't realize how much their sleep quality has degraded until they quit.",
    icon: "😴"
  },
  {
    number: 3,
    title: "Reduced Anxiety & Jitters",
    description: "Caffeine stimulates your nervous system and can trigger or worsen anxiety. That racing heart, those jittery hands, that underlying tension - much of it can be traced back to caffeine. Quitting often leads to a calmer, more centered feeling throughout the day.",
    icon: "🧘"
  },
  {
    number: 4,
    title: "Stable Energy All Day",
    description: "The caffeine cycle creates peaks and crashes that leave you reaching for more. Without caffeine, your energy becomes consistent throughout the day. No more afternoon slumps, no more desperate 3pm coffee runs. Your body learns to regulate energy naturally again.",
    icon: "⚡"
  },
  {
    number: 5,
    title: "Lower Blood Pressure & Heart Health",
    description: "Caffeine temporarily raises blood pressure and heart rate with every dose. Over time, this constant stimulation puts stress on your cardiovascular system. Quitting gives your heart a break and can lead to measurably lower resting blood pressure within weeks.",
    icon: "❤️"
  }
];

const detoxMotivators = [
  {
    number: 1,
    title: "Reset Your Tolerance",
    description: "Over time, your body builds tolerance to caffeine, requiring more and more to feel the same effect. A detox resets your adenosine receptors back to baseline. After a detox, a single cup of coffee will feel like it used to - actually energizing instead of just preventing withdrawal.",
    icon: "🔄"
  },
  {
    number: 2,
    title: "Discover Your True Energy Levels",
    description: "When you're constantly caffeinated, you never know what your natural energy actually feels like. A detox reveals your body's real rhythms - when you're naturally alert, when you need rest. This self-knowledge helps you work with your body instead of against it.",
    icon: "⚡"
  },
  {
    number: 3,
    title: "Reduce Health Risks",
    description: "High caffeine consumption is linked to increased cortisol, elevated blood pressure, and digestive issues. A detox gives your body a break from these stressors. Your cardiovascular system, adrenal glands, and gut all benefit from a caffeine-free period.",
    icon: "❤️"
  },
  {
    number: 4,
    title: "Improve Your Relationship With Caffeine",
    description: "A detox transforms caffeine from a necessity into an option. Instead of needing it to function, you can choose to enjoy it occasionally. This shift from dependency to choice is liberating - caffeine becomes a tool you control, not a master you serve.",
    icon: "🤝"
  },
  {
    number: 5,
    title: "Mental Clarity Without the Crash",
    description: "The caffeine cycle of highs and crashes creates mental fog during the dips. During and after a detox, many people report clearer thinking, better focus, and more stable mood throughout the day. Your brain performs best when it's not on a stimulant rollercoaster.",
    icon: "🧠"
  }
];

export default function MotivatorsPage() {
  const [activeTab, setActiveTab] = useState<"quit" | "detox">("quit");

  const motivators = activeTab === "quit" ? quitMotivators : detoxMotivators;
  const title = activeTab === "quit" ? "5 Reasons to Quit Caffeine" : "5 Reasons to Detox From Caffeine";
  const subtitle = activeTab === "quit"
    ? "Thinking about quitting caffeine completely? Here's why it might be the best decision you make this year."
    : "Not ready to quit completely? A caffeine detox can still transform your relationship with caffeine and improve your health.";
  const ctaTitle = activeTab === "quit" ? "Ready to Quit?" : "Ready to Detox?";
  const ctaText = activeTab === "quit"
    ? "Use our calculator to create a personalized 14-day plan to quit caffeine without withdrawal symptoms."
    : "Our 14-day Zero-Shock Taper plan helps you detox without the headaches and fatigue of going cold turkey.";
  const ctaButton = activeTab === "quit" ? "Start Your Quit Plan →" : "Start Your Detox Plan →";

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
          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {
                  setActiveTab("quit");
                  posthog.capture("motivator_tab_switched", {
                    tab: "quit",
                    previous_tab: activeTab,
                  });
                }}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "quit"
                    ? "bg-white text-[#37352F] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Quit Caffeine
              </button>
              <button
                onClick={() => {
                  setActiveTab("detox");
                  posthog.capture("motivator_tab_switched", {
                    tab: "detox",
                    previous_tab: activeTab,
                  });
                }}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "detox"
                    ? "bg-white text-[#37352F] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Detox
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#37352F] mb-4">
            {title}
          </h1>
          <p className="text-gray-600 mb-12 text-lg">
            {subtitle}
          </p>

          {/* Motivators */}
          <div className="space-y-8">
            {motivators.map((motivator) => (
              <div
                key={motivator.number}
                className="bg-gray-50 rounded-xl p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#F67E62] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {motivator.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{motivator.icon}</span>
                      <h2 className="text-xl sm:text-2xl font-semibold text-[#37352F]">
                        {motivator.title}
                      </h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {motivator.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-[#37352F] rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">{ctaTitle}</h3>
            <p className="text-gray-300 mb-6">
              {ctaText}
            </p>
            <Link
              href="/quitcaffeinecalculator"
              className="inline-block px-8 py-4 bg-[#F67E62] text-white font-semibold rounded-lg hover:bg-[#e56d4f] transition-colors"
            >
              {ctaButton}
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
