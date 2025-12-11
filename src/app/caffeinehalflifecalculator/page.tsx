"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

// SVG Icon Components
const CoffeeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
    <path d="M6 2v2" />
    <path d="M10 2v2" />
    <path d="M14 2v2" />
  </svg>
);

const EspressoIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 10h8a2 2 0 0 1 2 2v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-5a2 2 0 0 1 2-2z" />
    <path d="M16 12h2a2 2 0 0 1 0 4h-2" />
    <path d="M8 6c0-1.5.5-3 2-3s2 1.5 2 3" />
  </svg>
);

const TeaIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 10h10a2 2 0 0 1 2 2v4a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-4a2 2 0 0 1 2-2z" />
    <path d="M17 12h1a3 3 0 0 1 0 6h-1" />
    <path d="M8 6l1-3" />
    <path d="M12 6l-1-3" />
  </svg>
);

const EnergyDrinkIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <path d="M6 7h12" />
    <path d="M13 11l-2 3h3l-2 3" />
  </svg>
);

const SodaIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2h8l1 5H7l1-5z" />
    <path d="M7 7h10v12a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V7z" />
    <circle cx="10" cy="12" r="1" fill="currentColor" />
    <circle cx="14" cy="14" r="1" fill="currentColor" />
    <circle cx="11" cy="16" r="1" fill="currentColor" />
  </svg>
);

const ChocolateIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <line x1="8" y1="6" x2="8" y2="18" />
    <line x1="12" y1="6" x2="12" y2="18" />
    <line x1="16" y1="6" x2="16" y2="18" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
);

const SupplementIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3h8a2 2 0 0 1 2 2v2H6V5a2 2 0 0 1 2-2z" />
    <path d="M6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7z" />
    <path d="M10 12h4" />
    <path d="M12 10v4" />
  </svg>
);

const CustomDrinkIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 8h14l-1.5 12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2L5 8z" />
    <path d="M4 8h16" />
    <path d="M10 12v4" />
    <path d="M14 12v4" />
  </svg>
);

// Drink categories for icon mapping
type DrinkCategory = 'coffee' | 'espresso' | 'tea' | 'energy' | 'soda' | 'chocolate' | 'supplement' | 'custom';

const getDrinkCategory = (drinkName: string): DrinkCategory => {
  const name = drinkName.toLowerCase();
  if (name.includes('espresso') || name.includes('latte') || name.includes('cappuccino') || name.includes('americano')) return 'espresso';
  if (name.includes('coffee') || name.includes('cold brew')) return 'coffee';
  if (name.includes('tea') || name.includes('matcha') || name.includes('chai')) return 'tea';
  if (name.includes('monster') || name.includes('red bull') || name.includes('5-hour') || name.includes('celsius') || name.includes('bang')) return 'energy';
  if (name.includes('cola') || name.includes('coke') || name.includes('dew') || name.includes('pepper')) return 'soda';
  if (name.includes('chocolate')) return 'chocolate';
  if (name.includes('pre-workout')) return 'supplement';
  return 'custom';
};

const DrinkIcon = ({ drinkName, className = "w-5 h-5" }: { drinkName: string; className?: string }) => {
  const category = getDrinkCategory(drinkName);
  switch (category) {
    case 'coffee': return <CoffeeIcon className={className} />;
    case 'espresso': return <EspressoIcon className={className} />;
    case 'tea': return <TeaIcon className={className} />;
    case 'energy': return <EnergyDrinkIcon className={className} />;
    case 'soda': return <SodaIcon className={className} />;
    case 'chocolate': return <ChocolateIcon className={className} />;
    case 'supplement': return <SupplementIcon className={className} />;
    default: return <CustomDrinkIcon className={className} />;
  }
};

