import React, { useState } from 'react';
import { WORKSHEET_TOPICS } from '../../data/mockData';
import { audioEngine } from '../../utils/audio';

interface WorksheetScreenProps {
  onBack: () => void;
}

export const WorksheetScreen: React.FC<WorksheetScreenProps> = ({ onBack }) => {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [selectedClass, setSelectedClass] = useState('कक्षा 1 व 2');
  const [savedOffline, setSavedOffline] = useState(false);

  const topic = WORKSHEET_TOPICS[selectedTopicIndex];

  const handlePrintOrExport = () => {
    audioEngine.playTapHaptic();
    window.print();
  };

  const handleSaveOffline = () => {
    audioEngine.playTapHaptic();
    setSavedOffline(true);
    setTimeout(() => setSavedOffline(false), 2200);
  };

  const handleGenerateNew = () => {
    audioEngine.playTapHaptic();
    setSelectedTopicIndex((prev) => (prev + 1) % WORKSHEET_TOPICS.length);
  };

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto px-4 pt-4 pb-32 space-y-5 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#ddc0b8]/60">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioEngine.playTapHaptic();
              onBack();
            }}
            aria-label="Go Back"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f7ebe8] hover:bg-[#f2e6e2] text-[#201a18] active:translate-y-0.5 border border-[#ddc0b8] transition"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-[18px] sm:text-[20px] font-bold font-serif-headline text-[#201a18] leading-tight">
              Worksheet Generator / कार्यपत्रिका निर्माण
            </h1>
            <p className="text-[12px] text-[#9d3d1e] font-bold">Vidya Vani Tribal Pedagogy Support</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#bbefc6] text-[#215031] border border-[#3a6848] text-[12px] font-bold">
            <span className="material-symbols-outlined text-[16px] mr-1">school</span>
            Grade 1-2 FLN
          </span>
          <div className="hidden sm:flex items-center text-[#3a6848] text-[12px] bg-[#f7ebe8] px-2.5 py-1 rounded-lg border border-[#ddc0b8]">
            <span className="material-symbols-outlined text-[16px] mr-1 text-[#3a6848]">cloud_done</span>
            Offline Ready
          </div>
        </div>
      </div>

      {/* NIPUN Bharat Header Banner */}
      <div className="w-full bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-2.5 text-[#854D0E] shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2 text-[13px]">
          <div className="flex items-center gap-2 font-bold tracking-tight">
            <span className="material-symbols-outlined text-[#B45309]">verified</span>
            <span>Aligned to NIPUN Bharat Learning Outcomes (FLN Mission Jharkhand)</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] bg-white/70 px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
            <span className="material-symbols-outlined text-[15px] text-[#B45309]">sync_alt</span>
            <span className="font-bold">FLN Goal:</span> Mother Tongue (Santali) to Hindi Transition
          </div>
        </div>
      </div>

      {/* Configuration Parameters */}
      <section className="bg-[#f7ebe8] border border-[#ddc0b8] rounded-2xl p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[#56423c] text-[11px] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              Worksheet Configuration Parameters
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Topic Selector */}
              <div className="relative">
                <select
                  value={selectedTopicIndex}
                  onChange={(e) => {
                    audioEngine.playTapHaptic();
                    setSelectedTopicIndex(Number(e.target.value));
                  }}
                  className="bg-white border-2 border-[#ddc0b8] px-3 py-2 rounded-xl text-[13px] font-bold text-[#201a18] shadow-xs cursor-pointer hover:border-[#9d3d1e] transition-colors appearance-none pr-8"
                >
                  {WORKSHEET_TOPICS.map((t, idx) => (
                    <option key={t.id} value={idx}>
                      Topic: {t.name}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined text-[16px] text-[#8a726b] absolute right-2.5 top-3 pointer-events-none">
                  expand_more
                </span>
              </div>

              {/* Class Selector */}
              <div className="relative">
                <select
                  value={selectedClass}
                  onChange={(e) => {
                    audioEngine.playTapHaptic();
                    setSelectedClass(e.target.value);
                  }}
                  className="bg-white border-2 border-[#ddc0b8] px-3 py-2 rounded-xl text-[13px] font-bold text-[#201a18] shadow-xs cursor-pointer hover:border-[#9d3d1e] transition-colors appearance-none pr-8"
                >
                  <option value="कक्षा 1 व 2">Class: कक्षा 1 व 2</option>
                  <option value="कक्षा 3">Class: कक्षा 3</option>
                </select>
                <span className="material-symbols-outlined text-[16px] text-[#8a726b] absolute right-2.5 top-3 pointer-events-none">
                  expand_more
                </span>
              </div>

              {/* Layout Pill */}
              <div className="inline-flex items-center gap-1.5 bg-white border-2 border-[#9d3d1e] px-3 py-2 rounded-xl text-[13px] font-bold text-[#9d3d1e]">
                <span className="material-symbols-outlined text-[#9d3d1e] text-[18px]">view_column</span>
                <span className="text-[#56423c] font-normal">Layout:</span>
                <span>Bilingual Matching</span>
                <span className="material-symbols-outlined text-[16px] text-[#9d3d1e]">check_circle</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f2e6e2] rounded-xl p-3 border border-[#ddc0b8] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#9d3d1e]/10 flex items-center justify-center text-[#9d3d1e] shrink-0">
              <span className="material-symbols-outlined">print</span>
            </div>
            <div className="text-left">
              <p className="text-[13px] font-bold text-[#201a18]">Mono Printer Optimized</p>
              <p className="text-[11px] text-[#56423c] leading-tight">
                High line contrast for ribbon/laser single-ink printouts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Printable Preview Canvas (A4 sheet styling) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[18px] font-bold font-serif-headline text-[#201a18] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9d3d1e]">description</span>
            Worksheet Printable Preview (अभ्यास पत्र पूर्वावलोकन)
          </h2>
          <span className="text-[11px] text-[#56423c] flex items-center gap-1 bg-[#f7ebe8] px-2.5 py-1 rounded border border-[#ddc0b8]">
            <span className="material-symbols-outlined text-[14px]">aspect_ratio</span>
            Standard A4 Sheet Layout
          </span>
        </div>

        {/* Printable Paper */}
        <div className="bg-white border-2 border-[#d8cebe] rounded-2xl p-6 sm:p-10 paper-shadow relative overflow-hidden text-[#201a18]">
          {/* Printable Corner Registration Ticks */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#ddc0b8] pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#ddc0b8] pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#ddc0b8] pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#ddc0b8] pointer-events-none" />

          {/* Official Header on Paper */}
          <div className="border-b-2 border-[#201a18] pb-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-center sm:text-left">
              <div>
                <div className="inline-flex items-center gap-2 text-[#9d3d1e] font-serif-headline text-[20px] font-bold tracking-tight">
                  <span className="material-symbols-outlined">auto_stories</span>
                  <span>विद्या वाणी अभ्यास पत्र • Vidya Vani Practice Sheet</span>
                </div>
                <p className="text-[14px] text-[#56423c] mt-0.5">
                  झारखंड प्राथमिक शिक्षा संवर्धन • Tribal Mother-Tongue Bridge Module (Ol Chiki ⇄ Hindi)
                </p>
              </div>

              {/* Stamp Badge */}
              <div className="self-center sm:self-auto border border-[#8a726b] px-3.5 py-1.5 rounded-lg text-center bg-[#fdf1ed] min-w-[140px]">
                <p className="text-[11px] text-[#8a726b] font-bold uppercase tracking-wider">{topic.unit}</p>
                <p className="text-[13px] font-bold text-[#201a18]">{topic.hindiName}</p>
              </div>
            </div>

            {/* Student Meta Fields */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-dashed border-[#ddc0b8] text-[13px]">
              <div className="flex items-end gap-1.5 bg-[#fdf1ed]/50 px-2 py-1.5 rounded border border-[#ddc0b8]/60">
                <span className="font-bold text-[#56423c] shrink-0">विद्यार्थी का नाम (Name):</span>
                <span className="grow border-b-2 border-dotted border-[#8a726b] min-h-[18px]" />
              </div>
              <div className="flex items-end gap-1.5 bg-[#fdf1ed]/50 px-2 py-1.5 rounded border border-[#ddc0b8]/60">
                <span className="font-bold text-[#56423c] shrink-0">क्रमांक (Roll No):</span>
                <span className="grow border-b-2 border-dotted border-[#8a726b] min-h-[18px]" />
              </div>
              <div className="flex items-end gap-1.5 bg-[#fdf1ed]/50 px-2 py-1.5 rounded border border-[#ddc0b8]/60">
                <span className="font-bold text-[#56423c] shrink-0">दिनांक (Date):</span>
                <span className="grow border-b-2 border-dotted border-[#8a726b] min-h-[18px]" />
              </div>
            </div>
          </div>

          {/* Activity Prompt Banner */}
          <div className="bg-[#f2e6e2]/80 border-l-4 border-[#9d3d1e] p-3 rounded-r-lg mb-6 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#9d3d1e] mt-0.5 shrink-0">edit_note</span>
            <div>
              <h3 className="text-[14px] font-bold text-[#201a18]">निर्देश / Activity Prompt:</h3>
              <p className="text-[14px] text-[#201a18] leading-snug">
                Match the Hindi words on the left with Santali Ol Chiki equivalents on the right (जोड़ी मिलाएँ). रेखा खींचकर सही शब्द का मिलान कीजिए।
              </p>
            </div>
          </div>

          {/* Two-Column Bilingual Exercise Table */}
          <div className="border-2 border-[#201a18] rounded-xl overflow-hidden bg-white">
            <div className="grid grid-cols-2 bg-[#f7ebe8] text-[#201a18] font-serif-headline text-[15px] sm:text-[17px] border-b-2 border-[#201a18] divide-x-2 divide-[#201a18]">
              <div className="py-3 px-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-[#9d3d1e] text-white text-[12px] flex items-center justify-center font-bold">
                    क
                  </span>
                  <span>हिंदी निर्देश / शब्द (Hindi)</span>
                </span>
                <span className="text-[11px] text-[#56423c] hidden sm:inline">स्तंभ 1</span>
              </div>
              <div className="py-3 px-4 flex items-center justify-between bg-[#f2e6e2]">
                <span className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-[#3a6848] text-white text-[12px] flex items-center justify-center font-bold">
                    ख
                  </span>
                  <span className="font-olchiki">संताली / ᱚᱞ ᱪᱤᱠᱤ (Santali)</span>
                </span>
                <span className="text-[11px] text-[#56423c] hidden sm:inline">स्तंभ 2</span>
              </div>
            </div>

            {/* Table Rows with matching pins */}
            <div className="divide-y-2 divide-[#ddc0b8]">
              {topic.rows.map((row) => (
                <div
                  key={row.num}
                  className="grid grid-cols-2 divide-x-2 divide-[#201a18] min-h-[72px] items-stretch hover:bg-[#fdf1ed]/40 transition-colors"
                >
                  {/* Left Column (Hindi) */}
                  <div className="p-3 sm:px-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-md bg-[#f7ebe8] border border-[#8a726b] text-[#201a18] font-bold flex items-center justify-center text-[13px]">
                        {row.num}
                      </span>
                      <div>
                        <span className="font-bold text-[#201a18] text-[18px]">{row.hindiWord}</span>
                        <span className="text-[#56423c] text-[13px] ml-2 font-normal">({row.hindiSecondary})</span>
                      </div>
                    </div>
                    {/* Connector Dot */}
                    <div className="w-4 h-4 rounded-full border-2 border-[#201a18] bg-white flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#201a18]" />
                    </div>
                  </div>

                  {/* Right Column (Santali) */}
                  <div className="p-3 sm:px-5 flex items-center justify-between bg-[#fdf1ed]/30">
                    {/* Connector Dot */}
                    <div className="w-4 h-4 rounded-full border-2 border-[#201a18] bg-white flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#201a18]" />
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      <div>
                        <span className="font-olchiki font-bold text-[#201a18] text-[22px] tracking-wide">
                          {row.olChikiWord}
                        </span>
                        <span className="text-[#56423c] text-[13px] mr-2">({row.romanPhonetic})</span>
                      </div>
                      <span className="w-7 h-7 rounded-md bg-[#f7ebe8] border border-[#8a726b] text-[#201a18] font-bold flex items-center justify-center text-[13px]">
                        {row.letterIndex}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Remark and FLN Evaluation Area */}
          <div className="mt-6 pt-4 border-t-2 border-[#ddc0b8] flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-[#56423c]">
            <div className="flex items-center gap-3">
              <span className="font-bold">शिक्षक टिप्पणी / Teacher's Remark:</span>
              <span className="w-32 sm:w-48 border-b-2 border-dashed border-[#8a726b] inline-block" />
            </div>
            <div className="flex items-center gap-2 bg-[#f7ebe8] px-3 py-1.5 rounded-lg border border-[#ddc0b8]">
              <span>FLN Level Achieved:</span>
              <div className="flex gap-1">
                <span className="px-2 py-0.5 rounded bg-white border border-[#8a726b] text-xs font-bold">L1</span>
                <span className="px-2 py-0.5 rounded bg-white border border-[#8a726b] text-xs font-bold">L2</span>
                <span className="px-2 py-0.5 rounded bg-[#3a6848] text-white text-xs font-bold">L3 ✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Offline Pedagogical Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#f2e6e2]/60 border border-[#ddc0b8] rounded-xl p-4 flex gap-3 items-start">
          <span className="material-symbols-outlined text-[#3a6848] shrink-0">lightbulb</span>
          <div>
            <h4 className="text-[14px] font-bold text-[#201a18]">Classroom Tip (कक्षा गतिविधि सुझाव)</h4>
            <p className="text-[12px] text-[#56423c] mt-0.5">
              Conduct an oral choral chant in Santali first (
              <span className="font-olchiki font-bold">ᱫᱟᱨᱮ</span>, <span className="font-olchiki font-bold">ᱫᱟᱜ</span>
              ) before having children trace pencil lines on the printed paper.
            </p>
          </div>
        </div>
        <div className="bg-[#f2e6e2]/60 border border-[#ddc0b8] rounded-xl p-4 flex gap-3 items-start">
          <span className="material-symbols-outlined text-[#9d3d1e] shrink-0">wifi_off</span>
          <div>
            <h4 className="text-[14px] font-bold text-[#201a18]">Offline Storage (स्थानीय मेमोरी)</h4>
            <p className="text-[12px] text-[#56423c] mt-0.5">
              This generated template is saved in your device's local memory. You can print multiple copies at the cluster
              resource centre (CRC) without active internet.
            </p>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Action Bar */}
      <aside className="fixed bottom-0 left-0 w-full z-40 bg-[#fdf1ed] border-t-2 border-[#ddc0b8] px-4 py-3 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleGenerateNew}
              className="flex-1 sm:flex-initial min-h-[50px] px-4 rounded-xl bg-[#f2e6e2] hover:bg-[#ece0dd] text-[#201a18] border-2 border-[#ddc0b8] flex items-center justify-center gap-2 font-bold text-[13px] active:translate-y-0.5 transition"
              type="button"
            >
              <span className="material-symbols-outlined text-[#9d3d1e]">refresh</span>
              <span>Generate New (नई)</span>
            </button>
            <button
              onClick={handleSaveOffline}
              className="flex-1 sm:flex-initial min-h-[50px] px-4 rounded-xl bg-white hover:bg-[#f7ebe8] text-[#3a6848] border-2 border-[#3a6848] flex items-center justify-center gap-2 font-bold text-[13px] active:translate-y-0.5 transition"
              type="button"
            >
              <span className="material-symbols-outlined text-[#3a6848]">
                {savedOffline ? 'check_circle' : 'bookmark_added'}
              </span>
              <span>{savedOffline ? 'Saved! (सहेजा गया)' : 'Save Offline (सहेजें)'}</span>
            </button>
          </div>

          <div className="w-full sm:w-auto">
            <button
              onClick={handlePrintOrExport}
              className="w-full sm:w-auto min-h-[50px] px-7 rounded-xl bg-[#9d3d1e] hover:bg-[#bd5533] text-white border-b-[3px] border-[#81290a] flex items-center justify-center gap-2.5 font-bold text-[14px] shadow-sm active:translate-y-0.5 transition"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
              <span>Export as PDF (पीडीएफ डाउनलोड)</span>
              <span className="material-symbols-outlined text-[18px] ml-1 opacity-80">download</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
