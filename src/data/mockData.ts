import { FlashcardItem, PhraseItem, WorksheetRow, DialectOption } from '../types';

export const INITIAL_PHRASES: PhraseItem[] = [
  {
    id: 'phrase-1',
    hindi: 'सभी बच्चे बैठ जाओ',
    hindiMeaning: 'All children please sit down',
    santaliOlChiki: 'ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱫᱩᱲᱩᱵ ᱯᱮ',
    santaliRoman: 'Joto gidrạ duṛub pe',
    santaliDevanagari: 'जोतो गिदरा दुड़ुब पे',
    category: 'Classroom Rules',
    status: 'Approved',
    speaker: 'Shrimati Hemrom',
    audioDuration: '1.8s',
    cached: true
  },
  {
    id: 'phrase-2',
    hindi: 'शाबाश! बहुत अच्छा किया',
    hindiMeaning: 'Well done! Very good',
    santaliOlChiki: 'ᱵᱮᱥ! ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ',
    santaliRoman: 'Bes! Aḍi napay',
    santaliDevanagari: 'बेस! अड़ी नापाय',
    category: 'Praise & Encouragement',
    status: 'Approved',
    speaker: 'Somra Hansda',
    audioDuration: '1.4s',
    cached: true
  },
  {
    id: 'phrase-3',
    hindi: 'क्या किसी को समझ नहीं आया?',
    hindiMeaning: 'Did anyone not understand?',
    santaliOlChiki: 'ᱡᱟᱦᱟᱸᱭ ᱵᱟᱝ ᱯᱮ ᱵᱩᱡᱷᱟᱹᱣ ᱞᱮᱫᱼᱟ?',
    santaliRoman: 'Jahang bang pe bujhaw led-a?',
    santaliDevanagari: 'जाहांय बां पे बुझाव लेद-आ?',
    category: 'Questions',
    status: 'Pending Review',
    speaker: 'Cluster Verification Queue',
    audioDuration: '2.1s',
    cached: false
  },
  {
    id: 'phrase-4',
    hindi: 'बच्चों, अपनी किताबें खोलो',
    hindiMeaning: 'Children, please open your books',
    santaliOlChiki: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱯᱮ',
    santaliRoman: 'Gidrạ ko, apeag puthi jhij pe',
    santaliDevanagari: 'गिदरा को, आपेयाग पुथी झीज पे',
    category: 'Classroom Rules',
    status: 'Approved',
    speaker: 'S. Murmu',
    audioDuration: '2.4s',
    cached: true
  },
  {
    id: 'phrase-5',
    hindi: 'आओ मिलकर पढ़ें',
    hindiMeaning: 'Come, let us read together',
    santaliOlChiki: 'ᱫᱮᱞᱟᱵᱚᱱ ᱯᱟᱲᱦᱟᱣ ᱢᱮ',
    santaliRoman: 'Delabon Paṛhao Me',
    santaliDevanagari: 'देलागोन पाड़हाव मे',
    category: 'Greetings',
    status: 'Approved',
    speaker: 'Somra Hansda',
    audioDuration: '2.0s',
    cached: true
  },
  {
    id: 'phrase-6',
    hindi: 'चुपचाप अपनी जगह पर बैठो',
    hindiMeaning: 'Silently sit in your place',
    santaliOlChiki: 'ᱛᱷᱤᱨ ᱠᱟᱛᱮ ᱟᱢᱟᱜ ᱴᱷᱟᱶ ᱨᱮ ᱫᱩᱲᱩᱵ ᱢᱮ',
    santaliRoman: 'Thir kate amag thaon re duṛub me',
    santaliDevanagari: 'थिर काते आमाग ठांव रे दुड़ुब मे',
    category: 'Classroom Rules',
    status: 'Approved',
    speaker: 'Shrimati Hemrom',
    audioDuration: '1.9s',
    cached: true
  },
  {
    id: 'phrase-7',
    hindi: 'एक, दो, तीन, चार, पाँच गिनो',
    hindiMeaning: 'Count one, two, three, four, five',
    santaliOlChiki: 'ᱢᱤᱫ, ᱵᱟᱨ, ᱯᱮ, ᱯᱩᱱ, ᱢᱚᱬᱮ ᱞᱮᱠᱷᱟᱭ ᱢᱮ',
    santaliRoman: 'Mit\', bar, pe, pun, moṇe lekhay me',
    santaliDevanagari: 'मिद, बार, पे, पुन, मोड़े लेखाय मे',
    category: 'Mathematics & Counting',
    status: 'Approved',
    speaker: 'Somra Hansda',
    audioDuration: '2.8s',
    cached: true
  },
  {
    id: 'phrase-8',
    hindi: 'हाथ ऊपर करो',
    hindiMeaning: 'Raise your hand',
    santaliOlChiki: 'ᱛᱤ ᱪᱮᱛᱟᱱ ᱨᱟᱠᱟᱵᱽ ᱢᱮ',
    santaliRoman: 'Ti chetan rakab me',
    santaliDevanagari: 'ती चेतान राकाब मे',
    category: 'Classroom Rules',
    status: 'Approved',
    speaker: 'S. Murmu',
    audioDuration: '1.5s',
    cached: true
  }
];

