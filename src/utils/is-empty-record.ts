export function isEmptyRecord(record: Record<PropertyKey, unknown>) {
  return Object.keys(record).length === 0;
}
