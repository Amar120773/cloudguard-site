import React from 'react'
import { ArrowRight } from 'lucide-react'

import { Code, Reveal, Section, SectionHeading } from '../components/ui'
import { PIPELINE } from '../lib/content'

export default function Pipeline() {
  return (
    <Section id="how">
      <SectionHeading
        eyebrow="Architecture"
        title="The models never run inside a request"
        body="A POST returns a task id in milliseconds. Celery does the work, Redis holds the result, and the dashboard polls until it lands — so a Prophet fit never blocks a page."
      />

      {/* --------------------------------------------------- pipeline rail */}
      <div className="relative">
        <div
          className="absolute left-0 right-0 top-[2.1rem] hidden h-px bg-gradient-to-r
                     from-transparent via-white/12 to-transparent lg:block"
          aria-hidden="true"
        />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PIPELINE.map((stage, index) => (
            <Reveal key={stage.step} delay={index * 0.07}>
              <li className="relative">
                <div
                  className="relative z-10 grid h-[4.2rem] w-[4.2rem] place-items-center
                             rounded-2xl bg-ink-850 ring-hairline"
                >
                  <span className="font-mono text-xs text-white/35">0{index + 1}</span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{stage.step}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">{stage.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* ------------------------------------------------- request contract */}
      <Reveal delay={0.2}>
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-ink-850/60 ring-hairline">
            <div className="border-b border-white/[0.07] px-5 py-3">
              <p className="font-mono text-[11px] text-white/40">the async contract</p>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed">
              <code>
                <span className="text-brand-300">POST</span>
                <span className="text-white/75"> /api/costs/forecast/run</span>
                {'\n'}
                <span className="text-white/35">{'→ 202  {"task_id": "abc", "status": "PENDING"}'}</span>
                {'\n\n'}
                <span className="text-brand-300">GET</span>
                <span className="text-white/75"> /api/tasks/abc</span>
                {'\n'}
                <span className="text-white/35">{'→ {"status": "PROCESSING", "progress": 55,'}</span>
                {'\n'}
                <span className="text-white/35">{'   "stage": "Fitting Prophet model"}'}</span>
                {'\n\n'}
                <span className="text-brand-300">GET</span>
                <span className="text-white/75"> /api/costs/forecast</span>
                {'\n'}
                <span className="text-good">{'→ 200  the cached forecast'}</span>
              </code>
            </pre>
          </div>

          <div className="flex flex-col justify-center gap-5 px-1">
            <Row label="Task submission" value="50–250 ms" note="against ~5 s of queued work" />
            <Row label="Cached reads" value="8–30 ms" note="dashboard, costs, security, cloud" />
            <Row label="Dashboard payload" value="7 KB" note="gzipped, polled every 20 s" />
            <Row label="Health check" value="11–18 ms" note="was 970 ms before the ping fix" />
            <p className="mt-1 text-sm leading-relaxed text-white/45">
              Degrades rather than fails: with Redis gone the cache falls back in-process, and
              with no worker the API runs the job on a thread and reports{' '}
              <Code>{'"executor": "inline"'}</Code> instead of pretending Celery handled it.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

function Row({ label, value, note }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-white/[0.06] pb-3">
      <span className="text-sm text-white/55">{label}</span>
      <span className="ml-auto font-mono text-base font-semibold tabular-nums text-white">
        {value}
      </span>
      <ArrowRight size={12} className="text-white/20" aria-hidden="true" />
      <span className="hidden text-xs text-white/35 sm:inline">{note}</span>
    </div>
  )
}
