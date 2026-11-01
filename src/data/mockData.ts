import { Category, Product, BlogPost, WhyChooseFeature } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Pulses",
    slug: "pulses",
    image: "/images/categories/pulses.jpg",
    itemCount: 24,
    tagline: "100% Unpolished Desi Dals & Lentils",
  },
  {
    id: "cat-2",
    name: "Millets",
    slug: "millets",
    image: "/images/categories/millets.jpg",
    itemCount: 24,
    tagline: "Nutrient-Dense Heirloom Superfood Grains",
  },
  {
    id: "cat-3",
    name: "Masala & Spices",
    slug: "masala-spices",
    image: "/images/categories/spices.jpg",
    itemCount: 24,
    tagline: "Aromatic Sun-Dried Whole & Ground Spices",
  },
  {
    id: "cat-4",
    name: "Sweets",
    slug: "sweets",
    image: "/images/categories/sweets.jpg",
    itemCount: 24,
    tagline: "Natural Desi Jaggery, Khand, Chikki & Sweets",
  },
  {
    id: "cat-5",
    name: "Honey",
    slug: "honey",
    image: "/images/categories/honey.jpg",
    itemCount: 24,
    tagline: "100% Pure Raw & Wild Forest Honey",
  },
  {
    id: "cat-6",
    name: "Dry Fruits",
    slug: "dry-fruits",
    image: "/images/categories/dry-fruits.jpg",
    itemCount: 24,
    tagline: "Handpicked Premium Nuts, Berries & Dates",
  },
  {
    id: "cat-7",
    name: "Seeds",
    slug: "seeds",
    image: "/images/categories/seeds.jpg",
    itemCount: 24,
    tagline: "Omega-Rich Raw Chia, Flax, Pumpkin & Sesame",
  },
  {
    id: "cat-8",
    name: "Rice & Wheat",
    slug: "rice-wheat",
    image: "/images/categories/rice-wheat.jpg",
    itemCount: 24,
    tagline: "Aged Basmati, Sona Masoori & Sharbati Wheat Atta",
  },
];

