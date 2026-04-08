// ─── Product Images (African/Nigerian fashion photography) ──────────────────
// Each product has a primary image and optional alternates for PDP gallery

export const productImages: Record<string, { primary: string; gallery: string[] }> = {
  'yafe-001': {
    primary: '/products/boyfriend_blazer.jpeg',
    gallery: ['/products/boyfriend_blazer.jpeg'],
  },
  'yafe-002': {
    primary: '/products/pencil_dress.jpeg',
    gallery: ['/products/pencil_dress.jpeg'],
  },
  'yafe-003': {
    primary: '/products/peplum_blouse.jpeg',
    gallery: ['/products/peplum_blouse.jpeg'],
  },
  'yafe-004': {
    primary: '/products/silk_shell_blouse.jpeg',
    gallery: ['/products/silk_shell_blouse.jpeg'],
  },
  'yafe-005': {
    primary: '/products/structured_blazer.jpeg',
    gallery: ['/products/structured_blazer.jpeg'],
  },
  'yafe-006': {
    primary: '/products/tailored_pants.jpeg',
    gallery: ['/products/tailored_pants.jpeg'],
  },
  'yafe-007': {
    primary: '/products/wide_leg_pants.jpeg',
    gallery: ['/products/wide_leg_pants.jpeg'],
  },
  'yafe-008': {
    primary: '/products/wrap_dress.jpeg',
    gallery: ['/products/wrap_dress.jpeg'],
  },
};

// Helper to get image for a product
export function getProductImage(productId: string): string {
  return productImages[productId]?.primary || productImages['yafe-001'].primary;
}

export function getProductGallery(productId: string): string[] {
  return productImages[productId]?.gallery || productImages['yafe-001'].gallery;
}

// ─── Hero & Section Images ─────────────────────────────────────────────────

export const heroImage = 'https://images.unsplash.com/photo-1700560970703-82fd3150d5ac?auto=format&fit=crop&w=1400&q=80';

export const artisanHeroImage = 'https://images.unsplash.com/photo-1686628101920-990fec5e6fbc?auto=format&fit=crop&w=500&q=80';

export const artisanImages = [
  'https://images.unsplash.com/photo-1686628101920-990fec5e6fbc?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1717218335271-9c6ff39e1193?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1730140322846-e6be13da2ce1?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1687052034884-391a9e5ea8dd?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1687052093309-7a14efa58ecb?auto=format&fit=crop&w=400&q=80',
];

export const aboutHeroImage = '/standout.jpeg';

export const insidersVoteImages = {
  vneck: '/products/vneck.jpeg',
  mandarin: '/products/mandarin.jpeg',
};

export const collectionHeroImages: Record<string, string> = {
  'power-moves': 'https://images.unsplash.com/photo-1700560970703-82fd3150d5ac?auto=format&fit=crop&w=1400&q=80',
  'weekend-edit': 'https://images.unsplash.com/photo-1718693942271-4cd86f5aa1f4?auto=format&fit=crop&w=1400&q=80',
};
