import { Category, Product, BlogPost, WhyChooseFeature } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Rice",
    slug: "rice",
    image: "/images/cat-rice.jpg",
    itemCount: 16,
  },
  {
    id: "cat-2",
    name: "Pulses",
    slug: "pulses",
    image: "/images/cat-pulses.jpg",
    itemCount: 24,
  },
  {
    id: "cat-3",
    name: "Dry Fruits",
    slug: "dry-fruits",
    image: "/images/cat-dry-fruits.jpg",
    itemCount: 18,
  },
  {
    id: "cat-4",
    name: "Millets",
    slug: "millets",
    image: "/images/cat-millets.jpg",
    itemCount: 12,
  },
  {
    id: "cat-5",
    name: "Seeds",
    slug: "seeds",
    image: "/images/cat-seeds.jpg",
    itemCount: 15,
  },
  {
    id: "cat-6",
    name: "Spices",
    slug: "spices",
    image: "/images/cat-spices.jpg",
    itemCount: 28,
  },
  {
    id: "cat-7",
    name: "Other Items",
    slug: "other-items",
    image: "/images/cat-other-items.jpg",
    itemCount: 9,
  },
];

export const BEST_SELLERS: Product[] = [
  {
    id: "prod-1",
    name: "Premium Long Grain Basmati Rice",
    category: "Rice",
    subtitle: "1 Kg",
    defaultPrice: 120.0,
    defaultOriginalPrice: 140.0,
    defaultDiscount: "14% Off",
    rating: 4.8,
    reviewsCount: 32,
    image: "/images/prod-basmati-rice.jpg",
    description:
      "Aged to perfection, our traditional long grain basmati rice is renowned for its intoxicating aroma, delicate fluffiness, and slender grains that double in size upon cooking.",
    options: [
      { label: "500g Sample", price: 65.0, originalPrice: 75.0, discount: "13% Off" },
      { label: "1 Kg Pack", price: 120.0, originalPrice: 140.0, discount: "14% Off" },
      { label: "5 Kg Value Bag", price: 570.0, originalPrice: 650.0, discount: "12% Off" },
      { label: "10 Kg Family Bag", price: 1100.0, originalPrice: 1300.0, discount: "15% Off" },
    ],
  },
  {
    id: "prod-2",
    name: "Toor Dal (Arhar Dal)",
    category: "Pulses",
    subtitle: "1 Kg",
    defaultPrice: 95.0,
    defaultOriginalPrice: 110.0,
    defaultDiscount: "14% Off",
    rating: 4.7,
    reviewsCount: 21,
    image: "/images/prod-toor-dal.jpg",
    description:
      "Unpolished, unadulterated split pigeon peas rich in dietary fiber and essential plant proteins. Cooks down to a velvety consistency with authentic earthy flavor.",
    options: [
      { label: "500g Sample", price: 50.0, originalPrice: 60.0, discount: "16% Off" },
      { label: "1 Kg Pack", price: 95.0, originalPrice: 110.0, discount: "14% Off" },
      { label: "2 Kg Pack", price: 185.0, originalPrice: 215.0, discount: "14% Off" },
      { label: "5 Kg Bag", price: 450.0, originalPrice: 530.0, discount: "15% Off" },
    ],
  },
  {
    id: "prod-3",
    name: "California Almonds",
    category: "Dry Fruits",
    subtitle: "250 g",
    defaultPrice: 320.0,
    defaultOriginalPrice: 380.0,
    defaultDiscount: "16% Off",
    rating: 4.9,
    reviewsCount: 48,
    image: "/images/prod-almonds.jpg",
    description:
      "Hand-selected jumbo California almonds packed with vitamin E, magnesium, and healthy antioxidants. Crunchy, naturally sweet, and hygienically vacuum sealed.",
    options: [
      { label: "250g Pack", price: 320.0, originalPrice: 380.0, discount: "16% Off" },
      { label: "500g Pack", price: 620.0, originalPrice: 740.0, discount: "16% Off" },
      { label: "1 Kg Value Pack", price: 1190.0, originalPrice: 1450.0, discount: "18% Off" },
    ],
  },
  {
    id: "prod-4",
    name: "Green Moong Dal",
    category: "Pulses",
    subtitle: "1 Kg",
    defaultPrice: 110.0,
    defaultOriginalPrice: 130.0,
    defaultDiscount: "15% Off",
    rating: 4.6,
    reviewsCount: 19,
    image: "/images/prod-green-moong.jpg",
    description:
      "Wholesome green gram beans with high digestibility, packed with iron and calcium. Ideal for khichdi, soups, sprouts, and nutritious everyday meals.",
    options: [
      { label: "500g Sample", price: 60.0, originalPrice: 70.0, discount: "14% Off" },
      { label: "1 Kg Pack", price: 110.0, originalPrice: 130.0, discount: "15% Off" },
      { label: "2 Kg Pack", price: 215.0, originalPrice: 250.0, discount: "14% Off" },
      { label: "5 Kg Bag", price: 520.0, originalPrice: 620.0, discount: "16% Off" },
    ],
  },
];

export const WHY_CHOOSE_FEATURES: WhyChooseFeature[] = [
  {
    id: "feat-1",
    title: "Naturally Sourced",
    description: "From trusted farms",
    icon: "leaf",
  },
  {
    id: "feat-2",
    title: "Premium Quality",
    description: "Carefully selected and graded",
    icon: "diamond",
  },
  {
    id: "feat-3",
    title: "Quality Tested",
    description: "Hygienically processed",
    icon: "flask",
  },
  {
    id: "feat-4",
    title: "Rich in Nutrition",
    description: "Healthy food for a better life",
    icon: "wheat",
  },
  {
    id: "feat-5",
    title: "Secure Packaging",
    description: "Freshness and safety",
    icon: "package",
  },
  {
    id: "feat-6",
    title: "Global Export",
    description: "Bulk supply and worldwide delivery",
    icon: "globe",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "How to Choose the Best Basmati Rice",
    date: "10 Apr 2026",
    image: "/images/blog-basmati.jpg",
    readTime: "4 min read",
    summary:
      "Learn the art of identifying authentic aged basmati rice by grain elongation, aroma, and color clarity to elevate every feast.",
  },
  {
    id: "blog-2",
    title: "Health Benefits of Pulses in Everyday Diet",
    date: "05 Apr 2026",
    image: "/images/blog-pulses.jpg",
    readTime: "5 min read",
    summary:
      "Explore why ancient grains and unpolished lentils form the cornerstone of balanced nutrition, gut health, and vitality.",
  },
  {
    id: "blog-3",
    title: "Top 5 Dry Fruits for a Healthy Lifestyle",
    date: "01 Apr 2026",
    image: "/images/blog-dryfruits.jpg",
    readTime: "3 min read",
    summary:
      "From memory-boosting almonds to heart-healthy walnuts, discover the optimal daily portion for maximum wellness benefits.",
  },
  {
    id: "blog-4",
    title: "Different Types of Millets and Their Benefits",
    date: "28 Mar 2026",
    image: "/images/blog-millets.jpg",
    readTime: "6 min read",
    summary:
      "Rediscover superfoods: Ragi, Jowar, Bajra, and Foxtail millets that are naturally gluten-free and packed with essential minerals.",
  },
];
