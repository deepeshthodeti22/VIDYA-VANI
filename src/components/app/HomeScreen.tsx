import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { audioEngine } from '../../utils/audio';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [isPlayingGolden, setIsPlayingGolden] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  const handlePlayGolden = () => {
    audioEngine.playTapHaptic();
    setIsPlayingGolden(true);
    audioEngine.speakPhrase('देलागोन पाड़हाव मे, आओ मिलकर पढ़ें', 'hi-IN');
    setTimeout(() => {
      setIsPlayingGolden(false);
    }, 2200);
  };

  const handleSyncClick = () => {
    audioEngine.playTapHaptic();
    setIsSynced(true);
    setTimeout(() => setIsSynced(false), 2000);
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-24 flex flex-col gap-5 select-none">
      {/* Welcome Context Banner (Terracotta Warm Card) */}
      <section className="w-full bg-gradient-to-br from-[#bd5533] to-[#9d3d1e] text-white rounded-xl p-4 sm:p-5 shadow-sm border border-[#ddc0b8] relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#3a0b00] text-[#ffdbd0] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px]">school</span>
              <span>कक्षा १ - ३ संताली-हिन्दी सेतु</span>
            </div>
            <h1 className="text-[22px] sm:text-[28px] font-bold font-serif-headline text-white leading-tight">
              सुप्रभात, शिक्षक जी
            </h1>
            <p className="text-[13px] text-[#ffdbd0] opacity-95">
              Good morning, Teacher • Let's build joyful bilingual learning today.
            </p>
          </div>

          {/* Location Context Chip */}
          <div className="flex items-center self-start sm:self-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20 text-white">
            <span className="material-symbols-outlined text-[#ffdbd0] text-[20px]">location_on</span>
            <div className="text-left">
              <div className="text-[11px] text-[#ffdbd0] font-medium">District: Dumka</div>
              <div className="text-[12px] font-bold">शिकारपाड़ा क्लस्टर</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Title: Core Classroom Tools */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-[18px] font-bold font-serif-headline text-[#201a18]">कक्षा शिक्षण उपकरण</h2>
          <p className="text-[13px] text-[#56423c]">Classroom Action Modules (Ol Chiki ⇄ Hindi)</p>
        </div>
        <span className="text-[11px] px-2.5 py-1 bg-[#f2e6e2] rounded border border-[#ddc0b8] text-[#56423c] font-bold tracking-wide">
          NIPUN JHARKHAND
        </span>
      </div>

      {/* Main Grid: 4 Tactile, High-Contrast Clay Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1: Translate */}
        <div
          onClick={() => {
            audioEngine.playTapHaptic();
            onNavigate('translate');
          }}
          className="clay-card clay-card-active bg-white rounded-xl p-5 flex flex-col justify-between cursor-pointer border-l-[6px] border-l-[#9d3d1e] hover:bg-[#fdf1ed] transition-all min-h-[170px]"
          role="button"
          tabIndex={0}
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#f2e6e2] text-[#9d3d1e] flex items-center justify-center border border-[#ddc0b8]">
              <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                translate
              </span>
            </div>
            <span className="flex items-center gap-1 text-[11px] bg-[#f7ebe8] px-2.5 py-0.5 rounded-full text-[#9d3d1e] font-bold">
              <span className="material-symbols-outlined text-[14px]">mic</span>
              वॉइस सपोर्ट
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <h3 className="text-[18px] font-bold font-serif-headline text-[#9d3d1e]">अनुवाद</h3>
              <span className="text-[13px] text-[#56423c] font-semibold">Translate</span>
            </div>
            <p className="text-[13px] text-[#56423c] mt-1 leading-snug">
              Instant Hindi to Santali (Ol Chiki : ᱚᱞ ᱪᱤᱠᱤ) with local dialect voice synthesis.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#ddc0b8] flex items-center justify-between text-[#9d3d1e] font-semibold text-[13px]">
            <span>बोलें या लिखें (Speak / Type)</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </div>
        </div>

        {/* Card 2: Worksheets */}
        <div
          onClick={() => {
            audioEngine.playTapHaptic();
            onNavigate('worksheets');
          }}
          className="clay-card clay-card-active bg-white rounded-xl p-5 flex flex-col justify-between cursor-pointer border-l-[6px] border-l-[#3a6848] hover:bg-[#fdf1ed] transition-all min-h-[170px]"
          role="button"
          tabIndex={0}
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#bbefc6] text-[#3a6848] flex items-center justify-center border border-[#3a6848]">
              <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                description
              </span>
            </div>
            <span className="flex items-center gap-1 text-[11px] bg-[#bbefc6] text-[#3a6848] px-2.5 py-0.5 rounded-full font-bold">
              <span className="material-symbols-outlined text-[14px]">print</span>
              ऑफलाइन प्रिंट
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <h3 className="text-[18px] font-bold font-serif-headline text-[#3a6848]">कार्यपत्रिका</h3>
              <span className="text-[13px] text-[#56423c] font-semibold">Worksheets</span>
            </div>
            <p className="text-[13px] text-[#56423c] mt-1 leading-snug">
              FLN-aligned bilingual printable worksheets for tracing, matching, and early numeracy.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#ddc0b8] flex items-center justify-between text-[#3a6848] font-semibold text-[13px]">
            <span>कक्षा १-३ अभ्यास पत्र</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </div>
        </div>

        {/* Card 3: Flashcards */}
        <div
          onClick={() => {
            audioEngine.playTapHaptic();
            onNavigate('flashcards');
          }}
          className="clay-card clay-card-active bg-white rounded-xl p-5 flex flex-col justify-between cursor-pointer border-l-[6px] border-l-[#8d4b00] hover:bg-[#fdf1ed] transition-all min-h-[170px]"
          role="button"
          tabIndex={0}
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#ffdcc3] text-[#8d4b00] flex items-center justify-center border border-[#8d4b00]">
              <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                style
              </span>
            </div>
            <span className="flex items-center gap-1 text-[11px] bg-[#ffdcc3] text-[#8d4b00] px-2.5 py-0.5 rounded-full font-bold">
              <span className="material-symbols-outlined text-[14px]">volume_up</span>
              ऑडियो सहित
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <h3 className="text-[18px] font-bold font-serif-headline text-[#8d4b00]">फ्लैशकार्ड</h3>
              <span className="text-[13px] text-[#56423c] font-semibold">Flashcards</span>
            </div>
            <p className="text-[13px] text-[#56423c] mt-1 leading-snug">
              Tactile picture cards with Santali script, phonetics, and native animal/nature words.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#ddc0b8] flex items-center justify-between text-[#8d4b00] font-semibold text-[13px]">
            <span>चित्र व शब्द बैंक (120+ Cards)</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </div>
        </div>

        {/* Card 4: Phrase Library */}
        <div
          onClick={() => {
            audioEngine.playTapHaptic();
            onNavigate('phrases');
          }}
          className="clay-card clay-card-active bg-white rounded-xl p-5 flex flex-col justify-between cursor-pointer border-l-[6px] border-l-[#56423c] hover:bg-[#fdf1ed] transition-all min-h-[170px]"
          role="button"
          tabIndex={0}
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#ece0dd] text-[#56423c] flex items-center justify-center border border-[#8a726b]">
              <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_stories
              </span>
            </div>
            <span className="flex items-center gap-1 text-[11px] bg-[#ece0dd] text-[#56423c] px-2.5 py-0.5 rounded-full font-bold">
              ४००+ वाक्य
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <h3 className="text-[18px] font-bold font-serif-headline text-[#201a18]">वाक्यांश संग्रह</h3>
              <span className="text-[13px] text-[#56423c] font-semibold">Phrase Library</span>
            </div>
            <p className="text-[13px] text-[#56423c] mt-1 leading-snug">
              Curated daily classroom commands, warm greetings, encouragement, and instructionals.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#ddc0b8] flex items-center justify-between text-[#201a18] font-semibold text-[13px]">
            <span>दैनिक कक्षा निर्देश</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </div>
        </div>
      </div>

      {/* Classroom Quick Access: Chalk Trace & Blackboard shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => {
            audioEngine.playTapHaptic();
            onNavigate('chalk-trace');
          }}
          className="p-3.5 rounded-xl bg-[#172e22] text-white flex items-center justify-between border-2 border-[#7a5338] shadow-sm hover:brightness-110 active:translate-y-0.5 transition-all text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#274738] flex items-center justify-center text-[#fce881] font-bold text-xl font-olchiki">
              ᱫ
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#fce881]">Chalk Trace • वर्ण आलेखन</div>
              <div className="text-[12px] text-emerald-200/80">Interactive Ol Chiki stroke slate practice</div>
            </div>
          </div>
          <span className="material-symbols-outlined text-white/80">arrow_forward</span>
        </button>

        <button
          onClick={() => {
            audioEngine.playTapHaptic();
            onNavigate('blackboard');
          }}
          className="p-3.5 rounded-xl bg-[#1a1a19] text-white flex items-center justify-between border-2 border-[#543722] shadow-sm hover:brightness-110 active:translate-y-0.5 transition-all text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#2d2d2a] flex items-center justify-center text-[#ff9d80]">
              <span className="material-symbols-outlined">co_present</span>
            </div>
            <div>
              <div className="text-[14px] font-bold text-white">Blackboard Projector Mode</div>
              <div className="text-[12px] text-white/70">Large TV display & classroom choral drills</div>
            </div>
          </div>
          <span className="material-symbols-outlined text-white/80">arrow_forward</span>
        </button>
      </div>

      {/* Quick Classroom Recite Tray / Today's Essential Phrase */}
      <div className="w-full bg-[#f7ebe8] rounded-xl p-4 border border-[#ddc0b8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayGolden}
            aria-label="Listen Santali audio"
            className="w-14 h-14 rounded-full bg-[#9d3d1e] text-white flex items-center justify-center shrink-0 clay-btn active:translate-y-0.5 transition-transform"
          >
            <span
              className={`material-symbols-outlined text-[28px] ${isPlayingGolden ? 'animate-pulse' : ''}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isPlayingGolden ? 'graphic_eq' : 'volume_up'}
            </span>
          </button>
          <div>
            <div className="text-[11px] font-bold text-[#9d3d1e]">आज का वाक्य • Today's Golden Phrase</div>
            <div className="text-[18px] font-bold text-[#201a18] font-olchiki">
              ᱫᱮᱞᱟᱵᱚᱱ ᱯᱟᱲᱦᱟᱣ ᱢᱮ <span className="font-normal text-[15px] font-sans">(Delabon Paṛhao Me)</span>
            </div>
            <div className="text-[13px] text-[#56423c]">"आओ मिलकर पढ़ें" (Come, let us read together)</div>
          </div>
        </div>
        <button
          onClick={() => {
            audioEngine.playTapHaptic();
            onNavigate('blackboard');
          }}
          className="px-4 py-2.5 rounded-lg bg-white border border-[#ddc0b8] text-[#201a18] font-semibold text-[13px] hover:bg-[#f2e6e2] transition-colors self-stretch sm:self-auto text-center clay-card-active"
        >
          अभ्यास कराएं (Repeat in Class)
        </button>
      </div>

      {/* Quick Stats Footer Card: Offline Local Storage Status */}
      <div className="w-full bg-white rounded-xl p-4 border border-[#ddc0b8] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2.5 rounded-lg bg-[#bbefc6] text-[#3a6848] flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">save</span>
          </div>
          <div>
            <div className="text-[15px] font-bold text-[#201a18] flex items-center gap-2">
              <span>Offline Storage: 384 MB</span>
              <span className="text-[11px] px-1.5 py-0.5 bg-[#bbefc6] text-[#3a6848] rounded font-bold">
                100% CACHED
              </span>
            </div>
            <p className="text-[13px] text-[#56423c]">
              All tribal Santali voice models, dictionary, and worksheets ready without internet.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#ddc0b8]">
          <span className="text-[11px] text-[#56423c]">Last synced: Today 07:30 AM</span>
          <button
            onClick={handleSyncClick}
            className="p-1.5 rounded hover:bg-[#f7ebe8] text-[#9d3d1e] transition-transform active:rotate-180 duration-300"
            title="Check updates"
          >
            <span className={`material-symbols-outlined text-[18px] ${isSynced ? 'animate-spin' : ''}`}>sync</span>
          </button>
        </div>
      </div>
    </div>
  );
};
