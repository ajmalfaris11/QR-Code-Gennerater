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
        dotsOptions: { 
            color: '#6366f1', 
            type: 'rounded',
            gradient: null
        },
        backgroundOptions: { color: '#ffffff' },
        cornersSquareOptions: { type: 'extra-rounded' },
        image: null,
    });

    const [gradType, setGradType] = useState('none');
    const [gradColor2, setGradColor2] = useState('#ec4899');
    const [activePreset, setActivePreset] = useState(null);

    const { qrRef, download } = useQRCode({
        ...options,
        width: 1000,
        height: 1000,
        imageOptions: { margin: 10, crossOrigin: 'anonymous' }
    });

    const handleChange = (key, value) => {
        setOptions(prev => ({ ...prev, [key]: value }));
    };

    const handleDotChange = (updates) => {
        setOptions(prev => ({
            ...prev,
            dotsOptions: { ...prev.dotsOptions, ...updates }
        }));
    };

    const updateGradient = (type, color1, color2) => {
        if (type === 'none') {
            handleDotChange({ color: color1, gradient: null });
        } else {
            handleDotChange({
                gradient: {
                    type,
                    rotation: 0,
                    colorStops: [
                        { offset: 0, color: color1 },
                        { offset: 1, color: color2 }
                    ]
                }
            });
        }
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                handleChange('image', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const applyPreset = (preset) => {
        const themes = {
            neon: {
                dotsOptions: { 
                    gradient: { type: 'linear', rotation: 0, colorStops: [{offset:0, color:'#00f2ff'}, {offset:1, color:'#bc00ff'}] },
                    type: 'dots' 
                },
                backgroundOptions: { color: '#000000' },
                cornersSquareOptions: { type: 'dot' }
            },
            corporate: {
                dotsOptions: { color: '#1e3a8a', type: 'square', gradient: null },
                backgroundOptions: { color: '#ffffff' },
                cornersSquareOptions: { type: 'square' }
            },
            minimal: {
                dotsOptions: { color: '#ffffff', type: 'rounded', gradient: null },
                backgroundOptions: { color: '#0f172a' },
                cornersSquareOptions: { type: 'extra-rounded' }
            },
            gold: {
                dotsOptions: { 
                    gradient: { type: 'radial', rotation: 0, colorStops: [{offset:0, color:'#fbbf24'}, {offset:1, color:'#d97706'}] },
                    type: 'classy' 
                },
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
                            <label>Primary Color</label>
                            <div className="color-input-wrapper">
                                <input 
                                    type="color" 
                                    value={options.dotsOptions.color || '#6366f1'}
                                    onChange={(e) => {
                                        const c1 = e.target.value;
                                        updateGradient(gradType, c1, gradColor2);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Secondary Color</label>
                            <div className="color-input-wrapper">
                                <input 
                                    type="color" 
                                    value={gradColor2}
                                    onChange={(e) => {
                                        const c2 = e.target.value;
                                        setGradColor2(c2);
                                        updateGradient(gradType, options.dotsOptions.color, c2);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Gradient Type</label>
                            <select 
                                value={gradType} 
                                onChange={(e) => {
                                    const type = e.target.value;
                                    setGradType(type);
                                    updateGradient(type, options.dotsOptions.color, gradColor2);
                                }}>
                                <option value="none">None</option>
                                <option value="linear">Linear</option>
                                <option value="radial">Radial</option>
                            </select>
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
                        <div className="input-group full-width">
                            <label>Center Logo</label>
                            <div className="file-input-wrapper">
                                <input type="file" accept="image/*" onChange={handleLogoUpload} />
                                <span className="file-name">{options.image ? 'Logo Uploaded' : 'Optional: Upload Image'}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="preview-section glass fade-in" style={{ animationDelay: '0.3s' }}>
                    <div ref={qrRef} style={{ display: 'flex', justifyContent: 'center' }}></div>
                    <div className="download-actions">
                        <button onClick={() => download('png')} className="action-btn">
                            Download PNG
                        </button>
                        <button onClick={() => download('svg')} className="action-btn secondary">
                            Download SVG
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default App;