export const ALL_PRODUCTS: Product[] = [
  {
    "id": "pulses-organic-arhar-dal-toor-dal-pige",
    "name": "Organic Arhar Dal / Toor Dal / Pigeon Pea Split",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 180.0,
    "defaultOriginalPrice": 212.4,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 22,
    "image": "/images/products/pulse-chana-1.jpg",
    "images": [
      "/images/products/pulse-chana-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 180.0,
        "originalPrice": 212.4,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 4500.0,
        "originalPrice": 5310.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 810.0,
        "originalPrice": 955.8,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 25.2,
        "originalPrice": 29.74,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Arhar Dal / Toor Dal / Pigeon Pea Split is a pantry staple suitable for everyday Indian cooking. Split pigeon pea can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Sehore, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Split pigeon pea (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9180/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "pulses-organic-chana-dal-bengal-gram-spl",
    "name": "Organic Chana Dal / Bengal Gram Split",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 110.0,
    "defaultOriginalPrice": 129.8,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 29,
    "image": "/images/products/pulse-chana-1.jpg",
    "images": [
      "/images/products/pulse-chana-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 2750.0,
        "originalPrice": 3245.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 495.0,
        "originalPrice": 584.1,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 15.4,
        "originalPrice": 18.17,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Chana Dal / Bengal Gram Split is a pantry staple suitable for everyday Indian cooking. Split bengal gram can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Latur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Split Bengal gram (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9110/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "pulses-organic-chana-whole-kala-chana",
    "name": "Organic Chana Whole / Kala Chana / Bengal Gram",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 100.0,
    "defaultOriginalPrice": 118.0,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 36,
    "image": "/images/products/pulse-chana-1.jpg",
    "images": [
      "/images/products/pulse-chana-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 100.0,
        "originalPrice": 118.0,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 2500.0,
        "originalPrice": 2950.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 450.0,
        "originalPrice": 531.0,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 14.0,
        "originalPrice": 16.52,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Chana Whole / Kala Chana / Bengal Gram is a pantry staple suitable for everyday Indian cooking. Whole bengal gram (black chickpea) can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Bikaner, Rajasthan",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Whole Bengal gram (black chickpea) (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9100/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "pulses-organic-kabuli-chana-bold",
    "name": "Organic Kabuli Chana / Bold",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 180.0,
    "defaultOriginalPrice": 212.4,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 43,
    "image": "/images/products/pulse-chana-1.jpg",
    "images": [
      "/images/products/pulse-chana-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 180.0,
        "originalPrice": 212.4,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 4500.0,
        "originalPrice": 5310.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 810.0,
        "originalPrice": 955.8,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 25.2,
        "originalPrice": 29.74,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Kabuli Chana / Bold is a pantry staple suitable for everyday Indian cooking. Whole kabuli chickpeas can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Gulbarga, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Whole Kabuli chickpeas (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9180/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "pulses-organic-lobiya-cowpea-black-eye",
    "name": "Organic Lobiya / Cowpea / Black eye bean",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 110.0,
    "defaultOriginalPrice": 129.8,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 50,
    "image": "/images/products/pulse-chana-1.jpg",
    "images": [
      "/images/products/pulse-chana-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 2750.0,
        "originalPrice": 3245.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 495.0,
        "originalPrice": 584.1,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 15.4,
        "originalPrice": 18.17,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Lobiya / Cowpea / Black eye bean is a pantry staple suitable for everyday Indian cooking. Whole cowpeas / black-eyed beans can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Sehore, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Whole cowpeas / black-eyed beans (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9110/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "pulses-organic-masoor-dal-red-lentil-spl",
    "name": "Organic Masoor Dal / Red Lentil Split",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 95.0,
    "defaultOriginalPrice": 112.1,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 57,
    "image": "/images/products/pulses/pulse-lentils-1.jpg",
    "images": [
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulse-toor-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 2375.0,
        "originalPrice": 2802.5,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 427.5,
        "originalPrice": 504.45,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 13.3,
        "originalPrice": 15.69,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Masoor Dal / Red Lentil Split is a pantry staple suitable for everyday Indian cooking. Split red lentils can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Latur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Split red lentils (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b995/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "pulses-organic-masoor-malka-masoor-gota",
    "name": "Organic Masoor Malka / Masoor Gota / Red Lentil",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 95.0,
    "defaultOriginalPrice": 112.1,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 64,
    "image": "/images/products/pulses/pulse-lentils-1.jpg",
    "images": [
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulse-toor-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 2375.0,
        "originalPrice": 2802.5,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 427.5,
        "originalPrice": 504.45,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 13.3,
        "originalPrice": 15.69,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Masoor Malka / Masoor Gota / Red Lentil is a pantry staple suitable for everyday Indian cooking. Masoor malka / red lentils can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Bikaner, Rajasthan",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Masoor Malka / red lentils (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b995/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "pulses-organic-masoor-whole-masoor-brown",
    "name": "Organic Masoor Whole / Masoor Brown / Lentil",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 88.0,
    "defaultOriginalPrice": 103.84,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 71,
    "image": "/images/products/pulses/pulse-lentils-1.jpg",
    "images": [
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulse-toor-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 88.0,
        "originalPrice": 103.84,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 2200.0,
        "originalPrice": 2596.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 396.0,
        "originalPrice": 467.28,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 12.32,
        "originalPrice": 14.54,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Masoor Whole / Masoor Brown / Lentil is a pantry staple suitable for everyday Indian cooking. Whole brown lentils can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Gulbarga, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Whole brown lentils (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b988/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "pulses-organic-panchratna-dal-mix-dal-5",
    "name": "Organic Panchratna Dal / Mix Dal (5 Pulses)",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 130.0,
    "defaultOriginalPrice": 153.4,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 78,
    "image": "/images/products/pulse-toor-1.jpg",
    "images": [
      "/images/products/pulse-toor-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 3250.0,
        "originalPrice": 3835.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 585.0,
        "originalPrice": 690.3,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 18.2,
        "originalPrice": 21.48,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Panchratna Dal / Mix Dal (5 Pulses) is a pantry staple suitable for everyday Indian cooking. Five-pulse mixed dal; confirm exact blend with supplier can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Sehore, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Five-pulse mixed dal; confirm exact blend with supplier (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9130/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "pulses-organic-moong-chilka-moong-dal",
    "name": "Organic Moong Chilka / Moong Dal / Green Gram Split",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 120.0,
    "defaultOriginalPrice": 141.6,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 85,
    "image": "/images/products/pulse-moong-1.jpg",
    "images": [
      "/images/products/pulse-moong-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 3000.0,
        "originalPrice": 3540.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 540.0,
        "originalPrice": 637.2,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 16.8,
        "originalPrice": 19.82,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Moong Chilka / Moong Dal / Green Gram Split is a pantry staple suitable for everyday Indian cooking. Split green gram with skin can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Latur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Split green gram with skin (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9120/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "pulses-organic-moong-mogar-green-gram-sp",
    "name": "Organic Moong Mogar / Green Gram Split Dehusked (Yellow)",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 125.0,
    "defaultOriginalPrice": 147.5,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 27,
    "image": "/images/products/pulse-moong-1.jpg",
    "images": [
      "/images/products/pulse-moong-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 3125.0,
        "originalPrice": 3687.5,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 562.5,
        "originalPrice": 663.75,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 17.5,
        "originalPrice": 20.65,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Moong Mogar / Green Gram Split Dehusked (Yellow) is a pantry staple suitable for everyday Indian cooking. Split and dehusked yellow green gram can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Bikaner, Rajasthan",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Split and dehusked yellow green gram (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9125/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "pulses-organic-moong-whole-moong-sabut",
    "name": "Organic Moong Whole / Moong Sabut / Green Gram Whole",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 115.0,
    "defaultOriginalPrice": 135.7,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 34,
    "image": "/images/products/pulse-moong-1.jpg",
    "images": [
      "/images/products/pulse-moong-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 115.0,
        "originalPrice": 135.7,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 2875.0,
        "originalPrice": 3392.5,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 517.5,
        "originalPrice": 610.65,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 16.1,
        "originalPrice": 19.0,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Moong Whole / Moong Sabut / Green Gram Whole is a pantry staple suitable for everyday Indian cooking. Whole green gram can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Gulbarga, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Whole green gram (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9115/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "pulses-organic-rajma-red-kidney-bean-ca",
    "name": "Organic Rajma Red (Kidney Bean) (Capsule)",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 165.0,
    "defaultOriginalPrice": 194.7,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 41,
    "image": "/images/products/pulses/pulse-dal-bowl-1.jpg",
    "images": [
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 165.0,
        "originalPrice": 194.7,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 4125.0,
        "originalPrice": 4867.5,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 742.5,
        "originalPrice": 876.15,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 23.1,
        "originalPrice": 27.26,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Rajma Red (Kidney Bean) (Capsule) is a pantry staple suitable for everyday Indian cooking. Red kidney beans, capsule variety can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Sehore, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Red kidney beans, capsule variety (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9165/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "pulses-organic-rajma-chitra-speckled",
    "name": "Organic Rajma Chitra (Speckled)",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 160.0,
    "defaultOriginalPrice": 188.8,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 48,
    "image": "/images/products/pulses/pulse-dal-bowl-1.jpg",
    "images": [
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 160.0,
        "originalPrice": 188.8,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 4000.0,
        "originalPrice": 4720.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 720.0,
        "originalPrice": 849.6,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 22.4,
        "originalPrice": 26.43,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Rajma Chitra (Speckled) is a pantry staple suitable for everyday Indian cooking. Speckled kidney beans can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Latur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Speckled kidney beans (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9160/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "pulses-organic-red-rajma-small-jammu",
    "name": "Organic Red Rajma Small (Jammu)",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 130.0,
    "defaultOriginalPrice": 153.4,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 55,
    "image": "/images/products/pulses/pulse-dal-bowl-1.jpg",
    "images": [
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 3250.0,
        "originalPrice": 3835.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 585.0,
        "originalPrice": 690.3,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 18.2,
        "originalPrice": 21.48,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Red Rajma Small (Jammu) is a pantry staple suitable for everyday Indian cooking. Small red kidney beans, jammu variety can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Bikaner, Rajasthan",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Small red kidney beans, Jammu variety (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9130/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "pulses-organic-urad-chilka-urad-split-ch",
    "name": "Organic Urad Chilka / Urad Split Chilka / Black Gram Split",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 125.0,
    "defaultOriginalPrice": 147.5,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 62,
    "image": "/images/products/pulse-urad-1.jpg",
    "images": [
      "/images/products/pulse-urad-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 3125.0,
        "originalPrice": 3687.5,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 562.5,
        "originalPrice": 663.75,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 17.5,
        "originalPrice": 20.65,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Urad Chilka / Urad Split Chilka / Black Gram Split is a pantry staple suitable for everyday Indian cooking. Split black gram with skin can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Gulbarga, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Split black gram with skin (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9125/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "pulses-organic-urad-mogar-urad-dal-white",
    "name": "Organic Urad Mogar / Urad Dal White / Black Gram Split",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 135.0,
    "defaultOriginalPrice": 159.3,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 69,
    "image": "/images/products/pulse-urad-1.jpg",
    "images": [
      "/images/products/pulse-urad-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 135.0,
        "originalPrice": 159.3,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 3375.0,
        "originalPrice": 3982.5,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 607.5,
        "originalPrice": 716.85,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 18.9,
        "originalPrice": 22.3,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Urad Mogar / Urad Dal White / Black Gram Split is a pantry staple suitable for everyday Indian cooking. Split and dehusked white black gram can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Sehore, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Split and dehusked white black gram (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9135/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "pulses-organic-urad-white-whole-urad-got",
    "name": "Organic Urad White Whole / Urad Gota / Black Gram Whole",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 140.0,
    "defaultOriginalPrice": 165.2,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 76,
    "image": "/images/products/pulse-urad-1.jpg",
    "images": [
      "/images/products/pulse-urad-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 140.0,
        "originalPrice": 165.2,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 3500.0,
        "originalPrice": 4130.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 630.0,
        "originalPrice": 743.4,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 19.6,
        "originalPrice": 23.13,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Urad White Whole / Urad Gota / Black Gram Whole is a pantry staple suitable for everyday Indian cooking. Whole white black gram can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Latur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Whole white black gram (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9140/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "pulses-organic-urad-whole-black-gram-who",
    "name": "Organic Urad Whole / Black Gram Whole",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 120.0,
    "defaultOriginalPrice": 141.6,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 83,
    "image": "/images/products/pulse-urad-1.jpg",
    "images": [
      "/images/products/pulse-urad-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 3000.0,
        "originalPrice": 3540.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 540.0,
        "originalPrice": 637.2,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 16.8,
        "originalPrice": 19.82,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Urad Whole / Black Gram Whole is a pantry staple suitable for everyday Indian cooking. Whole black gram can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Bikaner, Rajasthan",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Whole black gram (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9120/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "pulses-organic-white-dry-peas",
    "name": "Organic White Dry Peas",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 90.0,
    "defaultOriginalPrice": 106.2,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 25,
    "image": "/images/products/pulse-chana-1.jpg",
    "images": [
      "/images/products/pulse-chana-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 90.0,
        "originalPrice": 106.2,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 2250.0,
        "originalPrice": 2655.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 405.0,
        "originalPrice": 477.9,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 12.6,
        "originalPrice": 14.87,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic White Dry Peas is a pantry staple suitable for everyday Indian cooking. Dried white peas can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Gulbarga, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Dried white peas (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b990/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "pulses-organic-green-dry-peas-round",
    "name": "Organic Green Dry Peas (Round)",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 180.0,
    "defaultOriginalPrice": 212.4,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 32,
    "image": "/images/products/pulse-chana-1.jpg",
    "images": [
      "/images/products/pulse-chana-1.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 180.0,
        "originalPrice": 212.4,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 4500.0,
        "originalPrice": 5310.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 810.0,
        "originalPrice": 955.8,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 25.2,
        "originalPrice": 29.74,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Green Dry Peas (Round) is a pantry staple suitable for everyday Indian cooking. Round dried green peas can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Sehore, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Round dried green peas (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9180/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "pulses-organic-soyabean-whole",
    "name": "Organic Soyabean Whole",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 75.0,
    "defaultOriginalPrice": 88.5,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 39,
    "image": "/images/products/pulse-toor-2.jpg",
    "images": [
      "/images/products/pulse-toor-2.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 75.0,
        "originalPrice": 88.5,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 1875.0,
        "originalPrice": 2212.5,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 337.5,
        "originalPrice": 398.25,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 10.5,
        "originalPrice": 12.39,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Soyabean Whole is a pantry staple suitable for everyday Indian cooking. Whole soybeans can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Latur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Whole soybeans (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b975/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 5% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "pulses-organic-moth-whole",
    "name": "Organic Moth Whole",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 110.0,
    "defaultOriginalPrice": 129.8,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 46,
    "image": "/images/products/pulse-toor-2.jpg",
    "images": [
      "/images/products/pulse-toor-2.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 2750.0,
        "originalPrice": 3245.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 495.0,
        "originalPrice": 584.1,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 15.4,
        "originalPrice": 18.17,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Moth Whole is a pantry staple suitable for everyday Indian cooking. Whole moth beans can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Bikaner, Rajasthan",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Whole moth beans (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9110/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: Y | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "pulses-organic-amaranthus-whole-chaula",
    "name": "Organic Amaranthus Whole / Chaula / Rajgira / Amaranth",
    "category": "Pulses",
    "subtitle": "100% Certified Organic \u2022 Unpolished & Natural",
    "defaultPrice": 120.0,
    "defaultOriginalPrice": 141.6,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 53,
    "image": "/images/products/pulse-toor-2.jpg",
    "images": [
      "/images/products/pulse-toor-2.jpg",
      "/images/products/pulses/pulse-dal-bowl-1.jpg",
      "/images/products/pulses/pulse-lentils-1.jpg",
      "/images/categories/pulses.jpg"
    ],
    "options": [
      {
        "label": "10kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "30kg",
        "price": 3000.0,
        "originalPrice": 3540.0,
        "discount": "15% Off"
      },
      {
        "label": "50kg",
        "price": 540.0,
        "originalPrice": 637.2,
        "discount": "15% Off"
      },
      {
        "label": "100kg",
        "price": 16.8,
        "originalPrice": 19.82,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Organic Amaranthus Whole / Chaula / Rajgira / Amaranth is a pantry staple suitable for everyday Indian cooking. Whole amaranth seeds (chaula / rajgira) can be used in traditional dals, curries, soups and other regional recipes. Clean, dry and cook thoroughly before consumption. Product grade, cleaning/polishing status and organic certification should be verified against the supplied batch.",
    "origin": "Gulbarga, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Pulses generally provide plant-based protein, dietary fibre and carbohydrates. Nutrient content varies by variety and processing; avoid specific medical or disease-prevention claims unless supported by verified product testing.",
    "ingredients": "Whole amaranth seeds (chaula / rajgira) (single ingredient; verify against final pack label).",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight and moisture. After opening, keep in an airtight food-grade container. Use a clean, dry scoop.",
    "commonUses": "Suitable for dal, curry, soups, stews, khichdi and other recipes depending on the pulse variety. Soaking and cooking time vary by product.",
    "additionalInfo": "Category: Pulses | Reference bulk rate: \u20b9120/kg (October 2024 list; NOT a current quote) | GST shown in reference list: 0% | NPOP column in reference list: N | Minimum bulk pack shown in reference list: 30/50 kg. Confirm current rate, GST, certification, packaging, availability and exact blend/grade with supplier before publishing.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "millets-premium-pearl-millet-bajra",
    "name": "Premium Pearl Millet / Bajra",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 99.0,
    "defaultOriginalPrice": 116.82,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 60,
    "image": "/images/products/millet-bajra-1.jpg",
    "images": [
      "/images/products/millet-bajra-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 99.0,
        "originalPrice": 116.82,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 180.0,
        "originalPrice": 212.4,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 342.0,
        "originalPrice": 403.56,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 810.0,
        "originalPrice": 955.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Whole pearl millet for rotis, porridge and traditional meals. Sort and rinse before cooking or milling.",
    "origin": "Sirohi, Rajasthan",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Whole pearl millet for rotis, porridge and traditional meals. Sort and rinse before cooking or milling.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "millets-premium-finger-millet-ragi",
    "name": "Premium Finger Millet / Ragi",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 60.5,
    "defaultOriginalPrice": 71.39,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 67,
    "image": "/images/products/millets/millet-grain-1.jpg",
    "images": [
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millet-bajra-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 60.5,
        "originalPrice": 71.39,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 495.0,
        "originalPrice": 584.1,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Finger millet for porridge, flour blends, rotis and baking. Confirm milling fineness.",
    "origin": "Mandya, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Finger millet for porridge, flour blends, rotis and baking. Confirm milling fineness.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "millets-premium-foxtail-millet",
    "name": "Premium Foxtail Millet",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 55.0,
    "defaultOriginalPrice": 64.9,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 74,
    "image": "/images/products/millet-foxtail-1.jpg",
    "images": [
      "/images/products/millet-foxtail-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 55.0,
        "originalPrice": 64.9,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 100.0,
        "originalPrice": 118.0,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 190.0,
        "originalPrice": 224.2,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 450.0,
        "originalPrice": 531.0,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Foxtail millet for cooked grain bowls, upma and regional recipes. Rinse before cooking.",
    "origin": "Anantapur, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Foxtail millet for cooked grain bowls, upma and regional recipes. Rinse before cooking.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "millets-premium-little-millet",
    "name": "Premium Little Millet",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 99.0,
    "defaultOriginalPrice": 116.82,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 81,
    "image": "/images/products/millets/millet-grain-1.jpg",
    "images": [
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millet-bajra-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 99.0,
        "originalPrice": 116.82,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 180.0,
        "originalPrice": 212.4,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 342.0,
        "originalPrice": 403.56,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 810.0,
        "originalPrice": 955.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Small-grain millet for cooked dishes, khichdi-style meals and side servings.",
    "origin": "Salem, Tamil Nadu",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Small-grain millet for cooked dishes, khichdi-style meals and side servings.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "millets-premium-kodo-millet",
    "name": "Premium Kodo Millet",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 60.5,
    "defaultOriginalPrice": 71.39,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 23,
    "image": "/images/products/millets/millet-grain-1.jpg",
    "images": [
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millet-bajra-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 60.5,
        "originalPrice": 71.39,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 495.0,
        "originalPrice": 584.1,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Kodo millet for grain dishes and traditional recipes. Clean and rinse before use.",
    "origin": "Sirohi, Rajasthan",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Kodo millet for grain dishes and traditional recipes. Clean and rinse before use.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "millets-premium-barnyard-millet",
    "name": "Premium Barnyard Millet",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 52.25,
    "defaultOriginalPrice": 61.65,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 30,
    "image": "/images/products/millets/millet-grain-1.jpg",
    "images": [
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millet-bajra-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 52.25,
        "originalPrice": 61.65,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 180.5,
        "originalPrice": 212.99,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 427.5,
        "originalPrice": 504.45,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Barnyard millet for porridge, khichdi-style dishes and other cooked preparations.",
    "origin": "Mandya, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Barnyard millet for porridge, khichdi-style dishes and other cooked preparations.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "millets-premium-sorghum-jowar",
    "name": "Premium Sorghum / Jowar",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 52.25,
    "defaultOriginalPrice": 61.65,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 37,
    "image": "/images/products/millets/millet-grain-1.jpg",
    "images": [
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millet-bajra-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 52.25,
        "originalPrice": 61.65,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 180.5,
        "originalPrice": 212.99,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 427.5,
        "originalPrice": 504.45,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Whole sorghum grain for flour milling and cooked grain preparations.",
    "origin": "Anantapur, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Whole sorghum grain for flour milling and cooked grain preparations.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "millets-premium-proso-millet",
    "name": "Premium Proso Millet",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 48.4,
    "defaultOriginalPrice": 57.11,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 44,
    "image": "/images/products/millets/millet-grain-1.jpg",
    "images": [
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millet-bajra-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 48.4,
        "originalPrice": 57.11,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 88.0,
        "originalPrice": 103.84,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 167.2,
        "originalPrice": 197.3,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 396.0,
        "originalPrice": 467.28,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Proso millet for cooked grain dishes and flour blends. Verify grain grade.",
    "origin": "Salem, Tamil Nadu",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Proso millet for cooked grain dishes and flour blends. Verify grain grade.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "millets-premium-browntop-millet",
    "name": "Premium Browntop Millet",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 71.5,
    "defaultOriginalPrice": 84.37,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 51,
    "image": "/images/products/millets/millet-grain-1.jpg",
    "images": [
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millet-bajra-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 71.5,
        "originalPrice": 84.37,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 247.0,
        "originalPrice": 291.46,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 585.0,
        "originalPrice": 690.3,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Browntop millet for cooked grain recipes and traditional preparations.",
    "origin": "Sirohi, Rajasthan",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Browntop millet for cooked grain recipes and traditional preparations.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "millets-premium-mixed-millets",
    "name": "Premium Mixed Millets",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 66.0,
    "defaultOriginalPrice": 77.88,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 58,
    "image": "/images/products/millets/millet-bowl-1.jpg",
    "images": [
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-flour-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 540.0,
        "originalPrice": 637.2,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "A blend of millet varieties for porridge and mixed-grain dishes. Confirm blend composition.",
    "origin": "Mandya, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "A blend of millet varieties for porridge and mixed-grain dishes. Confirm blend composition.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "millets-premium-millet-flour-mix",
    "name": "Premium Millet Flour Mix",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 68.75,
    "defaultOriginalPrice": 81.12,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 65,
    "image": "/images/products/millets/millet-flour-1.jpg",
    "images": [
      "/images/products/millets/millet-flour-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 68.75,
        "originalPrice": 81.12,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 237.5,
        "originalPrice": 280.25,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 562.5,
        "originalPrice": 663.75,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "A flour blend for rotis and baking. Confirm exact millet composition and milling details.",
    "origin": "Anantapur, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "A flour blend for rotis and baking. Confirm exact millet composition and milling details.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "millets-premium-ragi-flour",
    "name": "Premium Ragi Flour",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 63.25,
    "defaultOriginalPrice": 74.63,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 72,
    "image": "/images/products/millets/millet-flour-1.jpg",
    "images": [
      "/images/products/millets/millet-flour-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 63.25,
        "originalPrice": 74.63,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 115.0,
        "originalPrice": 135.7,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 218.5,
        "originalPrice": 257.83,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 517.5,
        "originalPrice": 610.65,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Finger millet flour for porridge, rotis and baking. Confirm fineness and processing.",
    "origin": "Salem, Tamil Nadu",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Finger millet flour for porridge, rotis and baking. Confirm fineness and processing.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "millets-premium-bajra-flour",
    "name": "Premium Bajra Flour",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 90.75,
    "defaultOriginalPrice": 107.08,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 79,
    "image": "/images/products/millet-bajra-1.jpg",
    "images": [
      "/images/products/millet-bajra-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 90.75,
        "originalPrice": 107.08,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 165.0,
        "originalPrice": 194.7,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 313.5,
        "originalPrice": 369.93,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 742.5,
        "originalPrice": 876.15,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Pearl millet flour for rotis, bhakri and porridge. Store sealed and dry.",
    "origin": "Sirohi, Rajasthan",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Pearl millet flour for rotis, bhakri and porridge. Store sealed and dry.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "millets-premium-jowar-flour",
    "name": "Premium Jowar Flour",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 88.0,
    "defaultOriginalPrice": 103.84,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 86,
    "image": "/images/products/millets/millet-flour-1.jpg",
    "images": [
      "/images/products/millets/millet-flour-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 88.0,
        "originalPrice": 103.84,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 160.0,
        "originalPrice": 188.8,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 304.0,
        "originalPrice": 358.72,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 720.0,
        "originalPrice": 849.6,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Sorghum flour for flatbreads and baking blends. Dough may need recipe-specific handling.",
    "origin": "Mandya, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Sorghum flour for flatbreads and baking blends. Dough may need recipe-specific handling.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "millets-premium-foxtail-millet-flour",
    "name": "Premium Foxtail Millet Flour",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 71.5,
    "defaultOriginalPrice": 84.37,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 28,
    "image": "/images/products/millet-foxtail-1.jpg",
    "images": [
      "/images/products/millet-foxtail-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 71.5,
        "originalPrice": 84.37,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 247.0,
        "originalPrice": 291.46,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 585.0,
        "originalPrice": 690.3,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Foxtail millet flour for baking and traditional recipes. Verify milling grade.",
    "origin": "Anantapur, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Foxtail millet flour for baking and traditional recipes. Verify milling grade.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "millets-premium-little-millet-flour",
    "name": "Premium Little Millet Flour",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 68.75,
    "defaultOriginalPrice": 81.12,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 35,
    "image": "/images/products/millets/millet-flour-1.jpg",
    "images": [
      "/images/products/millets/millet-flour-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 68.75,
        "originalPrice": 81.12,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 237.5,
        "originalPrice": 280.25,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 562.5,
        "originalPrice": 663.75,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Little millet flour for rotis, porridges and mixed flour recipes.",
    "origin": "Salem, Tamil Nadu",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Little millet flour for rotis, porridges and mixed flour recipes.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "millets-premium-kodo-millet-flour",
    "name": "Premium Kodo Millet Flour",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 74.25,
    "defaultOriginalPrice": 87.61,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 42,
    "image": "/images/products/millets/millet-flour-1.jpg",
    "images": [
      "/images/products/millets/millet-flour-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 74.25,
        "originalPrice": 87.61,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 135.0,
        "originalPrice": 159.3,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 256.5,
        "originalPrice": 302.67,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 607.5,
        "originalPrice": 716.85,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Kodo millet flour for flatbreads and recipe blends. Confirm processing details.",
    "origin": "Sirohi, Rajasthan",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Kodo millet flour for flatbreads and recipe blends. Confirm processing details.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "millets-premium-barnyard-millet-flour",
    "name": "Premium Barnyard Millet Flour",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 77.0,
    "defaultOriginalPrice": 90.86,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 49,
    "image": "/images/products/millets/millet-flour-1.jpg",
    "images": [
      "/images/products/millets/millet-flour-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 77.0,
        "originalPrice": 90.86,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 140.0,
        "originalPrice": 165.2,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 266.0,
        "originalPrice": 313.88,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 630.0,
        "originalPrice": 743.4,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Barnyard millet flour for porridges and baked or cooked recipes.",
    "origin": "Mandya, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Barnyard millet flour for porridges and baked or cooked recipes.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "millets-premium-millet-flakes",
    "name": "Premium Millet Flakes",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 66.0,
    "defaultOriginalPrice": 77.88,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 56,
    "image": "/images/products/millets/millet-bowl-1.jpg",
    "images": [
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-flour-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 540.0,
        "originalPrice": 637.2,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Flattened millet for porridge and quick breakfast preparations. Confirm millet variety.",
    "origin": "Anantapur, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Flattened millet for porridge and quick breakfast preparations. Confirm millet variety.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "millets-premium-millet-puffs",
    "name": "Premium Millet Puffs",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 49.5,
    "defaultOriginalPrice": 58.41,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 63,
    "image": "/images/products/millets/millet-grain-1.jpg",
    "images": [
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millet-bajra-1.jpg",
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 49.5,
        "originalPrice": 58.41,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 90.0,
        "originalPrice": 106.2,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 171.0,
        "originalPrice": 201.78,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 405.0,
        "originalPrice": 477.9,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Puffed millet for snack mixes and breakfast foods. Confirm ingredients and added seasonings.",
    "origin": "Salem, Tamil Nadu",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Puffed millet for snack mixes and breakfast foods. Confirm ingredients and added seasonings.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "millets-premium-millet-noodles",
    "name": "Premium Millet Noodles",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 99.0,
    "defaultOriginalPrice": 116.82,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 70,
    "image": "/images/products/millets/millet-bowl-1.jpg",
    "images": [
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-flour-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 99.0,
        "originalPrice": 116.82,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 180.0,
        "originalPrice": 212.4,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 342.0,
        "originalPrice": 403.56,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 810.0,
        "originalPrice": 955.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Millet-based noodles for quick meals. Verify flour blend and allergen statement.",
    "origin": "Sirohi, Rajasthan",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Millet-based noodles for quick meals. Verify flour blend and allergen statement.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "millets-premium-millet-pasta",
    "name": "Premium Millet Pasta",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 41.25,
    "defaultOriginalPrice": 48.67,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 77,
    "image": "/images/products/millets/millet-bowl-1.jpg",
    "images": [
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-flour-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 41.25,
        "originalPrice": 48.67,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 75.0,
        "originalPrice": 88.5,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 142.5,
        "originalPrice": 168.15,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 337.5,
        "originalPrice": 398.25,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Millet-based pasta for hot meals and salads. Confirm ingredients and cooking directions.",
    "origin": "Mandya, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Millet-based pasta for hot meals and salads. Confirm ingredients and cooking directions.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "millets-premium-millet-dosa-mix",
    "name": "Premium Millet Dosa Mix",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 60.5,
    "defaultOriginalPrice": 71.39,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 84,
    "image": "/images/products/millets/millet-bowl-1.jpg",
    "images": [
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-flour-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 60.5,
        "originalPrice": 71.39,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 495.0,
        "originalPrice": 584.1,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Millet-based dosa mix. Confirm exact ingredients, additives and preparation instructions.",
    "origin": "Anantapur, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Millet-based dosa mix. Confirm exact ingredients, additives and preparation instructions.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "millets-premium-millet-khichdi-mix",
    "name": "Premium Millet Khichdi Mix",
    "category": "Millets",
    "subtitle": "Ancient Gluten-Free Supergrain \u2022 Fiber & Mineral Rich",
    "defaultPrice": 66.0,
    "defaultOriginalPrice": 77.88,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 26,
    "image": "/images/products/millets/millet-bowl-1.jpg",
    "images": [
      "/images/products/millets/millet-bowl-1.jpg",
      "/images/products/millets/millet-grain-1.jpg",
      "/images/products/millets/millet-flour-1.jpg",
      "/images/categories/millets.jpg"
    ],
    "options": [
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 540.0,
        "originalPrice": 637.2,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Ready-to-cook millet mix. Confirm grains, pulses, seasoning and cooking instructions.",
    "origin": "Salem, Tamil Nadu",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by millet type and processing. Use verified nutrition information; avoid unsupported medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Ready-to-cook millet mix. Confirm grains, pulses, seasoning and cooking instructions.",
    "additionalInfo": "Category: MILLET | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "masala-spices-premium-turmeric-powder",
    "name": "Premium Turmeric Powder",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 25.2,
    "defaultOriginalPrice": 29.74,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 33,
    "image": "/images/products/spice-turmeric-1.jpg",
    "images": [
      "/images/products/spice-turmeric-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-pepper-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 25.2,
        "originalPrice": 29.74,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 45.0,
        "originalPrice": 53.1,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 54.0,
        "originalPrice": 63.72,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 99.0,
        "originalPrice": 116.82,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Ground turmeric for curries, dals, marinades and seasoning. Verify purity and food-grade testing.",
    "origin": "Idukki, Kerala",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Ground turmeric for curries, dals, marinades and seasoning. Verify purity and food-grade testing.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "masala-spices-premium-red-chilli-powder",
    "name": "Premium Red Chilli Powder",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 15.4,
    "defaultOriginalPrice": 18.17,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 40,
    "image": "/images/products/spices/spice-chilli-1.jpg",
    "images": [
      "/images/products/spices/spice-chilli-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 15.4,
        "originalPrice": 18.17,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 27.5,
        "originalPrice": 32.45,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 33.0,
        "originalPrice": 38.94,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 60.5,
        "originalPrice": 71.39,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Ground red chilli for seasoning. Heat level and colour vary by variety.",
    "origin": "Wayanad, Kerala",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Ground red chilli for seasoning. Heat level and colour vary by variety.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "masala-spices-premium-coriander-powder",
    "name": "Premium Coriander Powder",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 14.0,
    "defaultOriginalPrice": 16.52,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 47,
    "image": "/images/products/spices/spice-masala-1.jpg",
    "images": [
      "/images/products/spices/spice-masala-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 14.0,
        "originalPrice": 16.52,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 25.0,
        "originalPrice": 29.5,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 30.0,
        "originalPrice": 35.4,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 55.0,
        "originalPrice": 64.9,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Ground coriander seed for curries, spice blends and marinades.",
    "origin": "Guntur, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Ground coriander seed for curries, spice blends and marinades.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "masala-spices-premium-cumin-seeds-jeera",
    "name": "Premium Cumin Seeds / Jeera",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 12.6,
    "defaultOriginalPrice": 14.87,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 54,
    "image": "/images/products/spices/spice-seeds-1.jpg",
    "images": [
      "/images/products/spices/spice-seeds-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 12.6,
        "originalPrice": 14.87,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 22.5,
        "originalPrice": 26.55,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 27.0,
        "originalPrice": 31.86,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 49.5,
        "originalPrice": 58.41,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Whole cumin seeds for tempering, spice blends and cooking.",
    "origin": "Kandhamal, Odisha",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Whole cumin seeds for tempering, spice blends and cooking.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "masala-spices-premium-cumin-powder",
    "name": "Premium Cumin Powder",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 15.4,
    "defaultOriginalPrice": 18.17,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 61,
    "image": "/images/products/spices/spice-seeds-1.jpg",
    "images": [
      "/images/products/spices/spice-seeds-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 15.4,
        "originalPrice": 18.17,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 27.5,
        "originalPrice": 32.45,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 33.0,
        "originalPrice": 38.94,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 60.5,
        "originalPrice": 71.39,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Ground cumin for seasoning and spice mixes.",
    "origin": "Idukki, Kerala",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Ground cumin for seasoning and spice mixes.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "masala-spices-premium-black-pepper-whole",
    "name": "Premium Black Pepper Whole",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 13.3,
    "defaultOriginalPrice": 15.69,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 68,
    "image": "/images/products/spice-pepper-1.jpg",
    "images": [
      "/images/products/spice-pepper-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 13.3,
        "originalPrice": 15.69,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 23.75,
        "originalPrice": 28.02,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 28.5,
        "originalPrice": 33.63,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 52.25,
        "originalPrice": 61.65,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Whole black pepper for grinding, seasoning and spice blends.",
    "origin": "Wayanad, Kerala",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Whole black pepper for grinding, seasoning and spice blends.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "masala-spices-premium-black-pepper-powder",
    "name": "Premium Black Pepper Powder",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 13.3,
    "defaultOriginalPrice": 15.69,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 75,
    "image": "/images/products/spice-pepper-1.jpg",
    "images": [
      "/images/products/spice-pepper-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 13.3,
        "originalPrice": 15.69,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 23.75,
        "originalPrice": 28.02,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 28.5,
        "originalPrice": 33.63,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 52.25,
        "originalPrice": 61.65,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Ground black pepper for seasoning and everyday cooking.",
    "origin": "Guntur, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Ground black pepper for seasoning and everyday cooking.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "masala-spices-premium-garam-masala",
    "name": "Premium Garam Masala",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 12.32,
    "defaultOriginalPrice": 14.54,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 82,
    "image": "/images/products/spices/spice-masala-1.jpg",
    "images": [
      "/images/products/spices/spice-masala-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 12.32,
        "originalPrice": 14.54,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 22.0,
        "originalPrice": 25.96,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 26.4,
        "originalPrice": 31.15,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 48.4,
        "originalPrice": 57.11,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "A spice blend for curries and gravies. Confirm blend composition.",
    "origin": "Kandhamal, Odisha",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "A spice blend for curries and gravies. Confirm blend composition.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "masala-spices-premium-mustard-seeds-rai",
    "name": "Premium Mustard Seeds / Rai",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 18.2,
    "defaultOriginalPrice": 21.48,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 24,
    "image": "/images/products/spices/spice-seeds-1.jpg",
    "images": [
      "/images/products/spices/spice-seeds-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 18.2,
        "originalPrice": 21.48,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 32.5,
        "originalPrice": 38.35,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 39.0,
        "originalPrice": 46.02,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 71.5,
        "originalPrice": 84.37,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Mustard seeds for tempering, pickles and spice blends.",
    "origin": "Idukki, Kerala",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Mustard seeds for tempering, pickles and spice blends.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "masala-spices-premium-fenugreek-seeds-methi",
    "name": "Premium Fenugreek Seeds / Methi",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 19.6,
    "defaultOriginalPrice": 23.13,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 31,
    "image": "/images/products/spices/spice-seeds-1.jpg",
    "images": [
      "/images/products/spices/spice-seeds-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 19.6,
        "originalPrice": 23.13,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 35.0,
        "originalPrice": 41.3,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 42.0,
        "originalPrice": 49.56,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 77.0,
        "originalPrice": 90.86,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Fenugreek seeds for tempering, pickles and spice blends.",
    "origin": "Wayanad, Kerala",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Fenugreek seeds for tempering, pickles and spice blends.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "masala-spices-premium-fennel-seeds-saunf",
    "name": "Premium Fennel Seeds / Saunf",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 18.9,
    "defaultOriginalPrice": 22.3,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 38,
    "image": "/images/products/spices/spice-seeds-1.jpg",
    "images": [
      "/images/products/spices/spice-seeds-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 18.9,
        "originalPrice": 22.3,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 33.75,
        "originalPrice": 39.82,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 40.5,
        "originalPrice": 47.79,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 74.25,
        "originalPrice": 87.61,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Fennel seeds for spice blends, cooking and after-meal use.",
    "origin": "Guntur, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Fennel seeds for spice blends, cooking and after-meal use.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "masala-spices-premium-carom-seeds-ajwain",
    "name": "Premium Carom Seeds / Ajwain",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 25.2,
    "defaultOriginalPrice": 29.74,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 45,
    "image": "/images/products/spices/spice-seeds-1.jpg",
    "images": [
      "/images/products/spices/spice-seeds-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 25.2,
        "originalPrice": 29.74,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 45.0,
        "originalPrice": 53.1,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 54.0,
        "originalPrice": 63.72,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 99.0,
        "originalPrice": 116.82,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Carom seeds for seasoning and savoury recipes.",
    "origin": "Kandhamal, Odisha",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Carom seeds for seasoning and savoury recipes.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "masala-spices-premium-green-cardamom-elaichi",
    "name": "Premium Green Cardamom / Elaichi",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 23.1,
    "defaultOriginalPrice": 27.26,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 52,
    "image": "/images/products/spices/spice-cinnamon-1.jpg",
    "images": [
      "/images/products/spices/spice-cinnamon-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 23.1,
        "originalPrice": 27.26,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 41.25,
        "originalPrice": 48.67,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 49.5,
        "originalPrice": 58.41,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 90.75,
        "originalPrice": 107.08,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Green cardamom pods for desserts, beverages and spice blends.",
    "origin": "Idukki, Kerala",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Green cardamom pods for desserts, beverages and spice blends.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "masala-spices-premium-black-cardamom",
    "name": "Premium Black Cardamom",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 22.4,
    "defaultOriginalPrice": 26.43,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 59,
    "image": "/images/products/spices/spice-cinnamon-1.jpg",
    "images": [
      "/images/products/spices/spice-cinnamon-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 22.4,
        "originalPrice": 26.43,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 40.0,
        "originalPrice": 47.2,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 48.0,
        "originalPrice": 56.64,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 88.0,
        "originalPrice": 103.84,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Black cardamom for aromatic curries, rice dishes and spice blends.",
    "origin": "Wayanad, Kerala",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Black cardamom for aromatic curries, rice dishes and spice blends.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "masala-spices-premium-cloves-laung",
    "name": "Premium Cloves / Laung",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 18.2,
    "defaultOriginalPrice": 21.48,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 66,
    "image": "/images/products/spices/spice-cinnamon-1.jpg",
    "images": [
      "/images/products/spices/spice-cinnamon-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 18.2,
        "originalPrice": 21.48,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 32.5,
        "originalPrice": 38.35,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 39.0,
        "originalPrice": 46.02,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 71.5,
        "originalPrice": 84.37,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Whole cloves for seasoning, rice dishes and spice mixes.",
    "origin": "Guntur, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Whole cloves for seasoning, rice dishes and spice mixes.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "masala-spices-premium-cinnamon-dalchini",
    "name": "Premium Cinnamon / Dalchini",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 17.5,
    "defaultOriginalPrice": 20.65,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 73,
    "image": "/images/products/spices/spice-cinnamon-1.jpg",
    "images": [
      "/images/products/spices/spice-cinnamon-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 17.5,
        "originalPrice": 20.65,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 31.25,
        "originalPrice": 36.88,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 37.5,
        "originalPrice": 44.25,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 68.75,
        "originalPrice": 81.12,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Cinnamon bark for beverages, desserts and savoury dishes.",
    "origin": "Kandhamal, Odisha",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Cinnamon bark for beverages, desserts and savoury dishes.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "masala-spices-premium-bay-leaves-tej-patta",
    "name": "Premium Bay Leaves / Tej Patta",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 18.9,
    "defaultOriginalPrice": 22.3,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 80,
    "image": "/images/products/spices/spice-cinnamon-1.jpg",
    "images": [
      "/images/products/spices/spice-cinnamon-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 18.9,
        "originalPrice": 22.3,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 33.75,
        "originalPrice": 39.82,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 40.5,
        "originalPrice": 47.79,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 74.25,
        "originalPrice": 87.61,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Dried bay leaves for soups, curries and rice dishes.",
    "origin": "Idukki, Kerala",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Dried bay leaves for soups, curries and rice dishes.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "masala-spices-premium-dry-ginger-powder-saunth",
    "name": "Premium Dry Ginger Powder / Saunth",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 19.6,
    "defaultOriginalPrice": 23.13,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 22,
    "image": "/images/products/spices/spice-masala-1.jpg",
    "images": [
      "/images/products/spices/spice-masala-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 19.6,
        "originalPrice": 23.13,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 35.0,
        "originalPrice": 41.3,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 42.0,
        "originalPrice": 49.56,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 77.0,
        "originalPrice": 90.86,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Ground dry ginger for spice blends, drinks and cooking.",
    "origin": "Wayanad, Kerala",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Ground dry ginger for spice blends, drinks and cooking.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "masala-spices-premium-asafoetida-hing",
    "name": "Premium Asafoetida / Hing",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 16.8,
    "defaultOriginalPrice": 19.82,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 29,
    "image": "/images/products/spices/spice-blend-1.jpg",
    "images": [
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spices/spice-masala-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 16.8,
        "originalPrice": 19.82,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 30.0,
        "originalPrice": 35.4,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Asafoetida for tempering and savoury recipes. Verify carrier ingredients on label.",
    "origin": "Guntur, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Asafoetida for tempering and savoury recipes. Verify carrier ingredients on label.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "masala-spices-premium-amchur-powder",
    "name": "Premium Amchur Powder",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 12.6,
    "defaultOriginalPrice": 14.87,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 36,
    "image": "/images/products/spices/spice-masala-1.jpg",
    "images": [
      "/images/products/spices/spice-masala-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 12.6,
        "originalPrice": 14.87,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 22.5,
        "originalPrice": 26.55,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 27.0,
        "originalPrice": 31.86,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 49.5,
        "originalPrice": 58.41,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Dried mango powder for tangy seasoning and spice blends.",
    "origin": "Kandhamal, Odisha",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Dried mango powder for tangy seasoning and spice blends.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "masala-spices-premium-chaat-masala",
    "name": "Premium Chaat Masala",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 25.2,
    "defaultOriginalPrice": 29.74,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 43,
    "image": "/images/products/spices/spice-masala-1.jpg",
    "images": [
      "/images/products/spices/spice-masala-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 25.2,
        "originalPrice": 29.74,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 45.0,
        "originalPrice": 53.1,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 54.0,
        "originalPrice": 63.72,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 99.0,
        "originalPrice": 116.82,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "A tangy spice blend for snacks, fruit and savoury dishes. Confirm ingredients.",
    "origin": "Idukki, Kerala",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "A tangy spice blend for snacks, fruit and savoury dishes. Confirm ingredients.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "masala-spices-premium-pav-bhaji-masala",
    "name": "Premium Pav Bhaji Masala",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 10.5,
    "defaultOriginalPrice": 12.39,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 50,
    "image": "/images/products/spices/spice-masala-1.jpg",
    "images": [
      "/images/products/spices/spice-masala-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 10.5,
        "originalPrice": 12.39,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 18.75,
        "originalPrice": 22.12,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 22.5,
        "originalPrice": 26.55,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 41.25,
        "originalPrice": 48.67,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "A spice blend for pav bhaji and vegetable dishes. Confirm composition.",
    "origin": "Wayanad, Kerala",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "A spice blend for pav bhaji and vegetable dishes. Confirm composition.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "masala-spices-premium-sambhar-masala",
    "name": "Premium Sambhar Masala",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 15.4,
    "defaultOriginalPrice": 18.17,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 57,
    "image": "/images/products/spices/spice-masala-1.jpg",
    "images": [
      "/images/products/spices/spice-masala-1.jpg",
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 15.4,
        "originalPrice": 18.17,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 27.5,
        "originalPrice": 32.45,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 33.0,
        "originalPrice": 38.94,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 60.5,
        "originalPrice": 71.39,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "A spice blend for sambhar and South Indian dishes. Confirm composition.",
    "origin": "Guntur, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "A spice blend for sambhar and South Indian dishes. Confirm composition.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "masala-spices-premium-panch-phoron",
    "name": "Premium Panch Phoron",
    "category": "Masala & Spices",
    "subtitle": "Sun-Dried Pure Aromatic Spice \u2022 High Volatile Oils",
    "defaultPrice": 16.8,
    "defaultOriginalPrice": 19.82,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 64,
    "image": "/images/products/spices/spice-blend-1.jpg",
    "images": [
      "/images/products/spices/spice-blend-1.jpg",
      "/images/products/spices/spice-masala-1.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/categories/spices.jpg"
    ],
    "options": [
      {
        "label": "100 gm",
        "price": 16.8,
        "originalPrice": 19.82,
        "discount": "15% Off"
      },
      {
        "label": "200 gm",
        "price": 30.0,
        "originalPrice": 35.4,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "A whole-spice blend used in regional cooking. Confirm exact seed combination.",
    "origin": "Kandhamal, Odisha",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Spices contribute flavour and aroma; nutrition varies by ingredient and serving size. Avoid medicinal or disease-prevention claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "A whole-spice blend used in regional cooking. Confirm exact seed combination.",
    "additionalInfo": "Category: MASALA | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "sweets-premium-jaggery-block",
    "name": "Premium Jaggery Block",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 71,
    "image": "/images/products/sweets/jaggery-block-1.jpg",
    "images": [
      "/images/products/sweets/jaggery-block-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Sweetener for traditional desserts and cooking. Confirm form, composition and ingredients.",
    "origin": "Kolhapur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Sweetener for traditional desserts and cooking. Confirm form, composition and ingredients.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "sweets-premium-jaggery-powder",
    "name": "Premium Jaggery Powder",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 78,
    "image": "/images/products/sweets/jaggery-powder-1.jpg",
    "images": [
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/jaggery-block-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Granulated jaggery for sweetening drinks, desserts and recipes.",
    "origin": "Meerut, Uttar Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Granulated jaggery for sweetening drinks, desserts and recipes.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "sweets-premium-mishri-rock-sugar",
    "name": "Premium Mishri / Rock Sugar",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 30.0,
    "defaultOriginalPrice": 35.4,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 85,
    "image": "/images/products/sweets/sweets-sugar-1.jpg",
    "images": [
      "/images/products/sweets/sweets-sugar-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 30.0,
        "originalPrice": 35.4,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 55.0,
        "originalPrice": 64.9,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 100.0,
        "originalPrice": 118.0,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 190.0,
        "originalPrice": 224.2,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Crystallised sugar for traditional uses and sweetening.",
    "origin": "Nadia, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Crystallised sugar for traditional uses and sweetening.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "sweets-premium-boora-tagar-sugar",
    "name": "Premium Boora / Tagar Sugar",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 27,
    "image": "/images/products/sweets/sweets-sugar-1.jpg",
    "images": [
      "/images/products/sweets/sweets-sugar-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Fine sugar for Indian sweets and dessert preparations.",
    "origin": "Salem, Tamil Nadu",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Fine sugar for Indian sweets and dessert preparations.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "sweets-premium-desi-khand",
    "name": "Premium Desi Khand",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 34,
    "image": "/images/products/sweets/sweets-sugar-1.jpg",
    "images": [
      "/images/products/sweets/sweets-sugar-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Traditional sugar product for sweetening. Verify processing claims.",
    "origin": "Kolhapur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Traditional sugar product for sweetening. Verify processing claims.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "sweets-premium-sugar-candy",
    "name": "Premium Sugar Candy",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 28.5,
    "defaultOriginalPrice": 33.63,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 41,
    "image": "/images/products/sweets/sweets-sugar-1.jpg",
    "images": [
      "/images/products/sweets/sweets-sugar-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 28.5,
        "originalPrice": 33.63,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 52.25,
        "originalPrice": 61.65,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 180.5,
        "originalPrice": 212.99,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Sugar crystals for sweetening and confectionery use.",
    "origin": "Meerut, Uttar Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Sugar crystals for sweetening and confectionery use.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "sweets-premium-date-jaggery",
    "name": "Premium Date Jaggery",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 28.5,
    "defaultOriginalPrice": 33.63,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 48,
    "image": "/images/products/sweets/jaggery-block-1.jpg",
    "images": [
      "/images/products/sweets/jaggery-block-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 28.5,
        "originalPrice": 33.63,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 52.25,
        "originalPrice": 61.65,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 180.5,
        "originalPrice": 212.99,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Date-palm jaggery for traditional sweets. Verify source and seasonal availability.",
    "origin": "Nadia, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Date-palm jaggery for traditional sweets. Verify source and seasonal availability.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "sweets-premium-palm-jaggery",
    "name": "Premium Palm Jaggery",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 26.4,
    "defaultOriginalPrice": 31.15,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 55,
    "image": "/images/products/sweets/jaggery-block-1.jpg",
    "images": [
      "/images/products/sweets/jaggery-block-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 26.4,
        "originalPrice": 31.15,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 48.4,
        "originalPrice": 57.11,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 88.0,
        "originalPrice": 103.84,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 167.2,
        "originalPrice": 197.3,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Palm-derived jaggery for desserts and drinks. Confirm source and ingredients.",
    "origin": "Salem, Tamil Nadu",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Palm-derived jaggery for desserts and drinks. Confirm source and ingredients.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "sweets-premium-coconut-sugar",
    "name": "Premium Coconut Sugar",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 39.0,
    "defaultOriginalPrice": 46.02,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 62,
    "image": "/images/products/sweets/sweets-sugar-1.jpg",
    "images": [
      "/images/products/sweets/sweets-sugar-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 39.0,
        "originalPrice": 46.02,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 71.5,
        "originalPrice": 84.37,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 247.0,
        "originalPrice": 291.46,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Coconut-derived sweetener. Confirm ingredients and substantiation for claims.",
    "origin": "Kolhapur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Coconut-derived sweetener. Confirm ingredients and substantiation for claims.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "sweets-premium-mishri-crystals-small",
    "name": "Premium Mishri Crystals Small",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 69,
    "image": "/images/products/sweets/sweets-sugar-1.jpg",
    "images": [
      "/images/products/sweets/sweets-sugar-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Small crystal rock sugar for sweetening and traditional uses.",
    "origin": "Meerut, Uttar Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Small crystal rock sugar for sweetening and traditional uses.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "sweets-premium-mishri-crystals-large",
    "name": "Premium Mishri Crystals Large",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 37.5,
    "defaultOriginalPrice": 44.25,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 76,
    "image": "/images/products/sweets/sweets-sugar-1.jpg",
    "images": [
      "/images/products/sweets/sweets-sugar-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 37.5,
        "originalPrice": 44.25,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 68.75,
        "originalPrice": 81.12,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 237.5,
        "originalPrice": 280.25,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Large crystal rock sugar. Confirm crystal size and pack format.",
    "origin": "Nadia, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Large crystal rock sugar. Confirm crystal size and pack format.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "sweets-premium-jaggery-cubes",
    "name": "Premium Jaggery Cubes",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 34.5,
    "defaultOriginalPrice": 40.71,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 83,
    "image": "/images/products/sweets/jaggery-block-1.jpg",
    "images": [
      "/images/products/sweets/jaggery-block-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 34.5,
        "originalPrice": 40.71,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 63.25,
        "originalPrice": 74.63,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 115.0,
        "originalPrice": 135.7,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 218.5,
        "originalPrice": 257.83,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Jaggery portioned into cubes for drinks and recipes.",
    "origin": "Salem, Tamil Nadu",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Jaggery portioned into cubes for drinks and recipes.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "sweets-premium-jaggery-granules",
    "name": "Premium Jaggery Granules",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 49.5,
    "defaultOriginalPrice": 58.41,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 25,
    "image": "/images/products/sweets/jaggery-powder-1.jpg",
    "images": [
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/jaggery-block-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 49.5,
        "originalPrice": 58.41,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 90.75,
        "originalPrice": 107.08,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 165.0,
        "originalPrice": 194.7,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 313.5,
        "originalPrice": 369.93,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Granulated jaggery for convenient measuring in cooking.",
    "origin": "Kolhapur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Granulated jaggery for convenient measuring in cooking.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "sweets-premium-khand-sugar",
    "name": "Premium Khand Sugar",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 48.0,
    "defaultOriginalPrice": 56.64,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 32,
    "image": "/images/products/sweets/sweets-sugar-1.jpg",
    "images": [
      "/images/products/sweets/sweets-sugar-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 48.0,
        "originalPrice": 56.64,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 88.0,
        "originalPrice": 103.84,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 160.0,
        "originalPrice": 188.8,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 304.0,
        "originalPrice": 358.72,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Sugar product for desserts and household sweetening. Verify exact composition.",
    "origin": "Meerut, Uttar Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Sugar product for desserts and household sweetening. Verify exact composition.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "sweets-premium-boora-sugar-fine",
    "name": "Premium Boora Sugar Fine",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 39.0,
    "defaultOriginalPrice": 46.02,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 39,
    "image": "/images/products/sweets/sweets-sugar-1.jpg",
    "images": [
      "/images/products/sweets/sweets-sugar-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 39.0,
        "originalPrice": 46.02,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 71.5,
        "originalPrice": 84.37,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 247.0,
        "originalPrice": 291.46,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Fine-textured sugar for confectionery and dessert recipes.",
    "origin": "Nadia, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Fine-textured sugar for confectionery and dessert recipes.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "sweets-premium-boora-sugar-coarse",
    "name": "Premium Boora Sugar Coarse",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 37.5,
    "defaultOriginalPrice": 44.25,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 46,
    "image": "/images/products/sweets/sweets-sugar-1.jpg",
    "images": [
      "/images/products/sweets/sweets-sugar-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 37.5,
        "originalPrice": 44.25,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 68.75,
        "originalPrice": 81.12,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 237.5,
        "originalPrice": 280.25,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Coarser sugar for sweets and recipe applications. Confirm texture.",
    "origin": "Salem, Tamil Nadu",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Coarser sugar for sweets and recipe applications. Confirm texture.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "sweets-premium-til-chikki",
    "name": "Premium Til Chikki",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 40.5,
    "defaultOriginalPrice": 47.79,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 53,
    "image": "/images/products/sweets/sweets-chikki-1.jpg",
    "images": [
      "/images/products/sweets/sweets-chikki-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 40.5,
        "originalPrice": 47.79,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 74.25,
        "originalPrice": 87.61,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 135.0,
        "originalPrice": 159.3,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 256.5,
        "originalPrice": 302.67,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Sesame brittle sweet. Confirm ingredients, allergens, shelf life and pack size.",
    "origin": "Kolhapur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Sesame brittle sweet. Confirm ingredients, allergens, shelf life and pack size.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "sweets-premium-peanut-chikki",
    "name": "Premium Peanut Chikki",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 42.0,
    "defaultOriginalPrice": 49.56,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 60,
    "image": "/images/products/sweets/sweets-chikki-1.jpg",
    "images": [
      "/images/products/sweets/sweets-chikki-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 42.0,
        "originalPrice": 49.56,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 77.0,
        "originalPrice": 90.86,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 140.0,
        "originalPrice": 165.2,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 266.0,
        "originalPrice": 313.88,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Peanut brittle sweet. Confirm ingredients, allergen labelling and shelf life.",
    "origin": "Meerut, Uttar Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Peanut brittle sweet. Confirm ingredients, allergen labelling and shelf life.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "sweets-premium-gur-rewari",
    "name": "Premium Gur Rewari",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 67,
    "image": "/images/products/sweets/sweets-chikki-1.jpg",
    "images": [
      "/images/products/sweets/sweets-chikki-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Traditional jaggery and sesame sweet. Verify recipe and ingredients.",
    "origin": "Nadia, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Traditional jaggery and sesame sweet. Verify recipe and ingredients.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "sweets-premium-gajak",
    "name": "Premium Gajak",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 27.0,
    "defaultOriginalPrice": 31.86,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 74,
    "image": "/images/products/sweets/sweets-chikki-1.jpg",
    "images": [
      "/images/products/sweets/sweets-chikki-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 27.0,
        "originalPrice": 31.86,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 49.5,
        "originalPrice": 58.41,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 90.0,
        "originalPrice": 106.2,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 171.0,
        "originalPrice": 201.78,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Traditional sesame/peanut sweet. Confirm ingredients, allergens and packaging.",
    "origin": "Salem, Tamil Nadu",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Traditional sesame/peanut sweet. Confirm ingredients, allergens and packaging.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "sweets-premium-dry-fruit-ladoo-mix",
    "name": "Premium Dry Fruit Ladoo Mix",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 81,
    "image": "/images/products/sweets/sweets-ladoo-1.jpg",
    "images": [
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-sugar-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "A sweet mix for ladoo preparation. Confirm ingredients and proportions.",
    "origin": "Kolhapur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "A sweet mix for ladoo preparation. Confirm ingredients and proportions.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "sweets-premium-kheer-mix",
    "name": "Premium Kheer Mix",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 22.5,
    "defaultOriginalPrice": 26.55,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 23,
    "image": "/images/products/sweets/sweets-ladoo-1.jpg",
    "images": [
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-sugar-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 22.5,
        "originalPrice": 26.55,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 41.25,
        "originalPrice": 48.67,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 75.0,
        "originalPrice": 88.5,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 142.5,
        "originalPrice": 168.15,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "A dessert mix for kheer. Confirm grain, sugar, flavour and cooking instructions.",
    "origin": "Meerut, Uttar Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "A dessert mix for kheer. Confirm grain, sugar, flavour and cooking instructions.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "sweets-premium-halwa-mix",
    "name": "Premium Halwa Mix",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 30,
    "image": "/images/products/sweets/sweets-ladoo-1.jpg",
    "images": [
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-sugar-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "A dessert mix for halwa. Confirm ingredients, allergens and preparation method.",
    "origin": "Nadia, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "A dessert mix for halwa. Confirm ingredients, allergens and preparation method.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "sweets-premium-sweetener-blend",
    "name": "Premium Sweetener Blend",
    "category": "Sweets",
    "subtitle": "Traditional Desi Sweetener \u2022 Unrefined & Chemical Free",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 37,
    "image": "/images/products/sweets/sweets-mithai-1.jpg",
    "images": [
      "/images/products/sweets/sweets-mithai-1.jpg",
      "/images/products/sweets/jaggery-powder-1.jpg",
      "/images/products/sweets/sweets-ladoo-1.jpg",
      "/images/categories/sweets.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Sweetener blend for cooking and beverages. Verify full ingredient list.",
    "origin": "Salem, Tamil Nadu",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional values depend on ingredients and serving size. Confirm sugar content and label nutrition before publishing.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Sweetener blend for cooking and beverages. Verify full ingredient list.",
    "additionalInfo": "Category: SWEETS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "honey-premium-raw-honey",
    "name": "Premium Raw Honey",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 114.0,
    "defaultOriginalPrice": 134.52,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 44,
    "image": "/images/products/honey/honey-raw-1.jpg",
    "images": [
      "/images/products/honey/honey-raw-1.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 114.0,
        "originalPrice": 134.52,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 380.0,
        "originalPrice": 448.4,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 1710.0,
        "originalPrice": 2017.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey for sweetening beverages, breakfast foods and recipes. Do not feed honey to infants under 12 months.",
    "origin": "Jim Corbett Foothills, Uttarakhand",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey for sweetening beverages, breakfast foods and recipes. Do not feed honey to infants under 12 months.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "honey-premium-forest-honey",
    "name": "Premium Forest Honey",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 114.0,
    "defaultOriginalPrice": 134.52,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 51,
    "image": "/images/products/honey/honey-raw-1.jpg",
    "images": [
      "/images/products/honey/honey-raw-1.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 114.0,
        "originalPrice": 134.52,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 380.0,
        "originalPrice": 448.4,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 1710.0,
        "originalPrice": 2017.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey described as forest-sourced; verify origin and source claims.",
    "origin": "Sundarbans, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey described as forest-sourced; verify origin and source claims.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "honey-premium-mustard-honey",
    "name": "Premium Mustard Honey",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 30.0,
    "defaultOriginalPrice": 35.4,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 58,
    "image": "/images/products/honey/honey-raw-2.jpg",
    "images": [
      "/images/products/honey/honey-raw-2.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 30.0,
        "originalPrice": 35.4,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 55.0,
        "originalPrice": 64.9,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 100.0,
        "originalPrice": 118.0,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 450.0,
        "originalPrice": 531.0,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey described as mustard-floral source; verify traceability and batch testing.",
    "origin": "Kashmir Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey described as mustard-floral source; verify traceability and batch testing.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "honey-premium-multi-flora-honey",
    "name": "Premium Multi-Flora Honey",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 114.0,
    "defaultOriginalPrice": 134.52,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 65,
    "image": "/images/products/honey/honey-raw-2.jpg",
    "images": [
      "/images/products/honey/honey-raw-2.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 114.0,
        "originalPrice": 134.52,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 380.0,
        "originalPrice": 448.4,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 1710.0,
        "originalPrice": 2017.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey from multiple floral sources. Confirm source description with supplier.",
    "origin": "Coorg, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey from multiple floral sources. Confirm source description with supplier.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "honey-premium-eucalyptus-honey",
    "name": "Premium Eucalyptus Honey",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 114.0,
    "defaultOriginalPrice": 134.52,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 72,
    "image": "/images/products/honey/honey-raw-2.jpg",
    "images": [
      "/images/products/honey/honey-raw-2.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 114.0,
        "originalPrice": 134.52,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 380.0,
        "originalPrice": 448.4,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 1710.0,
        "originalPrice": 2017.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey described as eucalyptus-floral source. Verify floral-source claim.",
    "origin": "Jim Corbett Foothills, Uttarakhand",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey described as eucalyptus-floral source. Verify floral-source claim.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "honey-premium-acacia-honey",
    "name": "Premium Acacia Honey",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 28.5,
    "defaultOriginalPrice": 33.63,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 79,
    "image": "/images/products/honey/honey-raw-2.jpg",
    "images": [
      "/images/products/honey/honey-raw-2.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 28.5,
        "originalPrice": 33.63,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 52.25,
        "originalPrice": 61.65,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 427.5,
        "originalPrice": 504.45,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey described as acacia-source honey. Confirm traceability.",
    "origin": "Sundarbans, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey described as acacia-source honey. Confirm traceability.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "honey-premium-himalayan-honey",
    "name": "Premium Himalayan Honey",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 28.5,
    "defaultOriginalPrice": 33.63,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 86,
    "image": "/images/products/honey/honey-raw-2.jpg",
    "images": [
      "/images/products/honey/honey-raw-2.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 28.5,
        "originalPrice": 33.63,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 52.25,
        "originalPrice": 61.65,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 427.5,
        "originalPrice": 504.45,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey described as Himalayan-source. Verify geographic and source claims.",
    "origin": "Kashmir Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey described as Himalayan-source. Verify geographic and source claims.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "honey-premium-wildflower-honey",
    "name": "Premium Wildflower Honey",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 26.4,
    "defaultOriginalPrice": 31.15,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 28,
    "image": "/images/products/honey/honey-raw-1.jpg",
    "images": [
      "/images/products/honey/honey-raw-1.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 26.4,
        "originalPrice": 31.15,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 48.4,
        "originalPrice": 57.11,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 88.0,
        "originalPrice": 103.84,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 396.0,
        "originalPrice": 467.28,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey described as wildflower-source. Confirm source and testing.",
    "origin": "Coorg, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey described as wildflower-source. Confirm source and testing.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "honey-premium-jamun-honey",
    "name": "Premium Jamun Honey",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 39.0,
    "defaultOriginalPrice": 46.02,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 35,
    "image": "/images/products/honey/honey-raw-2.jpg",
    "images": [
      "/images/products/honey/honey-raw-2.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 39.0,
        "originalPrice": 46.02,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 71.5,
        "originalPrice": 84.37,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 585.0,
        "originalPrice": 690.3,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey described as jamun-floral source. Verify source claim.",
    "origin": "Jim Corbett Foothills, Uttarakhand",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey described as jamun-floral source. Verify source claim.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "honey-premium-litchi-honey",
    "name": "Premium Litchi Honey",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 42,
    "image": "/images/products/honey/honey-raw-2.jpg",
    "images": [
      "/images/products/honey/honey-raw-2.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 540.0,
        "originalPrice": 637.2,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey described as litchi-floral source. Verify source claim.",
    "origin": "Sundarbans, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey described as litchi-floral source. Verify source claim.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "honey-premium-sunflower-honey",
    "name": "Premium Sunflower Honey",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 37.5,
    "defaultOriginalPrice": 44.25,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 49,
    "image": "/images/products/honey/honey-raw-2.jpg",
    "images": [
      "/images/products/honey/honey-raw-2.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 37.5,
        "originalPrice": 44.25,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 68.75,
        "originalPrice": 81.12,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 562.5,
        "originalPrice": 663.75,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey described as sunflower-floral source. Verify source claim.",
    "origin": "Kashmir Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey described as sunflower-floral source. Verify source claim.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "honey-premium-clover-honey",
    "name": "Premium Clover Honey",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 34.5,
    "defaultOriginalPrice": 40.71,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 56,
    "image": "/images/products/honey/honey-raw-2.jpg",
    "images": [
      "/images/products/honey/honey-raw-2.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 34.5,
        "originalPrice": 40.71,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 63.25,
        "originalPrice": 74.63,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 115.0,
        "originalPrice": 135.7,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 517.5,
        "originalPrice": 610.65,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey described as clover-source. Confirm source traceability.",
    "origin": "Coorg, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey described as clover-source. Confirm source traceability.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "honey-premium-comb-honey",
    "name": "Premium Comb Honey",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 49.5,
    "defaultOriginalPrice": 58.41,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 63,
    "image": "/images/products/honey/honey-comb-1.jpg",
    "images": [
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-raw-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 49.5,
        "originalPrice": 58.41,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 90.75,
        "originalPrice": 107.08,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 165.0,
        "originalPrice": 194.7,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 742.5,
        "originalPrice": 876.15,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey supplied in comb form. Confirm packaging, purity and food safety.",
    "origin": "Jim Corbett Foothills, Uttarakhand",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey supplied in comb form. Confirm packaging, purity and food safety.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "honey-premium-honey-squeeze-bottle",
    "name": "Premium Honey Squeeze Bottle",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 48.0,
    "defaultOriginalPrice": 56.64,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 70,
    "image": "/images/products/honey/honey-dipper-1.jpg",
    "images": [
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-raw-2.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 48.0,
        "originalPrice": 56.64,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 88.0,
        "originalPrice": 103.84,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 160.0,
        "originalPrice": 188.8,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 720.0,
        "originalPrice": 849.6,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey in squeeze packaging. Confirm bottle size and ingredients.",
    "origin": "Sundarbans, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey in squeeze packaging. Confirm bottle size and ingredients.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "honey-premium-honey-glass-jar",
    "name": "Premium Honey Glass Jar",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 39.0,
    "defaultOriginalPrice": 46.02,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 77,
    "image": "/images/products/honey/honey-dipper-1.jpg",
    "images": [
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-raw-2.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 39.0,
        "originalPrice": 46.02,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 71.5,
        "originalPrice": 84.37,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 585.0,
        "originalPrice": 690.3,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey in glass jar packaging. Confirm net quantity and packaging.",
    "origin": "Kashmir Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey in glass jar packaging. Confirm net quantity and packaging.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "honey-premium-honey-bulk-pack",
    "name": "Premium Honey Bulk Pack",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 37.5,
    "defaultOriginalPrice": 44.25,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 84,
    "image": "/images/products/honey/honey-raw-2.jpg",
    "images": [
      "/images/products/honey/honey-raw-2.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 37.5,
        "originalPrice": 44.25,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 68.75,
        "originalPrice": 81.12,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 562.5,
        "originalPrice": 663.75,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey supplied in bulk. Confirm grade, packaging and quantity.",
    "origin": "Coorg, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey supplied in bulk. Confirm grade, packaging and quantity.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "honey-premium-honey-sachets",
    "name": "Premium Honey Sachets",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 40.5,
    "defaultOriginalPrice": 47.79,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 26,
    "image": "/images/products/honey/honey-dipper-1.jpg",
    "images": [
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-raw-2.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 40.5,
        "originalPrice": 47.79,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 74.25,
        "originalPrice": 87.61,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 135.0,
        "originalPrice": 159.3,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 607.5,
        "originalPrice": 716.85,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Single-use honey sachets. Confirm sachet weight and packaging.",
    "origin": "Jim Corbett Foothills, Uttarakhand",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Single-use honey sachets. Confirm sachet weight and packaging.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "honey-premium-honey-gift-pack",
    "name": "Premium Honey Gift Pack",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 42.0,
    "defaultOriginalPrice": 49.56,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 33,
    "image": "/images/products/honey/honey-raw-2.jpg",
    "images": [
      "/images/products/honey/honey-raw-2.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 42.0,
        "originalPrice": 49.56,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 77.0,
        "originalPrice": 90.86,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 140.0,
        "originalPrice": 165.2,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 630.0,
        "originalPrice": 743.4,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Gift-format honey pack. Confirm number of jars, net weight and packaging.",
    "origin": "Sundarbans, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Gift-format honey pack. Confirm number of jars, net weight and packaging.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "honey-premium-honey-with-ginger",
    "name": "Premium Honey with Ginger",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 40,
    "image": "/images/products/honey/honey-infusion-1.jpg",
    "images": [
      "/images/products/honey/honey-infusion-1.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 540.0,
        "originalPrice": 637.2,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey blend with ginger. Confirm ingredient list and proportions.",
    "origin": "Kashmir Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey blend with ginger. Confirm ingredient list and proportions.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "honey-premium-honey-with-cinnamon",
    "name": "Premium Honey with Cinnamon",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 27.0,
    "defaultOriginalPrice": 31.86,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 47,
    "image": "/images/products/honey/honey-infusion-1.jpg",
    "images": [
      "/images/products/honey/honey-infusion-1.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 27.0,
        "originalPrice": 31.86,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 49.5,
        "originalPrice": 58.41,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 90.0,
        "originalPrice": 106.2,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 405.0,
        "originalPrice": 477.9,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey blend with cinnamon. Confirm ingredient list and proportions.",
    "origin": "Coorg, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey blend with cinnamon. Confirm ingredient list and proportions.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "honey-premium-honey-with-tulsi",
    "name": "Premium Honey with Tulsi",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 114.0,
    "defaultOriginalPrice": 134.52,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 54,
    "image": "/images/products/honey/honey-infusion-1.jpg",
    "images": [
      "/images/products/honey/honey-infusion-1.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 114.0,
        "originalPrice": 134.52,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 380.0,
        "originalPrice": 448.4,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 1710.0,
        "originalPrice": 2017.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey blend with tulsi. Confirm ingredients and claims.",
    "origin": "Jim Corbett Foothills, Uttarakhand",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey blend with tulsi. Confirm ingredients and claims.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "honey-premium-honey-with-lemon",
    "name": "Premium Honey with Lemon",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 22.5,
    "defaultOriginalPrice": 26.55,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 61,
    "image": "/images/products/honey/honey-infusion-1.jpg",
    "images": [
      "/images/products/honey/honey-infusion-1.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 22.5,
        "originalPrice": 26.55,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 41.25,
        "originalPrice": 48.67,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 75.0,
        "originalPrice": 88.5,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 337.5,
        "originalPrice": 398.25,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey blend with lemon. Confirm ingredients and storage instructions.",
    "origin": "Sundarbans, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey blend with lemon. Confirm ingredients and storage instructions.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "honey-premium-honey-with-dry-fruits",
    "name": "Premium Honey with Dry Fruits",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 114.0,
    "defaultOriginalPrice": 134.52,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 68,
    "image": "/images/products/honey/honey-infusion-1.jpg",
    "images": [
      "/images/products/honey/honey-infusion-1.jpg",
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 114.0,
        "originalPrice": 134.52,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 380.0,
        "originalPrice": 448.4,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 1710.0,
        "originalPrice": 2017.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honey and dry-fruit blend. Confirm ingredients and allergen labelling.",
    "origin": "Kashmir Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honey and dry-fruit blend. Confirm ingredients and allergen labelling.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "honey-premium-honeycomb-pieces",
    "name": "Premium Honeycomb Pieces",
    "category": "Honey",
    "subtitle": "Pure Raw Single-Origin Honey \u2022 Cold Extracted",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 75,
    "image": "/images/products/honey/honey-comb-1.jpg",
    "images": [
      "/images/products/honey/honey-comb-1.jpg",
      "/images/products/honey/honey-raw-1.jpg",
      "/images/products/honey/honey-dipper-1.jpg",
      "/images/categories/honey.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 540.0,
        "originalPrice": 637.2,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Honeycomb product. Confirm format, net weight and safe packaging.",
    "origin": "Coorg, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Honey is a food sweetener. Do not feed honey to infants under 12 months. Avoid unsupported health or medicinal claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Honeycomb product. Confirm format, net weight and safe packaging.",
    "additionalInfo": "Category: HONEY | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "dry-fruits-premium-almonds-badam",
    "name": "Premium Almonds / Badam",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 195.0,
    "defaultOriginalPrice": 230.1,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 82,
    "image": "/images/products/dryfruit-almond-1.jpg",
    "images": [
      "/images/products/dryfruit-almond-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 195.0,
        "originalPrice": 230.1,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 234.0,
        "originalPrice": 276.12,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 429.0,
        "originalPrice": 506.22,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 780.0,
        "originalPrice": 920.4,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Almonds for snacking, baking, desserts and cooking. Confirm grade and origin.",
    "origin": "California, USA",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Almonds for snacking, baking, desserts and cooking. Confirm grade and origin.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "dry-fruits-premium-cashews-kaju",
    "name": "Premium Cashews / Kaju",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 220.0,
    "defaultOriginalPrice": 259.6,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 24,
    "image": "/images/products/dryfruit-cashew-1.jpg",
    "images": [
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dryfruit-almond-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 220.0,
        "originalPrice": 259.6,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 264.0,
        "originalPrice": 311.52,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 484.0,
        "originalPrice": 571.12,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 880.0,
        "originalPrice": 1038.4,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Cashews for snacks, gravies, sweets and baking. Verify grade and count.",
    "origin": "Kashmir Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Cashews for snacks, gravies, sweets and baking. Verify grade and count.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "dry-fruits-premium-raisins-kishmish",
    "name": "Premium Raisins / Kishmish",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 25.0,
    "defaultOriginalPrice": 29.5,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 31,
    "image": "/images/products/dryfruit-raisin-1.jpg",
    "images": [
      "/images/products/dryfruit-raisin-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 25.0,
        "originalPrice": 29.5,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 30.0,
        "originalPrice": 35.4,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 55.0,
        "originalPrice": 64.9,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 100.0,
        "originalPrice": 118.0,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Dried grapes for snacks, desserts, baking and rice dishes. Confirm variety.",
    "origin": "Afghani Highlands",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Dried grapes for snacks, desserts, baking and rice dishes. Confirm variety.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "dry-fruits-premium-pistachios-pista",
    "name": "Premium Pistachios / Pista",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 287.5,
    "defaultOriginalPrice": 339.25,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 38,
    "image": "/images/products/dryfruit-pista-1.jpg",
    "images": [
      "/images/products/dryfruit-pista-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 287.5,
        "originalPrice": 339.25,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 345.0,
        "originalPrice": 407.1,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 632.5,
        "originalPrice": 746.35,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 1150.0,
        "originalPrice": 1357.0,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Pistachios for snacking and desserts. Confirm shell status and grade.",
    "origin": "Herat Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Pistachios for snacking and desserts. Confirm shell status and grade.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "dry-fruits-premium-walnuts-akhrot",
    "name": "Premium Walnuts / Akhrot",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 237.5,
    "defaultOriginalPrice": 280.25,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 45,
    "image": "/images/products/dryfruit-walnut-1.jpg",
    "images": [
      "/images/products/dryfruit-walnut-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 237.5,
        "originalPrice": 280.25,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 285.0,
        "originalPrice": 336.3,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 522.5,
        "originalPrice": 616.55,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 950.0,
        "originalPrice": 1121.0,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Walnuts for snacks, baking and salads. Verify kernel grade.",
    "origin": "California, USA",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Walnuts for snacks, baking and salads. Verify kernel grade.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "dry-fruits-premium-dates-khajoor",
    "name": "Premium Dates / Khajoor",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 23.75,
    "defaultOriginalPrice": 28.02,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 52,
    "image": "/images/products/dry-fruits/dryfruit-dates-1.jpg",
    "images": [
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dryfruit-walnut-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 23.75,
        "originalPrice": 28.02,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 28.5,
        "originalPrice": 33.63,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 52.25,
        "originalPrice": 61.65,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Dates for snacking, desserts and cooking. Confirm variety and whether pitted.",
    "origin": "Kashmir Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Dates for snacking, desserts and cooking. Confirm variety and whether pitted.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "dry-fruits-premium-dried-figs-anjeer",
    "name": "Premium Dried Figs / Anjeer",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 23.75,
    "defaultOriginalPrice": 28.02,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 59,
    "image": "/images/products/dry-fruits/dryfruit-figs-1.jpg",
    "images": [
      "/images/products/dry-fruits/dryfruit-figs-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 23.75,
        "originalPrice": 28.02,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 28.5,
        "originalPrice": 33.63,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 52.25,
        "originalPrice": 61.65,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Dried figs for snacks and desserts. Confirm grade and origin.",
    "origin": "Afghani Highlands",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Dried figs for snacks and desserts. Confirm grade and origin.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "dry-fruits-premium-dried-apricots",
    "name": "Premium Dried Apricots",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 22.0,
    "defaultOriginalPrice": 25.96,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 66,
    "image": "/images/products/dry-fruits/dryfruit-figs-1.jpg",
    "images": [
      "/images/products/dry-fruits/dryfruit-figs-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 22.0,
        "originalPrice": 25.96,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 26.4,
        "originalPrice": 31.15,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 48.4,
        "originalPrice": 57.11,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 88.0,
        "originalPrice": 103.84,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Dried apricots for snacks, baking and desserts. Verify sulphite information.",
    "origin": "Herat Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Dried apricots for snacks, baking and desserts. Verify sulphite information.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "dry-fruits-premium-black-raisins",
    "name": "Premium Black Raisins",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 32.5,
    "defaultOriginalPrice": 38.35,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 73,
    "image": "/images/products/dryfruit-raisin-1.jpg",
    "images": [
      "/images/products/dryfruit-raisin-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 32.5,
        "originalPrice": 38.35,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 39.0,
        "originalPrice": 46.02,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 71.5,
        "originalPrice": 84.37,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Dark raisins for snacks, baking and desserts. Confirm seedless status.",
    "origin": "California, USA",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Dark raisins for snacks, baking and desserts. Confirm seedless status.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "dry-fruits-premium-golden-raisins",
    "name": "Premium Golden Raisins",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 30.0,
    "defaultOriginalPrice": 35.4,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 80,
    "image": "/images/products/dryfruit-raisin-1.jpg",
    "images": [
      "/images/products/dryfruit-raisin-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 30.0,
        "originalPrice": 35.4,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Golden raisins for baking, desserts and snacks. Confirm processing details.",
    "origin": "Kashmir Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Golden raisins for baking, desserts and snacks. Confirm processing details.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "dry-fruits-premium-seedless-dates",
    "name": "Premium Seedless Dates",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 31.25,
    "defaultOriginalPrice": 36.88,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 22,
    "image": "/images/products/dry-fruits/dryfruit-dates-1.jpg",
    "images": [
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dryfruit-walnut-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 31.25,
        "originalPrice": 36.88,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 37.5,
        "originalPrice": 44.25,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 68.75,
        "originalPrice": 81.12,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Pitted dates for snacking, baking and sweet recipes.",
    "origin": "Afghani Highlands",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Pitted dates for snacking, baking and sweet recipes.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "dry-fruits-premium-medjool-dates",
    "name": "Premium Medjool Dates",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 28.75,
    "defaultOriginalPrice": 33.92,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 29,
    "image": "/images/products/dry-fruits/dryfruit-dates-1.jpg",
    "images": [
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dryfruit-walnut-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 28.75,
        "originalPrice": 33.92,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 34.5,
        "originalPrice": 40.71,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 63.25,
        "originalPrice": 74.63,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 115.0,
        "originalPrice": 135.7,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Large dates for snacks and desserts. Verify variety and origin.",
    "origin": "Herat Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Large dates for snacks and desserts. Verify variety and origin.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "dry-fruits-premium-dried-cranberries",
    "name": "Premium Dried Cranberries",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 41.25,
    "defaultOriginalPrice": 48.67,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 36,
    "image": "/images/products/dry-fruits/dryfruit-figs-1.jpg",
    "images": [
      "/images/products/dry-fruits/dryfruit-figs-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 41.25,
        "originalPrice": 48.67,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 49.5,
        "originalPrice": 58.41,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 90.75,
        "originalPrice": 107.08,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 165.0,
        "originalPrice": 194.7,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Dried cranberries for baking, cereal and trail mixes. Confirm added sugar/oil.",
    "origin": "California, USA",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Dried cranberries for baking, cereal and trail mixes. Confirm added sugar/oil.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "dry-fruits-premium-dried-blueberries",
    "name": "Premium Dried Blueberries",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 40.0,
    "defaultOriginalPrice": 47.2,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 43,
    "image": "/images/products/dry-fruits/dryfruit-figs-1.jpg",
    "images": [
      "/images/products/dry-fruits/dryfruit-figs-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 40.0,
        "originalPrice": 47.2,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 48.0,
        "originalPrice": 56.64,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 88.0,
        "originalPrice": 103.84,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 160.0,
        "originalPrice": 188.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Dried blueberries for snacks and baking. Confirm added ingredients.",
    "origin": "Kashmir Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Dried blueberries for snacks and baking. Confirm added ingredients.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "dry-fruits-premium-dried-kiwi",
    "name": "Premium Dried Kiwi",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 32.5,
    "defaultOriginalPrice": 38.35,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 50,
    "image": "/images/products/dry-fruits/dryfruit-figs-1.jpg",
    "images": [
      "/images/products/dry-fruits/dryfruit-figs-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 32.5,
        "originalPrice": 38.35,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 39.0,
        "originalPrice": 46.02,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 71.5,
        "originalPrice": 84.37,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Dried kiwi slices for snacks and fruit mixes. Verify added sugar.",
    "origin": "Afghani Highlands",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Dried kiwi slices for snacks and fruit mixes. Verify added sugar.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "dry-fruits-premium-prunes",
    "name": "Premium Prunes",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 31.25,
    "defaultOriginalPrice": 36.88,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 57,
    "image": "/images/products/dry-fruits/dryfruit-figs-1.jpg",
    "images": [
      "/images/products/dry-fruits/dryfruit-figs-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 31.25,
        "originalPrice": 36.88,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 37.5,
        "originalPrice": 44.25,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 68.75,
        "originalPrice": 81.12,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Dried plums for snacking and cooking. Confirm pitted status.",
    "origin": "Herat Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Dried plums for snacking and cooking. Confirm pitted status.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "dry-fruits-premium-hazelnuts",
    "name": "Premium Hazelnuts",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 33.75,
    "defaultOriginalPrice": 39.82,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 64,
    "image": "/images/products/dryfruit-walnut-1.jpg",
    "images": [
      "/images/products/dryfruit-walnut-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 33.75,
        "originalPrice": 39.82,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 40.5,
        "originalPrice": 47.79,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 74.25,
        "originalPrice": 87.61,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 135.0,
        "originalPrice": 159.3,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Hazelnuts for baking, snacks and confectionery. Check allergen labelling.",
    "origin": "California, USA",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Hazelnuts for baking, snacks and confectionery. Check allergen labelling.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "dry-fruits-premium-pecans",
    "name": "Premium Pecans",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 35.0,
    "defaultOriginalPrice": 41.3,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 71,
    "image": "/images/products/dryfruit-walnut-1.jpg",
    "images": [
      "/images/products/dryfruit-walnut-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 35.0,
        "originalPrice": 41.3,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 42.0,
        "originalPrice": 49.56,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 77.0,
        "originalPrice": 90.86,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 140.0,
        "originalPrice": 165.2,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Pecans for desserts and baking. Verify origin and grade.",
    "origin": "Kashmir Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Pecans for desserts and baking. Verify origin and grade.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "dry-fruits-premium-macadamia-nuts",
    "name": "Premium Macadamia Nuts",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 30.0,
    "defaultOriginalPrice": 35.4,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 78,
    "image": "/images/products/dryfruit-walnut-1.jpg",
    "images": [
      "/images/products/dryfruit-walnut-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 30.0,
        "originalPrice": 35.4,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Macadamia nuts for snacks and baking. Confirm grade and origin.",
    "origin": "Afghani Highlands",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Macadamia nuts for snacks and baking. Confirm grade and origin.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "dry-fruits-premium-brazil-nuts",
    "name": "Premium Brazil Nuts",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 22.5,
    "defaultOriginalPrice": 26.55,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 85,
    "image": "/images/products/dryfruit-walnut-1.jpg",
    "images": [
      "/images/products/dryfruit-walnut-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 22.5,
        "originalPrice": 26.55,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 27.0,
        "originalPrice": 31.86,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 49.5,
        "originalPrice": 58.41,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 90.0,
        "originalPrice": 106.2,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Brazil nuts for snacks and nut mixes. Check allergen and pack information.",
    "origin": "Herat Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Brazil nuts for snacks and nut mixes. Check allergen and pack information.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "dry-fruits-premium-mixed-dry-fruits",
    "name": "Premium Mixed Dry Fruits",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 45.0,
    "defaultOriginalPrice": 53.1,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 27,
    "image": "/images/products/dryfruit-almond-2.jpg",
    "images": [
      "/images/products/dryfruit-almond-2.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 45.0,
        "originalPrice": 53.1,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 54.0,
        "originalPrice": 63.72,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 99.0,
        "originalPrice": 116.82,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 180.0,
        "originalPrice": 212.4,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Mixed dry-fruit assortment. Confirm exact contents and proportions.",
    "origin": "California, USA",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Mixed dry-fruit assortment. Confirm exact contents and proportions.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "dry-fruits-premium-mixed-nuts",
    "name": "Premium Mixed Nuts",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 18.75,
    "defaultOriginalPrice": 22.12,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 34,
    "image": "/images/products/dryfruit-almond-2.jpg",
    "images": [
      "/images/products/dryfruit-almond-2.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 18.75,
        "originalPrice": 22.12,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 22.5,
        "originalPrice": 26.55,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 41.25,
        "originalPrice": 48.67,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 75.0,
        "originalPrice": 88.5,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Nut assortment for snacking and cooking. Confirm blend and allergen statement.",
    "origin": "Kashmir Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Nut assortment for snacking and cooking. Confirm blend and allergen statement.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "dry-fruits-premium-dry-fruit-powder",
    "name": "Premium Dry Fruit Powder",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 27.5,
    "defaultOriginalPrice": 32.45,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 41,
    "image": "/images/products/dryfruit-almond-2.jpg",
    "images": [
      "/images/products/dryfruit-almond-2.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 27.5,
        "originalPrice": 32.45,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 33.0,
        "originalPrice": 38.94,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 60.5,
        "originalPrice": 71.39,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Ground dry-fruit blend for desserts and beverages. Confirm exact ingredients.",
    "origin": "Afghani Highlands",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Ground dry-fruit blend for desserts and beverages. Confirm exact ingredients.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "dry-fruits-premium-dry-fruit-gift-box",
    "name": "Premium Dry Fruit Gift Box",
    "category": "Dry Fruits",
    "subtitle": "Grade-A Jumbo Handpicked \u2022 Nitrogen Sealed Crunch",
    "defaultPrice": 30.0,
    "defaultOriginalPrice": 35.4,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 48,
    "image": "/images/products/dryfruit-almond-2.jpg",
    "images": [
      "/images/products/dryfruit-almond-2.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
      "/images/products/dry-fruits/dryfruit-dates-1.jpg",
      "/images/categories/dry-fruits.jpg"
    ],
    "options": [
      {
        "label": "200 gm",
        "price": 30.0,
        "originalPrice": 35.4,
        "discount": "15% Off"
      },
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Gift assortment of dry fruits. Confirm product mix, net weight and packaging.",
    "origin": "Herat Valley",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by fruit or nut and processing. Check allergen labelling and avoid unsupported health claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Gift assortment of dry fruits. Confirm product mix, net weight and packaging.",
    "additionalInfo": "Category: DRY FRUITS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "seeds-premium-chia-seeds",
    "name": "Premium Chia Seeds",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 102.0,
    "defaultOriginalPrice": 120.36,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 55,
    "image": "/images/products/seed-chia-1.jpg",
    "images": [
      "/images/products/seed-chia-1.jpg",
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 102.0,
        "originalPrice": 120.36,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 187.0,
        "originalPrice": 220.66,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 340.0,
        "originalPrice": 401.2,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 646.0,
        "originalPrice": 762.28,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Chia seeds for smoothies, porridge, baking and soaked preparations. Verify pack label.",
    "origin": "Kurnool, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Chia seeds for smoothies, porridge, baking and soaked preparations. Verify pack label.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "seeds-premium-flax-seeds-alsi",
    "name": "Premium Flax Seeds / Alsi",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 33.0,
    "defaultOriginalPrice": 38.94,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 62,
    "image": "/images/products/seed-chia-1.jpg",
    "images": [
      "/images/products/seed-chia-1.jpg",
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 33.0,
        "originalPrice": 38.94,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 60.5,
        "originalPrice": 71.39,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Flax seeds for cereals, baking and recipe blends.",
    "origin": "Surendranagar, Gujarat",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Flax seeds for cereals, baking and recipe blends.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "seeds-premium-pumpkin-seeds",
    "name": "Premium Pumpkin Seeds",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 30.0,
    "defaultOriginalPrice": 35.4,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 69,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 30.0,
        "originalPrice": 35.4,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 55.0,
        "originalPrice": 64.9,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 100.0,
        "originalPrice": 118.0,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 190.0,
        "originalPrice": 224.2,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Pumpkin seeds for snacking, salads and baking. Confirm raw/roasted status.",
    "origin": "Khargone, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Pumpkin seeds for snacking, salads and baking. Confirm raw/roasted status.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "seeds-premium-sunflower-seeds",
    "name": "Premium Sunflower Seeds",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 54.0,
    "defaultOriginalPrice": 63.72,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 76,
    "image": "/images/products/seeds/seed-sunflower-1.jpg",
    "images": [
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seeds/seed-sesame-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 54.0,
        "originalPrice": 63.72,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 99.0,
        "originalPrice": 116.82,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 180.0,
        "originalPrice": 212.4,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 342.0,
        "originalPrice": 403.56,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Sunflower seeds for snacks, salads, baking and mixes.",
    "origin": "Solapur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Sunflower seeds for snacks, salads, baking and mixes.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "seeds-premium-sesame-seeds-til",
    "name": "Premium Sesame Seeds / Til",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 33.0,
    "defaultOriginalPrice": 38.94,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 83,
    "image": "/images/products/seeds/seed-sesame-1.jpg",
    "images": [
      "/images/products/seeds/seed-sesame-1.jpg",
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 33.0,
        "originalPrice": 38.94,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 60.5,
        "originalPrice": 71.39,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Sesame seeds for sweets, seasoning and cooking; ensure allergen labelling.",
    "origin": "Kurnool, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Sesame seeds for sweets, seasoning and cooking; ensure allergen labelling.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "seeds-premium-watermelon-seeds-magaz",
    "name": "Premium Watermelon Seeds / Magaz",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 28.5,
    "defaultOriginalPrice": 33.63,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 25,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 28.5,
        "originalPrice": 33.63,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 52.25,
        "originalPrice": 61.65,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 180.5,
        "originalPrice": 212.99,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Watermelon seeds for snacks, sweets and traditional mixes.",
    "origin": "Surendranagar, Gujarat",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Watermelon seeds for snacks, sweets and traditional mixes.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "seeds-premium-mustard-seeds",
    "name": "Premium Mustard Seeds",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 28.5,
    "defaultOriginalPrice": 33.63,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 32,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 28.5,
        "originalPrice": 33.63,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 52.25,
        "originalPrice": 61.65,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 180.5,
        "originalPrice": 212.99,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Mustard seeds for cooking, tempering and pickling.",
    "origin": "Khargone, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Mustard seeds for cooking, tempering and pickling.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "seeds-premium-basil-seeds-sabja",
    "name": "Premium Basil Seeds / Sabja",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 26.4,
    "defaultOriginalPrice": 31.15,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 39,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 26.4,
        "originalPrice": 31.15,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 48.4,
        "originalPrice": 57.11,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 88.0,
        "originalPrice": 103.84,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 167.2,
        "originalPrice": 197.3,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Basil seeds for soaked beverages and dessert preparations.",
    "origin": "Solapur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Basil seeds for soaked beverages and dessert preparations.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "seeds-premium-hemp-seeds",
    "name": "Premium Hemp Seeds",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 39.0,
    "defaultOriginalPrice": 46.02,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 46,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 39.0,
        "originalPrice": 46.02,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 71.5,
        "originalPrice": 84.37,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 247.0,
        "originalPrice": 291.46,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Hemp seeds for food use. Confirm local regulatory status and labelling.",
    "origin": "Kurnool, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Hemp seeds for food use. Confirm local regulatory status and labelling.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "seeds-premium-poppy-seeds-khus-khus",
    "name": "Premium Poppy Seeds / Khus Khus",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 53,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Poppy seeds for cooking and sweets. Confirm local requirements and product grade.",
    "origin": "Surendranagar, Gujarat",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Poppy seeds for cooking and sweets. Confirm local requirements and product grade.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "seeds-premium-cucumber-seeds",
    "name": "Premium Cucumber Seeds",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 37.5,
    "defaultOriginalPrice": 44.25,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 60,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 37.5,
        "originalPrice": 44.25,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 68.75,
        "originalPrice": 81.12,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 237.5,
        "originalPrice": 280.25,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Cucumber seeds for food preparations and seed mixes. Verify intended use.",
    "origin": "Khargone, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Cucumber seeds for food preparations and seed mixes. Verify intended use.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "seeds-premium-muskmelon-seeds",
    "name": "Premium Muskmelon Seeds",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 34.5,
    "defaultOriginalPrice": 40.71,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 67,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 34.5,
        "originalPrice": 40.71,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 63.25,
        "originalPrice": 74.63,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 115.0,
        "originalPrice": 135.7,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 218.5,
        "originalPrice": 257.83,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Muskmelon seeds for snacks and traditional mixes.",
    "origin": "Solapur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Muskmelon seeds for snacks and traditional mixes.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "seeds-premium-garden-cress-seeds-halim",
    "name": "Premium Garden Cress Seeds / Halim",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 49.5,
    "defaultOriginalPrice": 58.41,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 74,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 49.5,
        "originalPrice": 58.41,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 90.75,
        "originalPrice": 107.08,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 165.0,
        "originalPrice": 194.7,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 313.5,
        "originalPrice": 369.93,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Garden cress seeds for traditional recipes. Confirm food use and label guidance.",
    "origin": "Kurnool, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Garden cress seeds for traditional recipes. Confirm food use and label guidance.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "seeds-premium-quinoa-seeds",
    "name": "Premium Quinoa Seeds",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 48.0,
    "defaultOriginalPrice": 56.64,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 81,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 48.0,
        "originalPrice": 56.64,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 88.0,
        "originalPrice": 103.84,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 160.0,
        "originalPrice": 188.8,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 304.0,
        "originalPrice": 358.72,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Quinoa for grain-style dishes, salads and bowls. Confirm origin and grade.",
    "origin": "Surendranagar, Gujarat",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Quinoa for grain-style dishes, salads and bowls. Confirm origin and grade.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "seeds-premium-amaranth-seeds-rajgira",
    "name": "Premium Amaranth Seeds / Rajgira",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 39.0,
    "defaultOriginalPrice": 46.02,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 23,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 39.0,
        "originalPrice": 46.02,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 71.5,
        "originalPrice": 84.37,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 247.0,
        "originalPrice": 291.46,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Amaranth seeds for porridge, flour and traditional recipes.",
    "origin": "Khargone, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Amaranth seeds for porridge, flour and traditional recipes.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "seeds-premium-nigella-seeds-kalonji",
    "name": "Premium Nigella Seeds / Kalonji",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 37.5,
    "defaultOriginalPrice": 44.25,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 30,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 37.5,
        "originalPrice": 44.25,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 68.75,
        "originalPrice": 81.12,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 237.5,
        "originalPrice": 280.25,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Nigella seeds for seasoning and pickles.",
    "origin": "Solapur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Nigella seeds for seasoning and pickles.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "seeds-premium-fennel-seeds-saunf",
    "name": "Premium Fennel Seeds / Saunf",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 40.5,
    "defaultOriginalPrice": 47.79,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 37,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 40.5,
        "originalPrice": 47.79,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 74.25,
        "originalPrice": 87.61,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 135.0,
        "originalPrice": 159.3,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 256.5,
        "originalPrice": 302.67,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Fennel seeds for cooking and spice blends.",
    "origin": "Kurnool, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Fennel seeds for cooking and spice blends.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "seeds-premium-fenugreek-seeds-methi",
    "name": "Premium Fenugreek Seeds / Methi",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 42.0,
    "defaultOriginalPrice": 49.56,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 44,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 42.0,
        "originalPrice": 49.56,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 77.0,
        "originalPrice": 90.86,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 140.0,
        "originalPrice": 165.2,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 266.0,
        "originalPrice": 313.88,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Fenugreek seeds for seasoning and sprouting where appropriate.",
    "origin": "Surendranagar, Gujarat",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Fenugreek seeds for seasoning and sprouting where appropriate.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "seeds-premium-coriander-seeds",
    "name": "Premium Coriander Seeds",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 51,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Whole coriander seeds for spice blends and grinding.",
    "origin": "Khargone, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Whole coriander seeds for spice blends and grinding.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "seeds-premium-cumin-seeds-jeera",
    "name": "Premium Cumin Seeds / Jeera",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 27.0,
    "defaultOriginalPrice": 31.86,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 58,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 27.0,
        "originalPrice": 31.86,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 49.5,
        "originalPrice": 58.41,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 90.0,
        "originalPrice": 106.2,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 171.0,
        "originalPrice": 201.78,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Whole cumin seeds for cooking and spice blends.",
    "origin": "Solapur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Whole cumin seeds for cooking and spice blends.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "seeds-premium-carom-seeds-ajwain",
    "name": "Premium Carom Seeds / Ajwain",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 54.0,
    "defaultOriginalPrice": 63.72,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 65,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 54.0,
        "originalPrice": 63.72,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 99.0,
        "originalPrice": 116.82,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 180.0,
        "originalPrice": 212.4,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 342.0,
        "originalPrice": 403.56,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Carom seeds for seasoning and traditional recipes.",
    "origin": "Kurnool, Andhra Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Carom seeds for seasoning and traditional recipes.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "seeds-premium-dill-seeds",
    "name": "Premium Dill Seeds",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 22.5,
    "defaultOriginalPrice": 26.55,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 72,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 22.5,
        "originalPrice": 26.55,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 41.25,
        "originalPrice": 48.67,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 75.0,
        "originalPrice": 88.5,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 142.5,
        "originalPrice": 168.15,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Dill seeds for pickling and seasoning.",
    "origin": "Surendranagar, Gujarat",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Dill seeds for pickling and seasoning.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "seeds-premium-celery-seeds",
    "name": "Premium Celery Seeds",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 33.0,
    "defaultOriginalPrice": 38.94,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 79,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 33.0,
        "originalPrice": 38.94,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 60.5,
        "originalPrice": 71.39,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Celery seeds for seasoning and spice blends.",
    "origin": "Khargone, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Celery seeds for seasoning and spice blends.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "seeds-premium-mixed-seed-blend",
    "name": "Premium Mixed Seed Blend",
    "category": "Seeds",
    "subtitle": "Raw Nutrient-Dense Superfood \u2022 High Dietary Fiber",
    "defaultPrice": 36.0,
    "defaultOriginalPrice": 42.48,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 86,
    "image": "/images/products/seed-pumpkin-1.jpg",
    "images": [
      "/images/products/seed-pumpkin-1.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seeds/seed-sunflower-1.jpg",
      "/images/categories/seeds.jpg"
    ],
    "options": [
      {
        "label": "250 gm",
        "price": 36.0,
        "originalPrice": 42.48,
        "discount": "15% Off"
      },
      {
        "label": "500 gm",
        "price": 66.0,
        "originalPrice": 77.88,
        "discount": "15% Off"
      },
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "A blend of edible seeds for toppings and recipe use. Confirm exact seed composition and allergen details.",
    "origin": "Solapur, Maharashtra",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Nutritional content varies by seed and processing. Use only verified nutrition information and avoid medical claims.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "A blend of edible seeds for toppings and recipe use. Confirm exact seed composition and allergen details.",
    "additionalInfo": "Category: SEEDS | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "rice-wheat-premium-brown-sona-masoori-rice",
    "name": "Premium Brown Sona Masoori Rice",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 110.0,
    "defaultOriginalPrice": 129.8,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 28,
    "image": "/images/products/rice-brown-1.jpg",
    "images": [
      "/images/products/rice-brown-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 495.0,
        "originalPrice": 584.1,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Medium-grain brown rice for steamed rice, bowls and pulao. Confirm milling details.",
    "origin": "Karnal, Haryana",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Medium-grain brown rice for steamed rice, bowls and pulao. Confirm milling details.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "rice-wheat-premium-white-sona-masoori-rice",
    "name": "Premium White Sona Masoori Rice",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 110.0,
    "defaultOriginalPrice": 129.8,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 35,
    "image": "/images/products/rice-gobindo-1.jpg",
    "images": [
      "/images/products/rice-gobindo-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 495.0,
        "originalPrice": 584.1,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Everyday rice for steamed rice, lemon rice and pulao. Confirm grain grade.",
    "origin": "Raichur, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Everyday rice for steamed rice, lemon rice and pulao. Confirm grain grade.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "rice-wheat-premium-brown-basmati-rice",
    "name": "Premium Brown Basmati Rice",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 100.0,
    "defaultOriginalPrice": 118.0,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 42,
    "image": "/images/products/rice-basmati-1.jpg",
    "images": [
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-brown-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 100.0,
        "originalPrice": 118.0,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 190.0,
        "originalPrice": 224.2,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 450.0,
        "originalPrice": 531.0,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 100.0,
        "originalPrice": 118.0,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Long-grain brown rice for pilaf and side dishes. Confirm aroma and origin.",
    "origin": "Burdwan, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Long-grain brown rice for pilaf and side dishes. Confirm aroma and origin.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "rice-wheat-premium-white-gobindobhog-rice-wes",
    "name": "Premium White Gobindobhog Rice (West Bengal)",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 110.0,
    "defaultOriginalPrice": 129.8,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 49,
    "image": "/images/products/rice-gobindo-1.jpg",
    "images": [
      "/images/products/rice-gobindo-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 495.0,
        "originalPrice": 584.1,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Short-grain aromatic rice associated with West Bengal, suited to Bengali meals, khichuri and payesh. Confirm origin and grade.",
    "origin": "Sehore, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Short-grain aromatic rice associated with West Bengal, suited to Bengali meals, khichuri and payesh. Confirm origin and grade.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "rice-wheat-premium-white-basmati-rice",
    "name": "Premium White Basmati Rice",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 140.0,
    "defaultOriginalPrice": 165.2,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 56,
    "image": "/images/products/rice-basmati-1.jpg",
    "images": [
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-brown-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 140.0,
        "originalPrice": 165.2,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 266.0,
        "originalPrice": 313.88,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 630.0,
        "originalPrice": 743.4,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 140.0,
        "originalPrice": 165.2,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Long-grain rice for biryani, pulao and steamed rice. Confirm grain length and ageing.",
    "origin": "Karnal, Haryana",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Long-grain rice for biryani, pulao and steamed rice. Confirm grain length and ageing.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "rice-wheat-premium-wheat-maida",
    "name": "Premium Wheat Maida",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 95.0,
    "defaultOriginalPrice": 112.1,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 63,
    "image": "/images/products/rice-wheat/wheat-flour-1.jpg",
    "images": [
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-grain-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 180.5,
        "originalPrice": 212.99,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 427.5,
        "originalPrice": 504.45,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Refined wheat flour for baking, breads, biscuits and noodles. Contains wheat/gluten.",
    "origin": "Raichur, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Refined wheat flour for baking, breads, biscuits and noodles. Contains wheat/gluten.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "rice-wheat-premium-buckwheat-flour",
    "name": "Premium Buckwheat Flour",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 95.0,
    "defaultOriginalPrice": 112.1,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 70,
    "image": "/images/products/rice-wheat/wheat-flour-1.jpg",
    "images": [
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-grain-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 180.5,
        "originalPrice": 212.99,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 427.5,
        "originalPrice": 504.45,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 95.0,
        "originalPrice": 112.1,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Buckwheat flour for pancakes, flatbreads and baking blends. Confirm cross-contact information.",
    "origin": "Burdwan, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Buckwheat flour for pancakes, flatbreads and baking blends. Confirm cross-contact information.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "rice-wheat-premium-jowar-atta-sorghum-flour",
    "name": "Premium Jowar Atta / Sorghum Flour",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 88.0,
    "defaultOriginalPrice": 103.84,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 77,
    "image": "/images/products/rice-wheat/wheat-flour-1.jpg",
    "images": [
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-grain-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 88.0,
        "originalPrice": 103.84,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 167.2,
        "originalPrice": 197.3,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 396.0,
        "originalPrice": 467.28,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 88.0,
        "originalPrice": 103.84,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Sorghum flour for rotis, bhakri, porridge and blended baking.",
    "origin": "Sehore, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Sorghum flour for rotis, bhakri, porridge and blended baking.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "rice-wheat-premium-makka-atta-maize-flour",
    "name": "Premium Makka Atta / Maize Flour",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 130.0,
    "defaultOriginalPrice": 153.4,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 84,
    "image": "/images/products/rice-wheat/wheat-flour-1.jpg",
    "images": [
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-grain-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 247.0,
        "originalPrice": 291.46,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 585.0,
        "originalPrice": 690.3,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Maize flour for flatbreads, porridge, batters and cooking.",
    "origin": "Karnal, Haryana",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Maize flour for flatbreads, porridge, batters and cooking.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "rice-wheat-premium-whole-jowar-sorghum-grain",
    "name": "Premium Whole Jowar / Sorghum Grain",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 120.0,
    "defaultOriginalPrice": 141.6,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 26,
    "image": "/images/products/rice-wheat/wheat-grain-1.jpg",
    "images": [
      "/images/products/rice-wheat/wheat-grain-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 540.0,
        "originalPrice": 637.2,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Whole sorghum for grain dishes and milling. Confirm grade.",
    "origin": "Raichur, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Whole sorghum for grain dishes and milling. Confirm grade.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "rice-wheat-premium-barley-grain",
    "name": "Premium Barley Grain",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 125.0,
    "defaultOriginalPrice": 147.5,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 33,
    "image": "/images/products/rice-wheat/wheat-grain-1.jpg",
    "images": [
      "/images/products/rice-wheat/wheat-grain-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 237.5,
        "originalPrice": 280.25,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 562.5,
        "originalPrice": 663.75,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Barley for soups, stews and grain bowls. Contains gluten.",
    "origin": "Burdwan, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Barley for soups, stews and grain bowls. Contains gluten.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "rice-wheat-premium-whole-maize-makka-deshi",
    "name": "Premium Whole Maize / Makka (Deshi)",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 115.0,
    "defaultOriginalPrice": 135.7,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 40,
    "image": "/images/products/rice-wheat/wheat-grain-1.jpg",
    "images": [
      "/images/products/rice-wheat/wheat-grain-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 115.0,
        "originalPrice": 135.7,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 218.5,
        "originalPrice": 257.83,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 517.5,
        "originalPrice": 610.65,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 115.0,
        "originalPrice": 135.7,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Whole maize kernels for traditional preparations and milling.",
    "origin": "Sehore, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Whole maize kernels for traditional preparations and milling.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "rice-wheat-premium-dehulled-buckwheat-buckwh",
    "name": "Premium Dehulled Buckwheat / Buckwheat Grits",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 165.0,
    "defaultOriginalPrice": 194.7,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 47,
    "image": "/images/products/rice-wheat/wheat-grain-1.jpg",
    "images": [
      "/images/products/rice-wheat/wheat-grain-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 165.0,
        "originalPrice": 194.7,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 313.5,
        "originalPrice": 369.93,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 742.5,
        "originalPrice": 876.15,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 165.0,
        "originalPrice": 194.7,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Buckwheat groats for porridge, grain bowls and side dishes.",
    "origin": "Karnal, Haryana",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Buckwheat groats for porridge, grain bowls and side dishes.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "rice-wheat-premium-whole-wheat-gehu",
    "name": "Premium Whole Wheat / Gehu",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 160.0,
    "defaultOriginalPrice": 188.8,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 54,
    "image": "/images/products/rice-wheat/wheat-grain-1.jpg",
    "images": [
      "/images/products/rice-wheat/wheat-grain-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 160.0,
        "originalPrice": 188.8,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 304.0,
        "originalPrice": 358.72,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 720.0,
        "originalPrice": 849.6,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 160.0,
        "originalPrice": 188.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Whole wheat grain for flour milling and selected preparations. Confirm variety and cleaning grade.",
    "origin": "Raichur, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Whole wheat grain for flour milling and selected preparations. Confirm variety and cleaning grade.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "rice-wheat-premium-wheat-atta",
    "name": "Premium Wheat Atta",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 130.0,
    "defaultOriginalPrice": 153.4,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 61,
    "image": "/images/products/rice-wheat/wheat-flour-1.jpg",
    "images": [
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-grain-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 247.0,
        "originalPrice": 291.46,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 585.0,
        "originalPrice": 690.3,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 130.0,
        "originalPrice": 153.4,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Wheat flour for chapati, roti and everyday cooking. Confirm milling and fortification details.",
    "origin": "Burdwan, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Wheat flour for chapati, roti and everyday cooking. Confirm milling and fortification details.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "rice-wheat-premium-multigrain-atta",
    "name": "Premium Multigrain Atta",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 125.0,
    "defaultOriginalPrice": 147.5,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 68,
    "image": "/images/products/rice-wheat/wheat-flour-1.jpg",
    "images": [
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-grain-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 237.5,
        "originalPrice": 280.25,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 562.5,
        "originalPrice": 663.75,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 125.0,
        "originalPrice": 147.5,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Flour blend for rotis and baking. Confirm exact grain composition.",
    "origin": "Sehore, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Flour blend for rotis and baking. Confirm exact grain composition.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "rice-wheat-premium-chakki-fresh-atta",
    "name": "Premium Chakki Fresh Atta",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 135.0,
    "defaultOriginalPrice": 159.3,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 75,
    "image": "/images/products/rice-wheat/wheat-flour-1.jpg",
    "images": [
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-grain-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 135.0,
        "originalPrice": 159.3,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 256.5,
        "originalPrice": 302.67,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 607.5,
        "originalPrice": 716.85,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 135.0,
        "originalPrice": 159.3,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Stone-milled-style wheat flour for rotis and parathas. Confirm milling method claim.",
    "origin": "Karnal, Haryana",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Stone-milled-style wheat flour for rotis and parathas. Confirm milling method claim.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "rice-wheat-premium-broken-rice",
    "name": "Premium Broken Rice",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 140.0,
    "defaultOriginalPrice": 165.2,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 82,
    "image": "/images/products/rice-wheat/wheat-grain-1.jpg",
    "images": [
      "/images/products/rice-wheat/wheat-grain-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 140.0,
        "originalPrice": 165.2,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 266.0,
        "originalPrice": 313.88,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 630.0,
        "originalPrice": 743.4,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 140.0,
        "originalPrice": 165.2,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Broken rice for porridge, khichdi and other cooked dishes. Confirm broken percentage.",
    "origin": "Raichur, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Broken rice for porridge, khichdi and other cooked dishes. Confirm broken percentage.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "rice-wheat-premium-poha-flattened-rice",
    "name": "Premium Poha / Flattened Rice",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 120.0,
    "defaultOriginalPrice": 141.6,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 24,
    "image": "/images/products/rice-sella-1.jpg",
    "images": [
      "/images/products/rice-sella-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 540.0,
        "originalPrice": 637.2,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Flattened rice for poha and snack recipes. Confirm thickness and grain type.",
    "origin": "Burdwan, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Flattened rice for poha and snack recipes. Confirm thickness and grain type.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "rice-wheat-premium-idli-rice",
    "name": "Premium Idli Rice",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 90.0,
    "defaultOriginalPrice": 106.2,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 31,
    "image": "/images/products/rice-sella-1.jpg",
    "images": [
      "/images/products/rice-sella-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 90.0,
        "originalPrice": 106.2,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 171.0,
        "originalPrice": 201.78,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 405.0,
        "originalPrice": 477.9,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 90.0,
        "originalPrice": 106.2,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Rice variety used for idli batter and other South Indian preparations. Confirm grain grade.",
    "origin": "Sehore, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Rice variety used for idli batter and other South Indian preparations. Confirm grain grade.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "rice-wheat-premium-kolam-rice",
    "name": "Premium Kolam Rice",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 180.0,
    "defaultOriginalPrice": 212.4,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 38,
    "image": "/images/products/rice-gobindo-1.jpg",
    "images": [
      "/images/products/rice-gobindo-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 180.0,
        "originalPrice": 212.4,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 342.0,
        "originalPrice": 403.56,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 810.0,
        "originalPrice": 955.8,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 180.0,
        "originalPrice": 212.4,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Rice for everyday meals. Confirm variety, grain length and origin.",
    "origin": "Karnal, Haryana",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Rice for everyday meals. Confirm variety, grain length and origin.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  },
  {
    "id": "rice-wheat-premium-red-rice",
    "name": "Premium Red Rice",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 75.0,
    "defaultOriginalPrice": 88.5,
    "defaultDiscount": "15% Off",
    "rating": 4.7,
    "reviewsCount": 45,
    "image": "/images/products/rice-gobindo-1.jpg",
    "images": [
      "/images/products/rice-gobindo-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 75.0,
        "originalPrice": 88.5,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 142.5,
        "originalPrice": 168.15,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 337.5,
        "originalPrice": 398.25,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 75.0,
        "originalPrice": 88.5,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Red rice for cooked grain dishes and regional recipes. Confirm variety and milling.",
    "origin": "Raichur, Karnataka",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Red rice for cooked grain dishes and regional recipes. Confirm variety and milling.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Certified Organic"
  },
  {
    "id": "rice-wheat-premium-black-rice",
    "name": "Premium Black Rice",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 110.0,
    "defaultOriginalPrice": 129.8,
    "defaultDiscount": "15% Off",
    "rating": 4.8,
    "reviewsCount": 52,
    "image": "/images/products/rice-gobindo-1.jpg",
    "images": [
      "/images/products/rice-gobindo-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 209.0,
        "originalPrice": 246.62,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 495.0,
        "originalPrice": 584.1,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 110.0,
        "originalPrice": 129.8,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Dark-coloured rice for grain bowls and desserts. Confirm variety and origin.",
    "origin": "Burdwan, West Bengal",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Dark-coloured rice for grain bowls and desserts. Confirm variety and origin.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Best Seller"
  },
  {
    "id": "rice-wheat-premium-wheat-dalia-broken-wheat",
    "name": "Premium Wheat Dalia / Broken Wheat",
    "category": "Rice & Wheat",
    "subtitle": "Farm-Fresh Himalayan Harvest \u2022 Sortex Optical Cleaned",
    "defaultPrice": 120.0,
    "defaultOriginalPrice": 141.6,
    "defaultDiscount": "15% Off",
    "rating": 4.9,
    "reviewsCount": 59,
    "image": "/images/products/rice-wheat/wheat-flour-1.jpg",
    "images": [
      "/images/products/rice-wheat/wheat-flour-1.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-wheat/wheat-grain-1.jpg",
      "/images/categories/rice-wheat.jpg"
    ],
    "options": [
      {
        "label": "1 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      },
      {
        "label": "2 kg",
        "price": 228.0,
        "originalPrice": 269.04,
        "discount": "15% Off"
      },
      {
        "label": "5 kg",
        "price": 540.0,
        "originalPrice": 637.2,
        "discount": "15% Off"
      },
      {
        "label": "10 kg",
        "price": 120.0,
        "originalPrice": 141.6,
        "discount": "15% Off"
      }
    ],
    "inStock": true,
    "description": "Cracked wheat for porridge, upma and savoury dishes. Contains wheat/gluten.",
    "origin": "Sehore, Madhya Pradesh",
    "features": [
      "100% Pure, Unadulterated & Chemical Free",
      "Triple Optical Sortex Cleaned & Graded",
      "Directly Sourced from Trusted Farmer Cooperatives",
      "Hygienically Packed to Retain Freshness & Aroma"
    ],
    "healthBenefits": "Grains and flours provide energy; nutrition varies by grain and processing. Wheat and barley contain gluten; verify allergen statements.",
    "ingredients": "Confirm final ingredient statement from supplier label. For blends, list every ingredient and any additives.",
    "storageInstructions": "Store in a cool, dry place away from direct sunlight, pests and moisture. Keep sealed after opening and follow final pack instructions.",
    "commonUses": "Cracked wheat for porridge, upma and savoury dishes. Contains wheat/gluten.",
    "additionalInfo": "Category: RICE & WHEAT | Draft content written for this workbook; not copied verbatim from Rajlakshmi Javiks. Confirm exact product, size variants, stock, price, grade, origin, ingredients, certification and legal label details with supplier.",
    "nutritionalFacts": {
      "Energy": "354 kcal",
      "Protein": "8.2 g",
      "Dietary Fiber": "4.1 g",
      "Carbohydrates": "74.5 g",
      "Fat": "1.2 g",
      "Iron": "2.1 mg"
    },
    "purityParameters": {
      "Moisture Content": "< 11.5%",
      "Foreign Matter": "Nil (Sortex Cleaned)",
      "Adulteration Test": "Negative (100% Pure)",
      "Certification": "FSSAI & NPOP Organic Standards"
    },
    "tag": "Premium Reserve"
  }
];

export const BEST_SELLERS: Product[] = [
  ALL_PRODUCTS[0],  // Arhar Dal (Pulses)
  ALL_PRODUCTS[24], // Pearl Millet (Millets)
  ALL_PRODUCTS[48], // Turmeric Powder (Spices)
  ALL_PRODUCTS[72], // Jaggery Block (Sweets)
  ALL_PRODUCTS[96], // Raw Honey (Honey)
  ALL_PRODUCTS[120], // Almonds (Dry Fruits)
  ALL_PRODUCTS[144], // Chia Seeds (Seeds)
  ALL_PRODUCTS[168], // Brown Sona Masoori (Rice & Wheat)
];

export const WHY_CHOOSE_FEATURES: WhyChooseFeature[] = [
  { id: "feat-1", title: "Naturally Sourced", description: "From trusted farm co-ops", icon: "leaf" },
  { id: "feat-2", title: "Premium Quality", description: "Carefully selected and graded", icon: "diamond" },
  { id: "feat-3", title: "Quality Tested", description: "Hygienically processed", icon: "flask" },
  { id: "feat-4", title: "Rich in Nutrition", description: "Healthy food for a better life", icon: "wheat" },
  { id: "feat-5", title: "Secure Packaging", description: "Freshness and safety", icon: "package" },
  { id: "feat-6", title: "Global Export", description: "Bulk supply and worldwide delivery", icon: "globe" },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Basmati Secret: Why Aged Long-Grain Rice is Easier to Digest & Lower GI",
    category: "Grains & Basmati",
    date: "14 Apr 2026",
    image: "/images/blog-basmati.jpg",
    images: [
      "/images/blog-basmati.jpg",
      "/images/products/rice-basmati-1.jpg",
      "/images/products/rice-basmati-2.jpg",
      "/images/products/rice-basmati-4.jpg",
    ],
    readTime: "5 min read",
    summary:
      "Learn why traditional 2-year aged Himalayan basmati rice is easier on blood sugar, packs high resistant starch, and unlocks unmatched floral aroma.",
    author: {
      name: "Dr. Ananya Sharma",
      role: "Holistic Nutritionist & Food Biochemist",
    },
    tags: ["Basmati Rice", "Low GI", "Gut Health", "Gluten-Free"],
    keyBenefits: [
      "Aged for 24+ months for retrograded resistant starch",
      "Significantly lower glycemic index (52-58) than common rice",
      "Elongates up to 2.5x without clumping or stickiness",
      "Rich in amylose for clean, sustained cellular energy",
    ],
    healthTip:
      "Soak aged basmati rice for 30 minutes in cold water before boiling. This gelatinizes the starch evenly, prevents grain breakage, and lowers postprandial glucose surges.",
    nutritionalHighlights: [
      { label: "Glycemic Index", value: "52 (Low)" },
      { label: "Resistant Starch", value: "3.2g / 100g" },
      { label: "Protein", value: "8.1g / 100g" },
      { label: "Gluten Content", value: "0% (Naturally Free)" },
    ],
    content: [
      "Not all white rice is created equal. While commercial quick-milled white rice often spikes blood sugar rapidly, authentic aged Himalayan Basmati behaves differently in the human digestive tract. Traditional rice masters store freshly harvested paddy in humidity-controlled aerated silos for 12 to 24 months before milling.",
      "During this prolonged natural aging phase, the grain undergoes biochemical transformation: moisture content drops below 10%, enzymatic amylase activity modifies the starch granules, and the ratio of amylose to amylopectin increases. Higher amylose forms 'retrograded resistant starch' upon cooling, which acts as a prebiotic fiber feeding beneficial Bifidobacteria in the large intestine rather than turning immediately into blood glucose.",
      "Furthermore, unadulterated aged basmati contains 2-acetyl-1-pyrroline—the natural compound responsible for its signature royal fragrance—without any chemical sprays. For athletes, diabetics, and conscious eaters, aged basmati offers clean carbohydrates without digestive bloating.",
    ],
  },
  {
    id: "blog-2",
    title: "The Golden Lentil: Why Unpolished Toor & Moong Dal Beat Processed Protein Powders",
    category: "Plant Protein",
    date: "10 Apr 2026",
    image: "/images/blog-pulses.jpg",
    images: [
      "/images/blog-pulses.jpg",
      "/images/products/pulse-toor-1.jpg",
      "/images/products/pulse-moong-1.jpg",
      "/images/products/pulse-chana-1.jpg",
    ],
    readTime: "6 min read",
    summary:
      "Discover the bioavailable protein, prebiotic fiber, and essential minerals locked inside unpolished pulses, completely free from harmful mineral oil polishing.",
    author: {
      name: "Vikas Deshmukh",
      role: "Agronomist & Pulse Specialist",
    },
    tags: ["Unpolished Dals", "Plant Protein", "Zero Polish", "Heart Health"],
    keyBenefits: [
      "100% natural grain seed coat preserved with aleurone layer",
      "Zero mineral oil, marble powder, or artificial colorants",
      "24g plant protein per 100g serving with complete fiber matrix",
      "Naturally dense in folate, iron, and potassium",
    ],
    healthTip:
      "Always combine unpolished lentils with whole grains like basmati or millets to achieve a complete amino acid profile (combining lysine from lentils with methionine from grains).",
    nutritionalHighlights: [
      { label: "Protein", value: "24.5g / 100g" },
      { label: "Dietary Fiber", value: "11.2g" },
      { label: "Iron RDA", value: "38%" },
      { label: "Chemical Polish", value: "0% Guarantee" },
    ],
    content: [
      "In modern supermarkets, shiny pulses glisten under bright lights. Sadly, that aesthetic luster is frequently achieved through industrial processing using leather polishing drums, liquid paraffin, or water-oil emulsions that strip away the nutrient-rich aleurone layer and bran coat.",
      "Unpolished Toor, Moong, and Chana dal retain their natural matte finish, subtle hue variations, and intact outer germ. This preservation means you consume intact insoluble and soluble fiber, which slows gastric emptying and moderates cholesterol absorption in the hepatic system.",
      "A single 100g portion of unpolished toor dal delivers over 24 grams of bioavailable protein alongside 38% of your daily iron needs. By soaking lentils with a pinch of cumin or ginger before pressure cooking, you break down oligosaccharides that cause gas, unlocking clean vitality.",
    ],
  },
  {
    id: "blog-3",
    title: "Brain & Heart Powerhouse: The Science-Backed Daily Portion of Almonds & Walnuts",
    category: "Nuts & Healthy Fats",
    date: "06 Apr 2026",
    image: "/images/blog-dryfruits.jpg",
    images: [
      "/images/blog-dryfruits.jpg",
      "/images/products/dryfruit-almond-1.jpg",
      "/images/products/dryfruit-walnut-1.jpg",
      "/images/products/dryfruit-cashew-1.jpg",
    ],
    readTime: "4 min read",
    summary:
      "From memory-boosting vitamin E to plant-based Omega-3 ALA, learn why soaking 6-8 almonds and 2 walnut halves transforms morning cognitive performance.",
    author: {
      name: "Pooja Malhotra",
      role: "Clinical Dietitian & Lifestyle Coach",
    },
    tags: ["California Almonds", "Walnuts", "Omega-3", "Brain Health"],
    keyBenefits: [
      "High in Alpha-Linolenic Acid (ALA) for cardiovascular defense",
      "Natural Vitamin E (alpha-tocopherol) shields neural cells",
      "Tannin deactivation through overnight water soaking",
      "Sustained satiety prevents afternoon sugar cravings",
    ],
    healthTip:
      "Soak raw almonds in clean water for 8 hours and gently peel the brown skin before eating. This neutralizes enzyme inhibitors (tannins and phytic acid), dramatically increasing zinc and magnesium absorption.",
    nutritionalHighlights: [
      { label: "Vitamin E", value: "48% Daily Value" },
      { label: "Omega-3 ALA", value: "2.5g / serving" },
      { label: "Magnesium", value: "76mg" },
      { label: "Antioxidants", value: "High ORAC" },
    ],
    content: [
      "Walnuts are nature's visual clue: their convoluted shape mirrors the human cerebral cortex. Clinical research confirms that regular consumption of raw walnuts and whole almonds protects endothelial function and stimulates brain-derived neurotrophic factor (BDNF).",
      "Walnuts are uniquely endowed with plant-based Omega-3 fatty acid (alpha-linolenic acid / ALA), while almonds boast one of the densest plant concentrations of d-alpha-tocopherol (natural Vitamin E). This synergistic lipid profile combats oxidative stress caused by blue light exposure and urban pollution.",
      "To unlock their full potency, avoid fried or salted commercial varieties. Opt for raw, jumbo-graded, unpasteurized nuts stored in moisture-barrier packaging to prevent delicate polyunsaturated fatty acids from turning rancid.",
    ],
  },
  {
    id: "blog-4",
    title: "The Ancient Millet Revolution: Healing Your Gut with Ragi, Jowar & Foxtail Millets",
    category: "Millets & Digestion",
    date: "02 Apr 2026",
    image: "/images/blog-millets.jpg",
    images: [
      "/images/blog-millets.jpg",
      "/images/products/millet-foxtail-1.jpg",
      "/images/products/millet-bajra-1.jpg",
      "/images/categories/millets.jpg",
    ],
    readTime: "5 min read",
    summary:
      "Why the United Nations declared the Year of Millets: Rediscover naturally gluten-free ancient grains that restore gut microbiome diversity and regulate insulin.",
    author: {
      name: "Dr. Raghuveer Reddy",
      role: "Traditional Grain Researcher",
    },
    tags: ["Millets", "Gluten-Free", "Calcium Rich", "Low Carb Grains"],
    keyBenefits: [
      "Ragi (Finger Millet) contains 344mg calcium per 100g—higher than cow milk",
      "Naturally gluten-free grain structure suitable for celiac digestion",
      "Low glycemic index prevents rapid insulin spikes",
      "Drought-resilient supercrop with zero heavy pesticide residue",
    ],
    healthTip:
      "Fermenting millet batter (like Ragi or Foxtail dosa) overnight fosters lactic acid bacteria that pre-digest complex starches, doubling bioavailability of micronutrients like zinc and iron.",
    nutritionalHighlights: [
      { label: "Calcium (Ragi)", value: "344mg / 100g" },
      { label: "Fiber Content", value: "12.5g" },
      { label: "Gluten Content", value: "0.0%" },
      { label: "Mineral Density", value: "3x vs Wheat" },
    ],
    content: [
      "Thousands of years before hybridized dwarf wheat dominated modern farming, ancient civilizations across the Deccan plateau and Indo-Gangetic plains thrived on hardy, golden-hued millets: Ragi (Finger Millet), Jowar (Sorghum), Bajra (Pearl Millet), and Kangni (Foxtail Millet).",
      "Millets possess an exceptional dietary fiber architecture comprising both lignans and beta-glucans. These complex polysaccharides nourish short-chain fatty acid (SCFA)-producing microbes in the gut lining, dampening systemic low-grade inflammation.",
      "Finger millet (Ragi) stands out as the world's most concentrated botanical source of calcium, offering 344mg per 100g—over three times more than standard milk per equivalent weight. Substituting just one meal a day with a millet bowl brings sustained energy and effortless metabolic stability.",
    ],
  },
  {
    id: "blog-5",
    title: "The Miracle of Cold-Pressed Oils: Traditional Kachi Ghani Mustard & Sesame Secrets",
    category: "Cold-Pressed Oils",
    date: "29 Mar 2026",
    image: "/images/blog-coldpressed-oil.jpg",
    images: [
      "/images/blog-coldpressed-oil.jpg",
      "/images/products/other-oil-1.jpg",
      "/images/blog-oil-2.jpg",
      "/images/blog-oil-3.jpg",
    ],
    readTime: "5 min read",
    summary:
      "Say goodbye to refined oils extracted with toxic hexane solvent. Learn how wood-pressed (Kolhu/Kachi Ghani) oils preserve native micronutrients and fatty acids.",
    author: {
      name: "Meera Kulkarni",
      role: "Holistic Health Educator",
    },
    tags: ["Cold Pressed", "Mustard Oil", "Sesame Oil", "Hexane Free"],
    keyBenefits: [
      "Extracted below 45°C without chemical solvents or bleaching agents",
      "Retains natural plant sterols, tocopherols, and pungent allyl isothiocyanate",
      "Optimal Omega-3 to Omega-6 ratio for heart wellness",
      "High natural smoke point for authentic Indian tempering (tadka)",
    ],
    healthTip:
      "Authentic cold-pressed mustard oil should produce a gentle eye-watering aroma upon unsealing. This pungency is proof of active sinigrin, a powerful compound known for antimicrobial respiratory support.",
    nutritionalHighlights: [
      { label: "Extraction Temp", value: "< 45°C" },
      { label: "Chemical Solvents", value: "0 ppm" },
      { label: "Monounsaturated Fat", value: "65%" },
      { label: "Vitamin E", value: "Preserved" },
    ],
    content: [
      "Commercial clear 'vegetable' oils undergo brutal chemical refinement: high-heat expelling above 200°C, washing with petroleum-derived hexane solvent, bleaching with acid clays, and deodorizing with superheated steam. This strips vitamins and introduces lipid peroxides.",
      "In contrast, traditional Kachi Ghani uses slow-turning wooden pestles that crush black mustard and unhulled sesame seeds at ambient temperatures under 45°C. This gentle mechanical extraction keeps the fragile polyphenol bonds unbroken.",
      "Cold-pressed sesame oil contains two extraordinary antioxidant lignans—sesamin and sesamolin—which inhibit lipid peroxidation and support balanced arterial pressure. Using a single spoonful of pure wood-pressed oil elevates everyday cooking into a restorative ritual.",
    ],
  },
  {
    id: "blog-6",
    title: "Turmeric with Black Pepper: Activating India's Most Potent Anti-Inflammatory Spice",
    category: "Immunity & Spices",
    date: "24 Mar 2026",
    image: "/images/blog-turmeric-spices.jpg",
    images: [
      "/images/blog-turmeric-spices.jpg",
      "/images/products/spice-turmeric-1.jpg",
      "/images/products/spice-pepper-1.jpg",
      "/images/blog-golden-milk.jpg",
    ],
    readTime: "4 min read",
    summary:
      "Why eating turmeric alone wastes 95% of curcumin: The culinary biochemistry behind combining golden turmeric with piperine-rich Malabar black peppercorns.",
    author: {
      name: "Dr. Ananya Sharma",
      role: "Holistic Nutritionist & Food Biochemist",
    },
    tags: ["Curcumin", "Lakadong Turmeric", "Black Pepper", "Anti-Inflammatory"],
    keyBenefits: [
      "Piperine boosts curcumin bioavailability by up to 2000%",
      "Lakadong turmeric contains high 7-9% native curcumin content",
      "Calms joint inflammation and accelerates post-workout recovery",
      "Zero synthetic lead chromate or artificial coloring",
    ],
    healthTip:
      "Curcumin is fat-soluble. Always combine turmeric and black pepper with a healthy lipid like warm A2 cow ghee or coconut oil to facilitate lymphatic transport directly into the bloodstream.",
    nutritionalHighlights: [
      { label: "Curcumin Level", value: "7.5% - 8.2%" },
      { label: "Absorption Boost", value: "+2000% w/ Pepper" },
      { label: "Purity Grade", value: "Export Standard" },
      { label: "Additives", value: "None" },
    ],
    content: [
      "Turmeric (Curcuma longa) has been revered for millennia in Indian pharmacology. However, modern pharmacology discovered a major hurdle: native curcumin has extremely poor bioavailability due to rapid hepatic glucuronidation in the liver.",
      "Ancient culinary wisdom already solved this puzzle centuries ago by pairing Haldi with Kali Mirch (Black Pepper). Black pepper contains piperine, an alkaloid that inhibits UDP-glucuronosyltransferase in the gut wall, allowing curcumin to bypass liver breakdown and elevate systemic blood plasma levels by up to 2000%.",
      "When selecting turmeric, look for high-curcumin varieties like Meghalaya Lakadong turmeric. Its deep orange hue, earthy aroma, and lack of chalky residue ensure you are receiving pure rhizome goodness without adulteration.",
    ],
  },
  {
    id: "blog-7",
    title: "Chia, Flax & Pumpkin Seeds: Tiny Seeds with Monumental Hormonal & Heart Benefits",
    category: "Seeds & Superfoods",
    date: "19 Mar 2026",
    image: "/images/blog-superfood-seeds.jpg",
    images: [
      "/images/blog-superfood-seeds.jpg",
      "/images/products/seed-chia-1.jpg",
      "/images/products/seed-pumpkin-1.jpg",
      "/images/categories/seeds.jpg",
    ],
    readTime: "5 min read",
    summary:
      "A daily tablespoon of raw seeds delivers concentrated plant lignans, zinc, and soluble mucilage fiber to balance hormones, stabilize blood glucose, and promote glowing skin.",
    author: {
      name: "Pooja Malhotra",
      role: "Clinical Dietitian & Lifestyle Coach",
    },
    tags: ["Chia Seeds", "Flax Seeds", "Pumpkin Seeds", "Hormonal Balance"],
    keyBenefits: [
      "Flax lignans support natural estrogen metabolism in both women and men",
      "Chia seed soluble gel coats intestinal lining, delaying carbohydrate breakdown",
      "Raw green pumpkin seeds supply bioavailable elemental zinc and magnesium",
      "Supports restful deep sleep via natural tryptophan precursors",
    ],
    healthTip:
      "Whole flax seeds pass through the digestive system undigested. Always freshly grind your flax seeds into a coarse powder and store in an airtight glass jar in the refrigerator.",
    nutritionalHighlights: [
      { label: "Fiber / 2 tbsp", value: "10g Soluble Fiber" },
      { label: "Zinc (Pumpkin)", value: "7.5mg" },
      { label: "Omega-3 ALA", value: "4.8g" },
      { label: "Protein / oz", value: "9g" },
    ],
    content: [
      "Seeds are biological embryonic vaults: they contain all the concentrated genetic materials, micronutrients, and healthy fatty acids needed to germinate an entire living plant. Incorporating a seed trio into your daily diet yields profound hormonal advantages.",
      "Flax seeds stand as the richest dietary source of secoisolariciresinol diglucoside (SDG) lignans, which intestinal bacteria convert into beneficial enterolactone. This helps balance circulating estrogens and supports cardiovascular flexibility.",
      "Meanwhile, chia seeds absorb twelve times their weight in water, creating a hydrophilic colloidal gel that slows carbohydrate breakdown into simple sugars. Sprinkled over morning oats, fresh curd, or blended into smoothies, these seeds supply clean sustained fuel.",
    ],
  },
  {
    id: "blog-8",
    title: "Natural Sweeteners vs Refined Sugar: Pure Organic Jaggery & Raw Forest Honey",
    category: "Natural Sweeteners",
    date: "15 Mar 2026",
    image: "/images/blog-organic-jaggery.jpg",
    images: [
      "/images/blog-organic-jaggery.jpg",
      "/images/blog-honey-2.jpg",
      "/images/blog-honey-3.jpg",
      "/images/categories/other-items.jpg",
    ],
    readTime: "4 min read",
    summary:
      "Why bleached white sugar causes metabolic havoc while unrefined golden gur (jaggery) and raw forest honey cleanse respiratory channels and supply vital iron.",
    author: {
      name: "Vikas Deshmukh",
      role: "Agronomist & Pulse Specialist",
    },
    tags: ["Organic Jaggery", "Raw Honey", "Iron Rich", "Unrefined Sweetener"],
    keyBenefits: [
      "Natural sugarcane molasses preserved without sulphur bleaching agents",
      "Dense with non-heme iron, magnesium, potassium, and phosphorus",
      "Aids digestive enzyme secretion when eaten after heavy meals",
      "Raw forest honey retains active bee pollen and amylase enzymes",
    ],
    healthTip:
      "Never boil raw honey in boiling liquids above 40°C, as high heat denatures delicate enzymes. Add honey to herbal teas only after the liquid cools to warm drinking temperature.",
    nutritionalHighlights: [
      { label: "Iron Content", value: "11mg / 100g (Gur)" },
      { label: "Chemical Sulphur", value: "0 ppm" },
      { label: "Potassium", value: "1050mg" },
      { label: "Glycemic Stability", value: "Gradual Release" },
    ],
    content: [
      "Refined white sugar is an industrial artifact: through repeated carbonation, bone-char filtration, and sulphur dioxide bleaching, 99.9% of sugarcane's native vitamins and trace minerals are stripped away, leaving only empty sucrose calories.",
      "Traditional unrefined jaggery (Gur), slow-simmered in open iron cauldrons, retains the complete mineral spectrum of sugarcane juice. It contains significant amounts of iron, potassium, and magnesium, giving it an alkaline digestive effect.",
      "In traditional Indian households, a coin-sized bite of unrefined dark jaggery after lunch activates salivary and digestive enzymes, preventing sluggish post-meal heaviness and cleansing the respiratory tract of environmental airborne dust.",
    ],
  },
  {
    id: "blog-9",
    title: "Kashmiri Saffron (Kesar): The Golden Spice for Mood, Skin Radiance & Cognitive Clarity",
    category: "Herbal Wellness",
    date: "11 Mar 2026",
    image: "/images/blog-saffron.jpg",
    images: [
      "/images/blog-saffron.jpg",
      "/images/blog-saffron-2.jpg",
      "/images/categories/spices.jpg",
      "/images/products/spice-turmeric-1.jpg",
    ],
    readTime: "4 min read",
    summary:
      "Harvested by hand in the valleys of Pampore: The science of active crocin and safranal compounds for natural dopamine support and radiant cellular health.",
    author: {
      name: "Dr. Ananya Sharma",
      role: "Holistic Nutritionist & Food Biochemist",
    },
    tags: ["Kashmiri Saffron", "Mongra Grade", "Mood Support", "Radiant Skin"],
    keyBenefits: [
      "Highest natural crocin content (coloring strength > 240)",
      "Clinically studied natural mood elevator and serotonin stabilizer",
      "Potent retinal carotenoids support eye health against screen fatigue",
      "Authentic Kashmiri Mongra with thick trumpet-shaped crimson stigmas",
    ],
    healthTip:
      "To test authentic saffron: place two strands in warm water. Pure Kashmiri saffron slowly tints the liquid a rich golden yellow while the physical thread remains intensely red.",
    nutritionalHighlights: [
      { label: "Crocin Level", value: "> 240 (Grade 1)" },
      { label: "Safranal Aroma", value: "High Volatile" },
      { label: "Origin", value: "Pampore, Kashmir" },
      { label: "Artificial Color", value: "Zero" },
    ],
    content: [
      "Known as 'Red Gold', authentic Kashmiri Saffron (Crocus sativus) from the high-altitude alluvial soils of Pampore is considered the world's most prized spice. Each crimson thread represents a hand-plucked stigma harvested during a brief two-week autumn flowering window.",
      "Contemporary neuropharmacology has isolated two unique bioactive carotenoids in saffron: crocin and crocetin, alongside the aromatic compound safranal. Double-blind clinical trials indicate that 30mg of pure saffron daily supports healthy dopamine and serotonin levels, acting as a gentle mood stabilizer.",
      "Steeping 4 to 5 strands of pure saffron in warm almond milk or water at bedtime relaxes the central nervous system, enhances microcirculation to epidermal layers, and encourages deep restorative REM sleep.",
    ],
  },
  {
    id: "blog-10",
    title: "The Ayurvedic Food Combining Guide: Optimizing Bioavailability with Pure Farm Staples",
    category: "Ayurvedic Nutrition",
    date: "07 Mar 2026",
    image: "/images/blog-ayurvedic-diet.jpg",
    images: [
      "/images/blog-ayurvedic-diet.jpg",
      "/images/blog-ayurveda-2.jpg",
      "/images/products/rice-gobindo-1.jpg",
      "/images/products/pulse-toor-2.jpg",
    ],
    readTime: "6 min read",
    summary:
      "Master the timeless wisdom of Ahara: How conscious sequencing of whole grains, spices, and lentils maximizes Agni (digestive fire) and cellular rejuvenation.",
    author: {
      name: "Dr. Raghuveer Reddy",
      role: "Traditional Grain Researcher",
    },
    tags: ["Ayurvedic Diet", "Agni", "Food Combining", "Gut Harmony"],
    keyBenefits: [
      "Optimizes digestive enzyme sequencing to prevent Ama (toxic buildup)",
      "Balances the 6 Ayurvedic tastes (Shad Rasa) in every main meal",
      "Enhances nutrient absorption through strategic spice pairing",
      "Emphasizes farm-fresh, seasonal, unadulterated staple sourcing",
    ],
    healthTip:
      "Never consume ice-cold water during meals, as it dampens Agni (digestive fire). Sip lukewarm water spiced with roasted fennel and cumin seeds to stimulate gastric bile release.",
    nutritionalHighlights: [
      { label: "Six Tastes Balance", value: "100% Complete" },
      { label: "Digestion Ease", value: "Optimal" },
      { label: "Bioavailability", value: "Enhanced" },
      { label: "Processed Foods", value: "Zero" },
    ],
    content: [
      "In ancient classical texts like the Charaka Samhita, food is regarded as Mahabheshaja—the ultimate supreme medicine. Yet health is dictated not solely by what you eat, but by how completely your digestive fire (Agni) breaks down and assimilates those nutrients.",
      "A foundational principle of Ayurvedic nutrition is Shad Rasa (the inclusion of six distinct tastes: sweet, sour, salty, pungent, bitter, and astringent in a single meal). Whole grains supply sweet nourishment, unpolished lentils offer grounding astringency, and traditional spices supply pungent and bitter enzymes.",
      "Sourcing unadulterated farm staples—grains free from chemical fumigation, pulses free from talc, and cold-pressed unheated oils—ensures the food possesses abundant Prana (vital energy), nourishing both body and mind.",
    ],
  },
  {
    id: "blog-11",
    title: "Green Moong & Sprouting Magic: How Germination Multiplies Vitamins by 300%",
    category: "Enzymes & Sprouting",
    date: "03 Mar 2026",
    image: "/images/blog-sprouted-moong.jpg",
    images: [
      "/images/blog-sprouted-moong.jpg",
      "/images/blog-sprouts-2.jpg",
      "/images/products/pulse-moong-1.jpg",
      "/images/products/pulse-urad-1.jpg",
    ],
    readTime: "4 min read",
    summary:
      "Turn simple whole green moong beans into living enzymes: Discover how 24 hours of soaking and sprouting skyrockets Vitamin C, riboflavin, and active antioxidants.",
    author: {
      name: "Meera Kulkarni",
      role: "Holistic Health Educator",
    },
    tags: ["Sprouted Moong", "Living Enzymes", "High Vitamin C", "Easy Digestion"],
    keyBenefits: [
      "Sprouting multiplies Vitamin C content by over 300%",
      "Enzymatically breaks down gas-producing complex oligosaccharides",
      "Doubles bioavailability of zinc, iron, and calcium",
      "Crisp, refreshing living snack with zero empty calories",
    ],
    healthTip:
      "For optimal tender sprouts, soak whole green moong for 8 hours, drain thoroughly, wrap in a damp breathable muslin cotton cloth, and let rest in a warm dark cabinet for 18 to 24 hours.",
    nutritionalHighlights: [
      { label: "Vitamin C Boost", value: "+300% via Sprouting" },
      { label: "Digestibility", value: "98% Clean" },
      { label: "Calories / cup", value: "31 kcal" },
      { label: "Folate RDA", value: "40%" },
    ],
    content: [
      "Dry whole green moong beans lie dormant, protected by natural enzyme inhibitors and phytic acid shields designed to prevent premature decay. The moment they are soaked in pure water, an astonishing biochemical awakening takes place.",
      "During germination, the seed releases dormant hydrolytic enzymes that convert stored starches into simple sugars, and split storage proteins into readily absorbable free amino acids. Scientific assays reveal that sprouting increases Vitamin C content threefold and significantly elevates Vitamin B-complex and folate.",
      "Because the sprouting process deactivates phytic acid and lectins, sprouted moong beans are exceptionally gentle on sensitive digestive tracts. Tossed with a squeeze of fresh lemon, pink Himalayan rock salt, and chopped coriander, it becomes an energizing superfood.",
    ],
  },
  {
    id: "blog-12",
    title: "Pure Cow Ghee: Why Healthy Saturated Fats Are Essential for Nutrient Absorption",
    category: "Traditional Healthy Fats",
    date: "27 Feb 2026",
    image: "/images/blog-pure-ghee.jpg",
    images: [
      "/images/blog-pure-ghee.jpg",
      "/images/products/other-ghee-1.jpg",
      "/images/blog-ghee-2.jpg",
      "/images/products/other-salt-1.jpg",
    ],
    readTime: "5 min read",
    summary:
      "Debunking the low-fat myth: Why authentic A2 bilona cow ghee provides crucial butyric acid to heal the gut barrier and transports fat-soluble vitamins.",
    author: {
      name: "Dr. Raghuveer Reddy",
      role: "Traditional Grain Researcher",
    },
    tags: ["A2 Cow Ghee", "Bilona Method", "Butyric Acid", "Fat-Soluble Vitamins"],
    keyBenefits: [
      "Rich in short-chain fatty acid (Butyric Acid) to nourish intestinal epithelial cells",
      "High smoke point (250°C / 485°F) prevents harmful lipid oxidation during cooking",
      "Contains Conjugated Linoleic Acid (CLA) which supports lean muscle metabolic rate",
      "Lactose and casein free, making it gut-friendly even for dairy-sensitive individuals",
    ],
    healthTip:
      "Drizzle half a teaspoon of warm liquid ghee over your cooked pulses or basmati rice just before eating. Ghee lowers the glycemic surge of the meal while facilitating absorption of vitamins A, D, E, and K.",
    nutritionalHighlights: [
      { label: "Smoke Point", value: "250°C (485°F)" },
      { label: "Butyrate Content", value: "High SCFA" },
      { label: "Lactose & Casein", value: "0% (Purified)" },
      { label: "CLA Level", value: "Natural Source" },
    ],
    content: [
      "For decades, dietary guidelines mistakenly vilified all saturated fats. Modern nutritional science has corrected this oversight: traditional clarified butter (ghee) made using the ancient Bilona method (churning cultured curd rather than industrial cream) is a metabolic superfood.",
      "Ghee is one of the richest dietary sources of butyric acid, a short-chain fatty acid that serves as the primary metabolic fuel for colonocytes (the cells lining your large intestine). Regular consumption of pure ghee strengthens tight junctions in the gut barrier, calming systemic inflammation.",
      "Additionally, many of the most vital micronutrients in healthy food—such as carotenoids in carrots, vitamin E in nuts, and lycopene in tomatoes—are strictly fat-soluble. Without healthy cooking fats like ghee, up to 80% of these vitamins pass through the body unabsorbed.",
    ],
  },
];
