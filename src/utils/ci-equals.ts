export function ciEquals(a: string, b: string) {
  return a.localeCompare(b, undefined, {sensitivity: "accent"}) === 0;
}
