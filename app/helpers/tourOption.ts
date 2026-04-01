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




export const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];