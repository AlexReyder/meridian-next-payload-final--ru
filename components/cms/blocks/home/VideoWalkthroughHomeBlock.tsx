import Link from 'next/link'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'

import { getHrefForPageKey, isRTL, type Locale, type PageKey } from '@/lib/routes'
import { cn } from '@/lib/utils'

type TimelineItem = {
  number?: string | null
  label?: string | null
  description?: string | null
}

type LabelItem = {
  label?: string | null
}

type VideoWalkthroughHomeBlockData = {
  eyebrow?: string | null
  title?: string | null
  subheadline?: string | null
  metaBadges?: LabelItem[] | null
  videoLabel?: string | null
  durationLabel?: string | null
  timeline?: TimelineItem[] | null
  highlightsTitle?: string | null
  highlights?: LabelItem[] | null
  ctaTitle?: string | null
  ctaSubtext?: string | null
  primaryButtonLabel?: string | null
  primaryPageKey?: PageKey | null
  secondaryButtonLabel?: string | null
  secondaryPageKey?: PageKey | null
}

type Props = {
  block: VideoWalkthroughHomeBlockData
  locale: Locale
}

export function VideoWalkthroughHomeBlockComponent({ block, locale }: Props) {
  const rtl = isRTL(locale)

  return (
    <section
      dir={rtl ? 'rtl' : 'ltr'}
      className="relative overflow-hidden bg-[#1a1816] py-24 lg:py-32"
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className={cn('mb-16 lg:mb-20 max-w-3xl', rtl && 'text-right')}>
          <div className={cn('mb-6 flex items-center gap-3', rtl && 'flex-row-reverse')}>
            <div className="h-[1.5px] w-6 rounded-full bg-signature-cobalt" />
            <span
              className={cn(
                'text-[10px] text-signature-cobalt',
                rtl ? 'tracking-[0.15em]' : 'uppercase tracking-[0.2em]',
              )}
            >
              {block.eyebrow}
            </span>
          </div>

          <h2 className="mb-6 font-serif text-3xl font-light leading-tight text-background text-balance lg:text-4xl xl:text-5xl">
            {block.title}
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-background/70 lg:text-lg">
            {block.subheadline}
          </p>

          {block.metaBadges?.length ? (
            <div className={cn('mt-8 flex flex-wrap items-center gap-4', rtl && 'justify-start')}>
              {block.metaBadges.map((badge, index) =>
                badge?.label ? (
                  <span
                    key={`${badge.label}-${index}`}
                    className="rounded-sm border border-background/20 px-3 py-1.5 text-xs text-background/50"
                  >
                    {badge.label}
                  </span>
                ) : null,
              )}
            </div>
          ) : null}
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="group relative">
              <div className="relative aspect-video overflow-hidden rounded-sm border border-background/10 bg-[#0f0e0d] shadow-2xl shadow-black/40">
                <div className={cn('absolute top-0 z-20', rtl ? 'right-0' : 'left-0')}>
                  <div
                    className={cn(
                      'absolute top-0 h-[2px] w-8 bg-signature-cobalt',
                      rtl ? 'right-0 rounded-l-full' : 'left-0 rounded-r-full',
                    )}
                  />
                  <div
                    className={cn(
                      'absolute top-0 h-8 w-[2px] bg-signature-cobalt rounded-b-full',
                      rtl ? 'right-0' : 'left-0',
                    )}
                  />
                  <div
                    className={cn(
                      'absolute top-[2px] h-[1.5px] w-3 rounded-full bg-signature-brass/70',
                      rtl ? 'right-8' : 'left-8',
                    )}
                  />
                </div>

                <div className={cn('absolute bottom-0 z-20', rtl ? 'left-0' : 'right-0')}>
                  <div
                    className={cn(
                      'absolute bottom-0 h-[2px] w-8 bg-signature-cobalt/50',
                      rtl ? 'left-0 rounded-r-full' : 'right-0 rounded-l-full',
                    )}
                  />
                  <div
                    className={cn(
                      'absolute bottom-0 h-8 w-[2px] bg-signature-cobalt/50',
                      rtl ? 'left-0 rounded-t-full' : 'right-0 rounded-t-full',
                    )}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1816] via-[#0f0e0d] to-[#1a1816]">
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                      }}
                    />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-48 w-48 rounded-full border border-background/5" />
                    <div className="absolute h-64 w-64 rounded-full border border-background/[0.03]" />
                  </div>
                </div>

                <button
                  type="button"
                  className="group/play absolute inset-0 z-10 flex items-center justify-center"
                  aria-label={block.videoLabel ?? 'Video'}
                >
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-full border border-background/20 transition-colors duration-300 group-hover/play:border-background/40" />
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-background/30 bg-background/10 backdrop-blur-sm transition-all duration-300 group-hover/play:border-signature-cobalt/50 group-hover/play:bg-background/20">
                      <Play className={cn('h-8 w-8 fill-background/80 text-background', rtl ? 'mr-1' : 'ml-1')} />
                    </div>
                  </div>
                </button>

                <div className={cn('absolute bottom-4 z-20', rtl ? 'left-4' : 'right-4')}>
                  <span className="rounded-sm bg-black/40 px-2 py-1 text-[10px] uppercase tracking-wider text-background/60 backdrop-blur-sm">
                    {block.durationLabel}
                  </span>
                </div>

                <div className={cn('absolute top-4 z-20', rtl ? 'right-4' : 'left-4')}>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-signature-brass/80">
                    {block.videoLabel}
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-4 left-4 right-4 h-8 rounded-b-lg bg-gradient-to-b from-black/20 to-transparent blur-xl" />
            </div>

            {block.timeline?.length ? (
              <div className="mt-12 border-t border-background/10 pt-8">
                <div className={cn('flex items-start justify-between gap-2 overflow-x-auto pb-2', rtl && 'flex-row-reverse')}>
                  {block.timeline.map((step, index) => (
                    <div key={`${step.number}-${index}`} className="relative min-w-[100px] flex-1">
                      {index < block.timeline!.length - 1 ? (
                        <div
                          className={cn(
                            'absolute top-3 h-[1px]',
                            rtl
                              ? 'left-[calc(50%+16px)] right-0 bg-gradient-to-l from-background/20 to-background/10'
                              : 'left-[calc(50%+16px)] right-0 bg-gradient-to-r from-background/20 to-background/10',
                          )}
                        />
                      ) : null}

                      <div className="relative text-center">
                        <div
                          className={cn(
                            'mx-auto mb-2 flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-medium',
                            index === 0
                              ? 'border-signature-cobalt/30 bg-signature-cobalt/20 text-signature-cobalt'
                              : 'border-background/10 bg-background/5 text-background/40',
                          )}
                        >
                          {step.number}
                        </div>
                        <div className="mb-1 text-xs font-medium text-background/80">{step.label}</div>
                        <div className="hidden text-[10px] text-background/40 sm:block">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className={cn('flex flex-col lg:col-span-5', rtl && 'text-right')}>
            <div className="mb-10">
              <h3 className="mb-6 text-sm uppercase tracking-[0.1em] text-background/50">
                {block.highlightsTitle}
              </h3>

              <ul className="space-y-4">
                {block.highlights?.map((highlight, index) =>
                  highlight?.label ? (
                    <li key={`${highlight.label}-${index}`} className={cn('group flex items-start gap-3', rtl && 'flex-row-reverse')}>
                      <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-signature-cobalt/60 transition-colors group-hover:bg-signature-cobalt" />
                      <span className="text-sm leading-relaxed text-background/70 transition-colors group-hover:text-background/90">
                        {highlight.label}
                      </span>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>

            <div className="flex-grow" />

            <div className="rounded-sm border border-background/10 bg-background/[0.03] p-6 lg:p-8">
              <h3 className="mb-3 font-serif text-xl font-light text-background lg:text-2xl">
                {block.ctaTitle}
              </h3>

              <p className="mb-6 text-sm text-background/50">{block.ctaSubtext}</p>

              <div className={cn('flex flex-col gap-3 sm:flex-row', rtl && 'sm:flex-row-reverse')}>
                <Link
                  href={getHrefForPageKey(block.primaryPageKey ?? 'get-proposal', locale)}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-signature-cobalt px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-signature-cobalt/90"
                >
                  {rtl ? <ArrowLeft className="h-4 w-4" /> : null}
                  {block.primaryButtonLabel}
                  {!rtl ? <ArrowRight className="h-4 w-4" /> : null}
                </Link>

                <Link
                  href={getHrefForPageKey(block.secondaryPageKey ?? 'pricing', locale)}
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-background/20 px-5 py-3 text-sm font-medium text-background/80 transition-colors hover:border-background/40 hover:text-background"
                >
                  {block.secondaryButtonLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}