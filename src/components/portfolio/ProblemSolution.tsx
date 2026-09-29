import React from 'react';

export const ProblemSolution: React.FC = () => {
  return (
    <section id="problem" className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#ddc0b8]/60">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-[12px] uppercase tracking-wider text-[#9d3d1e] font-bold">
            The Foundational Literacy Crisis
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif-headline text-[#201a18] text-balance">
            The single largest bottleneck in Jharkhand's primary education.
          </h2>
          <p className="text-[16px] text-[#56423c] leading-relaxed">
            Every morning across 5,000+ tribal-belt primary schools in Dumka, Pakur, Sahebganj, and West Singhbhum, first-generation learners sit before Hindi-medium teachers. The language spoken at home is Santali, Ho, or Mundari. The language of textbooks and instructions is Hindi.
          </p>
        </div>

        {/* Comparison Grid: The Bottleneck vs The VIDYA VANI Intervention */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* The Traditional Bottleneck */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#ddc0b8] shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#ffdad6] text-[#93000a] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">error</span>
            </div>
            <h3 className="text-xl font-bold font-serif-headline text-[#201a18]">
              The Traditional Approach (Why MTB-MLE Stalled)
            </h3>
            <ul className="space-y-3 text-[14px] text-[#56423c]">
              <li className="flex items-start gap-2.5">
                <span className="text-[#ba1a1a] font-bold text-base mt-0.5">✕</span>
                <span>
                  <strong>Decade-long hiring lag:</strong> Attempting to recruit or retrain thousands of native Santali, Ho, and Mundari speakers leaves current cohorts unserved.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#ba1a1a] font-bold text-base mt-0.5">✕</span>
                <span>
                  <strong>Cloud-dependent EdTech failure:</strong> Apps requiring steady 4G or cloud connectivity crash in remote tribal villages where cellular reception is zero.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#ba1a1a] font-bold text-base mt-0.5">✕</span>
                <span>
                  <strong>Monolingual learning materials:</strong> Standard textbooks offer no bridge between Ol Chiki and Devanagari, leaving children lost during early phonemic awareness.
                </span>
              </li>
            </ul>
          </div>

          {/* The VIDYA VANI Solution */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#fdf1ed] border-2 border-[#9d3d1e] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#bbefc6] text-[#215031] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <h3 className="text-xl font-bold font-serif-headline text-[#9d3d1e]">
              The VIDYA VANI Paradigm (Classroom-Ready Today)
            </h3>
            <ul className="space-y-3 text-[14px] text-[#201a18]">
              <li className="flex items-start gap-2.5">
                <span className="text-[#3a6848] font-bold text-base mt-0.5">✓</span>
                <span>
                  <strong>Zero teacher retraining required:</strong> Hindi teachers speak or type naturally; the app synthesizes verified native Santali speech, phonetics, and Ol Chiki script.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#3a6848] font-bold text-base mt-0.5">✓</span>
                <span>
                  <strong>True 100% offline edge execution:</strong> Neural compact acoustic model, SQLite phrase dictionary, and worksheet generator run permanently on the tablet.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#3a6848] font-bold text-base mt-0.5">✓</span>
                <span>
                  <strong>NIPUN Bharat FLN alignment:</strong> Printable bilingual matching sheets, Choral Blackboard drills, and Ol Chiki finger tracing bridge children to Hindi joyfully.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
