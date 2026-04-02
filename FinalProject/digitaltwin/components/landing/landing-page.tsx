import Link from "next/link";

import { FeatureGrid } from "./feature-grid";
import { HeroMockup } from "./hero-mockup";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.24em] text-white/90 uppercase"
          >
            Aurora
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-white/55 md:flex">
            <a className="transition-colors hover:text-white" href="#features">
              Features
            </a>
            <a className="transition-colors hover:text-white" href="#studio">
              Studio
            </a>
            <a className="transition-colors hover:text-white" href="#contact">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Start now
          </a>
        </header>

        <main className="flex flex-1 flex-col justify-center gap-14 py-12 lg:py-16">
          <section className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl">
              <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-[0.24em] text-white/65 uppercase">
                Crafted for modern teams
              </p>

              <h1 className="mt-6 max-w-xl text-5xl leading-tight font-semibold text-balance sm:text-6xl lg:text-7xl">
                A landing page that feels premium from the first glance.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
                A clean, modular layout with reusable components, soft motion,
                and a strong visual hierarchy designed to keep the page easy to
                maintain.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
                >
                  Explore the experience
                </a>
                <a
                  href="#features"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  View features
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/55">
                <div>
                  <div className="text-2xl font-semibold text-white">12+</div>
                  polished sections
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">100%</div>
                  reusable components
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">1</div>
                  minimal page entry point
                </div>
              </div>
            </div>

            <HeroMockup />
          </section>

          <FeatureGrid />
        </main>
      </div>
    </div>
  );
}
