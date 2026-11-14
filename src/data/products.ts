import type { ArtKind, GlazeId, Product, ProductImage } from "@/domain";
import { glazes } from "./glazes";

// Fictional sample products and prices (A3), in centavos (PHP).
const batch =
  "Made in small batches. Shape, texture and glaze vary slightly from piece to piece, and that is part of what makes each one yours.";
const common = { currency: "PHP", madeBatchNote: batch, isSample: true } as const;

export const products: Product[] = [
  { ...common, id: "prod-morning-mug", slug: "morning-mug", name: "Morning Mug", categoryId: "cat-mugs", basePrice: 98000, careNoteIds: ["care-mugs"], isFeatured: true,
    summary: "A sturdy everyday mug with a handle that fits two fingers comfortably.",
    description: "We throw the Morning Mug with a slightly thick wall so it holds warmth, then finish the base and rim by hand. It suits coffee, tea or a late-night cocoa." },
  { ...common, id: "prod-slow-tea-cup", slug: "slow-tea-cup", name: "Slow Tea Cup", categoryId: "cat-mugs", basePrice: 78000, careNoteIds: ["care-mugs"], isFeatured: false,
    summary: "A small handleless cup for unhurried tea.",
    description: "Wide enough to cool quickly and small enough to refill often. The unglazed foot gives it a good grip in the palm." },
  { ...common, id: "prod-wide-latte-mug", slug: "wide-latte-mug", name: "Wide Latte Mug", categoryId: "cat-mugs", basePrice: 108000, careNoteIds: ["care-mugs"], isFeatured: false,
    summary: "A broad, low mug made for milky drinks and soup.",
    description: "A generous opening and a wide base keep it steady on the table. Two hands around it feels about right." },

  { ...common, id: "prod-hearth-bowl", slug: "hearth-bowl", name: "Hearth Bowl", categoryId: "cat-bowls", basePrice: 120000, careNoteIds: ["care-bowls"], isFeatured: true,
    summary: "An all-purpose bowl in three sizes, deep enough for soup and wide enough for grain.",
    description: "The Hearth Bowl is our most-used form in the studio. The curve inside is shaped so a spoon follows it easily." },
  { ...common, id: "prod-noodle-bowl", slug: "noodle-bowl", name: "Noodle Bowl", categoryId: "cat-bowls", basePrice: 135000, careNoteIds: ["care-bowls"], isFeatured: false,
    summary: "A tall, wide bowl for noodles and brothy meals.",
    description: "Higher sides keep broth in, and the flared rim gives your chopsticks somewhere to rest." },
  { ...common, id: "prod-pinch-dish", slug: "pinch-dish", name: "Pinch Dish", categoryId: "cat-bowls", basePrice: 45000, careNoteIds: ["care-bowls"], isFeatured: false,
    summary: "A tiny dish for salt, sauces or the things that lose themselves on a desk.",
    description: "Each one is pinched and pressed by hand, so you can see the fingerprints of how it was made." },

  { ...common, id: "prod-low-supper-plate", slug: "low-supper-plate", name: "Low Supper Plate", categoryId: "cat-plates", basePrice: 120000, careNoteIds: ["care-plates"], isFeatured: true,
    summary: "A calm, low plate in side and dinner sizes.",
    description: "A shallow well and a soft rim keep food where you put it. Glaze gathers a little darker at the edge." },
  { ...common, id: "prod-side-plate", slug: "side-plate", name: "Side Plate", categoryId: "cat-plates", basePrice: 95000, careNoteIds: ["care-plates"], isFeatured: false,
    summary: "A small plate for bread, fruit or a slice of cake.",
    description: "Light enough to pass around the table. It stacks neatly with our other plates." },
  { ...common, id: "prod-pasta-plate", slug: "pasta-plate", name: "Pasta Plate", categoryId: "cat-plates", basePrice: 165000, careNoteIds: ["care-plates"], isFeatured: false,
    summary: "A deep plate with a wide rim for pasta, salads and stews.",
    description: "Somewhere between a plate and a bowl. The rim is wide enough to set a fork down." },

  { ...common, id: "prod-long-platter", slug: "long-platter", name: "Long Platter", categoryId: "cat-serving-ware", basePrice: 320000, careNoteIds: ["care-serving-ware"], isFeatured: true,
    summary: "A long, narrow platter for fish, vegetables or a shared table spread.",
    description: "Slab-built and smoothed by hand, so the edges are slightly irregular. We make it in small runs only." },
  { ...common, id: "prod-round-platter", slug: "round-platter", name: "Round Platter", categoryId: "cat-serving-ware", basePrice: 280000, careNoteIds: ["care-serving-ware"], isFeatured: false,
    summary: "A round serving platter in two sizes.",
    description: "A wide, shallow form with a low lip. It works for cheese, roast vegetables or a centrepiece of fruit." },
  { ...common, id: "prod-sharing-tray", slug: "sharing-tray", name: "Sharing Tray", categoryId: "cat-serving-ware", basePrice: 190000, careNoteIds: ["care-serving-ware"], isFeatured: false,
    summary: "A rectangular tray for small plates and snacks.",
    description: "Shallow sides keep things in place without hiding them. Also useful on a dresser for keys and small objects." },

  { ...common, id: "prod-seedling-planter", slug: "seedling-planter", name: "Seedling Planter", categoryId: "cat-planters", basePrice: 85000, careNoteIds: ["care-planters"], isFeatured: true,
    summary: "A small planter with a drainage hole and matching saucer.",
    description: "Sized for cuttings, succulents and young herbs. The saucer is made together with the pot, so they match." },
  { ...common, id: "prod-herb-pot", slug: "herb-pot", name: "Herb Pot", categoryId: "cat-planters", basePrice: 110000, careNoteIds: ["care-planters"], isFeatured: false,
    summary: "A deeper pot with room for roots, made for kitchen windowsills.",
    description: "A straight wall and a weighted base keep it steady. It has a drainage hole and a saucer." },
  { ...common, id: "prod-wide-garden-planter", slug: "wide-garden-planter", name: "Wide Garden Planter", categoryId: "cat-planters", basePrice: 250000, careNoteIds: ["care-planters"], isFeatured: false,
    summary: "A wide planter for larger plants, in two sizes.",
    description: "Thick-walled and made in small runs. It is heavy once filled, so decide where it will live before planting." },
];

