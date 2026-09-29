import React from 'react';

interface HeaderProps {
  onScrollTo: (id: string) => void;
  onLaunchApp: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollTo, onLaunchApp }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#fff8f6]/95 backdrop-blur-md border-b border-[#ddc0b8] px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Zone: Clean single-element text wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl sm:text-2xl font-bold font-serif-headline tracking-tight text-[#9d3d1e]"
        >
          VIDYA VANI
        </a>

        {/* Navigation Links: Clean unboxed text with hover underline */}
        <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-[#56423c]">
          <button
            onClick={() => onScrollTo('problem')}
            className="hover:text-[#9d3d1e] transition-colors"
          >
            The Mission
          </button>
          <button
            onClick={() => onScrollTo('pillars')}
            className="hover:text-[#9d3d1e] transition-colors"
          >
            Why It Wins
          </button>
          <button
            onClick={() => onScrollTo('interactive-app')}
            className="text-[#9d3d1e] font-bold hover:underline transition-colors"
          >
            Live App Prototype
          </button>
          <button
            onClick={() => onScrollTo('language-strategy')}
            className="hover:text-[#9d3d1e] transition-colors"
          >
            Language Strategy
          </button>
          <button
            onClick={() => onScrollTo('governance')}
            className="hover:text-[#9d3d1e] transition-colors"
          >
            Governance &amp; Hardware
          </button>
        </nav>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onLaunchApp}
            className="px-4 py-2 text-[13px] font-bold text-white bg-[#9d3d1e] rounded-xl hover:bg-[#bd5533] transition-colors clay-btn whitespace-nowrap shadow-xs active:translate-y-0.5"
          >
            Launch Interactive App
          </button>
        </div>
      </div>
    </header>
  );
};
