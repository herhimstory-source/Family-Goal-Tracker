import React from 'react';
import { ListIcon, CalendarIcon, TrophyIcon } from './icons.tsx';

const Navigation = ({ currentView, onNavigate }) => {
  const navItems = [
    { view: 'goals', label: '목표', icon: ListIcon },
    { view: 'calendar', label: '캘린더', icon: CalendarIcon },
    { view: 'achievements', label: '달성', icon: TrophyIcon },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-base-200/50 p-2 rounded-full border border-base-300 backdrop-blur-sm z-40">
      <ul className="flex items-center space-x-2">
        {navItems.map(({ view, label, icon: Icon }) => (
          <li key={view}>
            <button
              onClick={() => onNavigate(view)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm sm:px-5 sm:py-2.5 font-semibold rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 ${
                currentView === view
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-base-300 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;