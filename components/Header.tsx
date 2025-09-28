import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { USERS } from '../constants';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  selectedUser: User;
  onSelectUser: (user: User) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedUser, onSelectUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (user: User) => {
    onSelectUser(user);
    setIsOpen(false);
  };

  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-base-content whitespace-nowrap">
        💖 우리가족 목표달성 💖
      </h1>
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 bg-base-200/50 p-2 rounded-lg border border-base-300 hover:bg-base-300 transition-colors"
          >
            <span className="text-2xl">{selectedUser.avatar}</span>
            <span className="font-semibold text-base-content">{selectedUser.displayName}</span>
            <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-base-200 border border-base-300 rounded-lg shadow-lg z-50 animate-fade-in-up">
              <ul className="py-1">
                {USERS.map((user) => (
                  <li key={user.username}>
                    <button
                      onClick={() => handleSelect(user)}
                      className="w-full text-left flex items-center space-x-3 px-4 py-2 text-sm text-content-secondary hover:bg-base-300 hover:text-base-content"
                    >
                      <span className="text-xl">{user.avatar}</span>
                      <span>{user.displayName}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;