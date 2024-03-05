import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = ({ isDark, onToggle }) => (
    <button
        onClick={onToggle}
        className="fixed top-8 right-8 p-4 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-500 z-50 group overflow-hidden"
        aria-label="Toggle Theme"
    >
        <div className="relative w-6 h-6">
            <FiSun 
                className={`w-6 h-6 absolute inset-0 transition-all duration-500 transform ${
                    isDark ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-10 opacity-0 -rotate-90'
                } text-white group-hover:text-amber-300`} 
            />
            <FiMoon 
                className={`w-6 h-6 absolute inset-0 transition-all duration-500 transform ${
                    isDark ? '-translate-y-10 opacity-0 rotate-90' : 'translate-y-0 opacity-100 rotate-0'
                } text-zinc-950 group-hover:text-indigo-600`} 
            />
        </div>
    </button>
);

export default ThemeToggle;
