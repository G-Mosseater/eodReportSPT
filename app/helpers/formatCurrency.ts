export function formatIsk(value: number) {
  return value.toLocaleString("is-IS", { style: "currency", currency: "ISK" });
}
