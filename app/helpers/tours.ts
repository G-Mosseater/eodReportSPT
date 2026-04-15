export const tourOptions = {
  "whale-watching": {
    boats: ["Andrea", "Lilja", "Rosin", "Other"],
    hours: ["09:00", "10:00", "13:00", "14:00", "17:00", "21:00"],
  },
  "puffin-tour": {
    boats: ["Skuli", "Rosin", "Other"],
    hours: ["08:00", "09:30", "10:45", "12:30", "14:15", "15:30", "17:00"],
  },
  "sea-angling": {
    boats: ["Rosin", "Other"],
    hours: ["17:00"],
  },
  "northern-lights": {
    boats: ["Andrea", "Lilja", "Rosin", "Other"],
    hours: ["21:00", "22:00"],
  },
  "rib-express": {
    boats: ["Dagmar", "Katla", "Other"],
    hours: ["09:00", "10:00", "11:00", "13:00", "14:00", "16:00"],
  },
  "puffin-by-rib": {
    boats: ["Dagmar", "Katla", "Other"],
    hours: ["12:00"],
  },
};

export type TourKey = keyof typeof tourOptions;