// Caffeine content data for common drinks
const caffeinatedDrinks = [
  { name: "Brewed Coffee (8oz)", caffeine: 96 },
  { name: "Starbucks Coffee (8oz)", caffeine: 155 },
  { name: "Cold Brew Coffee (8oz)", caffeine: 103 },
  { name: "Espresso (1 shot)", caffeine: 64 },
  { name: "Double Espresso (2 shots)", caffeine: 128 },
  { name: "Latte (8oz)", caffeine: 64 },
  { name: "Cappuccino (8oz)", caffeine: 64 },
  { name: "Americano (8oz)", caffeine: 64 },
  { name: "Black Tea (8oz)", caffeine: 48 },
  { name: "Green Tea (8oz)", caffeine: 28 },
  { name: "Matcha (8oz)", caffeine: 70 },
  { name: "Chai Tea Latte (8oz)", caffeine: 50 },
  { name: "Iced Tea (8oz)", caffeine: 25 },
  { name: "Monster Energy (16oz)", caffeine: 160 },
  { name: "Red Bull (8.4oz)", caffeine: 80 },
  { name: "5-Hour Energy (2oz)", caffeine: 230 },
  { name: "Celsius (12oz)", caffeine: 200 },
  { name: "Bang Energy (16oz)", caffeine: 300 },
  { name: "Coca-Cola (12oz)", caffeine: 34 },
  { name: "Diet Coke (12oz)", caffeine: 46 },
  { name: "Mountain Dew (12oz)", caffeine: 54 },
  { name: "Dr Pepper (12oz)", caffeine: 41 },
  { name: "Dark Chocolate (1oz)", caffeine: 12 },
  { name: "Pre-Workout (1 scoop)", caffeine: 150 },
];

interface CaffeineDrink {
  id: string;
  drinkName: string;
  caffeine: number;
  time: string;
}

// Caffeine half-life in hours (average)
const HALF_LIFE = 5;
const NEAR_ZERO_THRESHOLD = 20; // mg - minimal remaining caffeine

// Calculate remaining caffeine at a given time
function calculateCaffeineAtTime(
  drinks: CaffeineDrink[],
  targetTime: number // hours from midnight
): number {
  let totalCaffeine = 0;

  drinks.forEach((drink) => {
    const [hours, minutes] = drink.time.split(":").map(Number);
    const drinkTime = hours + minutes / 60;

    // Only count drinks consumed before target time
    let hoursElapsed = targetTime - drinkTime;

    // Handle overnight (if target is after midnight and drink was before)
    if (hoursElapsed < 0) {
      hoursElapsed += 24;
    }

    if (hoursElapsed >= 0) {
      // Exponential decay: C(t) = C0 * (0.5)^(t/half-life)
      const remaining = drink.caffeine * Math.pow(0.5, hoursElapsed / HALF_LIFE);
      totalCaffeine += remaining;
    }
  });

  return totalCaffeine;
}

// Find when caffeine drops below threshold
function findCaffeineNearZeroTime(
  drinks: CaffeineDrink[],
  startTime: number
): string {
  let time = startTime;
  let maxIterations = 48; // Prevent infinite loop, max 48 hours

  while (maxIterations > 0) {
    const caffeine = calculateCaffeineAtTime(drinks, time);
    if (caffeine < NEAR_ZERO_THRESHOLD) {
      const hours = Math.floor(time % 24);
      const minutes = Math.round((time % 1) * 60);
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    }
    time += 0.25; // Check every 15 minutes
    maxIterations--;
  }

  return "48+ hours";
}

// Generate chart data points
function generateChartData(
  drinks: CaffeineDrink[],
  bedtime: string
): { time: number; caffeine: number; label: string }[] {
  if (drinks.length === 0) return [];

  const data: { time: number; caffeine: number; label: string }[] = [];

  // Find earliest drink time
  const drinkTimes = drinks.map((d) => {
    const [h, m] = d.time.split(":").map(Number);
    return h + m / 60;
  });
  const startTime = Math.min(...drinkTimes);

  // Parse bedtime
  const [bedH, bedM] = bedtime.split(":").map(Number);
  let endTime = bedH + bedM / 60;

  // If bedtime is earlier than start (e.g., bedtime is next day), add 24
  if (endTime <= startTime) {
    endTime += 24;
  }

  // Extend chart a few hours past bedtime
  endTime += 4;

  // Generate data points every 30 minutes
  for (let t = startTime; t <= endTime; t += 0.5) {
    const caffeine = calculateCaffeineAtTime(drinks, t);
    const displayTime = t % 24;
    const hours = Math.floor(displayTime);
    const minutes = Math.round((displayTime % 1) * 60);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;

    data.push({
      time: t,
      caffeine: Math.round(caffeine * 10) / 10,
      label: `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`,
    });
  }

  return data;
}

// Default drink to show on page load
const defaultDrink: CaffeineDrink = {
  id: "default-coffee",
  drinkName: "Brewed Coffee (8oz)",
  caffeine: 96,
  time: "08:00",
};

