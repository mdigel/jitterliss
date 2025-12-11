export interface Product {
  name: string;
  link: string;
  description: string;
}

export interface Supplement {
  name: string;
  link: string;
  description?: string;
  studyLink?: string;
}

export interface SupplementCategory {
  name: string;
  description: string;
  studyLink?: string;
  items: Supplement[];
}

export interface ProductCategory {
  name: string;
  items: Product[];
}

export interface ProductSection {
  name: string;
  categories: ProductCategory[];
}

export const morningReplacements: ProductSection = {
  name: "Morning Replacements",
  categories: [
    {
      name: "Decaf Coffee",
      items: [
        {
          name: "Oddly Correct – Decaf Colombia",
          link: "https://oddlycorrect.com/collections/coffee/products/decaf-colombia-huila",
          description: "Sugarcane-processed decaf from Huila, Colombia, praised for tasting as good as regular coffee."
        },
        {
          name: "Heart Roasters – Decaf Colombia Huila",
          link: "https://www.heartroasters.com/products/decaf-colombia",
          description: "Ethyl acetate decaf with rich flavor and no \"off\" taste."
        },
        {
          name: "Onyx Coffee Lab – Decaf Colombia Inza",
          link: "https://onyxcoffeelab.com/products/decaf-inza-colombia",
          description: "Ethyl acetate decaf with smooth taste; great for half-caf blends."
        }
      ]
    },
    {
      name: "Decaf Espresso Pods",
      items: [
        {
          name: "Starbucks Decaf Espresso Roast",
          link: "https://www.amazon.com/dp/B085Z8F1FV?tag=plymouthholdi-20",
          description: "Nespresso-compatible dark roast decaf pods with bold Starbucks flavor."
        },
        {
          name: "Peet's Decaf Ristretto",
          link: "https://www.amazon.com/dp/B07Y87NQWK?tag=plymouthholdi-20",
          description: "Rich, full-bodied decaf espresso capsules with strong crema."
        }
      ]
    },
    {
      name: "Decaf Instant Coffee",
      items: [
        {
          name: "Mount Hagen Organic Decaf Instant",
          link: "https://www.amazon.com/dp/B000SSL0LO?tag=plymouthholdi-20",
          description: "Freeze-dried organic decaf with smooth taste, no bitterness."
        },
        {
          name: "Waka Colombian Decaf Instant",
          link: "https://www.amazon.com/dp/B088P4VYFG?tag=plymouthholdi-20",
          description: "Single-origin Colombian decaf crystals that taste like freshly brewed coffee."
        }
      ]
    },
    {
      name: "Decaf Tea",
      items: [
        {
          name: "Yorkshire Tea Bedtime Brew",
          link: "https://www.amazon.com/dp/B07575MG7Q?tag=plymouthholdi-20",
          description: "Robust decaffeinated black tea blend with strong flavor."
        },
        {
          name: "Twinings English Breakfast Decaf",
          link: "https://www.amazon.com/dp/B00097DZYW?tag=plymouthholdi-20",
          description: "Classic English Breakfast tea with caffeine gently removed."
        }
      ]
    },
    {
      name: "Caffeine-Free Soda",
      items: [
        {
          name: "Zevia Zero Calorie Soda",
          link: "https://www.amazon.com/dp/B01LTI0ARO?tag=plymouthholdi-20",
          description: "Naturally sweetened cola with no caffeine, uses stevia."
        },
        {
          name: "Coke Zero Sugar Caffeine Free",
          link: "https://www.amazon.com/dp/B086DMC5H2?tag=plymouthholdi-20",
          description: "Familiar Coke Zero flavor without caffeine."
        }
      ]
    },
    {
      name: "Energy / Focus Alternatives (Non-Caffeinated)",
      items: [
        {
          name: "Ketone-IQ (Exogenous Ketones) – 0mg caffeine",
          link: "https://www.amazon.com/dp/B0DY7VKSYL?tag=plymouthholdi-20",
          description: "A caffeine-free ketone drink for clean, sustained energy and enhanced mental clarity. Popular among biohackers for replacing morning caffeine without jitters or crashes."
        }
      ]
    }
  ]
};

export interface CaffeineProduct extends Product {
  caffeineMg: number;
}

export interface CaffeineGroup {
  caffeineMg: number;
  items: CaffeineProduct[];
}

