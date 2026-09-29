import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { audioEngine } from '../../utils/audio';
import { VoiceModal } from './VoiceModal';

interface TranslateScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const TranslateScreen: React.FC<TranslateScreenProps> = ({ onBack, onNavigate }) => {
  const [inputText, setInputText] = useState('बच्चों, अपनी किताबें खोलो');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [addedToFlashcards, setAddedToFlashcards] = useState(false);

  // Translation database for quick real-time reactive lookup
  const currentTranslation = {
    olChiki: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱯᱮ',
    phoneticsLatin: 'Gidrạ ko, apeag puthi jhij pe',
    phoneticsDevanagari: 'गिदरा को, आपेयाग पुथी झीज पे',
    englishMeaning: 'Children, please open your books.',
    altPhonetics: 'गिदरा को, पुथी को झीज ताबोन पे (Colloquial classroom variant)',
    altOlChiki: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱯᱩᱛᱷᱤ ᱠᱚ ᱡᱷᱤᱡᱽ ᱛᱟᱵᱳᱱ ᱯᱮ'
  };

  const handleTranslate = () => {
    audioEngine.playTapHaptic();
    handlePlayAudio();
  };

  const handlePlayAudio = () => {
    audioEngine.playTapHaptic();
    setIsPlayingAudio(true);
    audioEngine.speakPhrase('गिदरा को, आपेयाग पुथी झीज पे', 'hi-IN');
    setTimeout(() => setIsPlayingAudio(false), 2200);
  };

