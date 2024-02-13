import React from 'react';
import '../styles/Presets.css';

const themes = [
    { id: 'neon', label: 'Neon Night' },
    { id: 'corporate', label: 'Corporate Blue' },
    { id: 'minimal', label: 'Minimal Dark' },
    { id: 'gold', label: 'Royal Gold' },
];

const Presets = ({ activePreset, onSelect }) => (
    <div className="presets-container fade-in">
        {themes.map((theme) => (
            <button
                key={theme.id}
                className={`preset-btn ${activePreset === theme.id ? 'active' : ''}`}
                onClick={() => onSelect(theme.id)}
            >
                {theme.label}
            </button>
        ))}
    </div>
);

export default Presets;
