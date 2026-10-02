import React from 'react'
import {
  Clock, HeartPulse, PlugZap, ShieldAlert, Sparkles, TrendingUp, Workflow,
} from 'lucide-react'

import { Card, Reveal, Section, SectionHeading } from '../components/ui'
import { FEATURES, INSIGHT_SAMPLE } from '../lib/content'
import { cn } from '../lib/utils'

const ICONS = { TrendingUp, ShieldAlert, Sparkles, Workflow, Clock, HeartPulse, PlugZap }

export default function Features() {
  return (
    <Section id="features">
      <SectionHeading
        eyebrow="What it does"
        title="Two models, one honest dashboard"
        body="Every number on screen comes out of a pipeline. Nothing is hardcoded, and when a pipeline has not run the UI says so rather than showing a plausible zero."
      />

      {/* Bento: the two headline capabilities get double width. */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => {
          const Icon = ICONS[feature.icon]
          return (
            <Reveal key={feature.title} delay={(index % 3) * 0.06} className={feature.span}>
              <Card className="group h-full">
                <div className="flex items-start gap-3.5">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.06]
                               text-brand-300 transition-colors group-hover:bg-brand-300/15"
                  >
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[1.02rem] font-semibold leading-snug text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-white/60">
                      {feature.body}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          )
        })}
      </div>

      {/* ------------------------------------------- anatomy of an insight */}
      <Reveal delay={0.15}>
        <div className="mt-20 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              An alert you can act on
            </h3>
            <p className="mt-4 text-pretty leading-relaxed text-white/60">
              A score on its own is not actionable. Every finding pairs the metric with the model
              signal behind it and the action it implies — and the event is named after whichever
              feature actually deviated, not a rule written for that attack.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                ['Metric', 'the raw number that moved'],
                ['Model signal', 'the score and how far from baseline'],
                ['Action', 'what to do about it'],
              ].map(([term, meaning]) => (
                <li key={term} className="flex items-baseline gap-3">
                  <span className="w-28 shrink-0 font-medium text-brand-200">{term}</span>
                  <span className="text-white/50">{meaning}</span>
                </li>
              ))}
            </ul>
          </div>

          <InsightCard insight={INSIGHT_SAMPLE} />
        </div>
      </Reveal>
    </Section>
  )
}

function InsightCard({ insight }) {
  return (
    <div className="rounded-2xl bg-ink-850/70 p-6 ring-hairline">
      <div className="flex flex-wrap items-center gap-2.5">
        <span
          className={cn(
            'rounded-full bg-critical/15 px-2.5 py-1 text-[11px] font-bold tracking-wide',
            'text-critical ring-1 ring-critical/30',
          )}
        >
          {insight.severity}
        </span>
        <span className="text-xs text-white/35">via {insight.model}</span>
      </div>

      <h4 className="mt-4 text-lg font-semibold leading-snug text-white">{insight.title}</h4>

      <p className="mt-4 text-2xl font-semibold tracking-tight text-critical">{insight.metric}</p>

      <p
        className="mt-4 border-l-2 border-series-1 bg-white/[0.035] px-3.5 py-2.5 font-mono
                   text-[12px] leading-relaxed text-white/55"
      >
        {insight.signal}
      </p>

      <p className="mt-4 text-[0.92rem] leading-relaxed text-white/60">{insight.narrative}</p>

      <p className="mt-5 border-t border-dashed border-white/10 pt-4 text-[0.92rem] text-white/85">
        <span className="font-semibold text-brand-200">Action: </span>
        {insight.action}
      </p>
    </div>
  )
}