export const INITIAL_FLASHCARDS: FlashcardItem[] = [
  {
    id: 1,
    hindiWord: 'पेड़',
    romanMeaning: 'Tree',
    olChikiWord: 'ᱫᱟᱨᱮ',
    phoneticsRoman: 'Dare',
    phoneticsDevanagari: 'दारे',
    phoneticTip: 'Rolling \'r\', open \'e\' vowel',
    category: 'Sal Forest Flora',
    tier: 'Beginner Tier (स्तर १)',
    exampleOlChiki: 'ᱫᱟᱨᱮ ᱥᱩᱨ ᱨᱮ ᱪᱮᱬᱮ ᱢᱮᱱᱟᱜᱼᱟ',
    exampleHindi: 'पेड़ के पास चिड़िया है',
    exampleEnglish: 'A bird is near the tree',
    audioSpeaker: 'Somra Hansda',
    isLearned: true
  },
  {
    id: 2,
    hindiWord: 'पानी',
    romanMeaning: 'Water / Rain',
    olChikiWord: 'ᱫᱟᱜ',
    phoneticsRoman: 'Dak\'',
    phoneticsDevanagari: 'दाक्',
    phoneticTip: 'Glottal stop on ending \'k\'',
    category: 'Daily Nature',
    tier: 'Beginner Tier (स्तर १)',
    exampleOlChiki: 'ᱫᱟᱜ ᱧᱩ ᱢᱮ',
    exampleHindi: 'पानी पियो',
    exampleEnglish: 'Drink water',
    audioSpeaker: 'Shrimati Hemrom',
    isLearned: true
  },
  {
    id: 3,
    hindiWord: 'पक्षी',
    romanMeaning: 'Bird',
    olChikiWord: 'ᱪᱮᱬᱮ',
    phoneticsRoman: 'Cheṇe',
    phoneticsDevanagari: 'चेड़े',
    phoneticTip: 'Retroflex nasal \'ṇ\'',
    category: 'Birds & Animals',
    tier: 'Beginner Tier (स्तर १)',
    exampleOlChiki: 'ᱪᱮᱬᱮ ᱩᱰᱟᱹᱣᱜ ᱠᱟᱱᱟ',
    exampleHindi: 'चिड़िया उड़ रही है',
    exampleEnglish: 'The bird is flying',
    audioSpeaker: 'Somra Hansda',
    isLearned: true
  },
  {
    id: 4,
    hindiWord: 'हिरण',
    romanMeaning: 'Hiran / Deer',
    olChikiWord: 'ᱡᱤᱞ',
    phoneticsRoman: 'Jil',
    phoneticsDevanagari: 'जिल',
    phoneticTip: 'Short vowel \'i\', crisp ending',
    category: 'Forest Fauna',
    tier: 'Beginner Tier (स्तर १)',
    imageUrl: '/assets/images/flashcard_deer_fauna_1790701625753.jpg',
    exampleOlChiki: 'ᱫᱟᱨᱮ ᱥᱩᱨ ᱨᱮ ᱡᱤᱞ ᱢᱮᱱᱟᱭᱟ',
    exampleHindi: 'हिरण पेड़ के पास है',
    exampleEnglish: 'The deer is near the tree',
    audioSpeaker: 'Shrimati Hemrom • 44.1kHz Clear Vocal',
    isLearned: false
  },
  {
    id: 5,
    hindiWord: 'हाथी',
    romanMeaning: 'Elephant',
    olChikiWord: 'ᱦᱟᱹᱛᱤ',
    phoneticsRoman: 'Hạti',
    phoneticsDevanagari: 'हाती',
    phoneticTip: 'Aspiration on initial \'h\'',
    category: 'Forest Fauna',
    tier: 'Beginner Tier (स्तर १)',
    exampleOlChiki: 'ᱦᱟᱹᱛᱤ ᱢᱟᱨᱟᱝ ᱜᱮᱭᱟᱭ',
    exampleHindi: 'हाथी बड़ा है',
    exampleEnglish: 'The elephant is large',
    audioSpeaker: 'S. Murmu',
    isLearned: false
  },
  {
    id: 6,
    hindiWord: 'स्कूल / विद्यालय',
    romanMeaning: 'School',
    olChikiWord: 'ᱟᱥᱲᱟ',
    phoneticsRoman: 'Asṛa',
    phoneticsDevanagari: 'आसड़ा',
    phoneticTip: 'Flapped \'ṛ\' sound',
    category: 'Classroom & Learning',
    tier: 'Beginner Tier (स्तर १)',
    exampleOlChiki: 'ᱟᱥᱲᱟ ᱥᱮᱱᱚᱜ ᱢᱮ',
    exampleHindi: 'स्कूल चलो',
    exampleEnglish: 'Go to school',
    audioSpeaker: 'Somra Hansda',
    isLearned: false
  }
];

