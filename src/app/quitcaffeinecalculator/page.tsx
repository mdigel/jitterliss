"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";
import { controlledCaffeine } from "../config/products";

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

const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
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

interface SelectedDrink {
  id: string;
  name: string;
  caffeine: number;
  quantity: number;
}

// Mapping from drink categories to decaf alternatives
const decafAlternatives: Record<string, { categoryName: string; description: string; products: Array<{ name: string; link: string; description: string }> }> = {
  coffee: {
    categoryName: "Decaf Coffee",
    description: "Switch to decaf versions of your regular coffee",
    products: [
      { name: "Oddly Correct – Decaf Colombia", link: "https://oddlycorrect.com/collections/coffee/products/decaf-colombia-huila", description: "Sugarcane-processed decaf praised for tasting as good as regular coffee" },
      { name: "Heart Roasters – Decaf Colombia Huila", link: "https://www.heartroasters.com/products/decaf-colombia", description: "Ethyl acetate decaf with rich flavor and no \"off\" taste" },
      { name: "Onyx Coffee Lab – Decaf Colombia Inza", link: "https://onyxcoffeelab.com/products/decaf-inza-colombia", description: "Smooth taste, great for half-caf blends" },
    ]
  },
  espresso: {
    categoryName: "Decaf Espresso",
    description: "Decaf espresso pods and beans for your espresso drinks",
    products: [
      { name: "Starbucks Decaf Espresso Roast Pods", link: "https://www.amazon.com/dp/B085Z8F1FV?tag=plymouthholdi-20", description: "Nespresso-compatible dark roast decaf with bold Starbucks flavor" },
      { name: "Peet's Decaf Ristretto Pods", link: "https://www.amazon.com/dp/B07Y87NQWK?tag=plymouthholdi-20", description: "Rich, full-bodied decaf espresso capsules with strong crema" },
      { name: "Lavazza Decaf Espresso", link: "https://www.amazon.com/dp/B000SDKTKS?tag=plymouthholdi-20", description: "Classic Italian decaf espresso blend" },
    ]
  },
  tea: {
    categoryName: "Decaf Tea",
    description: "Decaffeinated versions of your favorite teas",
    products: [
      { name: "Yorkshire Tea Bedtime Brew", link: "https://www.amazon.com/dp/B07575MG7Q?tag=plymouthholdi-20", description: "Robust decaffeinated black tea blend with strong flavor" },
      { name: "Twinings English Breakfast Decaf", link: "https://www.amazon.com/dp/B00097DZYW?tag=plymouthholdi-20", description: "Classic English Breakfast tea with caffeine gently removed" },
      { name: "Celestial Seasonings Decaf Green Tea", link: "https://www.amazon.com/dp/B000E65OBU?tag=plymouthholdi-20", description: "Smooth decaf green tea" },
    ]
  },
  energy: {
    categoryName: "Caffeine-Free Energy Alternatives",
    description: "Get energy without caffeine using these alternatives",
    products: [
      { name: "Ketone-IQ (Exogenous Ketones)", link: "https://www.amazon.com/dp/B0DY7VKSYL?tag=plymouthholdi-20", description: "Caffeine-free ketone drink for clean, sustained energy" },
      { name: "LMNT Electrolyte Drink Mix", link: "https://www.amazon.com/dp/B082WG7N9J?tag=plymouthholdi-20", description: "Zero caffeine electrolytes for hydration and energy" },
      { name: "Nuun Sport (Caffeine-Free)", link: "https://www.amazon.com/dp/B019GU4ILQ?tag=plymouthholdi-20", description: "Electrolyte tablets without caffeine" },
    ]
  },
  soda: {
    categoryName: "Caffeine-Free Soda",
    description: "Enjoy your favorite sodas without the caffeine",
    products: [
      { name: "Caffeine-Free Coca-Cola", link: "https://www.amazon.com/dp/B0788GLFN5?tag=plymouthholdi-20", description: "Same great Coke taste, zero caffeine" },
      { name: "Caffeine-Free Diet Coke", link: "https://www.amazon.com/dp/B086DMC5H2?tag=plymouthholdi-20", description: "Diet Coke flavor without caffeine" },
      { name: "Zevia Zero Calorie Soda", link: "https://www.amazon.com/dp/B01LTI0ARO?tag=plymouthholdi-20", description: "Naturally sweetened cola with no caffeine" },
    ]
  },
  supplement: {
    categoryName: "Caffeine-Free Pre-Workout",
    description: "Get pumped without caffeine",
    products: [
      { name: "Transparent Labs Stim-Free Pre-Workout", link: "https://www.amazon.com/dp/B07NDDJH8Z?tag=plymouthholdi-20", description: "Full pre-workout formula without stimulants" },
      { name: "Legion Pulse Stim-Free", link: "https://www.amazon.com/dp/B074Z87QKL?tag=plymouthholdi-20", description: "Caffeine-free pre-workout with citrulline and beta-alanine" },
    ]
  }
};

