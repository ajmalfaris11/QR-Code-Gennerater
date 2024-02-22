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
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'bg-zinc-900/40 border-white/5 text-zinc-500 hover:border-white/20 hover:text-white'
                }`}
                onClick={() => onSelect(theme.id)}
            >
                {theme.label}
            </button>
        ))}
    </div>
);

export default Presets;
