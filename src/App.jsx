import React from 'react'

import Footer from './components/Footer'
import Nav from './components/Nav'
import Features from './sections/Features'
import Hero from './sections/Hero'
import Pipeline from './sections/Pipeline'
import Problem from './sections/Problem'
import Quickstart from './sections/Quickstart'

export default function App() {
  return (
    <div id="top" className="min-h-screen overflow-x-hidden">
      <a
        href="#problem"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]
                   focus:rounded-lg focus:bg-brand-300 focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Pipeline />
        <Features />
        <Quickstart />
      </main>
      <Footer />
    </div>
  )
}
