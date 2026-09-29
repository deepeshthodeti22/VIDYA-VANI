import React, { useState, useEffect } from 'react';
import { audioEngine } from '../../utils/audio';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (transcript: string) => void;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [streamText, setStreamText] = useState('बच्चों, अपनी किताबें खोलो');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isOpen) {
      audioEngine.playChoralChime([300, 450, 600]);
      setIsDone(false);
      const timer = setTimeout(() => {
        setStreamText('बच्चों, अपनी किताबें खोलो और पाठ चार निकालो');
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStopAndTranslate = () => {
    audioEngine.playTapHaptic();
    setIsDone(true);
    setTimeout(() => {
      onComplete(streamText);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#fff8f6] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#ddc0b8] flex flex-col justify-between max-h-[92vh]">
        {/* Modal Header */}
        <header className="w-full px-4 py-3 flex items-center justify-between border-b border-[#ddc0b8] bg-[#fdf1ed] shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                audioEngine.playTapHaptic();
                onClose();
              }}
              aria-label="Cancel Voice Input"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-[#ece0dd] text-[#201a18] hover:bg-[#ddc0b8] active:translate-y-0.5 transition-transform"
              type="button"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[17px] font-bold font-serif-headline text-[#9d3d1e]">Offline Voice Engine</span>
                <span className="px-2 py-0.5 rounded-full bg-[#bbefc6] text-[#215031] text-[11px] font-bold border border-[#3a6848] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  Dumka Dialect
                </span>
              </div>
              <span className="text-[12px] text-[#56423c]">डुमका संथाली-हिंदी स्थानीय स्वर मॉडल • 100% ऑफ़लाइन</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f7ebe8] border border-[#ddc0b8] text-[#56423c] text-[12px]">
            <span className="material-symbols-outlined text-base">memory</span>
            <span>NPU Active</span>
          </div>
        </header>

        {/* Modal Main Stage */}
        <main className="p-4 sm:p-6 flex flex-col items-center justify-between gap-5 overflow-y-auto">
          {/* Acoustic Wave Visualizer */}
          <div className="w-full flex flex-col items-center justify-center pt-2">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Outer Sage Wave */}
              <div className="absolute inset-0 rounded-full border-2 border-[#a0d2ab] bg-[#bbefc6]/25 animate-pulse-ring-slow" />
              {/* Middle Terracotta Wave */}
              <div className="absolute inset-4 rounded-full border-2 border-[#ffdbd0] bg-[#ffdbd0]/25 animate-pulse-ring-mid" />
              {/* Inner Circle */}
              <div className="absolute inset-8 rounded-full border border-[#ddc0b8] bg-[#f7ebe8]" />
              {/* Large Mic Circle */}
              <div className="relative z-10 w-24 h-24 rounded-full bg-[#bd5533] flex items-center justify-center border-b-4 border-[#9d3d1e] shadow-md">
                <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  mic
                </span>
              </div>
            </div>

            {/* Bilingual Status Text */}
            <div className="text-center mt-3 space-y-1">
              <h2 className="text-[20px] sm:text-[24px] font-bold font-serif-headline text-[#201a18] tracking-tight">
                Listening... Speak in Hindi
              </h2>
              <p className="text-[16px] text-[#9d3d1e] font-bold">सुन रहे हैं... हिंदी में बोलिए</p>
              <p className="text-[12px] text-[#56423c] pt-0.5">
                Aanjomedañ... Hindi te roṛme (संथाली अनुवाद स्वतः तैयार होगा)
              </p>
            </div>
          </div>

          {/* Live Transcription Box */}
          <div className="w-full bg-white border border-[#ddc0b8] rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#ddc0b8]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9d3d1e] animate-ping" />
                <span className="text-[12px] text-[#56423c] font-bold">लाइव श्रुतिलेख (Live Transcript)</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#f2e6e2] text-[#56423c] font-bold">
                Confidence: 98.4%
              </span>
            </div>

            {/* Spoken text with blinking caret */}
            <div className="min-h-[60px] flex items-start">
              <p className="text-[17px] sm:text-[20px] font-serif-headline text-[#201a18] leading-relaxed">
                “{streamText}”
                <span className="inline-block w-2 h-5 ml-1.5 bg-[#9d3d1e] animate-caret align-middle" />
              </p>
            </div>

            {/* Parallel Ol Chiki preview */}
            <div className="pt-2 border-t border-[#ddc0b8]/60 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="material-symbols-outlined text-[#3a6848] text-base shrink-0">translate</span>
                <span className="text-[13px] text-[#3a6848] font-bold truncate font-olchiki">
                  Ol Chiki: ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱯᱮ...
                </span>
              </div>
              <span className="text-[11px] text-[#56423c] shrink-0 ml-2">संतुलित अनुवाद</span>
            </div>
          </div>

          {/* Latency & On-Device Monitor */}
          <div className="w-full px-1">
            <div className="flex items-center justify-between text-[#56423c] text-[12px] mb-1.5 font-bold">
              <span className="flex items-center gap-1 text-[#201a18]">
                <span className="material-symbols-outlined text-[#3a6848] text-base">bolt</span>
                Real-time on-device translation (~1.8s)
              </span>
              <span className="text-[11px] bg-[#bbefc6] text-[#215031] px-2 py-0.5 rounded border border-[#3a6848]">
                Zero Data Required
              </span>
            </div>
            <div className="w-full bg-[#f2e6e2] h-2.5 rounded-full overflow-hidden border border-[#ddc0b8] p-[1px]">
              <div className="bg-[#3a6848] h-full rounded-full w-[78%] transition-all duration-300" />
            </div>
            <div className="flex justify-between items-center text-[#56423c] text-[11px] mt-1">
              <span>Audio Buffer: 44.1kHz PCM</span>
              <span>Acoustic Sal Engine v2.4 (Jharkhand Board)</span>
            </div>
          </div>
        </main>

        {/* Modal Bottom Operational Tray */}
        <footer className="w-full bg-[#fdf1ed] border-t-2 border-[#ddc0b8] px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleStopAndTranslate}
              className="w-full sm:flex-1 min-h-[52px] rounded-xl bg-[#9d3d1e] text-white font-bold text-[16px] flex items-center justify-center gap-2 border-b-2 border-[#81290a] shadow-sm active:translate-y-0.5 transition-transform"
              type="button"
            >
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                done
              </span>
              <span>Stop &amp; Translate (पूरा हुआ)</span>
            </button>
            <button
              onClick={() => {
                audioEngine.playTapHaptic();
                onClose();
              }}
              className="w-full sm:w-auto min-h-[52px] px-6 rounded-xl bg-[#ece0dd] border border-[#ddc0b8] text-[#201a18] font-semibold text-[14px] flex items-center justify-center gap-2 active:translate-y-0.5 transition-transform hover:bg-[#ddc0b8]"
              type="button"
            >
              <span className="material-symbols-outlined text-xl">cancel</span>
              <span>Cancel / रद्द करें</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
