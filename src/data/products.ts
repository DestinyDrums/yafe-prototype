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
    name: 'Ngozi Boyfriend Blazer',
    price: 36000,
    category: 'Blazers',
    description:
      'A relaxed, oversized blazer with rolled cuffs and patch pockets. Crafted in bold ankara-print fabric that commands attention. Soft unstructured shoulders for effortless Lagos chic.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Ankara Print', 'Camel', 'Slate Grey'],
    artisanName: 'Mama Nkechi Tailoring',
    artisanYears: 14,
    image: '/products/boyfriend_blazer.jpeg',
    sizeInsight:
      'Intentionally oversized. Most customers take their regular size for the perfect relaxed drape.',
  },
  {
    id: 'yafe-002',
    name: 'Oluwaseun Pencil Dress',
    price: 42000,
    category: 'Dresses',
    description:
      'A sophisticated draped midi pencil dress with an asymmetric neckline. Fully lined with stretch for all-day comfort. The perfect boardroom-to-dinner transition piece.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Wine Red', 'Black', 'Deep Teal'],
    artisanName: 'House of Funke',
    artisanYears: 18,
    image: '/products/pencil_dress.jpeg',
    sizeInsight:
      'Body-skimming fit. The stretch fabric is forgiving, but if you prefer ease through the hips, consider sizing up.',
  },
  {
    id: 'yafe-003',
    name: 'Chidinma Peplum Blouse',
    price: 29000,
    category: 'Blouses',
    description:
      'A statement peplum blouse with dramatic balloon sleeves and a cinched waist tie. The structured peplum adds polish to any trouser or skirt combination.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black & White Print', 'Emerald', 'Blush'],
    artisanName: 'Zainab Couture Studio',
    artisanYears: 7,
    image: '/products/peplum_blouse.jpeg',
    sizeInsight:
      'Fitted at the bust with a relaxed peplum. Choose your regular size for a defined silhouette.',
  },
  {
    id: 'yafe-004',
    name: 'Amina Silk Shell Blouse',
    price: 31000,
    category: 'Blouses',
    description:
      'A minimalist off-shoulder shell blouse in airy silk-blend fabric. Clean enough to stand alone, polished enough to layer under blazers. French seam finishing throughout.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Ivory', 'Soft Lilac'],
    artisanName: 'Zainab Couture Studio',
    artisanYears: 7,
    image: '/products/silk_shell_blouse.jpeg',
    sizeInsight:
      'Relaxed fit through the body. If you prefer a more tucked-in look, consider sizing down.',
  },
  {
    id: 'yafe-005',
    name: 'Adaeze Structured Blazer',
    price: 38500,
    category: 'Blazers',
    description:
      'A sharp, tailored blazer with clean lines and a nipped waist with belt detail. Crafted in rich jewel tones with wide-leg matching trousers available separately.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Royal Purple', 'Navy', 'Charcoal'],
    artisanName: 'Mama Nkechi Tailoring',
    artisanYears: 14,
    image: '/products/structured_blazer.jpeg',
    sizeInsight:
      'Runs slightly fitted through the shoulders. If between sizes, size up for layering comfort.',
  },
  {
    id: 'yafe-006',
    name: 'Folake Tailored Pants',
    price: 32000,
    category: 'Trousers',
    description:
      'Slim straight-leg trousers with pressed creases and belt loops. A wardrobe essential cut from mid-weight suiting fabric with just enough stretch for comfort.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Stone', 'Black', 'Navy'],
    artisanName: 'Stitches by Amara',
    artisanYears: 9,
    image: '/products/tailored_pants.jpeg',
    sizeInsight:
      'True to size at the waist. Slim through the thigh with a straight leg. Ankle-length cut sits just above the shoe.',
  },
  {
    id: 'yafe-007',
    name: 'Ifeoma Wide Leg Pants',
    price: 28500,
    category: 'Trousers',
    description:
      'Elegant wide-leg trousers in bold adire-inspired print with a high waist and flowing silhouette. Pairs beautifully with a solid blazer for a polished look.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Green Print', 'Black', 'Cream'],
    artisanName: 'Stitches by Amara',
    artisanYears: 9,
    image: '/products/wide_leg_pants.jpeg',
    sizeInsight:
      'Generous through the hip. True to size at the waist. Inseam is 32 inches, ideal for pairing with heels.',
  },
  {
    id: 'yafe-008',
    name: 'Yetunde Wrap Dress',
    price: 39500,
    category: 'Dresses',
    description:
      'A classic wrap dress with a V-neckline and tie waist. The draped fabric flatters every figure. Three-quarter sleeves add coverage for air-conditioned offices.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Midnight Blue', 'Wine', 'Forest Green'],
    artisanName: 'House of Funke',
    artisanYears: 18,
    image: '/products/wrap_dress.jpeg',
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
