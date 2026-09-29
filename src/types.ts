export type ScreenId =
  | 'home'
  | 'translate'
  | 'voice-modal'
  | 'worksheets'
  | 'flashcards'
  | 'phrases'
  | 'chalk-trace'
  | 'blackboard'
  | 'settings';

export type NavTab = 'lessons' | 'pronounce' | 'attendance' | 'settings';

export interface PhraseItem {
  id: string;
  hindi: string;
  hindiMeaning: string;
  santaliOlChiki: string;
  santaliRoman: string;
  santaliDevanagari: string;
  category: 'Greetings' | 'Classroom Rules' | 'Mathematics & Counting' | 'Praise & Encouragement' | 'Questions' | 'Daily Routine';
  status: 'Approved' | 'Pending Review';
  speaker?: string;
  audioDuration?: string;
  cached: boolean;
}

export interface FlashcardItem {
  id: number;
  hindiWord: string;
  romanMeaning: string;
  olChikiWord: string;
  phoneticsRoman: string;
  phoneticsDevanagari: string;
  phoneticTip: string;
  category: string;
  tier: string;
  imageUrl?: string;
  exampleOlChiki: string;
  exampleHindi: string;
  exampleEnglish: string;
  audioSpeaker: string;
  isLearned: boolean;
}

export interface WorksheetRow {
  num: number;
  hindiWord: string;
  hindiSecondary: string;
  olChikiWord: string;
  romanPhonetic: string;
  letterIndex: string;
}

export interface DialectOption {
  id: string;
  name: string;
  description: string;
  isRecommended: boolean;
  auxiliaryPatch?: string;
}