// Zero Shock Taper percentages by day
const taperSchedule = [
  { day: 1, percentage: 80, description: "Start the taper - your brain won't notice much difference" },
  { day: 2, percentage: 80, description: "Hold steady so your brain doesn't freak out" },
  { day: 3, percentage: 60, description: "First real reduction - stay strong!" },
  { day: 4, percentage: 60, description: "Another hold day - let your body adjust" },
  { day: 5, percentage: 40, description: "Halfway there! You're doing great" },
  { day: 6, percentage: 40, description: "Hold at 40% - consistency is key" },
  { day: 7, percentage: 30, description: "One week in! The hardest part is behind you" },
  { day: 8, percentage: 30, description: "Hold steady - you're building new habits" },
  { day: 9, percentage: 20, description: "Almost there - tiny amounts now" },
  { day: 10, percentage: 20, description: "Hold at 20% - finish line in sight" },
  { day: 11, percentage: 10, description: "Single digits! You've got this" },
  { day: 12, percentage: 10, description: "Final hold day at 10%" },
  { day: 13, percentage: 5, description: "Soft landing dose - almost caffeine-free" },
  { day: 14, percentage: 0, description: "You're off! Congratulations!" },
];

// Find best product combinations for a target caffeine amount
function findProductsForTarget(targetMg: number): { products: Array<{ name: string; link: string; caffeineMg: number; quantity: number }>; totalMg: number } {
  if (targetMg <= 0) return { products: [], totalMg: 0 };

  // Get all available caffeine products flattened
  const allProducts = controlledCaffeine.flatMap(group =>
    group.items.map(item => ({
      name: item.name,
      link: item.link,
      caffeineMg: item.caffeineMg
    }))
  ).sort((a, b) => b.caffeineMg - a.caffeineMg);

  const result: Array<{ name: string; link: string; caffeineMg: number; quantity: number }> = [];
  let remaining = targetMg;

  // Greedy algorithm to find products
  for (const product of allProducts) {
    if (remaining <= 0) break;

    const quantity = Math.floor(remaining / product.caffeineMg);
    if (quantity > 0) {
      result.push({ ...product, quantity });
      remaining -= quantity * product.caffeineMg;
    }
  }

  // If we have remaining, try to find a close match
  if (remaining > 0 && remaining >= 20) {
    const closest = allProducts.find(p => p.caffeineMg <= remaining + 10);
    if (closest) {
      result.push({ ...closest, quantity: 1 });
      remaining -= closest.caffeineMg;
    }
  }

  const totalMg = result.reduce((sum, p) => sum + p.caffeineMg * p.quantity, 0);
  return { products: result, totalMg };
}

