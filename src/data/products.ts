export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Blazers' | 'Trousers' | 'Blouses' | 'Dresses';
  description: string;
  sizes: string[];
  colors: string[];
  artisanName: string;
  artisanYears: number;
  image: string;
  sizeInsight: string;
}

export const products: Product[] = [
  {
    id: 'yafe-001',
    name: 'Adaeze Structured Blazer',
    price: 38500,
    category: 'Blazers',
    description:
      'A sharp, tailored blazer with clean lines and a nipped waist. Crafted from breathable cotton-blend fabric perfect for Lagos heat. Features subtle ankara-print lining.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Charcoal', 'Ivory'],
    artisanName: 'Mama Nkechi Tailoring',
    artisanYears: 14,
    image: '/products/product-1.jpg',
    sizeInsight:
      'Runs slightly fitted through the shoulders. If between sizes, size up for layering comfort.',
  },
  {
    id: 'yafe-002',
    name: 'Ifeoma Wide-Leg Trousers',
    price: 28500,
    category: 'Trousers',
    description:
      'Elegant wide-leg trousers with a high waist and flowing silhouette. Made from lightweight crepe that moves beautifully. Hidden side zip for a seamless front.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Cream', 'Burgundy'],
    artisanName: 'Stitches by Amara',
    artisanYears: 9,
    image: '/products/product-2.jpg',
    sizeInsight:
      'Generous through the hip. True to size at the waist. Inseam is 32 inches, ideal for pairing with heels.',
  },
  {
    id: 'yafe-003',
    name: 'Chidinma Peplum Blouse',
    price: 29000,
    category: 'Blouses',
    description:
      'A feminine peplum blouse with capped sleeves and a flattering neckline. The structured peplum adds polish to any trouser or skirt combination.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Blush', 'Emerald'],
    artisanName: 'Zainab Couture Studio',
    artisanYears: 7,
    image: '/products/product-3.jpg',
    sizeInsight:
      'Fitted at the bust with a relaxed peplum. Choose your regular size for a defined silhouette.',
  },
  {
    id: 'yafe-004',
    name: 'Oluwaseun Pencil Dress',
    price: 42000,
    category: 'Dresses',
    description:
      'A sophisticated midi pencil dress with a boat neckline and back slit. Fully lined with stretch for all-day comfort. Perfect boardroom-to-dinner transition piece.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Deep Teal', 'Black', 'Terracotta'],
    artisanName: 'House of Funke',
    artisanYears: 18,
    image: '/products/product-4.jpg',
    sizeInsight:
      'Body-skimming fit. The stretch fabric is forgiving, but if you prefer ease through the hips, consider sizing up.',
  },
  {
    id: 'yafe-005',
    name: 'Ngozi Boyfriend Blazer',
    price: 36000,
    category: 'Blazers',
    description:
      'A relaxed, oversized blazer with rolled cuffs and patch pockets. Soft unstructured shoulders give it an effortlessly chic look for creative office environments.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Dusty Rose', 'Slate Grey'],
    artisanName: 'Mama Nkechi Tailoring',
    artisanYears: 14,
    image: '/products/product-5.jpg',
    sizeInsight:
      'Intentionally oversized. Most customers take their regular size for the perfect relaxed drape.',
  },
  {
    id: 'yafe-006',
    name: 'Amina Silk Shell Blouse',
    price: 31000,
    category: 'Blouses',
    description:
      'A minimalist sleeveless shell blouse in airy silk-blend fabric. Clean enough to stand alone, polished enough to layer under blazers. French seam finishing throughout.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Ivory', 'Soft Lilac', 'Cobalt'],
    artisanName: 'Zainab Couture Studio',
    artisanYears: 7,
    image: '/products/product-6.jpg',
    sizeInsight:
      'Relaxed fit through the body. If you prefer a more tucked-in look, consider sizing down.',
  },
  {
    id: 'yafe-007',
    name: 'Folake Tailored Trousers',
    price: 32000,
    category: 'Trousers',
    description:
      'Slim straight-leg trousers with pressed creases and belt loops. A wardrobe essential cut from mid-weight suiting fabric with just enough stretch for comfort.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Stone'],
    artisanName: 'Stitches by Amara',
    artisanYears: 9,
    image: '/products/product-7.jpg',
    sizeInsight:
      'True to size at the waist. Slim through the thigh with a straight leg. Ankle-length cut sits just above the shoe.',
  },
  {
    id: 'yafe-008',
    name: 'Yetunde Wrap Dress',
    price: 39500,
    category: 'Dresses',
    description:
      'A classic wrap dress with a V-neckline and tie waist. The draped jersey fabric flatters every figure. Three-quarter sleeves add coverage for air-conditioned offices.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Wine', 'Forest Green', 'Midnight Blue'],
    artisanName: 'House of Funke',
    artisanYears: 18,
    image: '/products/product-8.jpg',
    sizeInsight:
      'The wrap style is naturally adjustable. Choose your standard size for the best shoulder and sleeve fit.',
  },
];

export const categories = ['Blazers', 'Trousers', 'Blouses', 'Dresses'] as const;

export type Category = (typeof categories)[number];

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
}