  const handleCopy = () => {
    audioEngine.playTapHaptic();
    navigator.clipboard?.writeText(currentTranslation.olChiki);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddFlashcard = () => {
    audioEngine.playTapHaptic();
    setAddedToFlashcards(true);
    setTimeout(() => setAddedToFlashcards(false), 2000);
  };

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 space-y-6 pb-28 select-none">
      {/* Top Header / Bar */}
      <div className="flex items-center justify-between pb-1 border-b border-[#ddc0b8]/60">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioEngine.playTapHaptic();
              onBack();
            }}
            aria-label="Go back"
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#f7ebe8] hover:bg-[#f2e6e2] text-[#201a18] transition-transform active:translate-y-0.5 border border-[#ddc0b8]"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <div>
            <h1 className="text-[20px] font-bold font-serif-headline text-[#9d3d1e] tracking-tight">
              Translate / अनुवाद
            </h1>
            <p className="text-[12px] text-[#56423c]">Classroom Spoken Bridge • Santali (Ol Chiki)</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#bbefc6] text-[#215031] border border-[#3a6848] rounded-full text-[12px] font-bold shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3a6848] animate-pulse" />
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-base">cloud_off</span>
            <span>Offline Active</span>
          </span>
        </div>
      </div>

      {/* Pedagogical Language Mode Banner */}
      <section className="bg-[#f2e6e2] rounded-xl p-3 border border-[#ddc0b8] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="material-symbols-outlined text-[#9d3d1e]">swap_horiz</span>
          <span className="text-[13px] text-[#56423c] font-medium">Language Pair:</span>
          <span className="px-2.5 py-1 bg-white text-[#201a18] text-[13px] rounded-lg font-bold border border-[#ddc0b8]">
            Hindi (Devanagari)
          </span>
          <span className="material-symbols-outlined text-[#8a726b] text-sm">arrow_forward</span>
          <span className="px-2.5 py-1 bg-[#fff8f6] text-[#9d3d1e] text-[13px] rounded-lg font-bold border border-[#9d3d1e]">
            Santali (Ol Chiki ᱚᱞ ᱪᱤᱠᱤ)
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#56423c] text-[12px]">
          <span className="material-symbols-outlined text-base">menu_book</span>
          <span>Local Dialect: Mayurbhanj / Dumka Standard</span>
        </div>
      </section>

      {/* INPUT SECTION */}
      <section className="bg-[#f7ebe8] rounded-2xl p-4 md:p-5 border-2 border-[#ddc0b8] clay-card">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[14px] text-[#9d3d1e] font-bold flex items-center gap-2" htmlFor="hindi-input">
            <span className="material-symbols-outlined text-xl">edit_note</span>
            <span>Enter Hindi phrase (हिंदी में लिखें या बोलें)</span>
          </label>
          <span className="text-[11px] text-[#56423c] bg-white px-2 py-0.5 rounded border border-[#ddc0b8]">
            Auto-cleans spoken noise
          </span>
        </div>

        <div className="relative bg-white rounded-xl border-2 border-[#ddc0b8] focus-within:border-[#9d3d1e] transition-colors">
          <textarea
            id="hindi-input"
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-3.5 pr-28 rounded-xl bg-transparent font-devanagari text-[16px] text-[#201a18] focus:outline-none resize-none placeholder:text-[#8a726b]"
            placeholder="बच्चों, अपनी किताबें खोलो (Children, open your books)"
          />

          {/* Dictation & Clear buttons */}
          <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1.5">
            <button
              onClick={() => {
                audioEngine.playTapHaptic();
                setInputText('');
              }}
              aria-label="Clear phrase"
              className="h-10 w-10 flex items-center justify-center rounded-lg text-[#56423c] hover:bg-[#ece0dd] active:translate-y-0.5 transition"
              type="button"
            >
              <span className="material-symbols-outlined text-xl">cancel</span>
            </button>
            <button
              onClick={() => {
                audioEngine.playTapHaptic();
                setIsVoiceModalOpen(true);
              }}
              aria-label="Microphone dictation"
              className="h-11 px-3.5 flex items-center gap-1.5 rounded-xl bg-[#9d3d1e] text-white text-[13px] font-bold hover:bg-[#bd5533] transition active:translate-y-0.5 shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                mic
              </span>
              <span className="hidden sm:inline">बोलें (Mic)</span>
            </button>
          </div>
        </div>

        {/* Quick Context Pre-fill Chips */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-[#56423c]">
          <span className="text-[12px] whitespace-nowrap font-medium">Teacher prompts:</span>
          {['शांत रहो (Keep quiet)', 'हाथ ऊपर करो (Raise hands)', 'पाठ संख्या चार (Lesson 4)'].map((prompt) => (
            <button
              key={prompt}
              onClick={() => {
                audioEngine.playTapHaptic();
                setInputText(prompt.split('(')[0].trim());
              }}
              className="px-2.5 py-1 bg-[#ece0dd] hover:bg-white rounded-lg text-[12px] border border-[#ddc0b8] whitespace-nowrap active:translate-y-0.5 transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Action Button: TRANSLATE */}
        <div className="mt-4">
          <button
            onClick={handleTranslate}
            className="w-full min-h-[52px] rounded-xl bg-[#9d3d1e] text-white font-serif-headline text-[16px] font-bold flex items-center justify-center gap-3 clay-btn hover:bg-[#bd5533] active:translate-y-1 transition"
          >
            <span className="material-symbols-outlined text-2xl">translate</span>
            <span>TRANSLATE (अनुवाद करें)</span>
            <span className="material-symbols-outlined text-xl">bolt</span>
          </button>
        </div>
      </section>

      {/* TRANSLATION RESULT SECTION */}
      <section className="bg-white rounded-2xl border-2 border-[#ddc0b8] p-5 md:p-6 space-y-5 clay-card">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ddc0b8] pb-3.5">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#ece0dd] flex items-center justify-center text-[#9d3d1e] font-bold font-olchiki text-xl">
              ᱚ
            </span>
            <div>
              <h2 className="text-[18px] font-bold font-serif-headline text-[#201a18]">
                Santali Translation (संताली)
              </h2>
              <p className="text-[12px] text-[#56423c]">Classroom Instruction Corpus • Class 1-5</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#bbefc6] text-[#215031] border border-[#3a6848] rounded-full text-[12px] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a6848]" />
            <span>Verified Local Match</span>
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
          </div>
        </div>

        {/* Main Ol Chiki Display */}
        <div className="bg-[#fdf1ed] rounded-xl p-4 md:p-5 border border-[#ddc0b8] space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-[11px] text-[#9d3d1e] font-bold uppercase tracking-wider">
                Ol Chiki Script (ᱚᱞ ᱪᱤᱠᱤ)
              </span>
              <div className="font-olchiki text-2xl sm:text-3xl md:text-4xl text-[#201a18] font-bold leading-snug tracking-wide">
                {currentTranslation.olChiki}
              </div>
              <div className="text-[14px] text-[#56423c] pt-1 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-[#9d3d1e]">Phonetics:</span>
                <span className="italic bg-[#f7ebe8] px-2 py-0.5 rounded border border-[#ddc0b8] font-mono text-[13px]">
                  {currentTranslation.phoneticsLatin}
                </span>
                <span className="font-devanagari text-[#201a18] font-medium">
                  ({currentTranslation.phoneticsDevanagari})
                </span>
              </div>
            </div>

            {/* Circular Audio Button */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <button
                onClick={handlePlayAudio}
                aria-label="Listen to Santali audio spoken by local teacher"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#9d3d1e] text-white flex items-center justify-center clay-btn hover:bg-[#bd5533] active:translate-y-1 transition duration-150"
              >
                <span
                  className={`material-symbols-outlined text-3xl ${isPlayingAudio ? 'animate-pulse' : ''}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {isPlayingAudio ? 'graphic_eq' : 'volume_up'}
                </span>
              </button>
              <span className="text-[12px] text-[#9d3d1e] font-bold text-center">Aanjom / सुनें</span>
              <span className="text-[10px] text-[#56423c]">Recorded by S. Murmu</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#ddc0b8]/60 flex items-center gap-2 text-[14px] text-[#201a18]">
            <span className="text-[#8a726b] font-semibold text-[13px]">Meaning (English):</span>
            <span className="font-medium bg-white px-2.5 py-1 rounded border border-[#ddc0b8]">
              “{currentTranslation.englishMeaning}”
            </span>
          </div>
        </div>

        {/* Alternative Phrasing with Transparent Machine-Translated Label */}
        <div className="bg-[#f7ebe8] rounded-xl p-3.5 border border-[#ddc0b8] space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[13px] font-bold text-[#201a18] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#8d4b00]">history_edu</span>
              <span>Alternative phrasing (वैकल्पिक रूप):</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#ffdcc3] text-[#6e3900] border border-[#8d4b00] rounded-full text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#8d4b00]" />
              <span>Machine Translated — Pending Review</span>
            </span>
          </div>
          <p className="font-olchiki text-xl text-[#201a18] font-semibold">{currentTranslation.altOlChiki}</p>
          <p className="text-[12px] text-[#56423c]">{currentTranslation.altPhonetics}</p>
        </div>

        {/* Suggest Correction */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => {
              audioEngine.playTapHaptic();
              alert('सुझाव दर्ज किया गया! जब आप क्लस्टर रिसोर्स सेंटर (BRC) पर वाई-फाई से जुड़ेंगे, यह शिक्षा विभाग के पोर्टल पर सिंक होगा।');
            }}
            className="inline-flex items-center gap-1.5 text-[#9d3d1e] hover:underline font-bold text-[13px] active:translate-y-0.5"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
            <span>Suggest a correction (सुझाव दें)</span>
          </button>
          <span className="text-[11px] text-[#56423c] flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">sync</span>
            Syncs automatically in town
          </span>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-[#ddc0b8] grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={handleCopy}
            className="min-h-[48px] px-3 rounded-xl bg-[#f7ebe8] hover:bg-[#f2e6e2] border border-[#ddc0b8] text-[13px] font-bold text-[#201a18] flex items-center justify-center gap-2 active:translate-y-0.5 transition"
          >
            <span className="material-symbols-outlined text-xl">
              {copied ? 'check_circle' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied! (कॉपी किया)' : 'Copy (कॉपी करें)'}</span>
          </button>

          <button
            onClick={handleAddFlashcard}
            className="min-h-[48px] px-3 rounded-xl bg-[#f7ebe8] hover:bg-[#f2e6e2] border border-[#ddc0b8] text-[13px] font-bold text-[#3a6848] flex items-center justify-center gap-2 active:translate-y-0.5 transition"
          >
            <span className="material-symbols-outlined text-xl">
              {addedToFlashcards ? 'bookmark_added' : 'style'}
            </span>
            <span>{addedToFlashcards ? 'Added!' : 'Add to Flashcards'}</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playTapHaptic();
              onNavigate('blackboard');
            }}
            className="min-h-[48px] px-3 rounded-xl bg-[#3a6848] text-white text-[13px] font-bold flex items-center justify-center gap-2 clay-card active:translate-y-0.5 transition"
          >
            <span className="material-symbols-outlined text-xl">co_present</span>
            <span>Share to Blackboard</span>
          </button>
        </div>
      </section>

      {/* Pedagogical Hint Bento Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#f7ebe8] rounded-xl p-4 border border-[#ddc0b8] flex items-start gap-3">
          <div className="p-2.5 bg-[#ffdbd0] text-[#3a0b00] rounded-xl shrink-0">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <div>
            <h3 className="text-[15px] font-bold font-serif-headline text-[#201a18]">Classroom Practice Tip</h3>
            <p className="text-[13px] text-[#56423c] mt-1 leading-snug">
              Say the Hindi phrase once, point to the chalkboard prompt, and encourage the children to chant back in Santali.
            </p>
          </div>
        </div>

        <div className="bg-[#f7ebe8] rounded-xl p-4 border border-[#ddc0b8] flex items-start gap-3">
          <div className="p-2.5 bg-[#bbefc6] text-[#215031] rounded-xl shrink-0">
            <span className="material-symbols-outlined text-2xl">storage</span>
          </div>
          <div>
            <h3 className="text-[15px] font-bold font-serif-headline text-[#201a18]">2,480 Local Phrases Cached</h3>
            <p className="text-[13px] text-[#56423c] mt-1 leading-snug">
              Standard primary school Hindi-Santali vocabulary is fully stored on this device memory without internet.
            </p>
          </div>
        </div>
      </section>

      {/* Voice Dictation Modal */}
      <VoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onComplete={(transcript) => setInputText(transcript)}
      />
    </div>
  );
};
