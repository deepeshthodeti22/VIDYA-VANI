/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/portfolio/Header';
import { Hero } from './components/portfolio/Hero';
import { ProblemSolution } from './components/portfolio/ProblemSolution';
import { PillarsSection } from './components/portfolio/PillarsSection';
import { InteractiveAppSection } from './components/portfolio/InteractiveAppSection';
import { LanguageStrategy } from './components/portfolio/LanguageStrategy';
import { ImpactGovernance } from './components/portfolio/ImpactGovernance';
import { Footer } from './components/portfolio/Footer';

export default function App() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#201a18] flex flex-col font-sans selection:bg-[#ffdbd0] selection:text-[#3a0b00]">
      {/* Top Header */}
      <Header
        onScrollTo={scrollToSection}
        onLaunchApp={() => scrollToSection('interactive-app')}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreApp={() => scrollToSection('interactive-app')}
          onReadPillars={() => scrollToSection('pillars')}
        />

        {/* Foundational Problem & Solution */}
        <ProblemSolution />

        {/* The 5 Pillars: Why VIDYA VANI Wins */}
        <PillarsSection />

        {/* Live Interactive App (The 9 Screens Simulator) */}
        <InteractiveAppSection />

        {/* Evidence-based Language Strategy */}
        <LanguageStrategy />

        {/* Public Systems Governance & Frugal Hardware */}
        <ImpactGovernance />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
