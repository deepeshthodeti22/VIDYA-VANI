import React from 'react';
import { NavTab } from '../../types';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav
      aria-label="Bottom Global Navigation"
      className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-2 py-2 min-h-[56px] bg-[#fdf1ed] border-t-2 border-[#ddc0b8] shadow-sm select-none"
    >
      {/* Item 1: Lessons */}
      <button
        onClick={() => onTabChange('lessons')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl transition-all duration-100 active:translate-y-0.5 ${
          activeTab === 'lessons'
            ? 'bg-[#9d3d1e] text-white shadow-sm'
            : 'text-[#56423c] hover:bg-[#f2e6e2]'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={activeTab === 'lessons' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          menu_book
        </span>
        <span className="text-[11px] font-bold tracking-wide mt-0.5">Lessons</span>
      </button>

      {/* Item 2: Pronounce */}
      <button
        onClick={() => onTabChange('pronounce')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl transition-all duration-100 active:translate-y-0.5 ${
          activeTab === 'pronounce'
            ? 'bg-[#9d3d1e] text-white shadow-sm'
            : 'text-[#56423c] hover:bg-[#f2e6e2]'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={activeTab === 'pronounce' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          volume_up
        </span>
        <span className="text-[11px] font-bold tracking-wide mt-0.5">Pronounce</span>
      </button>

      {/* Item 3: Attendance */}
      <button
        onClick={() => onTabChange('attendance')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl transition-all duration-100 active:translate-y-0.5 ${
          activeTab === 'attendance'
            ? 'bg-[#9d3d1e] text-white shadow-sm'
            : 'text-[#56423c] hover:bg-[#f2e6e2]'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={activeTab === 'attendance' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          how_to_reg
        </span>
        <span className="text-[11px] font-bold tracking-wide mt-0.5">Attendance</span>
      </button>

      {/* Item 4: Settings */}
      <button
        onClick={() => onTabChange('settings')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl transition-all duration-100 active:translate-y-0.5 ${
          activeTab === 'settings'
            ? 'bg-[#9d3d1e] text-white shadow-sm'
            : 'text-[#56423c] hover:bg-[#f2e6e2]'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={activeTab === 'settings' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          tune
        </span>
        <span className="text-[11px] font-bold tracking-wide mt-0.5">Settings</span>
      </button>
    </nav>
  );
};
