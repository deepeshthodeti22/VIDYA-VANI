import React, { useState } from 'react';
import { NavTab, ScreenId } from '../../types';
import { HomeScreen } from '../app/HomeScreen';
import { TranslateScreen } from '../app/TranslateScreen';
import { VoiceModal } from '../app/VoiceModal';
import { WorksheetScreen } from '../app/WorksheetScreen';
import { FlashcardScreen } from '../app/FlashcardScreen';
import { PhraseLibraryScreen } from '../app/PhraseLibraryScreen';
import { ChalkTraceScreen } from '../app/ChalkTraceScreen';
import { BlackboardScreen } from '../app/BlackboardScreen';
import { SettingsScreen } from '../app/SettingsScreen';
import { BottomNav } from '../app/BottomNav';
import { audioEngine } from '../../utils/audio';

export const InteractiveAppSection: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [activeTab, setActiveTab] = useState<NavTab>('lessons');
  const [isTabletFrame, setIsTabletFrame] = useState<boolean>(true);
  const [isVoiceModalDirect, setIsVoiceModalDirect] = useState<boolean>(false);

  // Sync tab with screen when possible
  const handleTabChange = (tab: NavTab) => {
    audioEngine.playTapHaptic();
    setActiveTab(tab);
    if (tab === 'lessons') setCurrentScreen('home');
    else if (tab === 'pronounce') setCurrentScreen('translate');
    else if (tab === 'settings') setCurrentScreen('settings');
    else if (tab === 'attendance') {
      alert('छात्र उपस्थिति रजिस्टर: शिकारपाड़ा प्राथमिक विद्यालय (३४ छात्र उपस्थित / ३ अनुपस्थित - १००% ऑफ़लाइन दर्ज)');
    }
  };

  const screenDescriptions: Record<ScreenId, { title: string; subtitle: string; tag: string }> = {
    home: {
      title: 'Classroom Dashboard (Lessons Home)',
      subtitle:
        'Tactile terracotta card launcher for teachers with daily golden phrase and offline storage status.',
      tag: 'Screen 1 of 9'
    },
    translate: {
      title: 'Real-Time Spoken & Text Translate',
      subtitle:
        'Hindi speech or text into verified Santali Ol Chiki with native pronunciation audio and audit tags.',
      tag: 'Screen 2 of 9'
    },
    'voice-modal': {
      title: 'Offline Voice Engine Modal',
      subtitle:
        'Concentric acoustic wave visualizer with live Hindi transcription and streaming Ol Chiki preview.',
      tag: 'Screen 3 of 9'
    },
    worksheets: {
      title: 'Bilingual Worksheet Generator (NIPUN Bharat)',
      subtitle:
        'Single-ink mono printer optimized practice sheets for tracing, matching, and early numeracy.',
      tag: 'Screen 4 of 9'
    },
    flashcards: {
      title: 'Tactile Flashcard Viewer (Native Fauna & Flora)',
      subtitle:
        'Picture cards with Santali Ol Chiki script, phonetics, audio recordings, and learned tracking.',
      tag: 'Screen 5 of 9'
    },
    phrases: {
      title: 'Classroom Phrase Library (428 Cached)',
      subtitle:
        'Curated commands, greetings, mathematics, and praise with verification badges and chorus mode.',
      tag: 'Screen 6 of 9'
    },
    'chalk-trace': {
      title: 'Chalk Trace Slate (Ol Chiki Stroke Practice)',
      subtitle:
        'Interactive chalkboard canvas for children to trace indigenous characters (DAK\' / ᱫ) with finger touch.',
      tag: 'Screen 7 of 9'
    },
    blackboard: {
      title: 'Blackboard Projector & Choral Mode',
      subtitle:
        'High-contrast slate display for classroom TV with word-isolation drills, phonetics, and 3x loop.',
      tag: 'Screen 8 of 9'
    },
    settings: {
      title: 'Sync, Storage & Dialect Governance',
      subtitle:
        '384 MB memory breakdown, offline lock switch, BRC sync telemetry, and community suggestion queue.',
      tag: 'Screen 9 of 9'
    }
  };

  return (
    <section id="interactive-app" className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#ddc0b8]/60 bg-[#f7ebe8]/40">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="text-[12px] uppercase tracking-wider text-[#9d3d1e] font-bold">
              Interactive Prototype Simulator
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif-headline text-[#201a18]">
              Experience VIDYA VANI as deployed in tribal classrooms.
            </h2>
            <p className="text-[15px] text-[#56423c]">
              Test all 9 functional screens reconstructed directly from the field deployment specifications. Every button, audio chime, worksheet generator, and chalkboard slate is fully interactive.
            </p>
          </div>

          {/* Viewport Frame Toggle */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#ddc0b8] self-start md:self-auto shrink-0 shadow-xs">
            <button
              onClick={() => {
                audioEngine.playTapHaptic();
                setIsTabletFrame(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-bold transition ${
                isTabletFrame ? 'bg-[#9d3d1e] text-white shadow-xs' : 'text-[#56423c] hover:bg-[#f7ebe8]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">tablet_android</span>
              <span>7" Rural Tablet</span>
            </button>
            <button
              onClick={() => {
                audioEngine.playTapHaptic();
                setIsTabletFrame(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-bold transition ${
                !isTabletFrame ? 'bg-[#9d3d1e] text-white shadow-xs' : 'text-[#56423c] hover:bg-[#f7ebe8]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
              <span>Full Width</span>
            </button>
          </div>
        </div>

        {/* Screen Switcher Bar (Quick Navigation across all 9 screens) */}
        <div className="bg-white p-2 rounded-2xl border border-[#ddc0b8] shadow-xs flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#56423c] px-2 shrink-0">
            Screen Tour:
          </span>
          {[
            { id: 'home', label: '1. Home Dashboard' },
            { id: 'translate', label: '2. Translate' },
            { id: 'voice-modal', label: '3. Voice Engine' },
            { id: 'worksheets', label: '4. Worksheets' },
            { id: 'flashcards', label: '5. Flashcards' },
            { id: 'phrases', label: '6. Phrase Library' },
            { id: 'chalk-trace', label: '7. Chalk Trace' },
            { id: 'blackboard', label: '8. Blackboard' },
            { id: 'settings', label: '9. Sync & Settings' }
          ].map((screen) => {
            const isActive = currentScreen === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => {
                  audioEngine.playTapHaptic();
                  if (screen.id === 'voice-modal') {
                    setCurrentScreen('translate');
                    setIsVoiceModalDirect(true);
                  } else {
                    setCurrentScreen(screen.id as ScreenId);
                  }
                }}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-[13px] font-bold transition active:translate-y-0.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#9d3d1e] text-white shadow-xs'
                    : 'bg-[#f7ebe8] text-[#201a18] hover:bg-[#f2e6e2] border border-[#ddc0b8]'
                }`}
              >
                {screen.label}
              </button>
            );
          })}
        </div>

        {/* Current Screen Meta Kicker */}
        <div className="flex items-center justify-between text-[13px] text-[#56423c] px-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#9d3d1e]">{screenDescriptions[currentScreen].tag}:</span>
            <span className="font-bold text-[#201a18]">{screenDescriptions[currentScreen].title}</span>
            <span className="hidden sm:inline text-[#8a726b]">— {screenDescriptions[currentScreen].subtitle}</span>
          </div>
        </div>

        {/* App Frame Container */}
        <div className="w-full flex justify-center">
          {isTabletFrame ? (
            /* Tablet Frame with Bezels, Speaker, Front Camera */
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] bg-[#201a18] p-4 sm:p-5 rounded-[44px] shadow-2xl border-4 border-[#352f2d] ring-1 ring-black/20">
              {/* Speaker Grill & Front Camera */}
              <div className="w-full flex items-center justify-center gap-3 pb-3">
                <div className="w-16 h-1.5 bg-[#352f2d] rounded-full" />
                <div className="w-2.5 h-2.5 bg-[#352f2d] rounded-full" />
              </div>

              {/* Tablet Screen Canvas */}
              <div className="w-full bg-[#fff8f6] rounded-[28px] overflow-hidden min-h-[780px] max-h-[820px] flex flex-col justify-between relative shadow-inner overflow-y-auto no-scrollbar border border-[#ddc0b8]/40">
                {/* Screen Rendering */}
                {currentScreen === 'home' && (
                  <HomeScreen
                    onNavigate={(screen) => {
                      setCurrentScreen(screen);
                      if (screen === 'translate') setActiveTab('pronounce');
                    }}
                  />
                )}
                {currentScreen === 'translate' && (
                  <TranslateScreen
                    onBack={() => {
                      setCurrentScreen('home');
                      setActiveTab('lessons');
                    }}
                    onNavigate={(screen) => setCurrentScreen(screen)}
                  />
                )}
                {currentScreen === 'worksheets' && (
                  <WorksheetScreen
                    onBack={() => {
                      setCurrentScreen('home');
                      setActiveTab('lessons');
                    }}
                  />
                )}
                {currentScreen === 'flashcards' && (
                  <FlashcardScreen
                    onBack={() => {
                      setCurrentScreen('home');
                      setActiveTab('lessons');
                    }}
                  />
                )}
                {currentScreen === 'phrases' && (
                  <PhraseLibraryScreen
                    onBack={() => {
                      setCurrentScreen('home');
                      setActiveTab('lessons');
                    }}
                  />
                )}
                {currentScreen === 'chalk-trace' && (
                  <ChalkTraceScreen
                    onBack={() => {
                      setCurrentScreen('home');
                      setActiveTab('lessons');
                    }}
                  />
                )}
                {currentScreen === 'blackboard' && (
                  <BlackboardScreen
                    onBack={() => {
                      setCurrentScreen('home');
                      setActiveTab('lessons');
                    }}
                    onNavigateTrace={() => setCurrentScreen('chalk-trace')}
                  />
                )}
                {currentScreen === 'settings' && (
                  <SettingsScreen
                    onBack={() => {
                      setCurrentScreen('home');
                      setActiveTab('lessons');
                    }}
                  />
                )}

                {/* Bottom Navigation */}
                <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-full flex justify-center pt-3">
                <div className="w-32 h-1 bg-white/20 rounded-full" />
              </div>
            </div>
          ) : (
            /* Full Width Expanded Canvas */
            <div className="w-full bg-[#fff8f6] rounded-2xl border-2 border-[#ddc0b8] shadow-md min-h-[700px] flex flex-col justify-between overflow-hidden relative">
              <div className="w-full h-1.5 bg-[#3a6848] shrink-0" />

              {/* Full Width Screens */}
              <div className="w-full flex-1">
                {currentScreen === 'home' && (
                  <HomeScreen
                    onNavigate={(screen) => {
                      setCurrentScreen(screen);
                      if (screen === 'translate') setActiveTab('pronounce');
                    }}
                  />
                )}
                {currentScreen === 'translate' && (
                  <TranslateScreen
                    onBack={() => {
                      setCurrentScreen('home');
                      setActiveTab('lessons');
                    }}
                    onNavigate={(screen) => setCurrentScreen(screen)}
                  />
                )}
                {currentScreen === 'worksheets' && (
                  <WorksheetScreen
                    onBack={() => {
                      setCurrentScreen('home');
                      setActiveTab('lessons');
                    }}
                  />
                )}
                {currentScreen === 'flashcards' && (
                  <FlashcardScreen
                    onBack={() => {
                      setCurrentScreen('home');
                      setActiveTab('lessons');
                    }}
                  />
                )}
                {currentScreen === 'phrases' && (
                  <PhraseLibraryScreen
                    onBack={() => {
                      setCurrentScreen('home');
                      setActiveTab('lessons');
                    }}
                  />
                )}
                {currentScreen === 'chalk-trace' && (
                  <ChalkTraceScreen
                    onBack={() => {
                      setCurrentScreen('home');
                      setActiveTab('lessons');
                    }}
                  />
                )}
                {currentScreen === 'blackboard' && (
                  <BlackboardScreen
                    onBack={() => {
                      setCurrentScreen('home');
                      setActiveTab('lessons');
                    }}
                    onNavigateTrace={() => setCurrentScreen('chalk-trace')}
                  />
                )}
                {currentScreen === 'settings' && (
                  <SettingsScreen
                    onBack={() => {
                      setCurrentScreen('home');
                      setActiveTab('lessons');
                    }}
                  />
                )}
              </div>

              {/* Full Width Bottom Nav */}
              <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
          )}
        </div>

        {/* Direct Voice Modal Trigger if requested from Screen Tour */}
        <VoiceModal
          isOpen={isVoiceModalDirect}
          onClose={() => setIsVoiceModalDirect(false)}
          onComplete={() => setIsVoiceModalDirect(false)}
        />
      </div>
    </section>
  );
};
