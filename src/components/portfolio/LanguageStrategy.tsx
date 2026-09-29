import React from 'react';

export const LanguageStrategy: React.FC = () => {
  const languages = [
    {
      name: 'Santali (संताली)',
      script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
      speakers: '7.4M+ (Major in Santhal Pargana)',
      corpusStatus: 'Substantial Parallel Data',
      details:
        'Selected for Phase 1 deployment. Backed by verified Hindi-Santali parallel data from AdiBhashaa (IIT Delhi) and CIIL Mysore. Full Unicode Ol Chiki vector fonts embedded offline.',
      isCurrent: true
    },
    {
      name: 'Ho (हो)',
      script: 'Warang Citi (ᱣᱟᱨᱟᱝ ᱪᱤᱛᱤ) / Devanagari',
      speakers: '1.1M+ (West Singhbhum & Kolhan)',
      corpusStatus: 'Extremely Sparse Digital Corpus',
      details:
        'Identified in field evaluation as critical for Kolhan schools. Currently building acoustic and phonetic wordlists at BRCs to load via auxiliary 24MB pack.',
      isCurrent: false
    },
    {
      name: 'Mundari (मुंडारी)',
      script: 'Mundari Bani / Devanagari',
      speakers: '1.5M+ (Khunti & Ranchi Plateau)',
      corpusStatus: 'Fragmented Lexicons',
      details:
        'Phase 3 target. Architecture designed with modular SQLite schema to drop in Mundari dialect dictionaries without modifying the core speech pipeline.',
      isCurrent: false
    }
  ];

  return (
    <section id="language-strategy" className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#ddc0b8]/60 bg-[#fdf1ed]/50">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="text-[12px] uppercase tracking-wider text-[#9d3d1e] font-bold">
            Evidence-Based Language Strategy
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif-headline text-[#201a18] text-balance">
            Building where the linguistic data exists, architected to expand everywhere.
          </h2>
          <p className="text-[16px] text-[#56423c] leading-relaxed">
            Rather than making broad assumptions, VIDYA VANI evaluated digital corpora availability across Jharkhand's three dominant indigenous languages before writing a single line of model code.
          </p>
        </div>

        {/* 3-Language Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className={`p-6 rounded-2xl border-2 shadow-xs flex flex-col justify-between space-y-4 bg-white ${
                lang.isCurrent ? 'border-[#3a6848]' : 'border-[#ddc0b8]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      lang.isCurrent
                        ? 'bg-[#bbefc6] text-[#215031] border border-[#3a6848]'
                        : 'bg-[#f7ebe8] text-[#56423c] border border-[#ddc0b8]'
                    }`}
                  >
                    {lang.isCurrent ? 'Phase 1 Active in Dumka' : 'Phase 2 & 3 Roadmap'}
                  </span>
                  <span className="text-[11px] text-[#8a726b] font-medium">{lang.speakers}</span>
                </div>

                <h3 className="text-xl font-bold font-serif-headline text-[#201a18]">{lang.name}</h3>
                <div className="text-[12px] font-bold text-[#9d3d1e]">{lang.script}</div>

                <div className="p-2.5 rounded-lg bg-[#f7ebe8] text-[12px] text-[#56423c] font-bold border border-[#ddc0b8]">
                  Corpus: {lang.corpusStatus}
                </div>

                <p className="text-[13px] text-[#56423c] leading-relaxed">{lang.details}</p>
              </div>

              {lang.isCurrent && (
                <div className="pt-3 border-t border-[#ddc0b8] text-[12px] font-bold text-[#3a6848] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>1,200 Verified Native Recordings Loaded</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
