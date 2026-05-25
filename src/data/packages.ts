export const BOOKING_BASE =
  'https://book.squareup.com/appointments/lu0cj345hv4hr2/location/LVZVXGQCTDSJM/services';

export type Package = {
  id: string;
  squareItemId: string;
  directUrl?: string;
  title: string;
  bestFor: string;
  price: string;
  iconName: string;
  image?: string;
  description: string;
  includes?: string[];
  highlights?: string[];
  upgrades?: string[];
};

export const packages: Package[] = [
  {
    id: 'bridal',
    squareItemId: '76N4X4FCXR7BQ5664YDDVSFZ',
    title: 'The Bridal Experience',
    bestFor: 'Brides',
    price: '$785',
    iconName: 'CrownIcon',
    image: '/eh_public_assets/Packages/The_Bridal_Experience.webp',
    description:
      'A fully customizable bridal beauty journey designed to have you glowing from head to toe — skin, smile, lashes, brows, and beyond. Spaced strategically over 3–6 months (or condensed if needed) to ensure peak results by your wedding day.',
    includes: [
      '3 TASH Prep Facials — our signature facial series tailored to your skin’s needs and wedding timeline. Focused on clarity, hydration, and a long-lasting glow.',
      '3 Rounds of Professional Teeth Whitening — gradual, safe sessions for a bright, photo-ready smile without sensitivity.',
      'Lash Enhancement (choose one) — Lash Lift or Lash Extensions.',
      'Scalp Therapy & Massage — a deeply relaxing scalp treatment to promote circulation, relieve stress, and support healthy hair.',
      'Brow Perfection (choose one) — Brow Lamination or Brow Tint + Wax.',
    ],
    highlights: [
      '100% customizable to you — services, timing, and focus areas',
      'Personalized consultation & bridal beauty plan',
      'Designed to align with your wedding events, photos, and honeymoon',
    ],
    upgrades: [
      'Dermaplaning or advanced facial add-ons',
      'Additional whitening sessions',
      'Bridal trial lashes or brows',
      'Wedding-week glow treatment',
    ],
  },
  {
    id: 'new-mommy',
    squareItemId: '',
    directUrl: 'https://square.link/u/htvG5sXm',
    title: 'The New Mommy Reset Glow Package',
    bestFor: 'New Moms',
    price: '$400',
    iconName: 'FlowerIcon',
    image: '/eh_public_assets/Packages/The_New_Mommy_Reset_Glow_Package.webp',
    description:
      'Designed for new mamas to provide nourishing care and support for rejuvenated, radiant skin. This thoughtfully curated package offers a seamless way to refresh and restore your natural glow with ease and convenience. New mamas deserve the perfect glow.',
  },
  {
    id: 'baby-bump',
    squareItemId: 'LJDOK3TP4H5NF42BJR6FVHTG',
    title: 'The Baby Bump Package',
    bestFor: 'Expecting Moms',
    price: '$225',
    iconName: 'Baby01Icon',
    image: '/eh_public_assets/Packages/The_Baby_Bump_Package.webp',
    description:
      'A nurturing, glow-enhancing experience thoughtfully designed for expecting mothers. Calms hormonal skin changes, boosts hydration, and promotes radiant, healthy-looking skin in the safest, most soothing way. With gentle, pregnancy-safe products and intentional touch, this experience encourages deep relaxation while supporting your skin through every trimester. Your moment to pause, breathe, and embrace the beauty of motherhood — glowing confidently from bump to beyond.',
  },
  {
    id: 'molecular-peel',
    squareItemId: '3YLSHWRCH6VNWHCAQFN3DTJV',
    title: 'The Molecular Peel Package',
    bestFor: 'Skin Renewal',
    price: '$840',
    iconName: 'Leaf01Icon',
    image: '/eh_public_assets/Packages/The_Molecular_Peel_Package.webp',
    description:
      'A curated series of 6 Cosmedix peels designed to target your specific skin goals with precision and results. This transformative treatment plan works to improve texture, tone, acne, and signs of aging through a structured, results-driven approach — all offered at a set package price for maximum value and consistency. Peels can also be done individually.',
  },
  {
    id: 'blemish-breakout',
    squareItemId: '2A7PZDYEUV5MGISXTAYL3UJF',
    title: 'The Blemish + Breakout Package',
    bestFor: 'Acne Care',
    price: '$2,300',
    iconName: 'SparklesIcon',
    image: '/eh_public_assets/Packages/The_Blemish+Breakout_Package.webp',
    description:
      'A comprehensive, results-focused skin transformation program designed to target active acne, congestion, and post-blemish marking at the source. This intensive series includes 10 corrective acne facials, strategically scheduled to restore balance, reduce inflammation, and support clearer, healthier-looking skin. Your plan also features progressive Cosmedix molecular peels to refine texture, improve tone, and accelerate cellular renewal, along with deeply nourishing hydration masks to maintain skin strength and barrier health throughout your journey. To support your results at home, you’ll receive one complimentary Cosmedix retail product — on us — personally selected to align with your target skin goals.',
  },
];

export const FEATURED_IDS = ['baby-bump', 'bridal'] as const;