export default function DetoxCalculator() {
  // Step tracking
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Daily intake
  const [drinks, setDrinks] = useState<SelectedDrink[]>([]);
  const [drinkSearch, setDrinkSearch] = useState("");
  const [showDrinkDropdown, setShowDrinkDropdown] = useState(false);
  const [customCaffeine, setCustomCaffeine] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Step 4: Start date
  const [startDate, setStartDate] = useState<string>("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Calculate total daily caffeine
  const totalCaffeine = useMemo(() => {
    return drinks.reduce((sum, drink) => sum + drink.caffeine * drink.quantity, 0);
  }, [drinks]);

  // Generate taper plan
  const taperPlan = useMemo(() => {
    return taperSchedule.map(day => ({
      ...day,
      targetMg: Math.round(totalCaffeine * day.percentage / 100),
      ...findProductsForTarget(Math.round(totalCaffeine * day.percentage / 100))
    }));
  }, [totalCaffeine]);

  // Calculate dates for the plan
  const planDates = useMemo(() => {
    if (!startDate) return [];
    const start = new Date(startDate);
    return taperPlan.map((_, index) => {
      const date = new Date(start);
      date.setDate(date.getDate() + index);
      return date;
    });
  }, [startDate, taperPlan]);

  // Filter drinks based on search
  const filteredDrinks = useMemo(() => {
    if (!drinkSearch.trim()) return caffeinatedDrinks;
    const search = drinkSearch.toLowerCase();
    return caffeinatedDrinks.filter(drink => drink.name.toLowerCase().includes(search));
  }, [drinkSearch]);

  const showCustomOption = drinkSearch.trim() && filteredDrinks.length === 0;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDrinkDropdown(false);
      }
    };
    if (showDrinkDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDrinkDropdown]);

  const addDrink = (name: string, caffeine: number) => {
    const existing = drinks.find(d => d.name === name);
    const isFirstDrink = drinks.length === 0;

    if (existing) {
      setDrinks(drinks.map(d => d.name === name ? { ...d, quantity: d.quantity + 1 } : d));
    } else {
      setDrinks([...drinks, { id: crypto.randomUUID(), name, caffeine, quantity: 1 }]);
    }

    // Track calculator started when first drink is added
    if (isFirstDrink) {
      posthog.capture("quit_calculator_started", {
        first_drink_name: name,
        first_drink_caffeine: caffeine,
      });
    }

    setDrinkSearch("");
    setCustomCaffeine("");
    setShowDrinkDropdown(false);
  };

  const updateQuantity = (id: string, delta: number) => {
    setDrinks(drinks.map(d => {
      if (d.id === id) {
        const newQty = Math.max(0, d.quantity + delta);
        return { ...d, quantity: newQty };
      }
      return d;
    }).filter(d => d.quantity > 0));
  };

  const removeDrink = (id: string) => {
    setDrinks(drinks.filter(d => d.id !== id));
  };

  const handleAddCustomDrink = () => {
    const caffeine = parseInt(customCaffeine);
    if (drinkSearch.trim() && caffeine > 0) {
      addDrink(drinkSearch.trim(), caffeine);
    }
  };

  // Get suggested start date (next Saturday)
  const getSuggestedStartDate = () => {
    const today = new Date();
    const daysUntilSaturday = (6 - today.getDay() + 7) % 7 || 7;
    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + daysUntilSaturday + 7); // Add extra week for delivery
    return nextSaturday.toISOString().split('T')[0];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const canProceedToStep2 = totalCaffeine > 0;
  const canProceedToStep4 = currentStep >= 3;

  // Generate PDF of the detox plan
  const generatePdf = async () => {
    setIsGeneratingPdf(true);

    // Dynamically import jsPDF to avoid SSR issues
    const { default: jsPDF } = await import('jspdf');

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Caffeine Detox Plan', pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Subtitle
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Your Personalized 14-Day Zero-Shock Taper', pageWidth / 2, y, { align: 'center' });
    y += 20;

    // Summary section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Summary', 20, y);
    y += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Current Daily Intake: ${totalCaffeine}mg`, 20, y);
    y += 6;
    doc.text(`Start Date: ${startDate ? formatDate(new Date(startDate)) : 'Not set'}`, 20, y);
    y += 6;
    doc.text(`Caffeine-Free By: ${planDates[13] ? formatDate(planDates[13]) : 'Day 14'}`, 20, y);
    y += 15;

    // Your drinks section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Current Drinks', 20, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    drinks.forEach(drink => {
      doc.text(`• ${drink.quantity}x ${drink.name} (${drink.caffeine}mg each)`, 25, y);
      y += 5;
    });
    y += 10;

    // Daily schedule
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('14-Day Taper Schedule', 20, y);
    y += 8;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    taperPlan.forEach((day, index) => {
      // Check if we need a new page
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      const dateStr = planDates[index] ? formatDate(planDates[index]) : `Day ${day.day}`;
      doc.setFont('helvetica', 'bold');
      doc.text(`Day ${day.day} - ${dateStr}`, 20, y);
      doc.setFont('helvetica', 'normal');
      doc.text(`${day.targetMg}mg (${day.percentage}%)`, 120, y);
      y += 5;

      if (day.targetMg === 0) {
        doc.text('  Caffeine-free! Enjoy your decaf drinks.', 25, y);
      } else if (day.products.length > 0) {
        day.products.forEach(product => {
          doc.text(`  • ${product.quantity}x ${product.name.split(' – ')[0]} (${product.caffeineMg * product.quantity}mg)`, 25, y);
          y += 4;
        });
      }
      y += 6;
    });

    // Shopping list
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    y += 5;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Shopping List', 20, y);
    y += 8;

    const productCounts = new Map<string, { name: string; totalQuantity: number; caffeineMg: number }>();
    taperPlan.forEach(day => {
      day.products.forEach(product => {
        const existing = productCounts.get(product.name);
        if (existing) {
          existing.totalQuantity += product.quantity;
        } else {
          productCounts.set(product.name, { name: product.name, totalQuantity: product.quantity, caffeineMg: product.caffeineMg });
        }
      });
    });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    Array.from(productCounts.values()).forEach(product => {
      doc.text(`• ${product.name.split(' – ')[0]} x${product.totalQuantity} (${product.caffeineMg}mg each)`, 25, y);
      y += 5;
    });

    // Footer
    y = doc.internal.pageSize.getHeight() - 15;
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Generated by Jitterliss - jitterliss.com', pageWidth / 2, y, { align: 'center' });

    // Save the PDF
    doc.save('caffeine-detox-plan.pdf');

    // Track PDF download and calculator completion
    posthog.capture("pdf_downloaded", {
      total_caffeine: totalCaffeine,
      drinks_count: drinks.length,
      start_date: startDate,
    });

    posthog.capture("quit_calculator_completed", {
      total_caffeine: totalCaffeine,
      drinks_count: drinks.length,
      start_date: startDate,
      plan_duration_days: 14,
    });

    setIsGeneratingPdf(false);
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

      {/* PDF Banner */}
      <div className="fixed top-[73px] left-0 right-0 z-40 bg-[#F67E62] text-white text-center py-2 text-sm">
        <span>📄 Complete all steps to get a downloadable PDF of your personalized detox plan!</span>
      </div>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#37352F] mb-4">
            Caffeine Detox Calculator
          </h1>
          <p className="text-gray-600 mb-8">
            Create your personalized 14-day plan to quit caffeine without withdrawal symptoms.
          </p>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <button
                  onClick={() => {
                    if (step === 1 || (step === 2 && canProceedToStep2) || (step <= currentStep)) {
                      setCurrentStep(step);
                    }
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep === step
                      ? "bg-[#F67E62] text-white"
                      : currentStep > step
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  } ${step <= currentStep || (step === 2 && canProceedToStep2) ? "cursor-pointer" : "cursor-not-allowed"}`}
                >
                  {currentStep > step ? <CheckIcon className="w-5 h-5" /> : step}
                </button>
                {step < 4 && (
                  <div className={`w-8 sm:w-16 h-1 mx-1 ${currentStep > step ? "bg-green-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Daily Intake */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#37352F] mb-2">
                  Step 1: What&apos;s Your Daily Caffeine Intake?
                </h2>
                <p className="text-gray-600 mb-6">
                  Add all the caffeinated drinks and foods you typically consume in a day.
                </p>

                {/* Drink Search */}
                <div ref={searchContainerRef} className="relative mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search for a drink or food
                  </label>
                  <input
                    type="text"
                    value={drinkSearch}
                    onChange={(e) => {
                      setDrinkSearch(e.target.value);
                      setShowDrinkDropdown(true);
                    }}
                    onFocus={() => setShowDrinkDropdown(true)}
                    placeholder="e.g., Coffee, Red Bull, Tea..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900"
                  />

                  {/* Dropdown */}
                  {showDrinkDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                      {filteredDrinks.length > 0 ? (
                        filteredDrinks.map((drink) => (
                          <button
                            key={drink.name}
                            onClick={() => addDrink(drink.name, drink.caffeine)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
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
                            Add &quot;{drinkSearch}&quot; as a custom item:
                          </p>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={customCaffeine}
                              onChange={(e) => setCustomCaffeine(e.target.value)}
                              placeholder="Caffeine (mg)"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900"
                            />
                            <button
                              onClick={handleAddCustomDrink}
                              disabled={!customCaffeine || parseInt(customCaffeine) <= 0}
                              className="px-4 py-2 bg-[#F67E62] text-white font-medium rounded-lg hover:bg-[#e56d4f] transition-colors disabled:opacity-50"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>

                {/* Selected Drinks */}
                {drinks.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-700">Your daily caffeine:</h3>
                    {drinks.map((drink) => (
                      <div key={drink.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400">
                            <DrinkIcon drinkName={drink.name} />
                          </span>
                          <span className="text-gray-900">{drink.name}</span>
                          <span className="text-sm text-gray-500">{drink.caffeine}mg each</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(drink.id, -1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-medium"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium text-gray-900">{drink.quantity}</span>
                          <button
                            onClick={() => updateQuantity(drink.id, 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-medium"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeDrink(drink.id)}
                            className="ml-2 text-gray-400 hover:text-red-500"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Total */}
                {totalCaffeine > 0 && (
                  <div className="mt-6 p-4 bg-[#F67E62] rounded-lg text-white">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">Total Daily Caffeine:</span>
                      <span className="text-3xl font-bold">{totalCaffeine}mg</span>
                    </div>
                    <p className="text-sm opacity-80 mt-1">
                      {totalCaffeine > 400 ? "That's quite a lot! The detox will really help." :
                       totalCaffeine > 200 ? "A moderate amount - you'll feel great after detox." :
                       "A reasonable amount - this detox will be smooth."}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                disabled={!canProceedToStep2}
                className="w-full py-4 bg-[#37352F] text-white font-semibold rounded-lg hover:bg-[#2a2925] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Your Taper Plan →
              </button>
            </div>
          )}

          {/* Step 2: Taper Plan */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#37352F] mb-2">
                  Step 2: Your 14-Day Zero-Shock Taper Plan
                </h2>
                <p className="text-gray-600 mb-6">
                  Based on your {totalCaffeine}mg daily intake, here&apos;s your personalized plan.
                </p>

                <div className="space-y-3">
                  {taperPlan.map((day) => (
                    <div
                      key={day.day}
                      className={`p-4 rounded-lg border ${
                        day.percentage === 0 ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-[#37352F]">Day {day.day}</h3>
                          <p className="text-sm text-gray-600">{day.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[#F67E62]">{day.targetMg}mg</span>
                          <p className="text-sm text-gray-500">{day.percentage}% of normal</p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#F67E62] transition-all"
                          style={{ width: `${day.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 py-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 py-4 bg-[#37352F] text-white font-semibold rounded-lg hover:bg-[#2a2925] transition-colors"
                >
                  Make it Pain Free →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Product Recommendations */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#37352F] mb-2">
                  Step 3: Products You&apos;ll Need
                </h2>
                <p className="text-gray-600 mb-6">
                  Based on your current drinks, here are decaf alternatives and daily product recommendations.
                </p>

                {/* Decaf Alternatives for User's Drinks */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#37352F] mb-4">
                    ☕ Replace Your Current Drinks With Decaf
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Keep enjoying your ritual - just switch to these decaf versions:
                  </p>

                  {/* Show decaf alternatives based on user's selected drinks */}
                  {(() => {
                    // Get unique categories from user's drinks
                    const userCategories = new Set<DrinkCategory>();
                    drinks.forEach(drink => {
                      userCategories.add(getDrinkCategory(drink.name));
                    });

                    // Filter out 'custom' category as we don't have decaf alternatives for custom items
                    const relevantCategories = Array.from(userCategories).filter(cat => cat !== 'custom' && decafAlternatives[cat]);

                    if (relevantCategories.length === 0) {
                      return (
                        <div className="bg-white p-4 rounded-lg border border-gray-200 text-gray-500 text-sm">
                          No specific decaf alternatives found for your drinks. Consider browsing our full selection on the homepage.
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-4">
                        {relevantCategories.map(category => {
                          const alt = decafAlternatives[category];
                          const userDrinksInCategory = drinks.filter(d => getDrinkCategory(d.name) === category);

                          return (
                            <div key={category} className="bg-white p-4 rounded-lg border border-gray-200">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-gray-400">
                                  <DrinkIcon drinkName={userDrinksInCategory[0]?.name || ''} />
                                </span>
                                <h4 className="font-medium text-[#37352F]">{alt.categoryName}</h4>
                              </div>
                              <p className="text-xs text-gray-500 mb-3">
                                You drink: {userDrinksInCategory.map(d => d.name).join(', ')}
                              </p>
                              <p className="text-sm text-gray-600 mb-3">{alt.description}</p>
                              <ul className="space-y-2">
                                {alt.products.map((product) => (
                                  <li key={product.name} className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">→</span>
                                    <div>
                                      <a
                                        href={product.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => {
                                          posthog.capture("external_product_clicked", {
                                            product_name: product.name,
                                            product_link: product.link,
                                            category: alt.categoryName,
                                            source: "alternatives_section",
                                          });
                                        }}
                                        className="text-[#F67E62] hover:underline text-sm font-medium"
                                      >
                                        {product.name}
                                      </a>
                                      <p className="text-xs text-gray-500">{product.description}</p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* Daily Product Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-[#37352F] mb-4">
                    📅 Your Daily Caffeine Products
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Here&apos;s exactly what to consume each day to hit your caffeine targets:
                  </p>

                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {taperPlan.map((day) => (
                      <div
                        key={day.day}
                        className={`p-4 rounded-lg border ${
                          day.percentage === 0 ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-[#37352F]">Day {day.day}</h4>
                            <p className="text-xs text-gray-500">{day.description}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-bold text-[#F67E62]">{day.targetMg}mg</span>
                            <p className="text-xs text-gray-500">{day.percentage}%</p>
                          </div>
                        </div>

                        {day.targetMg === 0 ? (
                          <div className="flex items-center gap-2 text-green-600 text-sm">
                            <CheckIcon className="w-4 h-4" />
                            <span>Caffeine-free day! Just enjoy your decaf drinks.</span>
                          </div>
                        ) : day.products.length > 0 ? (
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Consume:</p>
                            {day.products.map((product, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 rounded px-3 py-2">
                                <a
                                  href={product.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => {
                                    posthog.capture("external_product_clicked", {
                                      product_name: product.name,
                                      product_link: product.link,
                                      day: day.day,
                                      source: "daily_schedule",
                                    });
                                  }}
                                  className="text-[#F67E62] hover:underline"
                                >
                                  {product.quantity}x {product.name.split(' – ')[0]}
                                </a>
                                <span className="text-gray-500">{product.caffeineMg * product.quantity}mg</span>
                              </div>
                            ))}
                            <div className="flex justify-between text-xs text-gray-500 pt-1 border-t border-gray-100">
                              <span>Total caffeine:</span>
                              <span className="font-medium">{day.totalMg}mg (target: {day.targetMg}mg)</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">
                            Very low dose - consider splitting a {controlledCaffeine[0]?.items[0]?.name || '25mg product'}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shopping List Summary */}
                <div className="mt-6 p-4 bg-[#37352F] rounded-lg text-white">
                  <h4 className="font-semibold mb-3">🛒 Shopping List Summary</h4>
                  {(() => {
                    const productCounts = new Map<string, { name: string; link: string; caffeineMg: number; totalQuantity: number }>();
                    taperPlan.forEach(day => {
                      day.products.forEach(product => {
                        const existing = productCounts.get(product.name);
                        if (existing) {
                          existing.totalQuantity += product.quantity;
                        } else {
                          productCounts.set(product.name, { ...product, totalQuantity: product.quantity });
                        }
                      });
                    });

                    return (
                      <ul className="space-y-1 text-sm">
                        {Array.from(productCounts.values()).map((product) => (
                          <li key={product.name} className="flex justify-between">
                            <a
                              href={product.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                posthog.capture("external_product_clicked", {
                                  product_name: product.name,
                                  product_link: product.link,
                                  quantity: product.totalQuantity,
                                  source: "shopping_list",
                                });
                              }}
                              className="text-[#F67E62] hover:underline"
                            >
                              {product.name.split(' – ')[0]}
                            </a>
                            <span className="text-gray-300">×{product.totalQuantity} ({product.caffeineMg}mg each)</span>
                          </li>
                        ))}
                      </ul>
                    );
                  })()}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 py-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 py-4 bg-[#37352F] text-white font-semibold rounded-lg hover:bg-[#2a2925] transition-colors"
                >
                  Choose Start Date →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Start Date & Complete */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#37352F] mb-2">
                  Step 4: When Do You Want to Start?
                </h2>
                <p className="text-gray-600 mb-6">
                  Pick a start date that gives you time to order and receive your products. Starting on a Saturday is recommended so the first few days fall on a weekend.
                </p>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900"
                  />
                  <button
                    onClick={() => setStartDate(getSuggestedStartDate())}
                    className="mt-2 text-sm text-[#F67E62] hover:underline"
                  >
                    Suggest a date (next Saturday + delivery time)
                  </button>
                </div>

                {startDate && (
                  <>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                      <h3 className="font-semibold text-[#37352F] mb-3">Your Detox Timeline</h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {planDates.map((date, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                            <span className="text-gray-600">Day {index + 1}: {formatDate(date)}</span>
                            <span className="font-medium text-[#F67E62]">{taperPlan[index].targetMg}mg</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <p className="text-green-800 font-medium">
                          🎉 You&apos;ll be caffeine-free by {planDates[13] ? formatDate(planDates[13]) : ""}!
                        </p>
                      </div>
                    </div>

                    {/* Completion Section */}
                    <div className="text-center py-6 border-t border-gray-200">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckIcon className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-[#37352F] mb-2">Your Plan is Ready!</h3>
                      <p className="text-gray-600 mb-6">
                        Download your personalized detox plan as a PDF to keep handy throughout your journey.
                      </p>

                      <div className="bg-white rounded-lg border border-gray-200 p-4 text-left mb-6">
                        <h4 className="font-semibold text-[#37352F] mb-3">Your Detox Summary:</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                          <li>📊 Current intake: <strong>{totalCaffeine}mg/day</strong></li>
                          <li>📅 Start date: <strong>{formatDate(new Date(startDate))}</strong></li>
                          <li>🎯 Caffeine-free by: <strong>{planDates[13] ? formatDate(planDates[13]) : "Day 14"}</strong></li>
                          <li>📋 Duration: <strong>14 days</strong></li>
                        </ul>
                      </div>

                      <button
                        onClick={generatePdf}
                        disabled={isGeneratingPdf}
                        className="w-full py-4 bg-[#F67E62] text-white font-semibold rounded-lg hover:bg-[#e56d4f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isGeneratingPdf ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating PDF...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download PDF Plan
                          </>
                        )}
                      </button>

                      <Link
                        href="/"
                        className="block w-full mt-3 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-center"
                      >
                        Back to Home
                      </Link>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setCurrentStep(3)}
                className="w-full py-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                ← Back
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
