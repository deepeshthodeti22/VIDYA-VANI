import React from 'react';

export const PillarsSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Truly Offline-First, Not Offline-Tolerant',
      summary:
        'Translation, voice synthesis, and worksheet generation run entirely on-device. Cloud sync exists only to push vocabulary updates and pull teacher corrections at the Cluster Centre. The classroom experience never depends on connectivity, solving the actual deployment reality of remote tribal schools.',
      badge: 'Edge-Native',
      color: '#9d3d1e'
    },
    {
      num: '02',
      title: 'Built for the Hardware That Exists, Not What We Wish Existed',
      summary:
        'The entire pipeline is engineered for ≥2GB RAM, Android 9+ tablets — the low-cost devices realistically procured for state-wide public school rollouts. The neural compact speech engine sits locked in a tiny 240MB RAM footprint, leaving plenty of headroom for low-power ARM64 SOCs.',
      badge: '≥ 2GB RAM / Android 9+',
      color: '#3a6848'
    },
    {
      num: '03',
      title: 'A Phrase-Database-First Architecture',
      summary:
        'The highest-stakes classroom content — instructions spoken directly to young children — is served from a fast, reviewable local SQLite database. Machine translation (NLLB-200) is reserved strictly for genuinely novel phrases. This is safer, faster, and far more auditable than a black-box translation model.',
      badge: 'Local SQLite + NLLB Fallback',
      color: '#8d4b00'
    },
    {
      num: '04',
      title: 'A Governance-Grade Data Pipeline',
      summary:
        'Every phrase carries an explicit provenance source and validation status ("Verified Local Match" vs "Machine Translated — Pending Review"). This gives the Department of School Education and Literacy (JEPC) a transparent, auditable approval path for deployment across 5,000+ schools and thousands of children.',
      badge: 'JEPC Auditable',
      color: '#201a18'
    },
    {
      num: '05',
      title: 'A Data-Driven, Evidence-Based Language Strategy',
      summary:
        'Rather than assuming any tribal language would work immediately, we evaluated Ho, Mundari, and Santali directly. Ho had almost no usable digital parallel corpus; Santali had real, substantial Hindi-parallel data (AdiBhashaa, IIT Delhi). We engineered where evidence pointed, with an architecture ready to extend to Ho and Mundari next.',
      badge: 'Corpus-Backed (Santali ➔ Ho & Mundari)',
      color: '#9d3d1e'
    }
  ];

  return (
    <section id="pillars" className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#ddc0b8]/60 bg-[#fff8f6]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-[12px] uppercase tracking-wider text-[#9d3d1e] font-bold">
            Engineering Rigor
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif-headline text-[#201a18] text-balance">
            Why VIDYA VANI wins where other approaches fail.
          </h2>
          <p className="text-[16px] text-[#56423c] leading-relaxed">
            Most EdTech pilots fail in rural government schools because they assume high-end hardware, continuous cellular towers, or unchecked black-box AI. VIDYA VANI was architected from the field up around 5 immutable engineering realities.
          </p>
        </div>

        {/* Technical Architecture Visual Banner */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#ddc0b8] shadow-sm bg-white p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <img
                src="/assets/images/vidya_vani_offline_diagram_1790701639723.jpg"
                alt="VIDYA VANI Offline-First Architecture Diagram"
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-xl border border-[#ddc0b8] object-cover shadow-xs"
              />
            </div>
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[11px] font-bold text-[#9d3d1e] uppercase tracking-wider">
                System Topology • Dual-Engine Engine
              </span>
              <h3 className="text-xl font-bold font-serif-headline text-[#201a18]">
                Deterministic Local Phrase DB with Intelligent Neural Fallback
              </h3>
              <p className="text-[14px] text-[#56423c] leading-relaxed">
                92% of everyday primary classroom spoken instructions (greetings, silence, roll call, book opening) hit the pre-compiled, linguistically-verified SQLite index with sub-100ms response time. Novel phrases route to the quantized NLLB-200 local fallback and get marked for master teacher audit.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[12px]">
                <span className="px-2.5 py-1 bg-[#f7ebe8] text-[#9d3d1e] rounded font-bold border border-[#ddc0b8]">
                  384 MB Total Memory Footprint
                </span>
                <span className="px-2.5 py-1 bg-[#bbefc6] text-[#215031] rounded font-bold border border-[#3a6848]">
                  Zero Cloud Roundtrip in Class
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* The 5 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="p-6 rounded-2xl bg-white border-2 border-[#ddc0b8] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#9d3d1e] transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-serif-headline text-[#9d3d1e] tabular-nums">
                    {p.num}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#f7ebe8] text-[#56423c] border border-[#ddc0b8]">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-serif-headline text-[#201a18] leading-snug">
                  {p.title}
                </h3>
                <p className="text-[14px] text-[#56423c] leading-relaxed">{p.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
