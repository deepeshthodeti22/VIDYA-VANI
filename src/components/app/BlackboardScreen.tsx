import React, { useState } from 'react';
import { audioEngine } from '../../utils/audio';

interface BlackboardScreenProps {
  onBack: () => void;
  onNavigateTrace?: () => void;
}

interface WordDetail {
  word: string;
  roman: string;
  devanagari: string;
  meaning: string;
}

interface PromptDeckItem {
  id: number;
  title: string;
  olChikiWords: WordDetail[];
  phonetics: string;
  romanPronounce: string;
  hindi: string;
  traceTip: string;
}

const PROMPTS: PromptDeckItem[] = [
  {
    id: 0,
    title: '3. आओ मिलकर पढ़ें',
    olChikiWords: [
      { word: 'ᱫᱮᱞᱟᱵᱚᱱ', roman: 'Delabon', devanagari: 'देलागोन', meaning: 'आओ मिलकर (Come together / All of us)' },
      { word: 'ᱯᱟᱲᱦᱟᱣ', roman: 'Paṛhao', devanagari: 'पाड़हाव', meaning: 'पढ़ें (Read/Study together)' },
      { word: 'ᱢᱮ', roman: 'Me', devanagari: 'मे', meaning: 'क्रिया सुझाव (Polite imperative particle)' }
    ],
    phonetics: 'उच्चारण: "देलागोन पाड़हाव मे"',
    romanPronounce: 'Del-ah-bon Pahr-how May',
    hindi: '"आओ मिलकर पढ़ें"',
    traceTip: 'Stroke 1: Left arc → Stroke 2: Baseline loop → Stroke 3: Right hook'
  },
  {
    id: 1,
    title: '1. किताबें खोलो (Open books)',
    olChikiWords: [
      { word: 'ᱯᱩᱛᱷᱤ', roman: 'Puthi', devanagari: 'पुथी', meaning: 'किताब (Book)' },
      { word: 'ᱠᱚ', roman: 'Ko', devanagari: 'को', meaning: 'बहुवचन (Plural books)' },
      { word: 'ᱡᱷᱤᱡ', roman: 'Jhij', devanagari: 'झिज', meaning: 'खोलो (Open)' },
      { word: 'ᱢᱮ', roman: 'Me', devanagari: 'मे', meaning: 'निर्देश (Command particle)' }
    ],
    phonetics: 'उच्चारण: "पुथी को झिज मे"',
    romanPronounce: 'Poo-thee Ko Jheej May',
    hindi: '"किताबें खोलो"',
    traceTip: 'ᱯ Stroke: Vertical stem down → loop clockwise'
  },
  {
    id: 2,
    title: '2. ध्यान से सुनो (Listen carefully)',
    olChikiWords: [
      { word: 'ᱟᱸᱡᱚᱢ', roman: 'Aanjom', devanagari: 'आंजोम', meaning: 'सुनो (Listen)' },
      { word: 'ᱢᱮ', roman: 'Me', devanagari: 'मे', meaning: 'सुझाव (Prompt)' },
      { word: 'ᱱᱟᱯᱟᱭ', roman: 'Napai', devanagari: 'नापाय', meaning: 'अच्छी तरह (Carefully)' },
      { word: 'ᱛᱮ', roman: 'Te', devanagari: 'ते', meaning: 'से (By / with)' }
    ],
    phonetics: 'उच्चारण: "आंजोम मे नापाय ते"',
    romanPronounce: 'Ahn-jom May Nah-pie Tay',
    hindi: '"ध्यान से सुनो"',
    traceTip: 'ᱟ Stroke: Open bowl facing right, gentle trail'
  },
  {
    id: 3,
    title: '4. बहुत अच्छा / शाबाश! (Praise)',
    olChikiWords: [
      { word: 'ᱟᱹᱰᱤ', roman: 'Aṛi', devanagari: 'अड़ी', meaning: 'बहुत (Very)' },
      { word: 'ᱱᱟᱯᱟᱭ', roman: 'Napai', devanagari: 'नापाय', meaning: 'अच्छा (Good)' },
      { word: 'ᱥᱟᱨᱦᱟᱣ', roman: 'Sarhaw', devanagari: 'सारहाव', meaning: 'शाबाश / बधाई (Praise)' }
    ],
    phonetics: 'उच्चारण: "अड़ी नापाय, सारहाव!"',
    romanPronounce: 'Ah-ree Nah-pie Sahr-how',
    hindi: '"बहुत अच्छा / शाबाश!"',
    traceTip: 'ᱥ Stroke: Triple curved blessing spine'
  }
];

