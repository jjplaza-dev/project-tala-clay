import type { CareGuideSection, CareNote } from "@/domain";

// General guidance only (A5). Confirm against the studio's actual glaze and firing.
const confirm =
  " Please confirm details for your glaze with the studio, as this is general guidance.";

export const careNotes: CareNote[] = [
  {
    id: "care-mugs",
    title: "Caring for mugs",
    body:
      "Wash by hand with a soft sponge and mild soap, and dry fully before stacking. Avoid sudden temperature changes." +
      confirm,
    appliesTo: { kind: "category", categoryId: "cat-mugs" },
    isSample: true,
  },
  {
    id: "care-bowls",
    title: "Caring for bowls",
    body:
      "Rinse soon after use and wash gently by hand. Let the foot ring dry fully so it does not stay damp on a surface." +
      confirm,
    appliesTo: { kind: "category", categoryId: "cat-bowls" },
    isSample: true,
  },
  {
    id: "care-plates",
    title: "Caring for plates",
    body:
      "Wash by hand, stack with a cloth or paper between pieces, and avoid sliding them against each other." +
      confirm,
    appliesTo: { kind: "category", categoryId: "cat-plates" },
    isSample: true,
  },
  {
    id: "care-serving-ware",
    title: "Caring for serving ware",
    body:
      "Support large pieces from underneath when lifting, and wash by hand. Store flat rather than leaning on an edge." +
      confirm,
    appliesTo: { kind: "category", categoryId: "cat-serving-ware" },
    isSample: true,
  },
  {
    id: "care-planters",
    title: "Caring for planters",
    body:
      "Use the drainage hole and a saucer to protect furniture. Empty standing water and wipe the outside with a damp cloth." +
      confirm,
    appliesTo: { kind: "category", categoryId: "cat-planters" },
    isSample: true,
  },
];

export const careGuideSections: CareGuideSection[] = [
  {
    id: "guide-mugs",
    title: "Mugs",
    steps: ["Rinse after use.", "Wash by hand with a soft sponge and mild soap.", "Dry fully before stacking."],
    dos: ["Warm a cold mug with warm water first", "Hang or stand mugs so air can reach the inside"],
    donts: ["Pour boiling water into a cold mug", "Use abrasive pads on the glaze"],
    categoryId: "cat-mugs",
    isSample: true,
  },
  {
    id: "guide-bowls",
    title: "Bowls",
    steps: ["Rinse soon after use.", "Wash gently by hand.", "Dry the foot ring before putting away."],
    dos: ["Soak stuck-on food briefly in warm water", "Stack with a soft cloth between bowls"],
    donts: ["Leave food sitting for days", "Knock the rim against the tap"],
    categoryId: "cat-bowls",
    isSample: true,
  },
  {
    id: "guide-plates",
    title: "Plates",
    steps: ["Scrape, rinse and wash by hand.", "Dry upright or on a rack.", "Stack with a cloth between plates."],
    dos: ["Use a soft sponge", "Lift plates rather than sliding them"],
    donts: ["Cut hard on the glaze with sharp knives", "Stack wet plates"],
    categoryId: "cat-plates",
    isSample: true,
  },
  {
    id: "guide-serving-ware",
    title: "Serving ware",
    steps: ["Support from underneath with both hands.", "Wash by hand.", "Store flat."],
    dos: ["Let the piece reach room temperature gradually", "Use a trivet for hot dishes"],
    donts: ["Carry by the rim alone", "Move straight from freezer to oven"],
    categoryId: "cat-serving-ware",
    isSample: true,
  },
  {
    id: "guide-planters",
    title: "Planters",
    steps: ["Check the drainage hole is clear.", "Place on a saucer.", "Wipe the outside with a damp cloth."],
    dos: ["Empty saucers of standing water", "Move heavy planters empty"],
    donts: ["Leave water standing in a planter without drainage", "Drag across rough surfaces"],
    categoryId: "cat-planters",
    isSample: true,
  },
  {
    id: "guide-handling-storage",
    title: "Handling and storage",
    steps: ["Keep pieces away from table edges.", "Store with cloth between stacked pieces.", "Keep out of reach of small children and pets where possible."],
    dos: ["Hold bowls and plates from underneath", "Dry pieces fully before storing"],
    donts: ["Stack heavy items on delicate rims", "Store damp"],
    isSample: true,
  },
  {
    id: "guide-troubleshooting",
    title: "Troubleshooting",
    steps: ["Light marks: try a soft cloth with a little baking soda paste.", "Chips or cracks: stop using the piece for food and contact the studio.", "Questions about glaze: ask us before trying new cleaners."],
    dos: ["Photograph any damage when writing to the studio"],
    donts: ["Keep using a cracked piece for food or hot drinks"],
    isSample: true,
  },
];