export const WORKSHEET_TOPICS = [
  {
    id: 'daily_routine',
    name: 'Daily Routine & Nature',
    hindiName: 'दैनिक दिनचर्या व प्रकृति',
    unit: 'FLN UNIT 04',
    rows: [
      { num: 1, hindiWord: 'पेड़', hindiSecondary: 'Tree / पेड', olChikiWord: 'ᱫᱟᱨᱮ', romanPhonetic: 'Dare', letterIndex: 'अ' },
      { num: 2, hindiWord: 'पानी', hindiSecondary: 'Water / जल', olChikiWord: 'ᱫᱟᱜ', romanPhonetic: 'Dak\'', letterIndex: 'ब' },
      { num: 3, hindiWord: 'पक्षी', hindiSecondary: 'Bird / चिड़िया', olChikiWord: 'ᱪᱮᱬᱮ', romanPhonetic: 'Cheṇe', letterIndex: 'स' },
      { num: 4, hindiWord: 'स्कूल चलो', hindiSecondary: 'Go to school', olChikiWord: 'ᱟᱥᱲᱟ ᱥᱮᱱᱚᱜ ᱢᱮ', romanPhonetic: 'Asṛa senoṅ me', letterIndex: 'द' }
    ]
  },
  {
    id: 'body_parts',
    name: 'Body Parts & Senses',
    hindiName: 'शरीर के अंग व ज्ञानेंद्रियाँ',
    unit: 'FLN UNIT 02',
    rows: [
      { num: 1, hindiWord: 'आंख', hindiSecondary: 'Eye / नेत्र', olChikiWord: 'ᱢᱮᱫ', romanPhonetic: 'Met\'', letterIndex: 'अ' },
      { num: 2, hindiWord: 'हाथ', hindiSecondary: 'Hand / कर', olChikiWord: 'ᱛᱤ', romanPhonetic: 'Ti', letterIndex: 'ब' },
      { num: 3, hindiWord: 'कान', hindiSecondary: 'Ear / कर्ण', olChikiWord: 'ᱞᱩᱛᱩᱨ', romanPhonetic: 'Lutur', letterIndex: 'स' },
      { num: 4, hindiWord: 'पैर', hindiSecondary: 'Foot / पैर', olChikiWord: 'ᱡᱟᱝᱜᱟ', romanPhonetic: 'Janga', letterIndex: 'द' }
    ]
  },
  {
    id: 'animals_forest',
    name: 'Animals & Birds',
    hindiName: 'पशु-पक्षी एवं वन्य जीव',
    unit: 'FLN UNIT 05',
    rows: [
      { num: 1, hindiWord: 'हिरण', hindiSecondary: 'Deer', olChikiWord: 'ᱡᱤᱞ', romanPhonetic: 'Jil', letterIndex: 'अ' },
      { num: 2, hindiWord: 'हाथी', hindiSecondary: 'Elephant', olChikiWord: 'ᱦᱟᱹᱛᱤ', romanPhonetic: 'Hạti', letterIndex: 'ब' },
      { num: 3, hindiWord: 'गाय', hindiSecondary: 'Cow', olChikiWord: 'ᱜᱟᱹᱭ', romanPhonetic: 'Gạy', letterIndex: 'स' },
      { num: 4, hindiWord: 'बकरी', hindiSecondary: 'Goat', olChikiWord: 'ᱢᱮᱨᱚᱢ', romanPhonetic: 'Merom', letterIndex: 'द' }
    ]
  }
];

