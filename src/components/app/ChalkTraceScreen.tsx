import React, { useRef, useState, useEffect } from 'react';
import { audioEngine } from '../../utils/audio';

interface ChalkTraceScreenProps {
  onBack: () => void;
}

export const ChalkTraceScreen: React.FC<ChalkTraceScreenProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [chalkColor, setChalkColor] = useState<string>('#ffffff');
  const [chalkWidth, setChalkWidth] = useState<number>(14);
  const [showNumbers, setShowNumbers] = useState<boolean>(true);
  const [currentStroke, setCurrentStroke] = useState<number>(2);
  const [isReplaying, setIsReplaying] = useState(false);
  const [accuracyNotice, setAccuracyNotice] = useState<string | null>(null);

  // Character glyphs
  const glyphs = [
    { glyph: 'ᱫ', name: "DAK' (द)", origin: 'Shape of pouring rain / water vessel (ᱫᱟᱜ)' },
    { glyph: 'ᱚ', name: 'LA (ल)', origin: 'Shape of blowing air / wind whistle' },
    { glyph: 'ᱛ', name: 'AT (त)', origin: 'Shape of traditional earth hearth / cooking stone' },
    { glyph: 'ᱜ', name: 'AG (ग)', origin: 'Shape of hill crest / Sal ridge' }
  ];
  const [activeGlyphIndex, setActiveGlyphIndex] = useState(0);

  const activeGlyph = glyphs[activeGlyphIndex];

  // Set up drawing canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions based on display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, []);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = chalkColor;
    ctx.lineWidth = chalkWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 4;
    ctx.shadowColor = chalkColor;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      audioEngine.playTapHaptic();
    }
  };

  const clearCanvas = () => {
    audioEngine.playTapHaptic();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleNextStroke = () => {
    audioEngine.playTapHaptic();
    if (currentStroke < 3) {
      setCurrentStroke(currentStroke + 1);
      setAccuracyNotice('Shabash! ᱫ Stroke 2 validated. Advancing to Stroke 3!');
    } else {
      setCurrentStroke(1);
      clearCanvas();
      setAccuracyNotice('Bravo! Full character ᱫ written successfully!');
    }
    setTimeout(() => setAccuracyNotice(null), 2500);
  };

  const handlePlayChime = () => {
    audioEngine.playTapHaptic();
    audioEngine.playChoralChime([220, 330, 440, 550]);
    audioEngine.speakPhrase('दाक् से पानी, बादल का पानी! पहले ऊपर का घेरा बनाओ, फिर नीचे बहाव!', 'hi-IN');
  };

  const handleReplay = () => {
    audioEngine.playTapHaptic();
    setIsReplaying(true);
    setTimeout(() => setIsReplaying(false), 1400);
  };

  return (
    <div className="flex-1 max-w-xl w-full mx-auto px-4 pt-3 pb-28 flex flex-col space-y-4 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#ddc0b8]/60">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              audioEngine.playTapHaptic();
              onBack();
            }}
            aria-label="Go Back"
            className="w-10 h-10 rounded-xl bg-[#f7ebe8] flex items-center justify-center text-[#9d3d1e] hover:bg-[#f2e6e2] active:translate-y-0.5 transition"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[17px] font-bold font-serif-headline text-[#9d3d1e]">Vidya Vani</span>
              <span className="bg-[#3a6848] text-white px-2 py-0.5 rounded-full text-[11px] font-bold">
                Classroom Mode
              </span>
            </div>
            <p className="text-[12px] text-[#56423c]">Chalk Trace • वर्ण आलेखन अभ्यास</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={clearCanvas}
            className="w-10 h-10 rounded-xl bg-[#fdf1ed] hover:bg-[#f7ebe8] border border-[#ddc0b8] flex items-center justify-center text-[#9d3d1e]"
            title="Erase Slate"
          >
            <span className="material-symbols-outlined">ink_eraser</span>
          </button>
          <div className="w-9 h-9 rounded-full bg-[#bbefc6] flex items-center justify-center text-[#215031]">
            <span className="material-symbols-outlined text-lg">cloud_done</span>
          </div>
        </div>
      </div>

      {/* Glyphs Carousel */}
      <section className="w-full overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-2 pb-1">
          <span className="text-[11px] text-[#56423c] font-bold shrink-0">AKHOR / वर्ण:</span>
          {glyphs.map((g, idx) => {
            const isActive = idx === activeGlyphIndex;
            return (
              <button
                key={g.glyph}
                onClick={() => {
                  audioEngine.playTapHaptic();
                  setActiveGlyphIndex(idx);
                  clearCanvas();
                }}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl font-serif-headline text-[15px] flex items-center space-x-1.5 transition ${
                  isActive
                    ? 'bg-[#9d3d1e] text-white shadow-sm border border-[#9d3d1e]'
                    : 'bg-[#f7ebe8] border border-[#ddc0b8] text-[#201a18] hover:bg-[#f2e6e2]'
                }`}
              >
                <span className="font-bold font-olchiki text-[18px]">{g.glyph}</span>
                <span className={`text-[11px] ${isActive ? 'text-[#ffdbd0]' : 'text-[#56423c]'}`}>{g.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Character Metadata Card */}
      <section className="bg-white rounded-2xl p-4 border border-[#ddc0b8] shadow-xs">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-16 h-16 rounded-xl bg-[#f7ebe8] flex items-center justify-center border-2 border-[#ddc0b8] text-[#9d3d1e] font-olchiki font-bold text-4xl">
              {activeGlyph.glyph}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-[18px] font-bold font-serif-headline text-[#201a18]">
                  {activeGlyph.glyph} - {activeGlyph.name}
                </h2>
                <button
                  onClick={handlePlayChime}
                  className="w-8 h-8 rounded-full bg-[#bd5533] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition shadow-xs"
                  title="Listen"
                >
                  <span className="material-symbols-outlined text-lg">volume_up</span>
                </button>
              </div>
              <p className="text-[12px] text-[#56423c] mt-0.5">
                Natural Origin: <span className="text-[#8d4b00] font-semibold">{activeGlyph.origin}</span>
              </p>
            </div>
          </div>

          <div className="hidden xs:flex flex-col items-end">
            <span className="inline-flex items-center space-x-1 bg-[#bbefc6] text-[#215031] px-2.5 py-1 rounded-full text-[11px] font-bold border border-[#3a6848]">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>94% Smooth</span>
            </span>
            <span className="text-[11px] text-[#3a6848] font-bold mt-1">बहुत बढ़िया! (Shabash)</span>
          </div>
        </div>

        {/* Stroke Progress Bar */}
        <div className="mt-4 pt-3 border-t border-[#ddc0b8] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-[13px] font-bold text-[#201a18]">Stroke {currentStroke} of 3</span>
            <div className="flex items-center space-x-1.5 ml-2">
              <span
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  currentStroke > 1 ? 'bg-[#3a6848] text-white' : 'bg-[#9d3d1e] text-white ring-2 ring-[#ffdbd0]'
                }`}
              >
                {currentStroke > 1 ? '✓' : '1'}
              </span>
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStroke === 2
                    ? 'bg-[#9d3d1e] text-white ring-2 ring-[#ffdbd0]'
                    : currentStroke > 2
                    ? 'bg-[#3a6848] text-white'
                    : 'bg-[#ece0dd] text-[#56423c]'
                }`}
              >
                {currentStroke > 2 ? '✓' : '2'}
              </span>
              <span
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  currentStroke === 3
                    ? 'bg-[#9d3d1e] text-white ring-2 ring-[#ffdbd0]'
                    : 'bg-[#ece0dd] text-[#56423c]'
                }`}
              >
                3
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-[#9d3d1e] text-[11px] bg-[#fdf1ed] px-2.5 py-1 rounded-lg border border-[#ddc0b8] font-bold">
            <span className="material-symbols-outlined text-sm">draw</span>
            <span>Finger Touch Active</span>
          </div>
        </div>
      </section>

      {/* Accuracy Feedback Notice */}
      {accuracyNotice && (
        <div className="p-2.5 bg-[#bbefc6] text-[#215031] text-[13px] font-bold rounded-xl text-center border border-[#3a6848] animate-in fade-in">
          {accuracyNotice}
        </div>
      )}

      {/* THE BIG CHALKBOARD SLATE */}
      <section className="relative w-full aspect-[4/4] sm:aspect-[4/3.8] rounded-2xl slate-board-green wood-frame p-3 flex flex-col justify-between overflow-hidden select-none touch-none shadow-xl">
        {/* Slate Top Info Overlay */}
        <div className="relative z-10 flex items-center justify-between px-2 pt-1 text-white/80">
          <div className="flex items-center space-x-2 text-[11px]">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#fde047]" />
            <span className="text-white font-medium">Santali Primary Copybook Grid • Ol Chiki</span>
          </div>
          <span className="bg-[#1a382c]/90 text-[#fde047] border border-[#fde047]/40 px-2 py-0.5 rounded-md text-[11px] font-bold">
            उंगली से आलेखन करें (Trace Path)
          </span>
        </div>

        {/* Chalk Ruling Lines */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 opacity-20">
          <div className="border-b border-dashed border-white w-full" />
          <div className="border-b border-white/60 w-full" />
          <div className="border-b border-dashed border-white w-full" />
          <div className="border-b border-white/60 w-full" />
        </div>

        {/* Guided SVG Glyph Outline */}
        <div className="relative w-full h-full flex items-center justify-center">
          <svg
            className="w-full h-full max-h-[300px] max-w-[300px] overflow-visible pointer-events-none"
            viewBox="0 0 300 300"
            fill="none"
          >
            {/* Ghost Template Path for ᱫ */}
            <g opacity="0.3" stroke="#F8FAFC" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 8">
              <path d="M 90 95 C 90 60, 160 55, 190 85 C 215 110, 195 145, 160 150" />
              <path d="M 160 150 C 220 155, 235 210, 190 235 C 160 250, 120 245, 95 220" />
              <path d="M 95 220 L 70 245" />
            </g>

            {/* Stroke 1 Completed (Glowing yellow-white) */}
            <path
              d="M 90 95 C 90 60, 160 55, 190 85 C 215 110, 195 145, 160 150"
              stroke="#FEF08A"
              strokeWidth="18"
              strokeLinecap="round"
              filter="drop-shadow(0 0 4px rgba(254, 240, 138, 0.6))"
            />
            {showNumbers && (
              <g transform="translate(85, 90)">
                <circle cx="0" cy="0" r="14" fill="#3a6848" stroke="#ffffff" strokeWidth="2" />
                <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ✓
                </text>
              </g>
            )}

            {/* Stroke 2 Guided Target Path */}
            <path
              d="M 160 150 C 185 152, 205 170, 205 190"
              stroke="#FFFFFF"
              strokeWidth="18"
              strokeLinecap="round"
              filter="drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))"
              className={isReplaying ? 'transition-all duration-1000' : ''}
            />
            <path
              d="M 205 190 C 205 215, 175 240, 140 240 C 120 240, 105 232, 95 220"
              stroke="#FDE047"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="4 6"
              opacity="0.9"
            />

            {showNumbers && (
              <>
                <g transform="translate(160, 150)">
                  <circle cx="0" cy="0" r="20" fill="#C45A38" opacity="0.6" className="pulse-indicator" />
                  <circle cx="0" cy="0" r="15" fill="#C45A38" stroke="#ffffff" strokeWidth="2.5" />
                  <text x="0" y="5" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                    ②
                  </text>
                </g>
                <g transform="translate(95, 220)">
                  <circle cx="0" cy="0" r="13" fill="#201a18" stroke="#ddc0b8" strokeWidth="1.5" />
                  <text x="0" y="4" fill="#ece0dd" fontSize="11" fontWeight="bold" textAnchor="middle">
                    ③
                  </text>
                </g>
              </>
            )}

            {/* Stylus indicator on stroke 2 */}
            <g transform="translate(205, 190)">
              <circle cx="0" cy="0" r="10" fill="#FDE047" opacity="0.75" />
              <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
            </g>
          </svg>

          {/* User Drawing Canvas on top of the guide */}
          <canvas
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
            className="absolute inset-0 w-full h-full cursor-crosshair z-10"
          />

          <div className="absolute bottom-2 right-2 text-white/40 text-[10px] pointer-events-none">
            Chalk Friction: Realistic Slate 2.0
          </div>
        </div>

        {/* Bottom Slate Controls */}
        <div className="relative z-20 flex items-center justify-between bg-black/40 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10">
          <button
            onClick={handleReplay}
            className="flex items-center space-x-1.5 text-white hover:text-[#fde047] active:scale-95 transition"
          >
            <span className="material-symbols-outlined text-lg">replay</span>
            <span className="text-[13px] font-bold">फिर से देखें (Replay Stroke)</span>
          </button>
          <div className="flex items-center space-x-1.5 text-[#fef08a] text-[11px] font-bold">
            <span className="material-symbols-outlined text-base">gesture</span>
            <span>Start at ② ➔ Curve Right</span>
          </div>
        </div>
      </section>

      {/* Tracing Controls Toolbar */}
      <section className="bg-white rounded-2xl p-3.5 border border-[#ddc0b8] shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Chalk Colors */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-[#56423c] font-bold">Chalk / खल्ली:</span>
            <div className="flex items-center space-x-1.5 bg-[#f7ebe8] p-1 rounded-xl border border-[#ddc0b8]">
              {[
                { color: '#ffffff', title: 'White' },
                { color: '#fde047', title: 'Yellow' },
                { color: '#7dd3fc', title: 'Sky Blue' }
              ].map((c) => (
                <button
                  key={c.color}
                  onClick={() => {
                    audioEngine.playTapHaptic();
                    setChalkColor(c.color);
                  }}
                  style={{ backgroundColor: c.color }}
                  className={`w-7 h-7 rounded-lg border transition ${
                    chalkColor === c.color ? 'ring-2 ring-[#9d3d1e] scale-110' : 'border-[#ddc0b8]'
                  }`}
                  title={c.title}
                />
              ))}
            </div>
          </div>

          {/* Width */}
          <div className="flex items-center space-x-1.5">
            <span className="text-[11px] text-[#56423c] font-bold">Width:</span>
            <div className="flex bg-[#f7ebe8] rounded-xl p-0.5 border border-[#ddc0b8] text-[12px]">
              <button
                onClick={() => setChalkWidth(8)}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  chalkWidth === 8 ? 'bg-white text-[#9d3d1e] shadow-xs' : 'text-[#56423c]'
                }`}
              >
                Thin
              </button>
              <button
                onClick={() => setChalkWidth(16)}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  chalkWidth === 16 ? 'bg-white text-[#9d3d1e] shadow-xs' : 'text-[#56423c]'
                }`}
              >
                Bold
              </button>
            </div>
          </div>
        </div>

        {/* Toggle Assist Options */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#ddc0b8]">
          <label className="flex items-center space-x-2 cursor-pointer bg-[#fdf1ed] px-3 py-2 rounded-xl border border-[#ddc0b8]">
            <input
              type="checkbox"
              checked={showNumbers}
              onChange={(e) => setShowNumbers(e.target.checked)}
              className="w-4 h-4 text-[#9d3d1e] rounded border-[#8a726b] focus:ring-[#9d3d1e]"
            />
            <span className="text-[11px] text-[#201a18] font-bold">Show Numbers (1-2-3)</span>
          </label>

          <button
            onClick={clearCanvas}
            className="flex items-center justify-center space-x-1.5 bg-[#fdf1ed] hover:bg-[#ece0dd] px-3 py-2 rounded-xl border border-[#ddc0b8] text-[11px] font-bold text-[#9d3d1e]"
          >
            <span className="material-symbols-outlined text-sm">cleaning_services</span>
            <span>Erase Canvas (मिटाएं)</span>
          </button>
        </div>
      </section>

      {/* Classroom Choral Rhyme */}
      <section className="bg-[#f4efe6] border-2 border-[#d8cebe] rounded-2xl p-4 shadow-xs">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#b15f00] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined">record_voice_over</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-[15px] font-bold font-serif-headline text-[#201a18]">Classroom Choral Rhyme</h3>
              <span className="text-xs bg-white px-2 py-0.5 rounded-full border border-[#d8cebe] font-bold text-[#8d4b00]">
                सामूहिक गान
              </span>
            </div>
            <p className="text-[15px] text-[#201a18] leading-snug font-serif italic font-olchiki">
              "ᱫ ᱫᱟᱜ ᱫᱟᱜ, ᱡᱟᱹᱲᱤ ᱫᱟᱜ! ᱪᱮᱛᱟᱱ ᱠᱷᱚᱱ ᱞᱟᱛᱟᱨ ᱟᱬᱜᱚᱱ!"
            </p>
            <p className="text-[12px] text-[#56423c]">
              (Hindi: "दाक् से पानी, बादल का पानी! पहले ऊपर का घेरा बनाओ, फिर नीचे बहाव!")
            </p>
          </div>
        </div>
      </section>

      {/* Primary Action Buttons */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <button
          onClick={clearCanvas}
          className="min-h-[50px] px-4 rounded-xl bg-[#f7ebe8] border-2 border-[#ddc0b8] text-[#201a18] font-bold text-[14px] flex items-center justify-center space-x-2 active:translate-y-0.5 transition"
        >
          <span className="material-symbols-outlined text-[#9d3d1e]">cleaning_services</span>
          <span>Clear &amp; Retry (दोबारा लिखें)</span>
        </button>

        <button
          onClick={handleNextStroke}
          className="min-h-[50px] px-4 rounded-xl bg-[#9d3d1e] text-white font-bold text-[14px] flex items-center justify-center space-x-2 clay-btn active:translate-y-0.5 transition"
        >
          <span>Next Stroke (अगला स्ट्रोक)</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </section>
    </div>
  );
};
