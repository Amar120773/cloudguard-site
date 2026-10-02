import React from 'react'
import { Cloud } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-8 w-8 place-items-center rounded-lg bg-brand-300/12
                         text-brand-300 ring-1 ring-brand-300/25"
            >
              <Cloud size={16} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">CloudGuard</p>
              <p className="text-xs text-white/35">
                AI-powered cloud cost and security intelligence
              </p>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-white/30 sm:ml-auto sm:max-w-sm sm:text-right">
            A prototype running against a mocked AWS account. Figures on this page are measured
            from the running stack; there are no customer references because there are none yet.
          </p>
        </div>
      </div>
    </footer>
  )
}
