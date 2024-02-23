import React from 'react';

const ThemeToggle = ({ isDark, onToggle }) => (
    <button
        onClick={onToggle}
        className="fixed top-8 right-8 p-3 rounded-2xl bg-zinc-900/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-black/5 dark:border-white/5 shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 z-50 group"
        aria-label="Toggle Theme"
    >
        {isDark ? (
            <svg className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
        ) : (
            <svg className="w-6 h-6 text-zinc-500 group-hover:text-zinc-950 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        )}
    </button>
);

export default ThemeToggle;
