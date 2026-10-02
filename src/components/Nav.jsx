import React, { useEffect, useState } from 'react'
import { Cloud, Menu, X } from 'lucide-react'

import { Button } from './ui'
import { cn } from '../lib/utils'

const LINKS = [
  ['Problem', '#problem'],
  ['Architecture', '#how'],
  ['Features', '#features'],
  ['Quickstart', '#quickstart'],
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-ink-900/85 backdrop-blur-xl ring-1 ring-white/[0.07]' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg bg-brand-300/12
                       text-brand-300 ring-1 ring-brand-300/25"
          >
            <Cloud size={17} aria-hidden="true" />
          </span>
          <span className="text-[1.05rem] font-semibold tracking-tight text-white">
            CloudGuard
          </span>
        </a>

        <ul className="ml-6 hidden items-center gap-1 md:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="rounded-lg px-3 py-2 text-sm text-white/60 transition-colors
                           hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <Button as="a" href="#quickstart" size="sm" className="hidden sm:inline-flex">
            Run locally
          </Button>
          <button
            type="button"
            className="rounded-lg p-2 text-white/70 hover:bg-white/5 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <Menu size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/[0.07] bg-ink-900/95 backdrop-blur-xl md:hidden">
          <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
