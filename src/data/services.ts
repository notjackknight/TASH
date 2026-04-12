export const categories = [
  'All',
  'Facials',
  'Lashes',
  'Brows',
  'Advanced',
  'Waxing',
  'Finishing',
] as const;

export type ServiceCategory = (typeof categories)[number];

export const categoryMeta: Record<
  Exclude<ServiceCategory, 'All'>,
  { iconName: string; label: string }
> = {
  Facials: { iconName: 'SparklesIcon', label: 'Facial Protocol' },
  Lashes: { iconName: 'EyeIcon', label: 'Lash Enhancement' },
  Brows: { iconName: 'QuillWrite01Icon', label: 'Brow Studio' },
  Advanced: { iconName: 'DiamondIcon', label: 'Advanced Treatment' },
  Waxing: { iconName: 'FeatherIcon', label: 'Waxing Service' },
  Finishing: { iconName: 'Sun03Icon', label: 'Finishing Touch' },
};

export type Service = {
  title: string;
  desc: string;
  price: string;
  category: Exclude<ServiceCategory, 'All'>;
  squareItemId: string;
};

export const BOOKING_BASE =
  'https://book.squareup.com/appointments/lu0cj345hv4hr2/location/LVZVXGQCTDSJM';

export const services: Service[] = [
  // ─── Top picks (cross-category, for "All" preview) ───────
  {
    title: 'The Signature Haus Facial',
    desc: 'A luxurious, customized skincare service designed to address individual needs through professional-grade treatments and deep relaxation. A balanced approach to skin health, suitable for all skin types.',
    price: '$100',
    category: 'Facials',
    squareItemId: 'EQHOWXLBUOJOLW3DZP4WM66X',
  },
  {
    title: 'Brow Wax',
    desc: 'Precise shaping and definition for a clean, polished look. Gentle techniques ensure easy removal and long-lasting results, customized to enhance your facial features.',
    price: '$28',
    category: 'Brows',
    squareItemId: 'SAYKUPRLNC4VBLOBQKG7HUKI',
  },

  // ─── Facials (popularity order) ──────────────────────────
  {
    title: 'Hydraglow Haus Facial',
    desc: 'Combines advanced hydration via our hydro-facial machine with rejuvenating skincare to leave your skin glowing and refreshed. Add on the Hydra-Plane Haus Facial to level up the glow and rejuvenation.',
    price: '$160',
    category: 'Facials',
    squareItemId: 'ETTV4JN6AK35VESGH6GWS4XJ',
  },
  {
    title: 'The Dermaplane Haus Facial',
    desc: 'A gentle yet powerful treatment that exfoliates the skin by removing dead skin cells and peach fuzz, leaving your complexion instantly smoother, brighter, and glowing \u2014 with enhanced product absorption and flawless makeup application.',
    price: '$130',
    category: 'Facials',
    squareItemId: '3ZY7ALQGYG3QMMQIXXIXO3VU',
  },
  {
    title: 'Brightening Haus Facial',
    desc: 'Designed to restore radiance and even skin tone. Uses gentle exfoliants and molecular peels from Cosmedix to correct hyperpigmentation, dullness, and discoloration \u2014 leaving your complexion smooth, refreshed, and visibly glowing.',
    price: '$120',
    category: 'Facials',
    squareItemId: 'TPROWVTAIZIZEGMQJAJL2AJ6',
  },
  {
    title: 'Acne Haus Detox Facial',
    desc: 'A targeted skincare service designed to deeply cleanse pores, rejuvenate skin, and combat blemishes. A customized facial plan to help you achieve a refreshed, clarified complexion.',
    price: '$150',
    category: 'Facials',
    squareItemId: '7X26S4PCSB2ZHPBZVWNUW6X2',
  },
  {
    title: 'Haus Express Facial',
    desc: 'Designed for quick yet effective skin rejuvenation, leaving your skin feeling fresh and revitalized in minimal time. The perfect facial for those on a tight schedule wanting professional care and convenience in one appointment.',
    price: '$85',
    category: 'Facials',
    squareItemId: '223D7DYZVC4LRKWXOBG45O5S',
  },
  {
    title: 'Calm Haus Facial',
    desc: 'A personalized skincare service using Cosmedix to nourish your skin with their premium ingredients. Leaving the haus soothed, hydrated, and radiant.',
    price: '$110',
    category: 'Facials',
    squareItemId: 'Y7TOZFUMBYKF6OI3TEH4ISRA',
  },
  {
    title: 'Timeless Haus Facial',
    desc: 'A rejuvenating service designed to target signs of aging while providing deep hydration using Cosmedix custom ingredients. Hydrogen-oxygen infusion deeply hydrates and energizes the skin, ultrasonic and hydro exfoliation gently remove dead skin cells, and galvanic or high-frequency therapy stimulates circulation. Red LED light therapy supports collagen production and skin tightening \u2014 restoring a smoother, firmer, more youthful complexion.',
    price: '$165',
    category: 'Facials',
    squareItemId: 'U7D6APTFN7O62BDURZ5K2F7H',
  },
  {
    title: 'Haus Hydrogen Oxygen Facial',
    desc: 'A rejuvenating treatment that infuses the skin with hydrogen-rich oxygen to deeply hydrate, refresh, and revitalize the complexion. Helps neutralize free radicals, improve circulation, and enhance radiance \u2014 leaving the skin plumper, smoother, and more youthful.',
    price: '$150',
    category: 'Facials',
    squareItemId: 'KNGXACYJ4ME6TDR3GAK6DJXS',
  },
  {
    title: 'Haus Back Facial',
    desc: 'A nourishing treatment designed to deeply cleanse and rejuvenate the skin on your back. Promotes hydration, clarity, and skin health \u2014 ideal for a refreshed and polished appearance.',
    price: '$105',
    category: 'Facials',
    squareItemId: 'XHXCLU4XQGQCMCOCHU4HTVGT',
  },

  // ─── Lashes (popularity order) ───────────────────────────
  {
    title: 'Classic Haus Fill',
    desc: 'Must have 50% or more lashes on to be considered a fill.',
    price: '$75',
    category: 'Lashes',
    squareItemId: 'JUDECILCHC6MPZLY7UIU6CC5',
  },
  {
    title: 'Haus Wispy Dream Fill',
    desc: 'Must have 50% or more lashes on to be considered a fill.',
    price: '$60',
    category: 'Lashes',
    squareItemId: '5KEBDL53UWWHA3HXIIVKQVIN',
  },
  {
    title: 'The Haus of Wispy Dreams Full Set',
    desc: 'A luxurious lash set inspired by a mix of hybrid and classic styles, creating a gentle, fluffy fullness that\u2019s customized just for you.',
    price: '$150',
    category: 'Lashes',
    squareItemId: 'BGHJY7MV4OTC6Y73PWEUP3DL',
  },
  {
    title: 'Classic Haus Full Set',
    desc: 'Enhances your natural lashes with a clean, subtle finish. Customized and tailored to complement your beautiful features.',
    price: '$200',
    category: 'Lashes',
    squareItemId: 'VWRWBTJE5NMO3ZMUCVPKHG63',
  },
  {
    title: 'Signature Haus Lash Lift + Tint',
    desc: 'Take your natural lashes to the next level. Instant results with a lifted, curled appearance.',
    price: '$114',
    category: 'Lashes',
    squareItemId: 'J5GGVHIWT4BBITA4Y7NS2UXX',
  },
  {
    title: 'The Power Haus Fill',
    desc: 'You need to have at least 50% of your lashes to be considered a fill.',
    price: '$90',
    category: 'Lashes',
    squareItemId: 'MC5XIDIRL3S4RV2RDYD5DDJX',
  },
  {
    title: 'The Power House Volume Full Set',
    desc: 'No mega volumes in this haus \u2014 but definitely some power and dramatic lashes to create a gorgeously fluffy set.',
    price: '$250',
    category: 'Lashes',
    squareItemId: 'OHKASGYJVHQDJN6OH24ZNYMU',
  },
  {
    title: 'The Haus Korean Lash Lift',
    desc: 'Experience the next level of lash enhancement. A premium treatment designed to nourish, lift, and define your natural lashes using advanced Korean lash technology \u2014 delivering a soft, natural curl with a glossy, healthy finish while prioritizing lash strength and integrity. Perfect for all lash types, with minimal maintenance and long-lasting results. No extensions, no mascara required.',
    price: '$125',
    category: 'Lashes',
    squareItemId: 'QVTGFV6ARPB3SLFENDCX62F7',
  },
  {
    title: 'Mini Haus Lash Touch Up',
    desc: 'The Esthetic Haus created mini fills for those who need a tiny refresh or want to add on more lashes but aren\u2019t quite ready for a full fill.',
    price: 'Variable',
    category: 'Lashes',
    squareItemId: 'ZO5DX44DH7GEHP7VVBGCFR66',
  },
  {
    title: 'Signature Haus Lash Tint',
    desc: 'Enhances your natural lashes by adding depth and definition for a darker, more polished look without mascara. A quick treatment with long-lasting color for effortless, everyday beauty.',
    price: '$30',
    category: 'Lashes',
    squareItemId: 'E2SZHLTMSLY242RNY247KH3Q',
  },
  {
    title: 'The Haus Lash Removal',
    desc: 'Using Lost Artistry\u2019s lash removal, we leave you bare with all your natural lashes free to breathe. Say goodbye to the oldies.',
    price: '$60',
    category: 'Lashes',
    squareItemId: 'E3ZOWMSDIZZ3YAA7UYMIUEZJ',
  },

  // ─── Brows (popularity order) ────────────────────────────
  {
    title: 'Brow Code Brow Tint',
    desc: 'Enhance your natural brows with long-lasting color, tailored to complement your features.',
    price: '$20',
    category: 'Brows',
    squareItemId: '5RS3CVMFLEH3OWZYQMTQHQK6',
  },
  {
    title: 'Signature Haus Brow Lamination',
    desc: 'Effortlessly fluffy, lifted brows. Restructures the brow hairs to enhance shape, symmetry, and fullness. Includes a 2-step treatment, tint or stain, and a brow wax.',
    price: '$110',
    category: 'Brows',
    squareItemId: 'DXATBITA37H7BIZ7FWP5CDMF',
  },
  {
    title: 'Brow Code Hybrid Brow Stain',
    desc: 'An innovative formula that achieves fuller, longer-lasting brow results.',
    price: '$25',
    category: 'Brows',
    squareItemId: '7L6SE5WXXJCTKEF4ZUBK335S',
  },

  // ─── Advanced Treatments (popularity order) ──────────────
  {
    title: 'Haus Microneedling Treatment',
    desc: 'A targeted skincare service designed to stimulate collagen production, reduce the appearance of fine lines, and promote overall skin rejuvenation. Ideal for enhancing skin texture and tone with minimal downtime.',
    price: '$250',
    category: 'Advanced',
    squareItemId: 'SA2EAMUB4UAOBDVT2LQYVKIJ',
  },
  {
    title: 'Cosmedix Molecular Peels',
    desc: 'A professional-grade exfoliating treatment using advanced formulas to gently yet effectively remove dull surface skin and stimulate cellular renewal. Combines vitamin A complexes, fruit acids, and antioxidants to improve texture, smooth fine lines, reduce pigmentation, and reveal a brighter, more even-toned complexion \u2014 with minimal irritation and downtime compared to traditional peels.',
    price: 'Variable',
    category: 'Advanced',
    squareItemId: 'WDWISQ6C7IRCMGNK7KVINUWU',
  },
  {
    title: 'The Haus of LED Therapy',
    desc: 'A non-invasive skin treatment that uses different colors of light to help heal skin, reduce acne, calm inflammation, and boost collagen \u2014 safe, gentle, and painless. Available as an add-on or stand-alone service. As a stand-alone, it includes a double cleanse, skin analysis, toning, mask, and LED.',
    price: '$100',
    category: 'Advanced',
    squareItemId: 'HMDDWN4SKFGQDXQ4FJFYACFG',
  },
  {
    title: 'Haus Scalp Treatment and Massage',
    desc: 'A deep scalp reset designed to cleanse, stimulate, and get your crown back in alignment. Luxe scalp treatment plus a stress-melting massage for healthy roots and total relaxation.',
    price: '$60',
    category: 'Advanced',
    squareItemId: 'CSTCGZYSOR5ND5ICTT4T64JR',
  },
  {
    title: 'Haus of Hydrated Lip Mask',
    desc: 'Provides intensive hydration and nourishment for your lips. Add it on to a service or enjoy as a stand-alone treatment.',
    price: '$15',
    category: 'Advanced',
    squareItemId: 'NWYCOO7LPMJM2NLA62QI46HN',
  },

  // ─── Waxing (popularity order) ───────────────────────────
  {
    title: 'Haus Lip Wax',
    desc: 'Precise hair removal for smooth, well-defined lips. Quick, effective, and easy to add to any appointment.',
    price: '$10',
    category: 'Waxing',
    squareItemId: 'VIL7CKVYIRTJG3EBEUVCES7Y',
  },
  {
    title: 'Haus Face Wax',
    desc: 'Brow, lip, chin, and sideburns \u2014 all in one polished service.',
    price: '$50',
    category: 'Waxing',
    squareItemId: 'R65RGCKUYCJ2ZMDKCR6KTAX7',
  },
  {
    title: 'The Haus Underarm Wax',
    desc: 'Quick, effective hair removal for smooth, clean underarms. Leaves skin feeling fresh, soft, and polished with long-lasting results.',
    price: '$40',
    category: 'Waxing',
    squareItemId: 'AVMGUJB7RNSVVJWAQPXZJGVQ',
  },
  {
    title: 'The Haus Full Leg Wax',
    desc: 'A thorough and precise hair removal treatment from ankle to thigh, leaving skin smooth and silky. Ideal for those seeking a professional and efficient hair removal solution.',
    price: '$110',
    category: 'Waxing',
    squareItemId: '5V7OQRYVQ33HXERIU3JQ5J4H',
  },
  {
    title: 'Haus Half Leg Wax',
    desc: 'Efficient hair removal from the knee down for smooth, long-lasting results. Suitable for all skin types and a consistently polished appearance.',
    price: '$80',
    category: 'Waxing',
    squareItemId: 'IF73WKDIH4OUZJDAKTA6FXDA',
  },
  {
    title: 'The Haus Full Arm Wax',
    desc: 'Removes unwanted hair from shoulder to wrist, leaving your arms smooth, clean, and polished. Quick and effective with long-lasting results and a flawless finish.',
    price: '$95',
    category: 'Waxing',
    squareItemId: 'ZPH5V5SJJOI25ICAR5PKSGJ4',
  },
  {
    title: 'Haus Stomach Wax',
    desc: 'A precise and efficient stomach waxing service designed to provide smooth, hair-free skin.',
    price: '$75',
    category: 'Waxing',
    squareItemId: 'QTM5OXMZDODU24ZGJT3YK2Q4',
  },

  // ─── Finishing Touches (popularity order) ────────────────
  {
    title: 'The Haus Spray Tan',
    desc: 'A custom, natural-looking tan using premium Norvell solutions for even application and long-lasting results. Tailored to your skin tone for a flawless, sun-kissed glow.',
    price: '$60',
    category: 'Finishing',
    squareItemId: 'AWHB5P3EXD5KMBX5UC3UPPDH',
  },
  {
    title: 'Pearly White Haus Teeth Whitening',
    desc: 'A professional, appointment-based service designed to help you achieve a brighter, more confident smile. Fast, effective whitening tailored to your needs in a comfortable setting \u2014 three rounds for a flat fee, with all the same products you\u2019d find at a dental office.',
    price: '$200',
    category: 'Finishing',
    squareItemId: '5TZJZTKCHDADJ4MO4T7AVTIA',
  },
  {
    title: 'Haus of Gems',
    desc: 'Tooth gems made with authentic Swarovski crystals, designed to add a subtle sparkle or bold shine to your smile. Professionally applied with safe dental-grade adhesive \u2014 comfortable, non-invasive, and lasting over a year with proper care. Stylish, durable, and removable by a professional.',
    price: '$70 / gem',
    category: 'Finishing',
    squareItemId: 'NESA7DNU7ARGLY6EWI2UYE7R',
  },
];
