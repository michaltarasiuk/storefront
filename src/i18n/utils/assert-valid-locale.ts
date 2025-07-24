export function assertValidLocale(locale: string) {
  try {
    new Intl.Locale(locale);
  } catch {
    throw new Error(
      `The provided locale "${locale}" is not valid. ` +
        "Ensure it is a correct BCP 47 language tag.",
    );
  }
}