export const controlledCaffeine: CaffeineGroup[] = [
  {
    caffeineMg: 25,
    items: [
      {
        name: "VitaMonk Low-Dose Caffeine + L-Theanine – 25mg caffeine",
        link: "https://www.amazon.com/dp/B0BSTPGPN7?tag=plymouthholdi-20",
        description: "Designed specifically for tapering and micro-dosing caffeine. Each capsule contains 25mg caffeine paired with 100mg L-theanine for smooth energy.",
        caffeineMg: 25
      },
      {
        name: "CLIF BLOKS Energy Chews – 25mg caffeine",
        link: "https://www.amazon.com/dp/B008UCBMKC?tag=plymouthholdi-20",
        description: "Lower-dose BLOKS for those needing mild stimulation or tapering from stronger caffeinated products.",
        caffeineMg: 25
      },
      {
        name: "Huma Energy Gel (Chocolate) – 25mg caffeine",
        link: "https://www.amazon.com/dp/B00NSCGL8C?tag=plymouthholdi-20",
        description: "All-natural chia-based energy gel with 25mg caffeine. Gentle on the stomach and ideal for low-dose tapering.",
        caffeineMg: 25
      }
    ]
  },
  {
    caffeineMg: 40,
    items: [
      {
        name: "Neuro Gum (Mint) – 40mg",
        link: "https://www.amazon.com/dp/B018S90FUE?tag=plymouthholdi-20",
        description: "Nootropic gum with 40mg caffeine, L-theanine, and B-vitamins for balanced boost.",
        caffeineMg: 40
      },
      {
        name: "Viter Energy Caffeinated Mints – 40mg",
        link: "https://www.amazon.com/dp/B01N3LZXV6?tag=plymouthholdi-20",
        description: "Sugar-free breath mints with 40mg caffeine and B-vitamins.",
        caffeineMg: 40
      },
      {
        name: "Revvies Energy Strips – 40mg",
        link: "https://www.amazon.com/dp/B08XJ4H18N?tag=plymouthholdi-20",
        description: "Fast-acting oral strips with 40mg caffeine, vegan and mint flavored.",
        caffeineMg: 40
      },
      {
        name: "Nuun Sport + Caffeine Electrolyte Tablets – ~40mg caffeine",
        link: "https://www.amazon.com/dp/B018NZJFEK?tag=plymouthholdi-20",
        description: "Electrolyte-rich hydration tablets with a mild 40mg caffeine dose. Great for workouts or for tapering from higher caffeine levels.",
        caffeineMg: 40
      },
      {
        name: "Curly's Energy Electrolyte Sticks – 40mg caffeine",
        link: "https://www.amazon.com/dp/B0BB8MWS5Q?tag=plymouthholdi-20",
        description: "Hydration + energy packets with 40mg caffeine, ideal for workouts or a gentle boost while preventing dehydration.",
        caffeineMg: 40
      }
    ]
  },
  {
    caffeineMg: 50,
    items: [
      {
        name: "VALI Caffeine & L-Theanine – 50mg/100mg",
        link: "https://www.amazon.com/dp/B071VR6KB7?tag=plymouthholdi-20",
        description: "Low-dose caffeine (50mg) paired with L-theanine for smooth energy without jitters.",
        caffeineMg: 50
      },
      {
        name: "Run Gum Energy Gum – 50mg",
        link: "https://www.amazon.com/dp/B07CZRYJP8?tag=plymouthholdi-20",
        description: "Athlete-formulated gum with 50mg caffeine, taurine, and B-vitamins.",
        caffeineMg: 50
      },
      {
        name: "CLIF BLOKS Energy Chews (Cherry) – 50mg caffeine",
        link: "https://www.amazon.com/dp/B007X5BNFQ?tag=plymouthholdi-20",
        description: "Popular endurance chew blocks delivering 50mg caffeine per serving. Easy to taper by consuming partial servings.",
        caffeineMg: 50
      },
      {
        name: "ALP Supply Co. Caffeinated Mints (Wintergreen) – 50mg caffeine",
        link: "https://www.amazon.com/dp/B0FQYDMMS7?tag=plymouthholdi-20",
        description: "Wintergreen-flavored caffeine mints designed for quick absorption. Each mint provides a moderate 50mg dose.",
        caffeineMg: 50
      },
      {
        name: "NZE Nootropic Caffeine Pouches – 50mg caffeine",
        link: "https://www.amazon.com/dp/B0F92516LC?tag=plymouthholdi-20",
        description: "Nicotine-style pouch delivering 50mg caffeine + nootropics. Zero sugar and fast absorption.",
        caffeineMg: 50
      }
    ]
  },
  {
    caffeineMg: 60,
    items: [
      {
        name: "Rally Energy Mints – 60mg",
        link: "https://www.amazon.com/dp/B09CQMF1NK?tag=plymouthholdi-20",
        description: "Powerful peppermint mints with 60mg caffeine per mint, zero sugar.",
        caffeineMg: 60
      }
    ]
  },
  {
    caffeineMg: 65,
    items: [
      {
        name: "CLIF Builders Protein Bar (Chocolate Peanut Butter) – 65mg caffeine",
        link: "https://www.amazon.com/dp/B09KMV78PB?tag=plymouthholdi-20",
        description: "High-protein bar with 65mg caffeine from natural sources. Supports sustained energy during training or long days.",
        caffeineMg: 65
      },
      {
        name: "CLIF Energy Bar (Chocolate + Caffeine) – 65mg caffeine",
        link: "https://www.amazon.com/dp/B0CXQ71XY8?tag=plymouthholdi-20",
        description: "Classic CLIF bar enhanced with caffeine for endurance. Often used by runners and cyclists looking for predictable energy.",
        caffeineMg: 65
      }
    ]
  },
  {
    caffeineMg: 80,
    items: [
      {
        name: "Instant Energy Caffeine Strips – 80mg",
        link: "https://www.amazon.com/dp/B08FJ7VG1C?tag=plymouthholdi-20",
        description: "Dissolvable spearmint strips with 80mg caffeine, zero sugar or calories.",
        caffeineMg: 80
      }
    ]
  },
  {
    caffeineMg: 100,
    items: [
      {
        name: "Genius Caffeine Extended Release – 100mg",
        link: "https://www.amazon.com/Genius-Caffeine-Pills-Supplement-100mg/dp/B01IRFX4NY?tag=plymouthholdi-20",
        description: "Slow-release 100mg caffeine for longer-lasting energy without crash.",
        caffeineMg: 100
      },
      {
        name: "Military Energy Gum – 100mg",
        link: "https://www.amazon.com/dp/B004XJ6Z06?tag=plymouthholdi-20",
        description: "Strong peppermint gum with 100mg caffeine per piece for rapid alertness.",
        caffeineMg: 100
      }
    ]
  },
  {
    caffeineMg: 200,
    items: [
      {
        name: "ProLab Caffeine Tablets – 200mg",
        link: "https://www.amazon.com/dp/B0011865IQ?tag=plymouthholdi-20",
        description: "200mg caffeine pills (about 2 cups of coffee) for quick energy.",
        caffeineMg: 200
      }
    ]
  }
];

