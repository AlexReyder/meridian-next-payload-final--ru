'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Globe, Menu, X } from 'lucide-react'

import {
  DEFAULT_LOCALE,
  getHrefForPageKey,
  getLanguageSwitcher,
  type Locale,
  type PageKey,
} from '@/lib/routes'

type HeaderNavItem = {
  label?: string | null
  pageKey?: PageKey | null
}

type HeaderData = {
  brandName?: string | null
  brandTagline?: string | null
  navigation?: HeaderNavItem[] | null
  proposalButtonLabel?: string | null
  mobileLanguageLabel?: string | null
  menuAriaLabel?: string | null
}

type Props = {
  data?: HeaderData | null
  locale: Locale
  pageKey?: PageKey
  dir?: 'ltr' | 'rtl'
}

export function SiteHeader({
  data,
  locale,
  pageKey,
  dir = 'ltr',
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = () => setIsLangOpen(false)

    if (isLangOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isLangOpen])

  const isRTL = dir === 'rtl'
  const brandHref = getHrefForPageKey('home', locale)
  const ctaHref = getHrefForPageKey('get-proposal', locale)
 const currentLangCode = locale.toUpperCase()
const languages = pageKey ? getLanguageSwitcher(pageKey) : []

const navItems = (data?.navigation ?? []).filter(
  (item): item is Required<HeaderNavItem> =>
    Boolean(item?.label && item?.pageKey),
)

const isActive = (targetPageKey: PageKey) => {
  if (!mounted || !pageKey) return false
  return pageKey === targetPageKey
}

  return (
    <header
      dir={dir}
      className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={brandHref} className="flex items-center gap-3">
              <div className="flex flex-col gap-0.5">
                <div className="h-2 w-[3px] rounded-full bg-signature-cobalt" />
                <div className="h-1.5 w-[3px] rounded-full bg-signature-brass" />
              </div>

              <div className="flex flex-col">
                <span className="font-serif text-lg font-medium tracking-tight text-foreground">
                  {data?.brandName || 'Atelier Meridian'}
                </span>
                <span
                  className={`text-[10px] uppercase text-muted-foreground ${
                    isRTL ? 'tracking-[0.15em]' : 'tracking-[0.2em]'
                  }`}
                >
                  {data?.brandTagline || 'Product Architecture & Interface Studio'}
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              const href = getHrefForPageKey(item.pageKey!, locale)

              return (
                <Link
                  key={`${item.pageKey}-${item.label}`}
                  href={href}
                  className={`text-sm transition-colors duration-200 ${
                    isActive(item.pageKey!)
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLangOpen((prev) => !prev)
                }}
                className="flex items-center gap-1.5 px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{currentLangCode}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isLangOpen && (
                <div
                  className={`absolute top-full mt-2 z-50 min-w-[140px] rounded-sm border border-border bg-card py-1 shadow-lg ${
                    isRTL ? 'left-0' : 'right-0'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {languages.map((lang) => (
                    <Link
                      key={lang.locale}
                      href={lang.href}
                      onClick={() => setIsLangOpen(false)}
                      className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                        lang.locale === locale
                          ? 'bg-secondary/50 text-foreground'
                          : 'text-muted-foreground hover:bg-secondary/30 hover:text-foreground'
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span className="text-xs text-muted-foreground">{lang.locale.toUpperCase()}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={ctaHref}
              className={`hidden h-8 items-center justify-center rounded-md px-5 text-xs font-medium uppercase tracking-wider transition-colors md:inline-flex ${
                isActive('get-proposal')
                  ? 'border border-accent/40 bg-accent/20 text-foreground'
                  : 'bg-foreground text-background hover:bg-foreground/90'
              }`}
            >
              {data?.proposalButtonLabel || 'Get Proposal'}
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-2 text-foreground lg:hidden"
              aria-label={data?.menuAriaLabel || 'Toggle menu'}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="space-y-4 px-6 py-6">
            {navItems.map((item) => {
              const href = getHrefForPageKey(item.pageKey!, locale)

              return (
                <Link
                  key={`mobile-${item.pageKey}-${item.label}`}
                  href={href}
                  className={`block text-sm transition-colors ${
                    isActive(item.pageKey!)
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}

            <div className="border-t border-border pt-4">
              <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
                {data?.mobileLanguageLabel || 'Language'}
              </p>

              <div className="flex gap-3">
                {languages.map((lang) => (
                  <Link
                    key={`mobile-lang-${lang.locale}`}
                    href={lang.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-sm border px-3 py-1.5 text-sm transition-colors ${
                      lang.locale === locale
                        ? 'border-foreground text-foreground'
                        : 'border-border text-muted-foreground hover:border-foreground/50'
                    }`}
                  >
                    {lang.locale.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <Link
                href={ctaHref}
                className="flex h-10 w-full items-center justify-center rounded-md bg-foreground px-5 text-xs font-medium uppercase tracking-wider text-background transition-colors hover:bg-foreground/90"
                onClick={() => setIsMenuOpen(false)}
              >
                {data?.proposalButtonLabel || 'Get Proposal'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}