export const DIALECT_OPTIONS: DialectOption[] = [
  {
    id: 'dumka_godda',
    name: 'Dumka & Godda Standard (Pargana)',
    description: 'Recommended for your district school • मानक संथाली (दुमका / संताल परगना प्रमंडल) ध्वन्यात्मक मॉडल।',
    isRecommended: true
  },
  {
    id: 'kolhan_singhbhum',
    name: 'Kolhan / East Singhbhum Variant',
    description: 'Requires 24 MB auxiliary voice patch • कोल्हान एवं पूर्वी सिंहभूम क्षेत्रीय स्वरूप।',
    isRecommended: false,
    auxiliaryPatch: '24 MB voice patch'
  }
];

export const STORAGE_STATS = {
  totalMB: 384,
  internalStorageGB: 32,
  items: [
    { name: 'Speech Engine', sizeMB: 240, color: '#9d3d1e', note: 'Santali-Hindi Speech-to-Speech Neural Compact Model', tag: 'Locked in RAM' },
    { name: 'Audio Cache', sizeMB: 92, color: '#3a6848', note: 'Pronunciation clips (1,200 local voice recordings)', tag: 'Classroom Verified' },
    { name: 'Ol Chiki & NIPUN', sizeMB: 38, color: '#b15f00', note: 'Ol Chiki Unicode fonts & Printable Worksheet Templates', tag: 'Offline Vector SVGs' },
    { name: 'Dictionary', sizeMB: 14, color: '#8a726b', note: 'Bilingual phrase dictionary & phonetic lookup index', tag: 'Indexed SQLite' }
  ]
};

export const PENDING_SUGGESTIONS = [
  { id: 1, title: '"ᱡᱚᱢ" (Jom - Eat) local phonetic nuance', type: 'Audio Cached' },
  { id: 2, title: 'Environmental science vocabulary (Ol Chiki)', type: 'Text Note' },
  { id: 3, title: 'Class 2 Math instruction phrasing', type: 'Phrase Match' }
];
