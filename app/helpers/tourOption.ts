import { tourOptions } from "./tours";

export function getPrivateOptions() {
  const allTours = Object.values(tourOptions);
  const hours: string[] = [];
  for (let h = 6; h <= 22; h++) {
    for (let m of [0, 15, 30, 45]) {
      const hourStr =
        h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0");
      hours.push(hourStr);
    }
  }
  const boats = [...new Set(allTours.flatMap((t) => t.boats))];

  return { boats, hours };
}
