import React, { useState } from 'react';
import { INITIAL_PHRASES } from '../../data/mockData';
import { audioEngine } from '../../utils/audio';

interface PhraseLibraryScreenProps {
  onBack: () => void;
}

export const PhraseLibraryScreen: React.FC<PhraseLibraryScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Approved' | 'Pending Review'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('Classroom Rules');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHindi, setNewHindi] = useState('');
  const [newSantali, setNewSantali] = useState('');
  const [addedNotice, setAddedNotice] = useState(false);

  const filteredPhrases = INITIAL_PHRASES.filter((p) => {
    const matchesSearch =
      p.hindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.santaliOlChiki.includes(searchQuery) ||
      p.santaliRoman.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hindiMeaning.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Approved' && p.status === 'Approved') ||
      (selectedStatus === 'Pending Review' && p.status === 'Pending Review');

    const matchesCategory = !selectedCategory || p.category === selectedCategory;

    return matchesSearch && matchesStatus && (selectedStatus !== 'All' ? true : matchesCategory);
  });

  const handlePlay = (id: string, text: string) => {
    audioEngine.playTapHaptic();
    setPlayingId(id);
    audioEngine.speakPhrase(text, 'hi-IN');
    setTimeout(() => setPlayingId(null), 2000);
  };

  const handleAddPhrase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHindi) return;
    audioEngine.playTapHaptic();
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      setShowAddModal(false);
      setNewHindi('');
      setNewSantali('');
    }, 1500);
  };

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 pt-4 pb-32 space-y-5 select-none">
      {/* Screen Top Bar */}
      <header className="flex items-center justify-between pb-2 border-b border-[#ddc0b8]/60">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioEngine.playTapHaptic();
              onBack();
            }}
            aria-label="Go back"
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#f7ebe8] hover:bg-[#f2e6e2] text-[#201a18] active:translate-y-0.5 border border-[#ddc0b8] transition"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <div>
            <h1 className="text-[18px] sm:text-[20px] font-bold font-serif-headline text-[#201a18] leading-tight">
              Phrase Library / वाक्यांश संग्रह
            </h1>
            <p className="text-[12px] text-[#56423c] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#3a6848]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              Local Storage Available Offline
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ece0dd] border border-[#ddc0b8] text-[#56423c]">
          <span className="material-symbols-outlined text-[18px] text-[#9d3d1e]" style={{ fontVariationSettings: "'FILL' 1" }}>
            offline_pin
          </span>
          <span className="text-[12px] font-bold">428 Phrases Cached</span>
        </div>
      </header>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9d3d1e]">
          <span className="material-symbols-outlined text-2xl">search</span>
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Hindi or Santali phrases... (खोजें)"
          className="w-full h-14 pl-12 pr-12 rounded-xl bg-white border-2 border-[#ddc0b8] text-[#201a18] text-[15px] placeholder:text-[#8a726b] focus:border-[#9d3d1e] focus:outline-none clay-card transition-all"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            onClick={() => {
              audioEngine.playTapHaptic();
              setSearchQuery('बैठ जाओ');
            }}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#f7ebe8] text-[#56423c] hover:text-[#9d3d1e]"
            title="Speech Search"
          >
            <span className="material-symbols-outlined text-xl">mic</span>
          </button>
        </div>
      </div>

      {/* Filter Chip Row */}
      <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => {
            audioEngine.playTapHaptic();
            setSelectedStatus('All');
          }}
          className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
            selectedStatus === 'All'
              ? 'bg-[#9d3d1e] text-white clay-btn'
              : 'bg-white text-[#56423c] border border-[#ddc0b8] hover:bg-[#f7ebe8]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            collections_bookmark
          </span>
          <span>All (सभी - 428)</span>
        </button>

        <button
          onClick={() => {
            audioEngine.playTapHaptic();
            setSelectedStatus('Approved');
          }}
          className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-bold border transition-all ${
            selectedStatus === 'Approved'
              ? 'bg-[#bbefc6] text-[#215031] border-[#3a6848] shadow-xs'
              : 'bg-white text-[#56423c] border-[#ddc0b8] hover:bg-[#bbefc6]/30'
          }`}
        >
          <span className="material-symbols-outlined text-[18px] text-[#3a6848]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          <span>Approved / सत्यापित (382)</span>
        </button>

        <button
          onClick={() => {
            audioEngine.playTapHaptic();
            setSelectedStatus('Pending Review');
          }}
          className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-bold border transition-all ${
            selectedStatus === 'Pending Review'
              ? 'bg-[#ffdcc3] text-[#6e3900] border-[#8d4b00] shadow-xs'
              : 'bg-white text-[#56423c] border-[#ddc0b8] hover:bg-[#ffdcc3]/30'
          }`}
        >
          <span className="material-symbols-outlined text-[18px] text-[#8d4b00]" style={{ fontVariationSettings: "'FILL' 1" }}>
            schedule
          </span>
          <span>Pending Review / समीक्षाधीन (46)</span>
        </button>
      </div>

      {/* Category Domains */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] text-[#56423c] font-bold">Classroom Domains (विषय वर्ग)</span>
          <span className="text-[11px] text-[#8a726b]">Tap to filter</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            'Greetings',
            'Classroom Rules',
            'Mathematics & Counting',
            'Praise & Encouragement'
          ].map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  audioEngine.playTapHaptic();
                  setSelectedCategory(cat);
                }}
                className={`flex items-center justify-center px-3 py-2.5 rounded-lg text-[13px] transition-all text-center ${
                  isSelected
                    ? 'bg-[#ffdbd0] border-2 border-[#9d3d1e] text-[#3a0b00] font-bold shadow-xs'
                    : 'bg-[#f7ebe8] border border-[#ddc0b8] hover:border-[#9d3d1e] text-[#201a18]'
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phrases Count Header */}
      <div className="pt-2 flex items-center justify-between">
        <h2 className="text-[18px] font-bold font-serif-headline text-[#201a18]">Instructional Cards</h2>
        <span className="text-[12px] bg-[#f2e6e2] px-2.5 py-1 rounded text-[#56423c]">
          Showing {filteredPhrases.length} active matches
        </span>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {filteredPhrases.map((phrase) => {
          const isPlaying = playingId === phrase.id;
          const isPending = phrase.status === 'Pending Review';

          return (
            <article
              key={phrase.id}
              className={`bg-white rounded-2xl p-4 sm:p-5 border-2 transition-all hover:border-[#8a726b] ${
                isPending ? 'border-[#ffdcc3]' : 'border-[#ddc0b8]'
              } clay-card`}
            >
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#f2e6e2]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#f7ebe8] text-[#56423c] text-[11px] font-bold border border-[#ddc0b8]">
                    {phrase.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isPending
                        ? 'bg-[#ffdcc3] text-[#6e3900] border border-[#8d4b00]'
                        : 'bg-[#bbefc6] text-[#215031] border border-[#3a6848]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${isPending ? 'bg-[#8d4b00]' : 'bg-[#3a6848]'}`}
                    />
                    {isPending ? 'Pending Review / समीक्षाधीन' : 'Approved / सत्यापित'}
                  </span>
                </div>
                <span className="text-[11px] text-[#8a726b] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    {isPending ? 'sync_problem' : 'volume_down'}
                  </span>
                  {isPending ? 'Awaiting Master Teacher Verification' : 'Santali Audio Ready'}
                </span>
              </div>

              <div className="py-3.5 space-y-2">
                <div>
                  <span className="text-[11px] text-[#8a726b] uppercase tracking-wider block">Hindi (देवनागरी)</span>
                  <p className="text-[18px] sm:text-[20px] font-bold text-[#201a18]">{phrase.hindi}</p>
                  <p className="text-[13px] text-[#56423c]">({phrase.hindiMeaning})</p>
                </div>

                <div className="pt-2 border-t border-[#f2e6e2]">
                  <span className="text-[11px] text-[#9d3d1e] uppercase tracking-wider block font-bold">
                    Santali (Ol Chiki / ᱚᱞ ᱪᱤᱠᱤ)
                  </span>
                  <p className="font-olchiki text-[22px] sm:text-[26px] font-bold text-[#9d3d1e] tracking-wide">
                    {phrase.santaliOlChiki}
                  </p>
                  <p className="text-[14px] text-[#56423c] italic">{phrase.santaliRoman}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f2e6e2] flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={() => handlePlay(phrase.id, phrase.santaliDevanagari)}
                    className="min-h-[48px] px-4 rounded-xl bg-[#9d3d1e] text-white flex items-center gap-2 clay-btn active:translate-y-0.5 text-[13px] font-bold"
                  >
                    <span
                      className={`material-symbols-outlined text-2xl ${isPlaying ? 'animate-pulse' : ''}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {isPlaying ? 'graphic_eq' : 'volume_up'}
                    </span>
                    <span>Aanjom / सुनें</span>
                  </button>

                  <button
                    onClick={() => {
                      audioEngine.playTapHaptic();
                      audioEngine.speakPhrase(phrase.santaliDevanagari, 'hi-IN');
                    }}
                    className="min-h-[48px] px-3.5 rounded-xl bg-[#f7ebe8] text-[#56423c] hover:text-[#9d3d1e] flex items-center gap-1 text-[13px] border border-[#ddc0b8] active:translate-y-0.5 font-medium"
                  >
                    <span className="material-symbols-outlined text-[18px]">slow_motion_video</span>
                    <span>Slow 0.7x</span>
                  </button>
                </div>

                {isPending ? (
                  <button
                    onClick={() => {
                      audioEngine.playTapHaptic();
                      alert('रिपोर्ट दर्ज की गई। ब्लॉक कोऑर्डिनेटर समीक्षा करेंगे।');
                    }}
                    className="inline-flex items-center gap-1 text-[#8d4b00] hover:underline text-[12px] font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">flag</span>
                    <span>Report Issue</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      audioEngine.playTapHaptic();
                      alert(`"${phrase.hindi}" बुकमार्क कर लिया गया।`);
                    }}
                    className="min-h-[48px] px-3 rounded-lg text-[#8a726b] hover:text-[#201a18] flex items-center gap-1 text-[12px]"
                  >
                    <span className="material-symbols-outlined text-xl">bookmark_border</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Pedagogical Tip Banner */}
      <div className="p-4 rounded-xl bg-[#f7ebe8] border border-[#ddc0b8] flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-[#ece0dd] flex items-center justify-center shrink-0 text-[#9d3d1e]">
          <span className="material-symbols-outlined text-2xl">school</span>
        </div>
        <div>
          <h3 className="text-[15px] font-bold font-serif-headline text-[#201a18]">
            Pedagogical Tip for Multilingual Class
          </h3>
          <p className="text-[12px] text-[#56423c]">
            Speak the Ol Chiki phrase first, follow with the Hindi translation, and invite class chorus repetition to reinforce phonetic familiarity.
          </p>
        </div>
      </div>

      {/* Floating Suggest New Phrase Button */}
      <div className="fixed bottom-20 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <button
          onClick={() => {
            audioEngine.playTapHaptic();
            setShowAddModal(true);
          }}
          className="pointer-events-auto shadow-lg flex items-center gap-2.5 px-6 py-3.5 min-h-[52px] rounded-full bg-[#9d3d1e] text-white font-serif-headline font-bold text-[15px] clay-btn active:translate-y-0.5 transition-all border-2 border-[#ffdbd0]"
        >
          <span className="material-symbols-outlined text-2xl font-bold">add</span>
          <span>+ Suggest New Classroom Phrase</span>
        </button>
      </div>

      {/* Suggest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#fff8f6] rounded-2xl border-2 border-[#ddc0b8] p-5 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#ddc0b8] pb-2">
              <h3 className="text-[17px] font-bold font-serif-headline text-[#9d3d1e]">
                Suggest Classroom Phrase (सुझाव जोड़ें)
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg bg-[#f7ebe8] text-[#56423c] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {addedNotice ? (
              <div className="p-4 bg-[#bbefc6] text-[#215031] rounded-xl text-center font-bold">
                ✓ सुझाव स्थानीय कतार में सुरक्षित! अगले सिंक पर अपलोड होगा।
              </div>
            ) : (
              <form onSubmit={handleAddPhrase} className="space-y-3">
                <div>
                  <label className="block text-[12px] font-bold text-[#56423c] mb-1">
                    Hindi Phrase (कक्षा में बोला जाने वाला वाक्य):
                  </label>
                  <input
                    type="text"
                    required
                    value={newHindi}
                    onChange={(e) => setNewHindi(e.target.value)}
                    placeholder="उदा: पंक्ति में खड़े हो जाओ"
                    className="w-full p-2.5 rounded-xl border border-[#ddc0b8] bg-white text-[14px]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#56423c] mb-1">
                    Santali Translation / Ol Chiki (यदि ज्ञात हो):
                  </label>
                  <input
                    type="text"
                    value={newSantali}
                    onChange={(e) => setNewSantali(e.target.value)}
                    placeholder="उदा: ᱞᱟᱭᱤᱱ ᱨᱮ ᱛᱤᱸᱜᱩᱱ ᱯᱮ"
                    className="w-full p-2.5 rounded-xl border border-[#ddc0b8] bg-white text-[14px] font-olchiki"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl bg-[#ece0dd] text-[13px] font-bold"
                  >
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#9d3d1e] text-white text-[13px] font-bold clay-btn"
                  >
                    कतार में जोड़ें (Queue)
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
