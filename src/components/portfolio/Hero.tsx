import React from 'react';

interface HeroProps {
  onExploreApp: () => void;
  onReadPillars: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreApp, onReadPillars }) => {
  return (
    <section className="relative pt-10 sm:pt-16 pb-14 px-4 sm:px-8 border-b border-[#ddc0b8]/60">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Main Editorial Text Block */}
        <div className="max-w-4xl space-y-5">
          <div className="flex items-center gap-2 text-[13px] text-[#56423c]">
            <span className="text-[#9d3d1e] font-bold">PALASH MTB-MLE</span>
            <span aria-hidden="true">·</span>
            <span>NIPUN Bharat Foundational Literacy</span>
            <span aria-hidden="true">·</span>
            <span>Jharkhand Education Project Council</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif-headline text-[#201a18] leading-[1.15] text-balance">
            Turning every Hindi-speaking teacher into a mother-tongue instructor.
          </h1>

          <p className="text-lg sm:text-xl text-[#56423c] font-normal leading-relaxed text-balance">
            Over 5,000 tribal-area primary schools in Jharkhand deliver instruction only in Hindi — a language most students do not speak at home. VIDYA VANI bridges this foundational gap with an offline-first spoken translation engine, bilingual Ol Chiki worksheets, and interactive classroom pedagogical tools.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreApp}
              className="px-6 py-3.5 rounded-xl bg-[#9d3d1e] text-white font-bold text-[15px] hover:bg-[#bd5533] clay-btn transition active:translate-y-0.5 shadow-sm"
            >
              Test Live App Prototype
            </button>
            <button
              onClick={onReadPillars}
              className="px-6 py-3.5 rounded-xl bg-white text-[#201a18] border-2 border-[#ddc0b8] font-bold text-[15px] hover:bg-[#f7ebe8] transition active:translate-y-0.5"
            >
              Why VIDYA VANI Wins Where Others Fail
            </button>
          </div>
        </div>

        {/* Hero Visual: Authentic Classroom Photograph */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#ddc0b8] shadow-md bg-[#fdf1ed]">
          <img
            src="/src/assets/images/hero_vidya_vani_1790701613010.jpg"
            alt="Teacher and tribal Santali students in a primary school classroom in Jharkhand using a bilingual tablet"
            referrerPolicy="no-referrer"
            className="w-full h-[320px] sm:h-[460px] lg:h-[540px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
            <div className="max-w-2xl space-y-1">
              <span className="text-[12px] uppercase tracking-wider text-[#ffdbd0] font-bold">
                Field Deployment Reality • Dumka &amp; Santhal Pargana
              </span>
              <p className="text-[16px] sm:text-[18px] font-medium leading-snug">
                "VIDYA VANI doesn't ask the education system to wait years for enough native-language-trained teachers — it makes every existing Hindi-medium teacher classroom-ready today."
              </p>
            </div>
          </div>
        </div>

        {/* Quantitative Proof Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white border border-[#ddc0b8] shadow-xs space-y-1">
            <div className="text-3xl font-bold font-serif-headline text-[#9d3d1e] tabular-nums">5,000+</div>
            <div className="text-[13px] text-[#56423c] font-medium">Tribal Primary Schools</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#ddc0b8] shadow-xs space-y-1">
            <div className="text-3xl font-bold font-serif-headline text-[#3a6848] tabular-nums">250,000+</div>
            <div className="text-[13px] text-[#56423c] font-medium">Students Impacted</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#ddc0b8] shadow-xs space-y-1">
            <div className="text-3xl font-bold font-serif-headline text-[#8d4b00] tabular-nums">100%</div>
            <div className="text-[13px] text-[#56423c] font-medium">Offline On-Device</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#ddc0b8] shadow-xs space-y-1">
            <div className="text-3xl font-bold font-serif-headline text-[#201a18] tabular-nums">&lt; 1.8s</div>
            <div className="text-[13px] text-[#56423c] font-medium">Spoken Bridge Latency</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#ddc0b8] shadow-xs space-y-1 col-span-2 sm:col-span-1">
            <div className="text-3xl font-bold font-serif-headline text-[#56423c] tabular-nums">&ge; 2 GB</div>
            <div className="text-[13px] text-[#56423c] font-medium">Low-Cost Tablet RAM</div>
          </div>
        </div>
      </div>
    </section>
  );
};
