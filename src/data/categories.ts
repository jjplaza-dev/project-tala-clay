import type { Category } from "@/domain";

export const categories: Category[] = [
  {
    id: "cat-mugs",
    slug: "mugs",
    name: "Mugs",
    intro:
      "Mugs shaped to sit comfortably in the hand. Handles, walls and glaze run a little differently on every one, so no two feel quite alike.",
    artKind: "mug",
  },
  {
    id: "cat-bowls",
    slug: "bowls",
    name: "Bowls",
    intro:
      "Bowls for soup, grain, fruit or simply holding things. We make them in a few depths so you can pick what suits your table.",
    artKind: "bowl",
  },
  {
    id: "cat-plates",
    slug: "plates",
    name: "Plates",
    intro:
      "Plates with a calm, low profile and a little weight. Rims and glaze edges are finished by hand, and small variations are part of them.",
    artKind: "plate",
  },
  {
    id: "cat-serving-ware",
    slug: "serving-ware",
    name: "Serving Ware",
    intro:
      "Platters and serving pieces for sharing a meal. Larger forms, made in smaller runs, with room for the food to be the centre of attention.",
    artKind: "platter",
  },
  {
    id: "cat-planters",
    slug: "planters",
    name: "Planters",
    intro:
      "Planters for herbs, cuttings and small plants. Each has a drainage hole and, where noted, a matching saucer.",
    artKind: "planter",
  },
];
