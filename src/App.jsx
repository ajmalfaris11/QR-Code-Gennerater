import React, { useState } from 'react';
import Header from './components/Header';
import Presets from './components/Presets';
import { useQRCode } from './hooks/useQRCode';
import './styles/Generator.css';

const App = () => {
    const [options, setOptions] = useState({
        width: 300,
        height: 300,
        data: 'https://github.com/ajmalfaris11',
        dotsOptions: { color: '#6366f1', type: 'rounded' },
        backgroundOptions: { color: '#ffffff' },
        cornersSquareOptions: { type: 'extra-rounded' },
        image: null,
    });

    const [activePreset, setActivePreset] = useState(null);

    const { qrRef, download } = useQRCode({
        ...options,
        width: 1000,
        height: 1000,
    });

    const handleChange = (key, value) => {
        setOptions(prev => ({ ...prev, [key]: value }));
    };

    const handleDotChange = (key, value) => {
        setOptions(prev => ({
            ...prev,
            dotsOptions: { ...prev.dotsOptions, [key]: value }
        }));
    };

    const applyPreset = (preset) => {
        const themes = {
            neon: {
                dotsOptions: { color: '#00f2ff', type: 'dots' },
                backgroundOptions: { color: '#000000' },
                cornersSquareOptions: { type: 'dot' }
            },
            corporate: {
                dotsOptions: { color: '#1e3a8a', type: 'square' },
                backgroundOptions: { color: '#ffffff' },
                cornersSquareOptions: { type: 'square' }
            },
            minimal: {
                dotsOptions: { color: '#ffffff', type: 'rounded' },
                backgroundOptions: { color: '#0f172a' },
                cornersSquareOptions: { type: 'extra-rounded' }
            },
            gold: {
                dotsOptions: { color: '#fbbf24', type: 'classy' },
                backgroundOptions: { color: '#1a1a1a' },
                cornersSquareOptions: { type: 'extra-rounded' }
            }
        };
        const theme = themes[preset];
        if (theme) {
            setOptions(prev => ({ ...prev, ...theme }));
            setActivePreset(preset);
        }
    };

    return (
        <div className="container" style={{ width: '100%', maxWidth: '1000px', padding: '2rem' }}>
            <Header />
            <Presets activePreset={activePreset} onSelect={applyPreset} />
            
            <div className="generator-grid">
                <section className="form-section glass fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="input-group">
                        <label>Content</label>
                        <input 
                            type="text" 
                            value={options.data} 
                            onChange={(e) => handleChange('data', e.target.value)}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="options-grid">
                        <div className="input-group">
                            <label>Color</label>
                            <div className="color-input-wrapper">
                                <input 
                                    type="color" 
                                    value={options.dotsOptions.color}
                                    onChange={(e) => handleDotChange('color', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Background</label>
                            <div className="color-input-wrapper">
                                <input 
                                    type="color" 
                                    value={options.backgroundOptions.color}
                                    onChange={(e) => handleChange('backgroundOptions', { color: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="preview-section glass fade-in" style={{ animationDelay: '0.3s' }}>
                    <div ref={qrRef} style={{ display: 'flex', justifyContent: 'center' }}></div>
                    <div className="download-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
                        <button onClick={() => download('png')} className="action-btn" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.875rem', borderRadius: '0.75rem', cursor: 'pointer' }}>
                            PNG
                        </button>
                        <button onClick={() => download('svg')} className="action-btn secondary" style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'white', padding: '0.875rem', borderRadius: '0.75rem', cursor: 'pointer' }}>
                            SVG
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default App;
