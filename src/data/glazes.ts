import type { GlazeColor } from "@/domain";

// Fictional sample glazes (A3). The studio replaces names, hexes and notes.
export const glazes: GlazeColor[] = [
  {
    id: "glaze-bone-speckle",
    name: "Bone Speckle",
    hex: "#E6DDCB",
    finishNote: "Soft off-white with iron flecks that vary piece to piece.",
    textureKind: "speckle",
    isSample: true,
  },
  {
    id: "glaze-ember-brown",
    name: "Ember Brown",
    hex: "#7A4B36",
    finishNote: "Warm brown that pools darker where the glaze runs thick.",
    textureKind: "reactive",
    isSample: true,
  },
  {
    id: "glaze-moss",
    name: "Moss",
    hex: "#7C8567",
    finishNote: "Muted green with a satin surface and gentle tonal shifts.",
    textureKind: "satin",
    isSample: true,
  },
  {
    id: "glaze-ash-grey",
    name: "Ash Grey",
    hex: "#A6A49B",
    finishNote: "Quiet matte grey, slightly chalky to the touch.",
    textureKind: "matte",
    isSample: true,
  },
  {
    id: "glaze-honey",
    name: "Honey",
    hex: "#C9A25A",
    finishNote: "Amber glaze that deepens toward the rim and base.",
    textureKind: "satin",
    isSample: true,
  },
  {
    id: "glaze-raw-terracotta",
    name: "Raw Terracotta",
    hex: "#B4694B",
    finishNote: "Unglazed clay body outside, with a glazed interior where noted.",
    textureKind: "raw",
    isSample: true,
  },
];
