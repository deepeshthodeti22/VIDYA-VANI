import React, { useState } from 'react';
import { INITIAL_FLASHCARDS } from '../../data/mockData';
import { audioEngine } from '../../utils/audio';

interface FlashcardScreenProps {
  onBack: () => void;
}

export const FlashcardScreen: React.FC<FlashcardScreenProps> = ({ onBack }) => {
  const [cards, setCards] = useState(INITIAL_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(3); // Card 4 of 24 (Deer)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [repeatNotice, setRepeatNotice] = useState(false);

  const card = cards[currentIndex] || cards[0];

  const handlePlayAudio = () => {
    audioEngine.playTapHaptic();
    setIsPlayingAudio(true);
    audioEngine.speakPhrase(`${card.phoneticsDevanagari}, ${card.exampleHindi}`, 'hi-IN');
    setTimeout(() => setIsPlayingAudio(false), 2000);
  };

  const handleNext = () => {
    audioEngine.playTapHaptic();
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    audioEngine.playTapHaptic();
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleMarkLearned = () => {
    audioEngine.playTapHaptic();
    setCards((prev) =>
      prev.map((c, idx) => (idx === currentIndex ? { ...c, isLearned: !c.isLearned } : c))
    );
  };

  const handleRepeat = () => {
    audioEngine.playTapHaptic();
    handlePlayAudio();
    setRepeatNotice(true);
    setTimeout(() => setRepeatNotice(false), 2000);
  };

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 flex flex-col justify-between pb-28 select-none">
      {/* Top Header */}
      <header className="bg-white border-b border-[#ddc0b8] px-4 py-3 rounded-xl flex items-center justify-between shadow-xs mb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioEngine.playTapHaptic();
              onBack();
            }}
            aria-label="Go Back"
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#f7ebe8] hover:bg-[#f2e6e2] text-[#201a18] active:translate-y-0.5 transition"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-[18px] sm:text-[20px] font-serif-headline text-[#201a18] leading-tight">
                Flashcards / फ्लैशकार्ड
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#bbefc6] text-[#215031] border border-[#3a6848]">
                <span className="material-symbols-outlined text-[13px] mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                  cloud_done
                </span>
                Local
              </span>
            </div>
            <p className="text-[12px] text-[#56423c] truncate max-w-[220px] sm:max-w-md">
              Deck: Animals &amp; Birds (ᱡᱤᱵᱽ ᱡᱤᱭᱟᱹᱞᱤ ᱟᱨ ᱪᱮᱬᱮ)
            </p>
          </div>
        </div>

        <div className="bg-[#f2e6e2] px-3 py-1.5 rounded-xl border border-[#ddc0b8] text-right">
          <span className="block text-[13px] font-bold text-[#9d3d1e]">
            Card {currentIndex + 1} of 24
          </span>
          <span className="block text-[11px] text-[#56423c]">ᱡᱤᱵᱽ (Animals)</span>
        </div>
      </header>

      {/* Operational Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="inline-flex items-center gap-2 bg-[#eae3d6] p-1.5 rounded-xl border border-[#d8cebe]">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#9d3d1e] rounded-lg border border-[#d8cebe] text-[13px] font-bold shadow-xs">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              volume_up
            </span>
            <span>Classroom Audio Mode</span>
          </button>
          <button className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[#56423c] hover:text-[#201a18] text-[13px] font-medium transition-colors">
            <span className="material-symbols-outlined text-[18px]">quiz</span>
            <span className="hidden sm:inline">Teacher Prompt</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[#56423c] text-[12px] font-medium">
          <span className="material-symbols-outlined text-[16px] text-[#3a6848]">battery_full</span>
          <span>Hardware Battery: 86%</span>
        </div>
      </div>

      {/* Central Physical Flashcard */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-1">
        <article className="w-full max-w-xl bg-white rounded-2xl p-6 sm:p-7 border-2 border-[#d8cebe] shadow-sm flex flex-col items-center text-center relative overflow-hidden transition-all duration-150">
          {/* Card Top Meta */}
          <div className="w-full flex items-center justify-between border-b border-[#ddc0b8]/60 pb-3 mb-4">
            <span className="text-[12px] text-[#56423c] flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3a6848] inline-block" />
              {card.tier}
            </span>
            <span className="text-[11px] font-bold text-[#8d4b00] uppercase tracking-wider bg-[#f7ebe8] px-2.5 py-0.5 rounded-md border border-[#ddc0b8]">
              {card.category}
            </span>
          </div>

          {/* Visual Graphic Area */}
          <div className="w-full max-w-sm h-48 sm:h-56 bg-[#fdf1ed] rounded-xl border border-[#d8cebe] relative flex items-center justify-center overflow-hidden mb-5">
            {card.imageUrl ? (
              <img
                src={card.imageUrl}
                alt={`${card.hindiWord} illustration`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-[#8a726b]">
                <span className="material-symbols-outlined text-6xl text-[#9d3d1e]">forest</span>
                <span className="font-olchiki text-3xl font-bold mt-2 text-[#201a18]">{card.olChikiWord}</span>
              </div>
            )}
            <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[11px] px-2 py-0.5 rounded font-medium">
              Native Chota Nagpur Fauna
            </div>
          </div>

          {/* Word Section */}
          <div className="w-full flex flex-col items-center gap-1 mb-5">
            <div className="text-[22px] sm:text-[26px] font-bold font-serif-headline text-[#201a18]">
              {card.hindiWord}{' '}
              <span className="font-normal text-[#56423c] text-[16px]">({card.romanMeaning})</span>
            </div>

            {/* Authentic Santali Ol Chiki Script */}
            <div className="font-olchiki text-[42px] sm:text-[48px] leading-tight font-bold text-[#201a18] my-1 tracking-wide">
              {card.olChikiWord}
            </div>

            {/* Phonetics & Tip */}
            <div className="inline-flex items-center gap-2 bg-[#f4efe6] px-3.5 py-1 rounded-full border border-[#d8cebe] text-[13px] flex-wrap justify-center">
              <span className="font-bold text-[#9d3d1e]">{card.phoneticsRoman}</span>
              <span className="text-[#8a726b]">•</span>
              <span className="font-semibold text-[#201a18]">({card.phoneticsDevanagari})</span>
              <span className="text-[#8a726b]">•</span>
              <span className="text-[#56423c] italic">{card.phoneticTip}</span>
            </div>
          </div>

          {/* Large Tactile Audio Playback Button */}
          <div className="w-full flex flex-col items-center mb-5">
            <button
              onClick={handlePlayAudio}
              aria-label="Play Native Santali Audio"
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#9d3d1e] hover:bg-[#81290a] text-white flex items-center justify-center shadow-md clay-btn active:translate-y-1 transition-all mb-2"
            >
              <span
                className={`material-symbols-outlined text-[36px] ${isPlayingAudio ? 'animate-pulse' : ''}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPlayingAudio ? 'graphic_eq' : 'volume_up'}
              </span>
            </button>
            <span className="font-bold text-[14px] text-[#9d3d1e]">
              Tap to play native Santali audio (उच्चारण सुनें)
            </span>
            <span className="text-[11px] text-[#56423c]">{card.audioSpeaker}</span>
          </div>

          {/* Context Sentence */}
          <div className="w-full bg-[#f7ebe8] rounded-xl p-3.5 border border-[#d8cebe] text-left">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#9d3d1e] text-[20px] mt-0.5">menu_book</span>
              <div className="space-y-0.5">
                <p className="font-olchiki text-[18px] sm:text-[20px] font-semibold text-[#201a18] leading-snug">
                  {card.exampleOlChiki}
                </p>
                <p className="text-[13px] text-[#56423c] font-medium">
                  "{card.exampleHindi}" <span className="text-[11px] text-[#8a726b]">({card.exampleEnglish})</span>
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Carousel Navigation Strip */}
      <div className="w-full max-w-xl mx-auto flex flex-col gap-3 mt-3 mb-2">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handlePrev}
            className="min-h-[50px] px-4 rounded-xl bg-[#f2e6e2] hover:bg-[#ece0dd] border border-[#d8cebe] text-[#201a18] font-bold text-[14px] flex items-center justify-center gap-2 active:translate-y-0.5 transition"
          >
            <span className="material-symbols-outlined text-[22px]">chevron_left</span>
            <span>Previous (पिछला)</span>
          </button>
          <button
            onClick={handleNext}
            className="min-h-[50px] px-4 rounded-xl bg-[#9d3d1e] hover:bg-[#81290a] text-white font-bold text-[14px] flex items-center justify-center gap-2 clay-btn active:translate-y-0.5 transition"
          >
            <span>Next (अगला)</span>
            <span className="material-symbols-outlined text-[22px]">chevron_right</span>
          </button>
        </div>

        {/* 24 Pagination Dots */}
        <div
          aria-label="Progress dots for 24 cards"
          className="w-full flex items-center justify-center gap-1.5 py-2 px-2 overflow-x-auto"
        >
          {Array.from({ length: 24 }).map((_, idx) => {
            const isCurrent = idx === currentIndex;
            const isLearnedCard = idx < 3 || (idx === currentIndex && card.isLearned);
            return (
              <span
                key={idx}
                onClick={() => {
                  audioEngine.playTapHaptic();
                  setCurrentIndex(idx % cards.length);
                }}
                className={`cursor-pointer transition-all ${
                  isCurrent
                    ? 'w-3.5 h-3.5 rounded-full bg-[#9d3d1e] ring-2 ring-[#ffdbd0] ring-offset-2'
                    : isLearnedCard
                    ? 'w-2.5 h-2.5 rounded-full bg-[#a0d2ab]'
                    : 'w-2 h-2 rounded-full bg-[#d8cebe]'
                }`}
                title={`Card ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Sticky Pedagogical Actions Tray */}
      <div className="w-full max-w-xl mx-auto pt-2 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleMarkLearned}
            className={`min-h-[50px] px-4 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 border-b-2 active:translate-y-0.5 transition ${
              card.isLearned
                ? 'bg-[#bbefc6] text-[#215031] border-[#3a6848]'
                : 'bg-[#3a6848] text-white border-[#215031]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            <span>{card.isLearned ? 'Learned ✓ (सीख लिया)' : 'Mark Learned (सीख लिया)'}</span>
          </button>

          <button
            onClick={handleRepeat}
            className="min-h-[50px] px-4 rounded-xl bg-[#f4efe6] text-[#9d3d1e] hover:bg-[#f7ebe8] border-2 border-[#ddc0b8] font-bold text-[14px] flex items-center justify-center gap-2 active:translate-y-0.5 transition"
          >
            <span className="material-symbols-outlined text-[22px]">replay</span>
            <span>{repeatNotice ? 'Chanting in Class...' : 'Repeat in Class (दोहराएं)'}</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[#56423c] text-[11px] mt-3">
          <span className="material-symbols-outlined text-[14px] text-[#3a6848]">verified_user</span>
          <span>Changes cached to device. Synchronizes seamlessly when mobile network is acquired.</span>
        </div>
      </div>
    </div>
  );
};
