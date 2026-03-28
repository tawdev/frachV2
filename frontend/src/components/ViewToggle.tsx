'use client';

import { LayoutGrid, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-[#F8F9FA] border border-[#EEEEEE] rounded-full p-1 h-10 w-24">
      <button
        onClick={() => onViewChange('grid')}
        className={`flex-1 flex items-center justify-center h-full rounded-full transition-all duration-200 ${
          view === 'grid' ? 'bg-white shadow-sm text-[#A51C30]' : 'text-[#9CA3AF]'
        }`}
        aria-label="Grid view"
      >
        <LayoutGrid size={18} />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`flex-1 flex items-center justify-center h-full rounded-full transition-all duration-200 ${
          view === 'list' ? 'bg-white shadow-sm text-[#A51C30]' : 'text-[#9CA3AF]'
        }`}
        aria-label="List view"
      >
        <List size={18} />
      </button>
    </div>
  );
}
