export function capitalize(value: string) {
  const [first = "", ...rest] = value;
  return first.toUpperCase() + rest.join("").toLowerCase();
}
