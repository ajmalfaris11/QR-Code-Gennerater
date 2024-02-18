import React from 'react';

const themes = [
    { id: 'neon', label: 'Neon Night' },
    { id: 'corporate', label: 'Corporate Blue' },
    { id: 'minimal', label: 'Minimal Dark' },
    { id: 'gold', label: 'Royal Gold' },
];

const Presets = ({ activePreset, onSelect }) => (
    <div className="flex justify-center gap-3 mb-10 flex-wrap animate-fade-in [animation-delay:100ms]">
        {themes.map((theme) => (
            <button
                key={theme.id}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    activePreset === theme.id 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                    : 'bg-slate-800/50 border-white/10 text-slate-400 hover:border-indigo-500 hover:text-white hover:-translate-y-0.5'
                }`}
                onClick={() => onSelect(theme.id)}
            >
                {theme.label}
            </button>
        ))}
    </div>
);

export default Presets;
