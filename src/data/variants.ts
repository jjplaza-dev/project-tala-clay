import type { Dimensions, GlazeId, ProductVariant } from "@/domain";

// Fictional sample stock, lead times and sizes (A3). Fixture-building helper only: no app logic.
const G = {
  bs: "glaze-bone-speckle", eb: "glaze-ember-brown", mo: "glaze-moss",
  ag: "glaze-ash-grey", ho: "glaze-honey", rt: "glaze-raw-terracotta",
} as const satisfies Record<string, GlazeId>;

type Stock = ["r", number] | ["m", number] | ["s"]; // ready qty | made-to-order days | sold out

const v = (
  product: string, glazeId: GlazeId, size: string, dimensions: Dimensions,
  priceDelta: number, stock: Stock, sku: string,
): ProductVariant => ({
  id: `var-${sku.toLowerCase()}`,
  productId: `prod-${product}`,
  glazeId, size, dimensions, priceDelta, sku, isSample: true,
  stockStatus: stock[0] === "r" ? "ready_to_ship" : stock[0] === "m" ? "made_to_order" : "sold_out",
  quantityAvailable: stock[0] === "r" ? stock[1] : stock[0] === "s" ? 0 : undefined,
  leadTimeDays: stock[0] === "m" ? stock[1] : undefined,
});

const mug: Dimensions = { heightMm: 95, widthMm: 85, capacityMl: 300, weightG: 320 };
const mugL: Dimensions = { heightMm: 110, widthMm: 95, capacityMl: 400, weightG: 410 };
const cup: Dimensions = { heightMm: 70, widthMm: 75, capacityMl: 180, weightG: 190 };
const latte: Dimensions = { heightMm: 85, widthMm: 105, capacityMl: 350, weightG: 380 };
const bowlS: Dimensions = { heightMm: 60, widthMm: 130, capacityMl: 350, weightG: 300 };
const bowlM: Dimensions = { heightMm: 75, widthMm: 160, capacityMl: 650, weightG: 450 };
const bowlL: Dimensions = { heightMm: 90, widthMm: 200, capacityMl: 1100, weightG: 700 };
const noodle: Dimensions = { heightMm: 90, widthMm: 185, capacityMl: 800, weightG: 520 };
const pinch: Dimensions = { heightMm: 30, widthMm: 80, capacityMl: 60, weightG: 90 };
const plateS: Dimensions = { heightMm: 20, widthMm: 200, weightG: 420 };
const plateD: Dimensions = { heightMm: 25, widthMm: 260, weightG: 700 };
const side: Dimensions = { heightMm: 20, widthMm: 190, weightG: 400 };
const pasta: Dimensions = { heightMm: 40, widthMm: 245, capacityMl: 700, weightG: 750 };
const long: Dimensions = { heightMm: 35, widthMm: 420, depthMm: 140, weightG: 1100 };
const roundM: Dimensions = { heightMm: 30, widthMm: 320, weightG: 1000 };
const roundL: Dimensions = { heightMm: 35, widthMm: 380, weightG: 1400 };
const tray: Dimensions = { heightMm: 25, widthMm: 300, depthMm: 200, weightG: 800 };
const seedS: Dimensions = { heightMm: 90, widthMm: 90, weightG: 250 };
const seedM: Dimensions = { heightMm: 120, widthMm: 120, weightG: 420 };
const herb: Dimensions = { heightMm: 130, widthMm: 140, weightG: 550 };
const gardenM: Dimensions = { heightMm: 200, widthMm: 280, weightG: 2200 };
const gardenL: Dimensions = { heightMm: 280, widthMm: 360, weightG: 4200 };

