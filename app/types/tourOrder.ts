export type tours =
  | "whale-watching"
  | "puffin-tour"
  | "sea-angling"
  | "rib-express"
  | "northern-lights"
  | "puffin-by-rib";

export const tourOrder: tours[] = [
  "whale-watching",
  "rib-express",
  "northern-lights",
  "puffin-by-rib",
  "puffin-tour",
  "sea-angling",
];


export const tourLabels: Record<tours, string> = {
  "whale-watching": "Whale Watching",
  "puffin-tour": "Puffin Tour",
  "sea-angling": "Sea Angling",
  "rib-express": "RIB Express",
  "northern-lights": "Northern Lights",
  "puffin-by-rib": "Puffin by RIB",
};