import React from 'react'
import { AlertTriangle, EyeOff, TrendingDown } from 'lucide-react'

import { Card, Reveal, Section, SectionHeading } from '../components/ui'
import { PROBLEMS } from '../lib/content'

const ICONS = [TrendingDown, AlertTriangle, EyeOff]

export default function Problem() {
  return (
    <Section id="problem">
      <SectionHeading
        eyebrow="The gap"
        title="Monitoring tells you what happened. Not what is about to."
        body="Dashboards are full of accurate numbers about the past. The three questions that actually cost money are all about the future."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {PROBLEMS.map((problem, index) => {
          const Icon = ICONS[index]
          return (
            <Reveal key={problem.title} delay={index * 0.08}>
              <Card className="group h-full">
                {/* Top light edge that brightens on hover. */}
                <span
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent
                             via-white/20 to-transparent opacity-60 transition-opacity
                             group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] text-brand-300">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{problem.title}</h3>
                <p className="mt-2.5 text-[0.94rem] leading-relaxed text-white/60">
                  {problem.body}
                </p>
                <p className="mt-5 border-t border-white/[0.07] pt-4 text-sm text-brand-200/85">
                  {problem.stat}
                </p>
              </Card>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
