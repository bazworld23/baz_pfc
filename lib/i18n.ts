// lib/i18n.ts
export const locales = ['en', 'el'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function resolveLocale(raw: string): Locale {
  return (locales as readonly string[]).includes(raw) ? (raw as Locale) : defaultLocale;
}

export type Dictionary = Record<string, unknown>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const mod = (await import(`../dictionaries/${locale}.json`)) as { default: Dictionary };
  return mod.default;
}
