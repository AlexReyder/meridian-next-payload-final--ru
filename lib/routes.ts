export type Locale = 'ru' | 'en' | 'ar'
export type PageKey =
  | 'home'
  | 'solutions'
  | 'pricing'
  | 'get-proposal'
  | 'concepts'
  | 'for-startups'
  | 'for-partners'
  | 'method'

export const DEFAULT_LOCALE: Locale = 'ru'
export const RTL_LOCALES: Locale[] = ['ar']
export const LOCALES: Locale[] = ['ru', 'en', 'ar']

export const PAGE_KEYS: PageKey[] = [
  'home',
  'solutions',
  'pricing',
  'get-proposal',
  'concepts',
  'for-startups',
  'for-partners',
  'method',
]

export const PAGE_KEY_OPTIONS = PAGE_KEYS.map((value) => ({
  label: value,
  value,
}))

const ROUTE_MAP: Record<PageKey, Record<Locale, string[]>> = {
  home: {
    ru: [],
    en: ['en'],
    ar: ['ar'],
  },
  solutions: {
    ru: ['solutions'],
    en: ['en', 'solutions'],
    ar: ['ar', 'solutions'],
  },
  pricing: {
    ru: ['pricing'],
    en: ['en', 'pricing'],
    ar: ['ar', 'pricing'],
  },
  'get-proposal': {
    ru: ['get-proposal'],
    en: ['en', 'get-proposal'],
    ar: ['ar', 'get-proposal'],
  },
  concepts: {
    ru: ['concepts'],
    en: ['en', 'concepts'],
    ar: ['ar', 'concepts'],
  },
  'for-startups': {
    ru: ['for-startups'],
    en: ['en', 'for-startups'],
    ar: ['ar', 'for-startups'],
  },
  'for-partners': {
    ru: ['for-agencies'],
    en: ['en', 'for-partners'],
    ar: ['ar', 'for-partners'],
  },
  method: {
    ru: ['method'],
    en: ['en', 'how-we-work'],
    ar: ['ar', 'how-we-work'],
  },
}

export function isRTL(locale: Locale) {
  return RTL_LOCALES.includes(locale)
}

export function getLocaleDirection(locale: Locale) {
  return isRTL(locale) ? 'rtl' : 'ltr'
}

export function getHrefForPageKey(pageKey: PageKey, locale: Locale): string {
  const segments = ROUTE_MAP[pageKey][locale]
  return segments.length ? `/${segments.join('/')}` : '/'
}

export function resolveLocaleAndPageKey(
  segments?: string[],
): {
  locale: Locale
  pageKey: PageKey
} | null {
  const normalized = segments ?? []

  for (const [pageKey, routesByLocale] of Object.entries(ROUTE_MAP) as Array<
    [PageKey, Record<Locale, string[]>]
  >) {
    for (const locale of Object.keys(routesByLocale) as Locale[]) {
      const candidate = routesByLocale[locale]

      for (const variant of getRouteCandidates(locale, candidate)) {
        if (
          variant.length === normalized.length &&
          variant.every((part, index) => part === normalized[index])
        ) {
          return { locale, pageKey }
        }
      }
    }
  }

  return null
}

function getRouteCandidates(locale: Locale, candidate: string[]) {
  if (locale !== 'ru') {
    return [candidate]
  }

  return [candidate, ['ru', ...candidate]]
}

export function getLanguageSwitcher(pageKey: PageKey) {
  return [
    {
      code: 'RU',
      label: 'Русский',
      locale: 'ru' as const,
      href: getHrefForPageKey(pageKey, 'ru'),
    },
    {
      code: 'EN',
      label: 'English',
      locale: 'en' as const,
      href: getHrefForPageKey(pageKey, 'en'),
    },
    {
      code: 'AR',
      label: 'العربية',
      locale: 'ar' as const,
      href: getHrefForPageKey(pageKey, 'ar'),
    },
  ]
}

export function getLocaleFromSegments(segments?: string[]): Locale {
  const first = segments?.[0]

  if (first === 'ru' || first === 'en' || first === 'ar') {
    return first
  }

  return DEFAULT_LOCALE
}


export function stripLocalePrefix(segments?: string[]) {
  const normalized = segments ?? []

  if (
    normalized[0] === 'ru' ||
    normalized[0] === 'en' ||
    normalized[0] === 'ar'
  ) {
    return normalized.slice(1)
  }

  return normalized
}

export function normalizeSlug(value: string) {
  return value.trim().replace(/^\/+|\/+$/g, '')
}

export function buildHrefFromSlug(slug: string, locale: Locale) {
  const normalized = normalizeSlug(slug)

  if (!normalized) {
    return getHrefForPageKey('home', locale)
  }

  return locale === DEFAULT_LOCALE
    ? `/${normalized}`
    : `/${locale}/${normalized}`
}