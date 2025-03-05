import React from 'react';
import { create } from 'zustand';

type DarkModeState = {
  mode: 'system' | 'dark' | 'light';
  setMode: (mode: 'system' | 'dark' | 'light') => void;
};

export const useDarkModeStore = create<DarkModeState>((set) => ({
  mode: 'system',
  setMode: (mode) => set({ mode }),
}));

export const useDarkMode = () => {
  const { mode, setMode } = useDarkModeStore();

  const changeMode = (mode: 'system' | 'dark' | 'light') => {
    document.documentElement.dataset.theme = '';
    document.documentElement.dataset.theme = mode;
    setMode(mode);
    localStorage.setItem('theme', mode);
  };

  const getSystemTheme = () => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );
    const isDarkMode = darkModeMediaQuery.matches;
    return isDarkMode ? 'dark' : 'light';
  };

  const handleDarkModeChange = (e: MediaQueryListEvent) => {
    const mode = e.matches ? 'dark' : 'light';
    changeMode(mode);
  };

  React.useEffect(() => {
    const theme = localStorage.getItem('theme') as 'system' | 'dark' | 'light';
    if (theme) {
      if (theme !== 'system') {
        changeMode(theme);
      } else {
        const systemTheme = getSystemTheme();
        changeMode(systemTheme);
      }
    } else {
      setMode(getSystemTheme());
    }
  }, []);

  React.useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
    return () =>
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
  }, []);

  const toggleDarkMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    changeMode(newMode);
  };

  return { mode, toggleDarkMode };
};