// [productId, artKind, default glaze] — drives the three image entries per product.
const imageSources: [string, ArtKind, GlazeId][] = [
  ["prod-morning-mug", "mug", "glaze-bone-speckle"],
  ["prod-slow-tea-cup", "mug", "glaze-honey"],
  ["prod-wide-latte-mug", "mug", "glaze-ash-grey"],
  ["prod-hearth-bowl", "bowl", "glaze-bone-speckle"],
  ["prod-noodle-bowl", "bowl", "glaze-ember-brown"],
  ["prod-pinch-dish", "bowl", "glaze-honey"],
  ["prod-low-supper-plate", "plate", "glaze-bone-speckle"],
  ["prod-side-plate", "plate", "glaze-moss"],
  ["prod-pasta-plate", "plate", "glaze-ash-grey"],
  ["prod-long-platter", "platter", "glaze-bone-speckle"],
  ["prod-round-platter", "platter", "glaze-ash-grey"],
  ["prod-sharing-tray", "platter", "glaze-raw-terracotta"],
  ["prod-seedling-planter", "planter", "glaze-raw-terracotta"],
  ["prod-herb-pot", "planter", "glaze-raw-terracotta"],
  ["prod-wide-garden-planter", "planter", "glaze-raw-terracotta"],
];

// Illustrated SVG views, not photographs. Optional `src` can be added when photography exists.
export const productImages: ProductImage[] = imageSources.flatMap(
  ([productId, artKind, glazeId]) => {
    const name = products.find((p) => p.id === productId)?.name ?? productId;
    const glaze = glazes.find((g) => g.id === glazeId)?.name ?? "";
    return [
      { id: `${productId}-primary`, productId, kind: "primary", artKind, view: "primary", glazeId,
        alt: `Illustration of the ${name} in ${glaze}, front view` },
      { id: `${productId}-top`, productId, kind: "angle", artKind, view: "top", glazeId,
        alt: `Illustration of the ${name} in ${glaze}, seen from above` },
      { id: `${productId}-detail`, productId, kind: "detail", artKind, view: "detail", glazeId,
        alt: `Illustrated close-up of the ${glaze} glaze and texture on the ${name}` },
    ] satisfies ProductImage[];
  },
);
