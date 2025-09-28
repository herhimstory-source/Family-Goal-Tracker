import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from './icons.tsx';

const ThemeToggle = () => {
  // The anti-FOUC script in index.html sets the correct initial class, so we read from it.
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  
  // This effect listens for theme changes from other tabs/windows.
  useEffect(() => {
    const handleStorageChange = (e) => {
        if (e.key === 'theme') {
            const newIsDark = e.newValue === 'dark';
            setIsDark(newIsDark);
            if (newIsDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);


  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-base-200/50 text-content-secondary hover:text-base-content border border-base-300 hover:bg-base-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;