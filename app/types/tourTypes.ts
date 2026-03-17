export type tourTypes =
  | "Whale Watching"
  | "Puffin Tour"
  | "Sea Angling"
  | "RIB Express"
  | "Northern Lights"
  | "Puffin by RIB"
  | "Private";

export const tourOptions = {
  "Whale Watching": {
    boats: ["Andrea", "Lilja", "Rosin", "Other"],
    hours: ["09:00", "10:00", "13:00", "14:00", "17:00", "21:00"],
  },
  "Puffin Tour": {
    boats: ["Skuli", "Rosin", "Other"],
    hours: ["06:00", "07:00", "08:00"],
  },
  "Sea Angling": {
    boats: ["Rosin", "Other"],
    hours: ["17:00"],
  },
  "Northern Lights": {
    boats: ["Andrea", "Lilja", "Rosin", "Other"],
    hours: ["21:00", "22:00"],
  },
  "RIB Express": {
    boats: ["Dagmar", "Katla", "Other"],
    hours: ["09:00", "10:00", "11:00", "13:00", "14:00", "16:00"],
  },
  "Puffin by RIB": {
    boats: ["Dagmar", "Katla", "Other"],
    hours: ["12:00"],
  },
};