export const BlackboardScreen: React.FC<BlackboardScreenProps> = ({ onBack, onNavigateTrace }) => {
  const [boardTheme, setBoardTheme] = useState<'green' | 'charcoal'>('green');
  const [fontScale, setFontScale] = useState<'base' | 'large' | 'xlarge'>('large');
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<WordDetail | null>(null);
  const [hideHindi, setHideHindi] = useState(false);
  const [chalkGlow, setChalkGlow] = useState(false);
  const [traceAssist, setTraceAssist] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState<'1.0×' | '0.75×'>('1.0×');
  const [isPlayingChoral, setIsPlayingChoral] = useState(false);
  const [choralProgress, setChoralProgress] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [choralStepText, setChoralStepText] = useState('LISTENING READY');

  const currentPrompt = PROMPTS[activePromptIndex];

  const handlePlayRecite = () => {
    if (isPlayingChoral) return;
    audioEngine.playTapHaptic();
    setIsPlayingChoral(true);
    setChoralStepText('1. TEACHER RECITES...');
    setChoralProgress(33);

    audioEngine.speakPhrase(currentPrompt.phonetics.replace('उच्चारण: ', '').replace(/"/g, ''), 'hi-IN');

    setTimeout(() => {
      setChoralStepText('2. CLASSROOM CHORUS IN REPEAT!');
      setChoralProgress(66);
      audioEngine.playChoralChime([261.63, 329.63, 392.0, 523.25]);
    }, 1500);

    setTimeout(() => {
      setChoralStepText('3. COMPLETED TOGETHER ✓');
      setChoralProgress(100);
    }, 3000);

    setTimeout(() => {
      setIsPlayingChoral(false);
      setChoralProgress(0);
      setChoralStepText('LISTENING READY');
    }, 4200);
  };

  const handleToggleLoop = () => {
    audioEngine.playTapHaptic();
    setIsLooping(!isLooping);
    handlePlayRecite();
  };

  const handleSpeedToggle = () => {
    audioEngine.playTapHaptic();
    setSpeechSpeed((prev) => (prev === '1.0×' ? '0.75×' : '1.0×'));
  };

  const getFontClass = () => {
    if (fontScale === 'base') return 'text-3xl sm:text-5xl';
    if (fontScale === 'large') return 'text-4xl sm:text-6xl md:text-7xl';
    return 'text-5xl sm:text-7xl md:text-8xl';
  };

  return (
    <div className="flex-1 max-w-[1500px] w-full mx-auto p-2 sm:p-4 lg:p-6 space-y-4 pb-28 select-none">
      {/* Top Header */}
      <header className="bg-white border-b border-[#ddc0b8] shadow-xs px-4 h-16 w-full rounded-2xl flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioEngine.playTapHaptic();
              onBack();
            }}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#f7ebe8] hover:bg-[#f2e6e2] text-[#9d3d1e] border border-[#ddc0b8] transition active:translate-y-0.5"
            title="Back to Translate / वापस जाएं"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[17px] sm:text-[19px] font-bold font-serif-headline text-[#9d3d1e]">
                Blackboard Mode
              </span>
              <span className="text-[#8a726b] hidden sm:inline">|</span>
              <span className="text-[16px] text-[#201a18] font-bold hidden sm:inline">श्यामपट्ट मोड</span>
            </div>
            <p className="text-[11px] text-[#56423c]">Classroom Projector &amp; Choral Display</p>
          </div>
        </div>

        {/* Projection and Theme Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cast status */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#bbefc6] border border-[#3a6848] text-[#215031]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a6848] animate-pulse" />
            <span className="material-symbols-outlined text-base">cast_connected</span>
            <span className="text-[12px] font-bold hidden md:inline">Projector Live (1080p)</span>
          </div>

          {/* Slate Theme Toggle */}
          <div className="flex items-center bg-[#f7ebe8] rounded-xl p-1 border border-[#ddc0b8]">
            <button
              onClick={() => {
                audioEngine.playTapHaptic();
                setBoardTheme('green');
              }}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[11px] font-bold transition ${
                boardTheme === 'green' ? 'bg-white text-[#9d3d1e] shadow-xs' : 'text-[#56423c]'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#172e22] border border-white" />
              <span className="hidden sm:inline">Slate Green</span>
            </button>
            <button
              onClick={() => {
                audioEngine.playTapHaptic();
                setBoardTheme('charcoal');
              }}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[11px] font-bold transition ${
                boardTheme === 'charcoal' ? 'bg-white text-[#9d3d1e] shadow-xs' : 'text-[#56423c]'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#1a1a19] border border-white" />
              <span className="hidden sm:inline">Charcoal Slate</span>
            </button>
          </div>

          {/* Font Scale Switcher */}
          <div className="hidden sm:flex items-center bg-[#f7ebe8] rounded-xl p-1 border border-[#ddc0b8]">
            {(['base', 'large', 'xlarge'] as const).map((scale, i) => (
              <button
                key={scale}
                onClick={() => {
                  audioEngine.playTapHaptic();
                  setFontScale(scale);
                }}
                className={`w-8 h-8 rounded-lg font-bold text-[12px] transition ${
                  fontScale === scale ? 'bg-white text-[#9d3d1e] shadow-xs' : 'text-[#56423c]'
                }`}
              >
                {i === 0 ? 'A' : i === 1 ? 'A+' : 'A++'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Sub-bar: Lesson context */}
      <div className="flex items-center justify-between px-2 flex-wrap gap-2 text-[12px]">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-[#bbefc6] text-[#215031] border border-[#3a6848] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">cloud_done</span>
            100% Offline Classroom Cache
          </span>
          <span className="text-[#56423c] hidden md:inline">Unit 4: Reading in Unity (ᱡᱩᱢᱤᱫᱽ ᱯᱟᱲᱦᱟᱣ)</span>
        </div>
        <span className="text-[#56423c] flex items-center gap-1 font-medium">
          <span className="material-symbols-outlined text-sm text-[#9d3d1e]">touch_app</span>
          Tap words to isolate meaning &amp; sound
        </span>
      </div>

      {/* Blackboard Frame Container */}
      <div
        className={`relative rounded-2xl wood-frame p-4 sm:p-8 flex flex-col justify-between min-h-[420px] lg:min-h-[500px] overflow-hidden transition-colors duration-300 ${
          boardTheme === 'green' ? 'slate-board-green' : 'slate-board-charcoal'
        }`}
      >
        {/* Top Slate Details */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-emerald-200/60 font-mono">
              OL CHIKI ↔ DEVANAGARI
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
            <span className="chalk-yellow text-xs font-mono font-semibold tracking-wider">CHORAL DRILL 03</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-black/40 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5 font-mono">
              <span className={`w-2 h-2 rounded-full ${isPlayingChoral ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
              {choralStepText}
            </span>
          </div>
        </div>

        {/* Center Chalkboard Display */}
        <div className="my-auto py-6 sm:py-10 flex flex-col items-center justify-center text-center z-10 w-full">
          {/* Primary Ol Chiki Words */}
          <div className={`flex flex-wrap items-center justify-center gap-4 sm:gap-8 my-2 font-olchiki font-extrabold tracking-wide ${getFontClass()}`}>
            {currentPrompt.olChikiWords.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  audioEngine.playTapHaptic();
                  setSelectedWord(item);
                  audioEngine.speakPhrase(item.devanagari, 'hi-IN');
                }}
                className="group cursor-pointer p-3 sm:p-4 rounded-xl border-2 border-transparent hover:border-yellow-300/40 bg-white/5 hover:bg-white/10 transition-all active:scale-95 text-center"
              >
                <span className={`block transition-colors ${chalkGlow ? 'chalk-yellow' : 'chalk-white group-hover:chalk-yellow'}`}>
                  {item.word}
                </span>
                <span className="block text-xs sm:text-sm text-emerald-200/70 uppercase tracking-widest mt-1 font-sans">
                  {item.roman}
                </span>
              </div>
            ))}
          </div>

          {/* Phonetics Bar */}
          <div className="mt-4 px-4 py-2 rounded-lg bg-black/40 border border-white/10 inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-300/80 text-sm">record_voice_over</span>
            <span className="text-[14px] sm:text-[16px] chalk-yellow font-medium">{currentPrompt.phonetics}</span>
            <span className="text-xs text-white/40 font-mono">|</span>
            <span className="text-[13px] text-emerald-200/80">{currentPrompt.romanPronounce}</span>
          </div>

          {/* Parallel Meaning in Hindi */}
          {!hideHindi && (
            <div className="mt-6 sm:mt-8 transition-opacity duration-300">
              <div className="inline-block relative">
                <h2 className="text-[24px] sm:text-[34px] chalk-terracotta font-bold font-serif-headline">
                  {currentPrompt.hindi}
                </h2>
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#ff9d80]/40 to-transparent mt-1" />
              </div>
              <p className="text-[12px] text-white/60 mt-1">Hindi Translation • हिंदी भावार्थ</p>
            </div>
          )}

          {/* Chalk Trace Mode Helper */}
          {traceAssist && (
            <div className="mt-4 p-3 rounded-xl bg-black/60 border border-amber-300/40 text-amber-200 text-[13px] flex items-center gap-3 animate-in fade-in">
              <span className="material-symbols-outlined text-amber-300">draw</span>
              <span>
                <strong>Chalk Trace Active:</strong> {currentPrompt.traceTip}
              </span>
            </div>
          )}
        </div>

        {/* Word Analysis Drawer */}
        {selectedWord && (
          <div className="z-20 bg-[#16271c]/95 border-2 border-yellow-300/50 rounded-xl p-3 sm:p-4 mb-3 text-white shadow-2xl backdrop-blur-sm animate-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-2.5 py-1 rounded bg-yellow-400 text-black font-black text-xl font-olchiki">
                  {selectedWord.word}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-[16px]">{selectedWord.devanagari}</span>
                    <span className="text-xs text-emerald-300 font-mono">({selectedWord.roman})</span>
                  </div>
                  <p className="text-xs text-yellow-200">{selectedWord.meaning}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    audioEngine.playTapHaptic();
                    audioEngine.speakPhrase(selectedWord.devanagari, 'hi-IN');
                  }}
                  className="h-9 px-3 rounded-lg bg-[#9d3d1e] hover:bg-[#bd5533] text-white flex items-center gap-1.5 text-[12px] font-bold transition active:translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-base">volume_up</span>
                  <span>Listen Word</span>
                </button>
                <button
                  onClick={() => setSelectedWord(null)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chalkboard Bottom Rail */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3 z-10 flex-wrap gap-2 text-white/50 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              Santali (Ol Chiki ᱚᱞ ᱪᱤᱠᱤ)
            </span>
            <span>•</span>
            <span>Primary Standard Grade 1-3</span>
          </div>
          <div>Taught by: Somra Hansda (Sahiyaka)</div>
        </div>
      </div>

      {/* Control Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
        {/* Primary Audio Master Card */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-2xl border border-[#ddc0b8] shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9d3d1e]">campaign</span>
              <span className="text-[16px] font-bold font-serif-headline text-[#201a18]">
                Classroom Choral &amp; Audio
              </span>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#f7ebe8] font-bold text-[#56423c]">
              Speaker: Louder 120% Preset
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Recite Listen Button */}
            <button
              onClick={handlePlayRecite}
              className="flex-1 min-w-[200px] h-16 min-h-[52px] px-6 rounded-2xl bg-[#9d3d1e] hover:bg-[#bd5533] text-white font-bold flex items-center justify-center gap-3 clay-btn transition active:translate-y-1 shadow-sm"
            >
              <span
                className={`material-symbols-outlined text-2xl ${isPlayingChoral ? 'animate-pulse' : ''}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPlayingChoral ? 'graphic_eq' : 'volume_up'}
              </span>
              <div className="text-left">
                <span className="block text-[15px] leading-tight">Aanjom / उच्चारण सुनाएं</span>
                <span className="block text-[11px] font-normal text-white/80">Play Native Speaker Audio</span>
              </div>
            </button>

            {/* Choral Repeat 3x */}
            <button
              onClick={handleToggleLoop}
              className={`h-16 min-h-[52px] px-4 rounded-2xl border text-[13px] font-bold flex items-center gap-2.5 transition active:translate-y-0.5 ${
                isLooping
                  ? 'bg-[#bbefc6] border-[#3a6848] text-[#215031]'
                  : 'bg-[#f7ebe8] hover:bg-[#f2e6e2] border-[#ddc0b8] text-[#201a18]'
              }`}
            >
              <span className="material-symbols-outlined text-[#8d4b00]">repeat</span>
              <div className="text-left">
                <span className="block">Loop Choral (3×)</span>
                <span className="block text-[11px] text-[#56423c] font-normal">2s Pause for Repeat</span>
              </div>
            </button>

            {/* Speed toggle */}
            <button
              onClick={handleSpeedToggle}
              className="h-16 min-h-[52px] px-3.5 rounded-2xl bg-[#f7ebe8] hover:bg-[#f2e6e2] border border-[#ddc0b8] text-[#201a18] font-bold flex flex-col items-center justify-center transition active:translate-y-0.5 min-w-[68px]"
            >
              <span className="text-[10px] text-[#56423c]">Speed</span>
              <span className="text-[#3a6848] text-[15px]">{speechSpeed}</span>
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full bg-[#f2e6e2] rounded-full overflow-hidden flex items-center">
            <div
              className="h-full bg-[#3a6848] transition-all duration-300"
              style={{ width: `${choralProgress}%` }}
            />
          </div>
        </div>

        {/* Teacher Blackboard Tools */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-2xl border border-[#ddc0b8] shadow-xs flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3a6848]">handyman</span>
              <span className="text-[16px] font-bold font-serif-headline text-[#201a18]">
                Teacher Blackboard Tools
              </span>
            </div>
            <span className="text-[11px] text-[#56423c]">Active Tools</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {/* Highlight Script */}
            <button
              onClick={() => {
                audioEngine.playTapHaptic();
                setChalkGlow(!chalkGlow);
              }}
              className={`min-h-[50px] px-3 py-2 rounded-xl border text-left transition active:translate-y-0.5 flex items-center gap-2 ${
                chalkGlow
                  ? 'bg-[#ffdcc3] border-[#8d4b00] text-[#6e3900]'
                  : 'bg-[#f7ebe8] hover:bg-[#f2e6e2] border-[#ddc0b8] text-[#201a18]'
              }`}
            >
              <span className="material-symbols-outlined text-[#8d4b00]">ink_highlighter</span>
              <div>
                <span className="block text-[12px] font-bold leading-tight">Chalk Glow</span>
                <span className="block text-[10px] text-[#56423c]">Highlight Ol Chiki</span>
              </div>
            </button>

            {/* Hide Hindi */}
            <button
              onClick={() => {
                audioEngine.playTapHaptic();
                setHideHindi(!hideHindi);
              }}
              className={`min-h-[50px] px-3 py-2 rounded-xl border text-left transition active:translate-y-0.5 flex items-center gap-2 ${
                hideHindi
                  ? 'bg-[#ffdbd0] border-[#9d3d1e] text-[#3a0b00]'
                  : 'bg-[#f7ebe8] hover:bg-[#f2e6e2] border-[#ddc0b8] text-[#201a18]'
              }`}
            >
              <span className="material-symbols-outlined text-[#9d3d1e]">
                {hideHindi ? 'visibility_off' : 'visibility'}
              </span>
              <div>
                <span className="block text-[12px] font-bold leading-tight">
                  {hideHindi ? 'Show Hindi' : 'Hide Hindi'}
                </span>
                <span className="block text-[10px] text-[#56423c]">Recall Drill</span>
              </div>
            </button>

            {/* Chalk Trace Assist */}
            <button
              onClick={() => {
                audioEngine.playTapHaptic();
                setTraceAssist(!traceAssist);
                if (onNavigateTrace && !traceAssist) {
                  // optional shortcut
                }
              }}
              className={`min-h-[50px] px-3 py-2 rounded-xl border text-left transition active:translate-y-0.5 flex items-center gap-2 ${
                traceAssist
                  ? 'bg-[#bbefc6] border-[#3a6848] text-[#215031]'
                  : 'bg-[#f7ebe8] hover:bg-[#f2e6e2] border-[#ddc0b8] text-[#201a18]'
              }`}
            >
              <span className="material-symbols-outlined text-[#3a6848]">edit_note</span>
              <div>
                <span className="block text-[12px] font-bold leading-tight">Chalk Trace</span>
                <span className="block text-[10px] text-[#56423c]">Stroke Order</span>
              </div>
            </button>

            {/* Disconnect */}
            <button
              onClick={() => {
                audioEngine.playTapHaptic();
                onBack();
              }}
              className="min-h-[50px] px-3 py-2 rounded-xl bg-[#ffdad6] hover:bg-[#ffcdc7] border border-[#ba1a1a] text-[#93000a] flex items-center gap-2 text-left transition active:translate-y-0.5"
            >
              <span className="material-symbols-outlined text-[#ba1a1a]">cast</span>
              <div>
                <span className="block text-[12px] font-bold leading-tight">Disconnect</span>
                <span className="block text-[10px] text-[#56423c]">End Projector</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Classroom Quick Lesson Prompts */}
      <div className="bg-white p-4 rounded-2xl border border-[#ddc0b8] shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9d3d1e]">view_carousel</span>
            <span className="text-[15px] font-bold font-serif-headline text-[#201a18]">
              Quick Classroom Prompts (त्वरित पाठ पट्टिका)
            </span>
          </div>
          <span className="text-[11px] text-[#56423c]">Tap to switch blackboard instantly</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar">
          {PROMPTS.map((p, idx) => {
            const isActive = idx === activePromptIndex;
            return (
              <button
                key={p.id}
                onClick={() => {
                  audioEngine.playTapHaptic();
                  setActivePromptIndex(idx);
                  setSelectedWord(null);
                }}
                className={`shrink-0 min-h-[52px] px-4 py-3 rounded-xl border flex items-center gap-3 text-left transition active:translate-y-0.5 ${
                  isActive
                    ? 'bg-[#9d3d1e] text-white border-[#81290a] shadow-xs'
                    : 'bg-[#f7ebe8] hover:bg-[#f2e6e2] text-[#201a18] border-[#ddc0b8]'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#ece0dd] text-[#56423c]'
                  }`}
                >
                  {idx + 1}
                </span>
                <div>
                  <div className="text-[13px] font-bold">{p.title}</div>
                  <div className={`text-xs font-olchiki ${isActive ? 'text-white/80' : 'text-[#56423c]'}`}>
                    {p.olChikiWords.map((w) => w.word).join(' ')}
                  </div>
                </div>
                {isActive && <span className="material-symbols-outlined text-base ml-1">check_circle</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
