import React from 'react';

const themes = [
    { id: 'neon', label: 'NEON' },
    { id: 'corporate', label: 'CORPORATE' },
    { id: 'minimal', label: 'MINIMAL' },
    { id: 'gold', label: 'ROYAL' },
];

const Presets = ({ activePreset, onSelect }) => (
    <div className="flex justify-center gap-4 mb-12 flex-wrap animate-fade-in [animation-delay:100ms]">
        {themes.map((theme) => (
            <button
                key={theme.id}
                className={`px-8 py-2.5 rounded-full text-xs font-bold tracking-widest transition-all duration-300 border ${
                    activePreset === theme.id 
                    ? 'bg-zinc-950 dark:bg-white text-white dark:text-black border-zinc-950 dark:border-white shadow-xl dark:shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'bg-zinc-200/50 dark:bg-zinc-900/40 border-black/5 dark:border-white/5 text-zinc-500 dark:text-zinc-300 hover:border-black/20 dark:hover:border-white/20 hover:text-zinc-950 dark:hover:text-white'
                }`}
                onClick={() => onSelect(theme.id)}
            >
                {theme.label}
            </button>
        ))}
    </div>
);

export default Presets;
