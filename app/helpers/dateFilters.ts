export const getMonths = () =>
  Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("en-US", { month: "long" }),
  );