export const variants: ProductVariant[] = [
  v("morning-mug", G.bs, "Standard", mug, 0, ["r", 6], "MUG-MRN-BS-STD"),
  v("morning-mug", G.eb, "Standard", mug, 0, ["r", 4], "MUG-MRN-EB-STD"),
  v("morning-mug", G.mo, "Standard", mug, 0, ["s"], "MUG-MRN-MO-STD"),
  v("morning-mug", G.eb, "Large", mugL, 8000, ["m", 21], "MUG-MRN-EB-LRG"),
  v("slow-tea-cup", G.bs, "Standard", cup, 0, ["r", 5], "CUP-SLW-BS-STD"),
  v("slow-tea-cup", G.ho, "Standard", cup, 0, ["r", 3], "CUP-SLW-HO-STD"),
  v("slow-tea-cup", G.ag, "Standard", cup, 0, ["m", 14], "CUP-SLW-AG-STD"),
  v("wide-latte-mug", G.ag, "Standard", latte, 0, ["r", 4], "MUG-LAT-AG-STD"),
  v("wide-latte-mug", G.mo, "Standard", latte, 0, ["r", 2], "MUG-LAT-MO-STD"),
  v("wide-latte-mug", G.ho, "Standard", latte, 0, ["s"], "MUG-LAT-HO-STD"),

  v("hearth-bowl", G.bs, "Small", bowlS, 0, ["r", 8], "BWL-HRT-BS-SML"),
  v("hearth-bowl", G.bs, "Medium", bowlM, 6000, ["r", 5], "BWL-HRT-BS-MED"),
  v("hearth-bowl", G.mo, "Medium", bowlM, 6000, ["m", 21], "BWL-HRT-MO-MED"),
  v("hearth-bowl", G.eb, "Large", bowlL, 14000, ["r", 2], "BWL-HRT-EB-LRG"),
  v("noodle-bowl", G.eb, "Standard", noodle, 0, ["r", 3], "BWL-NDL-EB-STD"),
  v("noodle-bowl", G.bs, "Standard", noodle, 0, ["r", 4], "BWL-NDL-BS-STD"),
  v("noodle-bowl", G.mo, "Standard", noodle, 0, ["m", 18], "BWL-NDL-MO-STD"),
  v("pinch-dish", G.ho, "Standard", pinch, 0, ["r", 10], "BWL-PNC-HO-STD"),
  v("pinch-dish", G.rt, "Standard", pinch, 0, ["r", 7], "BWL-PNC-RT-STD"),

  v("low-supper-plate", G.bs, "Side", plateS, 0, ["r", 8], "PLT-SUP-BS-SDE"),
  v("low-supper-plate", G.bs, "Dinner", plateD, 30000, ["r", 6], "PLT-SUP-BS-DIN"),
  v("low-supper-plate", G.ag, "Dinner", plateD, 30000, ["r", 4], "PLT-SUP-AG-DIN"),
  v("low-supper-plate", G.eb, "Dinner", plateD, 30000, ["m", 21], "PLT-SUP-EB-DIN"),
  v("side-plate", G.mo, "Standard", side, 0, ["r", 5], "PLT-SDE-MO-STD"),
  v("side-plate", G.ho, "Standard", side, 0, ["r", 3], "PLT-SDE-HO-STD"),
  v("pasta-plate", G.ag, "Standard", pasta, 0, ["r", 3], "PLT-PST-AG-STD"),
  v("pasta-plate", G.eb, "Standard", pasta, 0, ["m", 21], "PLT-PST-EB-STD"),
  v("pasta-plate", G.bs, "Standard", pasta, 0, ["s"], "PLT-PST-BS-STD"),

  v("long-platter", G.bs, "Standard", long, 0, ["r", 2], "SRV-LNG-BS-STD"),
  v("long-platter", G.eb, "Standard", long, 0, ["m", 28], "SRV-LNG-EB-STD"),
  v("round-platter", G.ag, "Medium", roundM, 0, ["r", 3], "SRV-RND-AG-MED"),
  v("round-platter", G.mo, "Medium", roundM, 0, ["r", 2], "SRV-RND-MO-MED"),
  v("round-platter", G.ho, "Large", roundL, 22000, ["m", 28], "SRV-RND-HO-LRG"),
  v("sharing-tray", G.bs, "Standard", tray, 0, ["r", 3], "SRV-TRY-BS-STD"),
  v("sharing-tray", G.rt, "Standard", tray, 0, ["s"], "SRV-TRY-RT-STD"),

  v("seedling-planter", G.rt, "Small", seedS, 0, ["r", 9], "PLN-SDL-RT-SML"),
  v("seedling-planter", G.bs, "Small", seedS, 0, ["r", 6], "PLN-SDL-BS-SML"),
  v("seedling-planter", G.rt, "Medium", seedM, 5000, ["r", 4], "PLN-SDL-RT-MED"),
  v("seedling-planter", G.mo, "Medium", seedM, 5000, ["m", 14], "PLN-SDL-MO-MED"),
  v("herb-pot", G.rt, "Standard", herb, 0, ["r", 5], "PLN-HRB-RT-STD"),
  v("herb-pot", G.ho, "Standard", herb, 0, ["r", 3], "PLN-HRB-HO-STD"),
  v("herb-pot", G.ag, "Standard", herb, 0, ["m", 14], "PLN-HRB-AG-STD"),
  v("wide-garden-planter", G.rt, "Medium", gardenM, 0, ["r", 2], "PLN-WDE-RT-MED"),
  v("wide-garden-planter", G.bs, "Medium", gardenM, 0, ["r", 2], "PLN-WDE-BS-MED"),
  v("wide-garden-planter", G.ag, "Large", gardenL, 30000, ["m", 28], "PLN-WDE-AG-LRG"),
];
