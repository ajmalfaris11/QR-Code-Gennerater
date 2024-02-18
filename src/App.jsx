import React, { useState } from 'react';
import Header from './components/Header';
import Presets from './components/Presets';
import { useQRCode } from './hooks/useQRCode';

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
        <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen">
            <Header />
            <Presets activePreset={activePreset} onSelect={applyPreset} />
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8 items-start">
                <section className="glass p-8 animate-fade-in [animation-delay:200ms]">
                    <div className="flex flex-col gap-2 mb-6">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Content</label>
                        <input 
                            type="text" 
                            className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            value={options.data} 
                            onChange={(e) => handleChange('data', e.target.value)}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Color</label>
                            <div className="h-12 w-full rounded-xl overflow-hidden border border-white/10 hover:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all">
                                <input 
                                    type="color" 
                                    className="w-[120%] h-[120%] -m-[10%] cursor-pointer bg-none border-none p-0"
                                    value={options.dotsOptions.color || '#6366f1'}
                                    onChange={(e) => updateGradient(gradType, e.target.value, gradColor2)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Secondary Color</label>
                            <div className="h-12 w-full rounded-xl overflow-hidden border border-white/10 hover:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all">
                                <input 
                                    type="color" 
                                    className="w-[120%] h-[120%] -m-[10%] cursor-pointer bg-none border-none p-0"
                                    value={gradColor2}
                                    onChange={(e) => {
                                        setGradColor2(e.target.value);
                                        updateGradient(gradType, options.dotsOptions.color, e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gradient Type</label>
                            <select 
                                className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                                value={gradType} 
                                onChange={(e) => {
                                    setGradType(e.target.value);
                                    updateGradient(e.target.value, options.dotsOptions.color, gradColor2);
                                }}>
                                <option value="none">None</option>
                                <option value="linear">Linear</option>
                                <option value="radial">Radial</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Background</label>
                            <div className="h-12 w-full rounded-xl overflow-hidden border border-white/10 hover:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/20 transition-all">
                                <input 
                                    type="color" 
                                    className="w-[120%] h-[120%] -m-[10%] cursor-pointer bg-none border-none p-0"
                                    value={options.backgroundOptions.color}
                                    onChange={(e) => handleChange('backgroundOptions', { color: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="col-span-2 flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Center Logo</label>
                            <div className="relative bg-slate-900/50 border border-dashed border-white/20 rounded-xl p-4 flex items-center justify-center hover:border-indigo-500 hover:bg-indigo-500/5 transition-all cursor-pointer">
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleLogoUpload} />
                                <span className="text-sm text-slate-400 font-medium">
                                    {options.image ? '✓ Logo Uploaded' : 'Drop image or click to upload'}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="glass p-8 flex flex-col gap-8 animate-fade-in [animation-delay:300ms]">
                    <div className="flex justify-center items-center min-h-[300px] w-full" ref={qrRef} id="qr-preview"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => download('png')} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-indigo-500/20">
                            Download PNG
                        </button>
                        <button onClick={() => download('svg')} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all border border-white/10 hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0">
                            Download SVG
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default App;
