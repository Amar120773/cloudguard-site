import React, { useState } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'

import { Button, Reveal, Section, SectionHeading } from '../components/ui'
import { STACK } from '../lib/content'

const COMMAND = `git clone <your-repo> cloudguard
cd cloudguard
cp .env.example .env
docker compose up --build`

export default function Quickstart() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COMMAND)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard is unavailable over plain HTTP or without permission; the
      // command is on screen to copy manually, so this needs no error state.
    }
  }

  return (
    <Section id="quickstart">
      <SectionHeading
        eyebrow="Get started"
        title="Four commands, no cloud account"
        body="Moto mocks the AWS account in-process. EC2, CloudWatch and CloudWatch Logs calls genuinely round-trip through the AWS API surface — with networking disabled, verified."
      />

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <Reveal>
          <div className="overflow-hidden rounded-2xl bg-ink-850/70 ring-hairline">
            <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3">
              <Terminal size={13} className="text-white/35" aria-hidden="true" />
              <span className="font-mono text-[11px] text-white/40">bash</span>
              <button
                type="button"
                onClick={copy}
                className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1
                           text-[11px] text-white/45 transition-colors hover:bg-white/5
                           hover:text-white"
              >
                {copied ? (
                  <>
                    <Check size={12} aria-hidden="true" /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} aria-hidden="true" /> Copy
                  </>
                )}
              </button>
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.9]">
              <code>
                {COMMAND.split('\n').map((line) => (
                  <div key={line}>
                    <span className="select-none text-white/25">$ </span>
                    <span className="text-white/80">{line}</span>
                  </div>
                ))}
              </code>
            </pre>

            <div className="grid gap-px border-t border-white/[0.07] bg-white/[0.06] sm:grid-cols-3">
              {[
                ['Dashboard', 'localhost:5173'],
                ['API docs', 'localhost:8000/docs'],
                ['Health', '/api/health'],
              ].map(([label, url]) => (
                <div key={label} className="bg-ink-850 px-5 py-4">
                  <p className="text-[11px] uppercase tracking-wider text-white/35">{label}</p>
                  <p className="mt-1 font-mono text-[12.5px] text-brand-200">{url}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col rounded-2xl bg-ink-850/70 p-6 ring-hairline">
            <h3 className="text-base font-semibold text-white">Built with</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {STACK.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-white/[0.055] px-2.5 py-1.5 text-[12.5px] text-white/65"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <p className="text-sm leading-relaxed text-white/50">
                331 tests across the backend and frontend, five health-checked containers, and
                both demo flows verified end to end.
              </p>
              <Button as="a" href="#how" variant="secondary" size="sm" className="mt-5">
                Read the architecture
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
