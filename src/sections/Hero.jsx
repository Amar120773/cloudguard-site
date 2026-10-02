import React from 'react'
import { ArrowRight, Blocks, Sparkles, TrendingUp } from 'lucide-react'

import { Badge, Button, Reveal } from '../components/ui'
import { METRICS } from '../lib/content'
import ForecastGlyph from '../components/ForecastGlyph'

export default function Hero() {
  return (
    <header className="relative overflow-hidden pt-32 pb-20 sm:pt-40 md:pb-28">
      {/* Layered background: masked grid, then two soft colour sources. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-18rem] -z-10 h-[34rem] w-[64rem]
                   -translate-x-1/2 rounded-full bg-brand-400/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-10rem] top-32 -z-10 h-[26rem] w-[26rem]
                   rounded-full bg-series-2/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* ------------------------------------------------------- copy */}
          <div>
            <Reveal>
              <Badge icon={Sparkles}>Prophet forecasting · IsolationForest detection</Badge>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                <span className="text-gradient">Stop guessing</span>
                <br />
                what your cloud costs.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/65">
                CloudGuard forecasts month-end spend before the invoice lands, and finds the
                security events hiding in routine traffic — two machine-learning pipelines
                behind one dashboard that stays responsive while they run.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button as="a" href="#quickstart" size="lg">
                  Run it locally
                  <ArrowRight size={17} aria-hidden="true" />
                </Button>
                <Button as="a" href="#how" variant="secondary" size="lg">
                  <Blocks size={17} aria-hidden="true" />
                  See how it works
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-5 text-sm text-white/40">
                No AWS account. No credentials. No cloud bill.
              </p>
            </Reveal>
          </div>

          {/* ----------------------------------------------- product glyph */}
          <Reveal delay={0.2} y={28}>
            <ForecastGlyph />
          </Reveal>
        </div>

        {/* ------------------------------------------------- metric strip */}
        <Reveal delay={0.3}>
          <dl
            className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl
                       bg-white/[0.07] ring-hairline lg:grid-cols-4"
          >
            {METRICS.map((metric) => (
              <div key={metric.label} className="bg-ink-900/90 px-5 py-6 text-center">
                <dd className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {metric.value}
                  {metric.unit && (
                    <span className="text-base font-normal text-white/45">{metric.unit}</span>
                  )}
                </dd>
                <dt className="mt-1.5 text-sm font-medium text-white/70">{metric.label}</dt>
                <p className="mt-1 text-xs text-white/35">{metric.detail}</p>
              </div>
            ))}
          </dl>
          <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-white/30">
            <TrendingUp size={12} aria-hidden="true" />
            Measured on the running stack, not estimated.
          </p>
        </Reveal>
      </div>
    </header>
  )
}
