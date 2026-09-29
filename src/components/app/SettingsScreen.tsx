import React, { useState } from 'react';
import { DIALECT_OPTIONS, PENDING_SUGGESTIONS, STORAGE_STATS } from '../../data/mockData';
import { audioEngine } from '../../utils/audio';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const [selectedDialect, setSelectedDialect] = useState(DIALECT_OPTIONS[0].id);
  const [offlineSwitch, setOfflineSwitch] = useState(true);
  const [feedbackNotice, setFeedbackNotice] = useState(false);

  const handleRecordCorrection = () => {
    audioEngine.playTapHaptic();
    setFeedbackNotice(true);
    setTimeout(() => setFeedbackNotice(false), 2400);
  };

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 pt-4 pb-32 space-y-5 select-none">
      {/* Top Bar Structure */}
      <header className="bg-white sticky top-0 z-30 px-4 py-3 rounded-2xl border border-[#ddc0b8] shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioEngine.playTapHaptic();
              onBack();
            }}
            aria-label="Go Back"
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#f7ebe8] hover:bg-[#f2e6e2] text-[#9d3d1e] border border-[#ddc0b8] active:translate-y-0.5 transition"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <div>
            <h1 className="text-[18px] sm:text-[20px] font-bold font-serif-headline text-[#9d3d1e] tracking-tight leading-tight">
              Sync &amp; Settings{' '}
              <span className="text-[14px] text-[#56423c] font-normal">/ सिंक और सेटिंग्स</span>
            </h1>
            <div className="flex items-center gap-1.5 text-[#56423c] text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#3a6848] inline-block" />
              <span>PALASH Local Engine 100% Ready</span>
            </div>
          </div>
        </div>

        {/* Teacher Profile Badge */}
        <div className="flex items-center gap-2 bg-[#fdf1ed] px-3 py-1.5 rounded-xl border border-[#ddc0b8] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-[#bd5533] text-white flex items-center justify-center font-bold text-[13px] shrink-0 border border-[#9d3d1e]">
            RS
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-[12px] text-[#201a18] font-bold leading-tight">Shri R. Soren</p>
            <p className="text-[10px] text-[#56423c]">Primary Teacher, Dumka Block</p>
          </div>
        </div>
      </header>

      {/* Network Status Indicator Banner */}
      <section className="rounded-xl bg-[#f7ebe8] p-3.5 border border-[#ddc0b8] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#ece0dd] border border-[#ddc0b8] flex items-center justify-center text-[#56423c] shrink-0">
            <span className="material-symbols-outlined text-[24px]">wifi_off</span>
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 text-[10px] bg-[#ece0dd] text-[#201a18] border border-[#ddc0b8] rounded font-bold mb-1">
              LOCAL STORAGE MODE
            </span>
            <p className="text-[15px] sm:text-[16px] text-[#201a18] font-bold leading-snug">
              No Internet Detected — Running in Local Storage Mode
            </p>
            <p className="text-[12px] text-[#56423c]">
              नेटवर्क अनुपलब्ध • सभी कक्षा संसाधन सुरक्षित रूप से स्थानीय मेमोरी से चल रहे हैं
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#bbefc6] text-[#215031] border border-[#3a6848] text-[12px] font-bold shrink-0">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>Verified Local</span>
        </div>
      </section>

      {/* Bento Grid: Offline Confirmation & Sync Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Offline Confirmation Card (7 cols) */}
        <section className="md:col-span-7 bg-white rounded-xl p-5 border border-[#ddc0b8] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#ddc0b8]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#9d3d1e] text-[22px]">offline_pin</span>
                  <h2 className="text-[18px] font-bold font-serif-headline text-[#201a18]">Offline Mode</h2>
                </div>
                <p className="text-[12px] text-[#9d3d1e] font-bold">ऑफ़लाइन मोड (स्थायी रूप से सक्रिय)</p>
              </div>

              {/* Big Tactile Physical Toggle Switch */}
              <label
                className="relative inline-flex items-center cursor-pointer min-h-[44px]"
                title="Offline mode is permanently enabled for rural operations"
              >
                <input
                  type="checkbox"
                  checked={offlineSwitch}
                  onChange={() => setOfflineSwitch(!offlineSwitch)}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-[#3a6848] rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all shadow-inner" />
              </label>
            </div>

            <p className="mt-4 text-[14px] text-[#201a18] leading-relaxed">
              App functions <strong className="font-bold text-[#9d3d1e]">100% offline</strong> without cellular tower or internet. Voice models, pronunciation audio clips, and bilingual Santali-Hindi dictionaries are permanently stored on this device.
            </p>

            <div className="mt-3 p-3 rounded-lg bg-[#fdf1ed] border border-[#ddc0b8]">
              <p className="text-[12px] text-[#56423c]">
                <strong className="text-[#201a18]">झारखंड विद्यालय निर्देश:</strong> कक्षा शिक्षण में नेटवर्क सिग्नल की आवश्यकता नहीं है। दैनिक शब्द उच्चारण एवं छात्र अभ्यास बिना किसी डेटा पैक के निरंतर काम करते हैं।
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#ddc0b8] flex items-center justify-between text-[#56423c] text-[12px]">
            <span className="flex items-center gap-1.5 text-[#3a6848] font-bold">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Device Local DB Loaded
            </span>
            <span className="bg-[#f7ebe8] px-2.5 py-1 rounded text-[11px] font-bold border border-[#ddc0b8]">
              Hardware Read: OK
            </span>
          </div>
        </section>

        {/* Sync Status Panel (5 cols) */}
        <section className="md:col-span-5 bg-white rounded-xl p-5 border border-[#ddc0b8] shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-bold text-[#201a18]">Cloud Sync Status</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#ece0dd] text-[#56423c] border border-[#ddc0b8] font-bold">
                Standalone
              </span>
            </div>

            {/* Last Synced Meta Card */}
            <div className="p-3.5 rounded-xl bg-[#fdf1ed] border border-[#ddc0b8] space-y-1.5">
              <div className="flex items-center gap-2 text-[#56423c] text-[12px]">
                <span className="material-symbols-outlined text-[18px] text-[#8d4b00]">history_toggle_off</span>
                <span>Last Synced (पिछला सिंक)</span>
              </div>
              <p className="text-[16px] text-[#201a18] font-bold leading-tight font-serif-headline">
                14 Oct 2024, 08:30 AM
              </p>
              <p className="text-[12px] text-[#56423c] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                at Block Resource Centre (BRC Dumka)
              </p>
            </div>

            {/* Sync Action */}
            <div className="space-y-2 pt-1">
              <button
                disabled
                aria-disabled="true"
                className="w-full min-h-[50px] px-4 py-3 rounded-xl bg-[#ece0dd] text-[#8a726b] cursor-not-allowed border-2 border-[#ddc0b8] text-[13px] font-bold flex items-center justify-center gap-2 opacity-80"
              >
                <span className="material-symbols-outlined text-[20px]">sync_disabled</span>
                <span>Sync Now (अभी सिंक करें)</span>
              </button>
              <p className="text-[11px] text-[#56423c] px-1 leading-snug">
                Disabled while offline • Connect to Wi-Fi at Cluster Centre to sync pending teacher phrase submissions and model updates.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#ddc0b8] text-center">
            <span className="text-[11px] text-[#8d4b00] font-bold">
              अगला स्वतः-सिंक: सीआरसी / बीआरसी वाई-फाई नेटवर्क मिलते ही
            </span>
          </div>
        </section>
      </div>

      {/* Storage Breakdown Section */}
      <section className="bg-white rounded-xl p-5 border border-[#ddc0b8] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ddc0b8] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9d3d1e] text-[24px]">sd_storage</span>
              <h2 className="text-[18px] font-bold font-serif-headline text-[#201a18]">Storage Breakdown</h2>
            </div>
            <p className="text-[12px] text-[#56423c]">स्थानीय मेमोरी उपयोग एवं ऑफ़लाइन शिक्षण पैक</p>
          </div>
          <div className="flex items-baseline gap-1.5 bg-[#f7ebe8] px-3.5 py-1.5 rounded-xl border border-[#ddc0b8] self-start sm:self-auto">
            <span className="text-[17px] font-bold text-[#9d3d1e]">384 MB</span>
            <span className="text-[12px] text-[#56423c]">Used of 32 GB Internal</span>
          </div>
        </div>

        {/* Segmented Multi-Color Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-5 rounded-lg bg-[#ece0dd] p-0.5 flex overflow-hidden border border-[#ddc0b8]">
            <div
              className="bg-[#9d3d1e] h-full rounded-l transition-all"
              style={{ width: '62.5%' }}
              title="Speech Engine (240 MB)"
            />
            <div
              className="bg-[#3a6848] h-full transition-all"
              style={{ width: '24%' }}
              title="Audio Cache (92 MB)"
            />
            <div
              className="bg-[#b15f00] h-full transition-all"
              style={{ width: '9.9%' }}
              title="Ol Chiki & NIPUN (38 MB)"
            />
            <div
              className="bg-[#8a726b] h-full rounded-r transition-all"
              style={{ width: '3.6%' }}
              title="Offline Phrase Dictionary (14 MB)"
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-[#56423c] px-0.5 font-mono">
            <span>0 MB</span>
            <span>192 MB</span>
            <span>384 MB Used</span>
            <span>31.6 GB Free</span>
          </div>
        </div>

        {/* Storage Breakdown Legend Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          {STORAGE_STATS.items.map((item) => (
            <div key={item.name} className="p-3.5 rounded-xl bg-[#fdf1ed] border border-[#ddc0b8] space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full inline-block shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[13px] font-bold text-[#201a18]">{item.name}</span>
                </div>
                <span className="text-[14px] font-bold text-[#9d3d1e]">{item.sizeMB} MB</span>
              </div>
              <p className="text-[11px] text-[#56423c] leading-snug">{item.note}</p>
              <span className="inline-block text-[10px] font-bold text-[#3a6848]">{item.tag}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[#56423c]">
            Additional dialect packs (e.g., Ho, Mundari) can be preloaded via SD card at BRC.
          </p>
          <button
            onClick={() => {
              audioEngine.playTapHaptic();
              alert('SD कार्ड एवं BRC से Ho व Mundari भाषा पैक लोड करने का विकल्प जल्द उपलब्ध होगा।');
            }}
            className="w-full sm:w-auto min-h-[50px] px-6 py-2.5 rounded-xl bg-[#f2e6e2] hover:bg-[#ece0dd] text-[#201a18] border-2 border-[#ddc0b8] text-[13px] font-bold flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px] text-[#9d3d1e]">inventory_2</span>
            <span>Manage Offline Packs (ऑफ़लाइन पैक प्रबंधित करें)</span>
          </button>
        </div>
      </section>

      {/* Community Contribution & Dialect Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Queued Submissions Card */}
        <section className="bg-white rounded-xl p-5 border border-[#ddc0b8] shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8d4b00] text-[22px]">pending_actions</span>
                <h3 className="text-[16px] font-bold font-serif-headline text-[#201a18]">Community Contribution</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                Queue Active
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#fdf1ed] border border-[#ddc0b8] flex items-start gap-3">
              <span className="material-symbols-outlined text-[#9d3d1e] text-[24px] mt-0.5">rate_review</span>
              <div>
                <p className="text-[13px] text-[#201a18] font-bold">Pending teacher suggestions: 3 items queued</p>
                <p className="text-[11px] text-[#56423c] mt-0.5">
                  3 teacher-submitted vernacular corrections and audio pronunciation suggestions are saved locally and will auto-upload on next sync.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {PENDING_SUGGESTIONS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-[12px] text-[#56423c] py-1 border-b border-[#ddc0b8]"
                >
                  <span className="truncate max-w-[220px]">
                    {item.id}. {item.title}
                  </span>
                  <span className="text-[11px] text-[#8d4b00] font-bold shrink-0">{item.type}</span>
                </div>
              ))}
            </div>
          </div>

          {feedbackNotice ? (
            <div className="mt-4 p-3 bg-[#bbefc6] text-[#215031] text-[12px] font-bold rounded-xl text-center">
              ✓ सुझाव रिकॉर्ड किया गया और स्थानीय मेमोरी में सुरक्षित!
            </div>
          ) : (
            <button
              onClick={handleRecordCorrection}
              className="mt-4 w-full min-h-[50px] px-4 py-2.5 rounded-xl bg-[#f7ebe8] text-[#201a18] hover:bg-[#f2e6e2] border border-[#ddc0b8] text-[13px] font-bold flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add_comment</span>
              <span>Record New Lesson Correction (सुझाव जोड़ें)</span>
            </button>
          )}
        </section>

        {/* Vernacular Dialect Standard Card */}
        <section className="bg-white rounded-xl p-5 border border-[#ddc0b8] shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3a6848] text-[22px]">translate</span>
                <h3 className="text-[16px] font-bold font-serif-headline text-[#201a18]">
                  Vernacular Dialect Standard
                </h3>
              </div>
              <span className="px-2 py-0.5 text-[11px] bg-[#bbefc6] text-[#215031] rounded font-bold">
                Current Active
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#fdf1ed] border border-[#ddc0b8] space-y-1">
              <p className="text-[12px] text-[#56423c]">Active Dialect Configuration:</p>
              <p className="text-[15px] text-[#201a18] font-bold">
                Local Dialect: Santhal Pargana / Dumka Standard (Switchable)
              </p>
              <p className="text-[12px] text-[#56423c]">मानक संथाली (दुमका / संताल परगना प्रमंडल) ध्वन्यात्मक मॉडल।</p>
            </div>

            <div className="space-y-2">
              {DIALECT_OPTIONS.map((dialect) => {
                const isSelected = selectedDialect === dialect.id;
                return (
                  <label
                    key={dialect.id}
                    onClick={() => {
                      audioEngine.playTapHaptic();
                      setSelectedDialect(dialect.id);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer min-h-[50px] transition ${
                      isSelected
                        ? 'bg-white border-[#3a6848]'
                        : 'bg-[#fdf1ed] border-[#ddc0b8] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#3a6848]' : 'border-[#8a726b]'
                        }`}
                      >
                        {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#3a6848]" />}
                      </span>
                      <div>
                        <span className="text-[13px] font-bold text-[#201a18] block">{dialect.name}</span>
                        <span className="text-[11px] text-[#56423c] block">{dialect.description}</span>
                      </div>
                    </div>
                    {isSelected ? (
                      <span className="material-symbols-outlined text-[#3a6848]">check</span>
                    ) : (
                      <span className="material-symbols-outlined text-[#8a726b]">tune</span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-[11px] text-[#56423c] text-center">
            Dialect preference alters speech playback frequency without redownloading core assets.
          </p>
        </section>
      </div>

      {/* Official Certification & App Info Footer */}
      <footer className="pt-6 pb-4 border-t border-[#ddc0b8] text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#9d3d1e] inline-block" />
          <span className="text-[15px] font-bold font-serif-headline text-[#9d3d1e]">
            Vidya Vani v2.4.1 (PALASH Vernacular AI)
          </span>
        </div>
        <p className="text-[12px] text-[#56423c] max-w-lg mx-auto">
          Jharkhand Education Project Council (JEPC) • Department of School Education and Literacy, Government of Jharkhand.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#56423c] pt-1">
          <span>Hardware Architecture: ARM64 Low-Power</span>
          <span>•</span>
          <span>Local Database v18</span>
          <span>•</span>
          <span>Encryption: Salted SQLite</span>
        </div>
      </footer>
    </div>
  );
};
