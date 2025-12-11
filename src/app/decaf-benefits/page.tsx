"use client";

import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

const physicalBenefits = [
  {
    title: "Live Longer",
    description: "Both regular and decaf have similar antioxidant levels that help reduce rate of all-cause mortality, aging, and risk of cancer. Decaf activates the same protective Nrf2 pathway and NQO1 antioxidant enzymes as regular coffee—the benefits come from polyphenols, not caffeine.",
    icon: "🌱",
    sources: [
      { text: "Springer Study", link: "https://link.springer.com/article/10.1186/s12986-017-0162-x" },
      { text: "NIH Research", link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4665516/" },
      { text: "Peter Attia MD", link: "https://peterattiamd.com/coffee-and-neurodegenerative-disease/" }
    ]
  },
  {
    title: "Stay Hydrated",
    description: "Weight Watchers counts decaf coffee as equivalent to 1 water. Unlike regular coffee, decaf is not a diuretic—it won't make you urinate more.",
    icon: "💧",
    sources: [
      { text: "Everyday Health", link: "https://www.everydayhealth.com/diet-nutrition/does-coffee-count-as-fluid/" }
    ]
  },
  {
    title: "Avoid Stomach Problems",
    description: "The lower levels of acidity in decaf mean you're less likely to experience stomach problems like heartburn and indigestion.",
    icon: "🫃",
    sources: [
      { text: "PubMed Study 1", link: "https://pubmed.ncbi.nlm.nih.gov/7918922/" },
      { text: "PubMed Study 2", link: "https://pubmed.ncbi.nlm.nih.gov/9218070/" }
    ]
  },
  {
    title: "Still Has Laxative Effect",
    description: "Decaf coffee can still have a mild laxative effect, though not as strong as caffeinated coffee (regular coffee's effect was 23% stronger).",
    icon: "🚽",
    sources: [
      { text: "NIH Study", link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6213082/" }
    ]
  },
  {
    title: "Maintain & Lose Weight",
    description: "Low-caff coffee is a great distraction from snacking. The chlorogenic acids cause gradual release of glucose, reducing production of new fat cells. High levels of Vitamin B-3 boost metabolism.",
    icon: "⚖️",
    sources: [
      { text: "NIH Research", link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6683100/" }
    ]
  },
  {
    title: "Lower Blood Pressure",
    description: "All the adverse side effects of regular coffee—higher blood pressure, restlessness, anxiety, palpitations—are avoided with decaf.",
    icon: "💓",
    sources: [
      { text: "PubMed Study 1", link: "https://pubmed.ncbi.nlm.nih.gov/9378841/" },
      { text: "PubMed Study 2", link: "https://pubmed.ncbi.nlm.nih.gov/21880846/" }
    ]
  }
];

const mentalBenefits = [
  {
    title: "Protects Against Alzheimer's & Parkinson's",
    description: "Decaf coffee contains chlorogenic acids and phenylindanes that prevent beta-amyloid and tau proteins from clumping—the hallmarks of Alzheimer's and Parkinson's. Studies show dark roast decaf has identical neuroprotective potency to regular coffee. The effect comes from the coffee compounds, not caffeine.",
    icon: "🧠",
    sources: [
      { text: "Peter Attia MD", link: "https://peterattiamd.com/coffee-and-neurodegenerative-disease/" },
      { text: "PMC Nrf2 Study", link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3842467/" },
      { text: "PubMed Study", link: "https://pubmed.ncbi.nlm.nih.gov/23344884/" }
    ]
  },
  {
    title: "Less Daily Anxiety",
    description: "Caffeine increases the body's stress hormone (cortisol). Switching to decaf removes this constant source of stress on your nervous system.",
    icon: "😌",
    sources: [
      { text: "PubMed Study", link: "https://pubmed.ncbi.nlm.nih.gov/9378841/" }
    ]
  },
  {
    title: "Fall Asleep Faster & Deeper",
    description: "Sleep is the golden chain that binds our health and body together. Caffeine messes with your ability to fall asleep and your quality of sleep—decaf doesn't.",
    icon: "😴",
    sources: [
      { text: "PubMed Study", link: "https://pubmed.ncbi.nlm.nih.gov/26899133/" }
    ]
  },
  {
    title: "Reduced PMS Symptoms",
    description: "When you drink caffeine in the 2nd half of your cycle, it gives your liver more work to do and can lead to PMS symptoms like mood changes and cramps.",
    icon: "🌸",
    sources: []
  },
  {
    title: "Still Increases Alertness",
    description: "Surprisingly, decaffeinated coffee has been shown to increase alertness when compared to placebo. You get the ritual and some of the benefit without the downsides.",
    icon: "⚡",
    sources: [
      { text: "NIH Study", link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6213082/" }
    ]
  }
];

export default function DecafBenefitsPage() {
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#37352F] mb-4">
            The Insane Health Benefits of Decaf Coffee
          </h1>
          <p className="text-gray-600 mb-12 text-lg">
            Think decaf is just &quot;coffee without the fun part&quot;? Think again. Science shows decaf delivers most of coffee&apos;s health benefits without the downsides of caffeine.
          </p>

          {/* Physical Health Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">💪</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#37352F]">
                Physical Health
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {physicalBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{benefit.icon}</span>
                    <h3 className="text-lg font-semibold text-[#37352F]">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {benefit.description}
                  </p>
                  {benefit.sources.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {benefit.sources.map((source, i) => (
                        <a
                          key={i}
                          href={source.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            posthog.capture("decaf_benefits_source_clicked", {
                              source_text: source.text,
                              source_link: source.link,
                              benefit_title: benefit.title,
                              category: "physical",
                            });
                          }}
                          className="text-xs text-[#F67E62] hover:underline"
                        >
                          [{source.text}]
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mental Health Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🧘</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#37352F]">
                Mental Health
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mentalBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{benefit.icon}</span>
                    <h3 className="text-lg font-semibold text-[#37352F]">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {benefit.description}
                  </p>
                  {benefit.sources.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {benefit.sources.map((source, i) => (
                        <a
                          key={i}
                          href={source.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            posthog.capture("decaf_benefits_source_clicked", {
                              source_text: source.text,
                              source_link: source.link,
                              benefit_title: benefit.title,
                              category: "mental",
                            });
                          }}
                          className="text-xs text-[#F67E62] hover:underline"
                        >
                          [{source.text}]
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Line */}
          <div className="bg-[#F67E62] rounded-xl p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-4">The Bottom Line</h3>
            <p className="text-white/90 leading-relaxed">
              Decaf coffee gives you the ritual, the taste, and most of the health benefits of regular coffee—without the anxiety, sleep disruption, blood pressure spikes, and dependency. It&apos;s not &quot;coffee minus the good stuff.&quot; It&apos;s coffee minus the stuff that was hurting you.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-[#37352F] rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Make the Switch?</h3>
            <p className="text-gray-300 mb-6">
              Use our taper calculator to gradually reduce your caffeine intake without withdrawal symptoms.
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
    </div>
  );
}