export const supplements: SupplementCategory[] = [
  {
    name: "L-Theanine",
    description: "Amino acid from green tea that promotes relaxation without sedation. Reduces caffeine-induced jitteriness while maintaining focus.",
    studyLink: "https://doi.org/10.3390/nu9040275",
    items: [
      {
        name: "Nature's Trove L-Theanine 200mg",
        link: "https://www.amazon.com/dp/B01N2QUAC5?tag=plymouthholdi-20"
      },
      {
        name: "Double Wood L-Theanine 200mg",
        link: "https://www.amazon.com/dp/B0711PVQ5V?tag=plymouthholdi-20"
      },
      {
        name: "NOW Foods L-Theanine 200mg + Inositol",
        link: "https://www.amazon.com/dp/B00HD8OBIG?tag=plymouthholdi-20"
      }
    ]
  },
  {
    name: "Probiotics",
    description: "Beneficial gut bacteria that may help restore microbiome balance after long-term caffeine use. Can improve digestion and mood during withdrawal.",
    studyLink: "https://www.mdpi.com/2076-3417/10/2/599",
    items: [
      {
        name: "Physician's Choice 60 Billion CFU Probiotic",
        link: "https://www.amazon.com/dp/B079H53D2B?tag=plymouthholdi-20"
      },
      {
        name: "NOW Probiotic-10, 25 Billion CFU",
        link: "https://www.amazon.com/dp/B002S1OH0M?tag=plymouthholdi-20"
      },
      {
        name: "Align Probiotic 24/7 Digestive Support",
        link: "https://www.amazon.com/dp/B00JN6LR0U?tag=plymouthholdi-20"
      }
    ]
  },
  {
    name: "Ashwagandha",
    description: "Adaptogenic herb that helps resist stress. Reduces cortisol and improves fatigue and anxiety during caffeine withdrawal.",
    studyLink: "https://doi.org/10.1016/j.phymed.1995.02.004",
    items: [
      {
        name: "Nutricost KSM-66 Ashwagandha (600mg)",
        link: "https://www.amazon.com/dp/B0773XNS9D?tag=plymouthholdi-20"
      },
      {
        name: "Physician's Choice Ashwagandha 1950mg",
        link: "https://www.amazon.com/dp/B07Q7tL5PW?tag=plymouthholdi-20"
      },
      {
        name: "NOW Ashwagandha Extract (450mg)",
        link: "https://www.amazon.com/dp/B0013OXFZE?tag=plymouthholdi-20"
      }
    ]
  }
];