export default function CaffeineMath() {
  const [drinks, setDrinks] = useState<CaffeineDrink[]>([defaultDrink]);
  const [drinkSearch, setDrinkSearch] = useState("");
  const [showDrinkDropdown, setShowDrinkDropdown] = useState(false);
  const [customCaffeine, setCustomCaffeine] = useState("");
  const [drinkTime, setDrinkTime] = useState("08:00");
  const [bedtime, setBedtime] = useState("22:00");
  const [showTooltip, setShowTooltip] = useState(true);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filter drinks based on search
  const filteredDrinks = useMemo(() => {
    if (!drinkSearch.trim()) return caffeinatedDrinks;
    const search = drinkSearch.toLowerCase();
    return caffeinatedDrinks.filter(
      (drink) => drink.name.toLowerCase().includes(search)
    );
  }, [drinkSearch]);

  // Check if we should show custom drink option
  const showCustomOption = drinkSearch.trim() && filteredDrinks.length === 0;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowDrinkDropdown(false);
      }
    };

    if (showDrinkDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showDrinkDropdown]);

  const addDrink = (drinkName: string, caffeine: number) => {
    const newDrink: CaffeineDrink = {
      id: Date.now().toString(),
      drinkName,
      caffeine,
      time: drinkTime,
    };

    // Track drink added event
    posthog.capture("halflife_calculator_drink_added", {
      drink_name: drinkName,
      caffeine_mg: caffeine,
      time_consumed: drinkTime,
      is_custom_drink: !caffeinatedDrinks.some((d) => d.name === drinkName),
      total_drinks: drinks.length + 1,
    });

    setDrinks([...drinks, newDrink]);
    setDrinkSearch("");
    setCustomCaffeine("");
    setShowDrinkDropdown(false);
  };

  const handleSelectDrink = (drink: { name: string; caffeine: number }) => {
    addDrink(drink.name, drink.caffeine);
  };

  const handleAddCustomDrink = () => {
    const caffeine = parseInt(customCaffeine);
    if (drinkSearch.trim() && caffeine > 0) {
      addDrink(drinkSearch.trim(), caffeine);
    }
  };

  const removeDrink = (id: string) => {
    setDrinks(drinks.filter((d) => d.id !== id));
  };

  // Calculate results
  const results = useMemo(() => {
    if (drinks.length === 0) return null;

    const [bedH, bedM] = bedtime.split(":").map(Number);
    const bedtimeHours = bedH + bedM / 60;

    const caffeineAtBedtime = calculateCaffeineAtTime(drinks, bedtimeHours);
    const nearZeroTime = findCaffeineNearZeroTime(drinks, bedtimeHours);
    const chartData = generateChartData(drinks, bedtime);

    // Find max caffeine for chart scaling
    const maxCaffeine = Math.max(...chartData.map((d) => d.caffeine), 100);

    return {
      caffeineAtBedtime: Math.round(caffeineAtBedtime),
      nearZeroTime,
      chartData,
      maxCaffeine,
      bedtimeHours,
    };
  }, [drinks, bedtime]);

  // Format time for display
  const formatTimeDisplay = (time24: string) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

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
            Caffeine Half-Life Calculator
          </h1>
          <p className="text-gray-600 mb-8">
            Track how caffeine moves through your system throughout the day.
            Caffeine has an average half-life of 5 hours, meaning half is eliminated every 5 hours.
          </p>

          {/* Input Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-[#37352F] mb-4">
              Add Your Drinks
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Drink Search */}
              <div ref={searchContainerRef} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caffeinated Drink
                </label>
                <input
                  type="text"
                  value={drinkSearch}
                  onChange={(e) => {
                    setDrinkSearch(e.target.value);
                    setShowDrinkDropdown(true);
                  }}
                  onFocus={() => setShowDrinkDropdown(true)}
                  placeholder="Search for a drink..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900"
                />

                {/* Dropdown */}
                {showDrinkDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                    {filteredDrinks.length > 0 ? (
                      filteredDrinks.map((drink) => (
                        <button
                          key={drink.name}
                          onClick={() => handleSelectDrink(drink)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                        >
                          <span className="text-gray-400 flex-shrink-0">
                            <DrinkIcon drinkName={drink.name} />
                          </span>
                          <span className="text-gray-900 flex-1">{drink.name}</span>
                          <span className="text-sm text-gray-500">{drink.caffeine}mg</span>
                        </button>
                      ))
                    ) : showCustomOption ? (
                      <div className="p-4">
                        <p className="text-sm text-gray-600 mb-3">
                          No matching drinks found. Add &quot;{drinkSearch}&quot; as a custom drink:
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={customCaffeine}
                            onChange={(e) => setCustomCaffeine(e.target.value)}
                            placeholder="Caffeine (mg)"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900 text-sm"
                          />
                          <button
                            onClick={handleAddCustomDrink}
                            disabled={!customCaffeine || parseInt(customCaffeine) <= 0}
                            className="px-4 py-2 bg-[#F67E62] text-white font-medium rounded-lg hover:bg-[#e56d4f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Time Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Consumed
                </label>
                <input
                  type="time"
                  value={drinkTime}
                  onChange={(e) => setDrinkTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900"
                />
              </div>
            </div>

            {/* Bedtime Setting */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Bedtime
              </label>
              <input
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900"
              />
            </div>
          </div>

          {/* Drinks List */}
          {drinks.length > 0 && (
            <div className="relative bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-[#37352F] mb-4">
                Your Drinks Today
              </h3>
              <div className="space-y-2">
                {drinks
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((drink, index) => (
                    <div
                      key={drink.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 flex-shrink-0">
                          <DrinkIcon drinkName={drink.drinkName} />
                        </span>
                        <span className="text-sm font-medium text-[#F67E62]">
                          {formatTimeDisplay(drink.time)}
                        </span>
                        <span className="text-gray-900">{drink.drinkName}</span>
                        <span className="text-sm text-gray-500">
                          {drink.caffeine}mg
                        </span>
                      </div>

                      {/* X button with animated arrow pointer */}
                      <div className="relative flex items-center">
                        {showTooltip && index === 0 && (
                          <>
                            {/* Tooltip message */}
                            <div className="absolute right-full mr-3 whitespace-nowrap bg-[#37352F] text-white text-sm rounded-lg px-3 py-2 shadow-lg animate-bounce-horizontal">
                              <span>Remove or add drinks to customize</span>
                              {/* Arrow pointing right */}
                              <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2">
                                <div className="w-0 h-0 border-t-6 border-b-6 border-l-8 border-t-transparent border-b-transparent border-l-[#37352F]"></div>
                              </div>
                            </div>
                            {/* Bouncing arrow */}
                            <div className="absolute right-full mr-1 animate-bounce-horizontal">
                              <svg
                                className="w-6 h-6 text-[#F67E62]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                              </svg>
                            </div>
                          </>
                        )}
                        <button
                          onClick={() => {
                            removeDrink(drink.id);
                            if (showTooltip) setShowTooltip(false);
                          }}
                          className={`text-gray-400 hover:text-red-500 transition-colors ${
                            showTooltip && index === 0 ? "text-[#F67E62] scale-125" : ""
                          }`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Results Section */}
          {results && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F67E62] rounded-lg p-6 text-white">
                  <h3 className="text-sm font-medium opacity-90 mb-1">
                    Caffeine at Bedtime ({formatTimeDisplay(bedtime)})
                  </h3>
                  <p className="text-4xl font-bold">
                    {results.caffeineAtBedtime}mg
                  </p>
                  <p className="text-sm opacity-75 mt-2">
                    {results.caffeineAtBedtime > 100
                      ? "High - will significantly disrupt deep sleep"
                      : results.caffeineAtBedtime > 50
                      ? "Disruptive - reduces deep sleep by 20-30%"
                      : results.caffeineAtBedtime > 20
                      ? "Still affects sleep architecture"
                      : results.caffeineAtBedtime > 0
                      ? "Minimal - close to optimal for sleep"
                      : "Optimal - no caffeine impact on sleep"}
                  </p>
                </div>

                <div className="bg-[#37352F] rounded-lg p-6 text-white">
                  <h3 className="text-sm font-medium opacity-90 mb-1">
                    Caffeine Near Zero
                  </h3>
                  <p className="text-4xl font-bold">{results.nearZeroTime}</p>
                  <p className="text-sm opacity-75 mt-2">
                    When caffeine drops below 20mg
                  </p>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#37352F] mb-4">
                  Caffeine Levels Throughout the Day
                </h3>

                {/* Simple SVG Chart */}
                <div className="relative h-64 sm:h-80">
                  <svg
                    viewBox="0 0 800 300"
                    className="w-full h-full"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Y-axis labels */}
                    <text x="10" y="20" className="text-xs fill-gray-500">
                      {Math.round(results.maxCaffeine)}mg
                    </text>
                    <text x="10" y="150" className="text-xs fill-gray-500">
                      {Math.round(results.maxCaffeine / 2)}mg
                    </text>
                    <text x="10" y="280" className="text-xs fill-gray-500">
                      0mg
                    </text>

                    {/* Grid lines */}
                    <line
                      x1="60"
                      y1="20"
                      x2="780"
                      y2="20"
                      stroke="#e5e5e5"
                      strokeWidth="1"
                    />
                    <line
                      x1="60"
                      y1="150"
                      x2="780"
                      y2="150"
                      stroke="#e5e5e5"
                      strokeWidth="1"
                    />
                    <line
                      x1="60"
                      y1="280"
                      x2="780"
                      y2="280"
                      stroke="#e5e5e5"
                      strokeWidth="1"
                    />

                    {/* Bedtime indicator */}
                    {results.chartData.length > 0 && (
                      <>
                        {(() => {
                          const startTime = results.chartData[0].time;
                          const endTime = results.chartData[results.chartData.length - 1].time;
                          let bedtimePos = results.bedtimeHours;
                          if (bedtimePos < startTime) bedtimePos += 24;
                          const x = 60 + ((bedtimePos - startTime) / (endTime - startTime)) * 720;
                          return (
                            <>
                              <line
                                x1={x}
                                y1="20"
                                x2={x}
                                y2="280"
                                stroke="#37352F"
                                strokeWidth="2"
                                strokeDasharray="4"
                              />
                              <text
                                x={x}
                                y="12"
                                textAnchor="middle"
                                className="text-xs fill-[#37352F] font-medium"
                              >
                                Bedtime
                              </text>
                            </>
                          );
                        })()}
                      </>
                    )}

                    {/* Caffeine curve */}
                    {results.chartData.length > 1 && (
                      <path
                        d={results.chartData
                          .map((point, i) => {
                            const startTime = results.chartData[0].time;
                            const endTime =
                              results.chartData[results.chartData.length - 1].time;
                            const x =
                              60 +
                              ((point.time - startTime) / (endTime - startTime)) *
                                720;
                            const y =
                              280 - (point.caffeine / results.maxCaffeine) * 260;
                            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                          })
                          .join(" ")}
                        fill="none"
                        stroke="#F67E62"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* Area under curve */}
                    {results.chartData.length > 1 && (
                      <path
                        d={
                          results.chartData
                            .map((point, i) => {
                              const startTime = results.chartData[0].time;
                              const endTime =
                                results.chartData[results.chartData.length - 1]
                                  .time;
                              const x =
                                60 +
                                ((point.time - startTime) / (endTime - startTime)) *
                                  720;
                              const y =
                                280 - (point.caffeine / results.maxCaffeine) * 260;
                              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                            })
                            .join(" ") +
                          ` L ${60 + 720} 280 L 60 280 Z`
                        }
                        fill="url(#gradient)"
                        opacity="0.3"
                      />
                    )}

                    {/* Gradient definition */}
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#F67E62" />
                        <stop offset="100%" stopColor="#F67E62" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* X-axis labels */}
                    {results.chartData
                      .filter((_, i) => i % 4 === 0)
                      .map((point, i) => {
                        const startTime = results.chartData[0].time;
                        const endTime =
                          results.chartData[results.chartData.length - 1].time;
                        const x =
                          60 +
                          ((point.time - startTime) / (endTime - startTime)) * 720;
                        return (
                          <text
                            key={i}
                            x={x}
                            y="295"
                            textAnchor="middle"
                            className="text-xs fill-gray-500"
                          >
                            {point.label}
                          </text>
                        );
                      })}
                  </svg>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-[#F67E62] rounded"></div>
                    <span className="text-gray-600">Caffeine level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0 border-t-2 border-dashed border-[#37352F]"></div>
                    <span className="text-gray-600">Bedtime</span>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#37352F] mb-3">
                  What Sleep Research Actually Shows
                </h3>
                <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  <p>
                    <strong className="text-[#37352F]">Target 0mg at bedtime.</strong> Sleep researchers like Matthew Walker recommend having zero caffeine in your system at bedtime. Even 50mg—often cited as a &quot;safe&quot; threshold—is actually the level where EEG studies show measurable sleep disruption begins.
                  </p>
                  <p>
                    <strong className="text-[#37352F]">Tolerance doesn&apos;t protect your sleep.</strong> High-tolerance coffee drinkers may feel fine, but EEG scans show their deep sleep is still reduced. You don&apos;t feel the sleep loss because tolerance masks the subjective effects—but your brain&apos;s restorative sleep is compromised.
                  </p>
                  <p>
                    <strong className="text-[#37352F]">Stop caffeine 10+ hours before bed.</strong> With a 5-hour half-life, 200mg at 2pm still leaves ~50mg at 8pm and ~25mg at 2am. Slow metabolizers (half-life 8-10 hours) should stop even earlier.
                  </p>
                  <p className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                    Based on research from Drake et al. (2013) and sleep scientists at Berkeley, Stanford, and the NIH.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {drinks.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">Add your caffeinated drinks above</p>
              <p className="text-sm">
                The calculator will show you how caffeine levels change throughout your day
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
