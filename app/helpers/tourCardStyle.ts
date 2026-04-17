export const tourStyles = {
  "whale-watching": "bg-gradient-to-r from-sky-200/70 to-sky-400/15",
  "puffin-tour": "bg-gradient-to-r from-amber-100/70 to-amber-300/30",
  "sea-angling":
    "bg-gradient-to-r from-blue-100/70 via-blue-300/70 to-blue-300/30",
  "rib-express": "bg-gradient-to-r from-blue-300/40 to-indigo-500/30",
  "northern-lights": "bg-gradient-to-r from-violet-200/70 to-emerald-400/25",
  "puffin-by-rib": "bg-gradient-to-r from-gray-200/70 to-gray-400/30",
};

export const tourNameMap: Record<string, keyof typeof tourStyles> = {
  "Puffin Tours": "puffin-tour",

  "Whale Watching": "whale-watching",
  "Whale Watching by RIB": "rib-express",

  "Sea Angling": "sea-angling",

  "Northern Lights": "northern-lights",

  "Puffin by RIB": "puffin-by-rib",
};
