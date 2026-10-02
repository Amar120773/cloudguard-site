import React from 'react'
import { cva } from 'class-variance-authority'
import { motion, useReducedMotion } from 'motion/react'

import { cn } from '../lib/utils'

/* ------------------------------------------------------------------ button */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium ' +
    'transition-all duration-200 whitespace-nowrap disabled:opacity-50 ' +
    'disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-300 text-ink-950 hover:bg-brand-200 hover:-translate-y-0.5 ' +
          'shadow-[0_0_32px_-8px_rgba(0,242,254,0.5)] hover:shadow-[0_0_44px_-6px_rgba(0,242,254,0.7)]',
        secondary:
          'bg-white/5 text-white ring-hairline hover:bg-white/10 hover:-translate-y-0.5',
        ghost: 'text-white/70 hover:text-white hover:bg-white/5',
      },
      size: {
        sm: 'h-9 px-3.5 text-sm',
        md: 'h-11 px-5 text-[0.95rem]',
        lg: 'h-13 px-7 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export function Button({ className, variant, size, as: Tag = 'button', ...props }) {
  return <Tag className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

/* ------------------------------------------------------------------- badge */
export function Badge({ children, className, icon: Icon }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5',
        'text-xs font-medium tracking-wide text-white/75 ring-hairline',
        className,
      )}
    >
      {Icon && <Icon size={13} className="text-brand-300" aria-hidden="true" />}
      {children}
    </span>
  )
}

/* -------------------------------------------------------------------- card */
export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-ink-850/60 p-6 ring-hairline',
        'backdrop-blur-sm transition-colors duration-300 hover:bg-ink-800/70',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/* ----------------------------------------------------------------- section */
export function Section({ id, className, children, ...props }) {
  return (
    <section
      id={id}
      className={cn('relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28', className)}
      {...props}
    >
      {children}
    </section>
  )
}

export function SectionHeading({ eyebrow, title, body, align = 'center' }) {
  return (
    <div
      className={cn(
        'mb-14 max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {body && <p className="mt-4 text-pretty text-base leading-relaxed text-white/60">{body}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ reveal */
/**
 * Scroll-reveal that cannot leave content invisible.
 *
 * A naive `initial={{ opacity: 0 }}` + `whileInView` hides everything below the
 * fold until an IntersectionObserver fires. If it never fires — a crawler that
 * does not scroll, a JS error, an unusual viewport — the page renders blank
 * below the hero. Two guards prevent that:
 *
 *   1. prefers-reduced-motion renders the final state directly.
 *   2. A watchdog forces the visible state shortly after mount, so the effect
 *      is an enhancement rather than a prerequisite for seeing the content.
 */
export function Reveal({ children, delay = 0, className, y = 18 }) {
  const reduced = useReducedMotion()
  const [forced, setForced] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setForced(true), 1600)
    return () => clearTimeout(timer)
  }, [])

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={forced ? { opacity: 1, y: 0 } : undefined}
      // amount: 0 triggers as soon as any pixel enters the viewport, which is
      // far more reliable than a negative margin on tall cards.
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ mono */
export function Code({ children, className }) {
  return (
    <code
      className={cn(
        'rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-brand-200',
        className,
      )}
    >
      {children}
    </code>
  )
}
