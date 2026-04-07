// ─── Product Images (African/Nigerian fashion photography) ──────────────────
// Each product has a primary image and optional alternates for PDP gallery

export const productImages: Record<string, { primary: string; gallery: string[] }> = {
  'yafe-001': {
    primary: 'https://images.unsplash.com/photo-1675250719882-ab1d7f047550?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1675250719882-ab1d7f047550?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1675250719871-ba76f9628d40?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'yafe-002': {
    primary: 'https://images.unsplash.com/photo-1622444913718-dde4471ce697?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1622444913718-dde4471ce697?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'yafe-003': {
    primary: 'https://images.unsplash.com/photo-1614398077744-0503b90d5ff1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1614398077744-0503b90d5ff1?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'yafe-004': {
    primary: 'https://images.unsplash.com/photo-1649870577213-a1cf42de5616?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1649870577213-a1cf42de5616?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'yafe-005': {
    primary: 'https://images.unsplash.com/photo-1563132305-24784f57eeea?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563132305-24784f57eeea?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'yafe-006': {
    primary: 'https://images.unsplash.com/photo-1521511189395-b82252213754?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521511189395-b82252213754?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'yafe-007': {
    primary: 'https://images.unsplash.com/photo-1606596556957-f6566cc865a9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606596556957-f6566cc865a9?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'yafe-008': {
    primary: 'https://images.unsplash.com/photo-1640058909682-6605ea5a208b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1640058909682-6605ea5a208b?auto=format&fit=crop&w=800&q=80',
    ],
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

export const aboutHeroImage = 'https://images.unsplash.com/photo-1718693942271-4cd86f5aa1f4?auto=format&fit=crop&w=1400&q=80';

export const insidersVoteImages = {
  vneck: 'https://images.unsplash.com/photo-1686628332798-757c624c4b08?auto=format&fit=crop&w=400&q=80',
  mandarin: 'https://images.unsplash.com/photo-1649870577213-a1cf42de5616?auto=format&fit=crop&w=400&q=80',
};

export const collectionHeroImages: Record<string, string> = {
  'power-moves': 'https://images.unsplash.com/photo-1700560970703-82fd3150d5ac?auto=format&fit=crop&w=1400&q=80',
  'weekend-edit': 'https://images.unsplash.com/photo-1718693942271-4cd86f5aa1f4?auto=format&fit=crop&w=1400&q=80',
};
