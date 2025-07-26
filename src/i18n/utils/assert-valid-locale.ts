export function assertValidLocale(locale: string) {
  try {
    new Intl.Locale(locale);
  } catch {
    throw new Error(`Invalid locale: ${locale}`);
  }
}
