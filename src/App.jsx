import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Presets from './components/Presets';
import ThemeToggle from './components/ThemeToggle';
import { useQRCode } from './hooks/useQRCode';

const App = () => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true;
    });

    const [options, setOptions] = useState({
        width: 300,
        height: 300,
        data: 'https://github.com/ajmalfaris11',
        dotsOptions: { 
            color: '#ffffff', 
            type: 'rounded',
            gradient: null
        },
        backgroundOptions: { color: '#ffffff' },
        cornersSquareOptions: { type: 'extra-rounded' },
        image: null,
    });

    const [gradType, setGradType] = useState('none');
    const [gradColor2, setGradColor2] = useState('#a1a1aa');
    const [activePreset, setActivePreset] = useState(null);

    const { qrRef, download } = useQRCode({
        ...options,
        width: 1000,
        height: 1000,
        imageOptions: { margin: 10, crossOrigin: 'anonymous' }
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setOptions(prev => ({
                ...prev,
                dotsOptions: { ...prev.dotsOptions, color: prev.dotsOptions.color === '#000000' ? '#ffffff' : prev.dotsOptions.color }
            }));
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setOptions(prev => ({
                ...prev,
                dotsOptions: { ...prev.dotsOptions, color: prev.dotsOptions.color === '#ffffff' ? '#000000' : prev.dotsOptions.color }
            }));
        }
    }, [isDark]);

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
                    gradient: { type: 'linear', rotation: 0, colorStops: [{offset:0, color: isDark ? '#ffffff' : '#000000'}, {offset:1, color:'#3f3f46'}] },
                    type: 'dots' 
                },
                backgroundOptions: { color: isDark ? '#000000' : '#ffffff' },
                cornersSquareOptions: { type: 'dot' }
            },
            corporate: {
                dotsOptions: { color: isDark ? '#ffffff' : '#000000', type: 'square', gradient: null },
                backgroundOptions: { color: isDark ? '#000000' : '#ffffff' },
                cornersSquareOptions: { type: 'square' }
            },
            minimal: {
                dotsOptions: { color: isDark ? '#ffffff' : '#000000', type: 'rounded', gradient: null },
                backgroundOptions: { color: isDark ? '#09090b' : '#f4f4f5' },
                cornersSquareOptions: { type: 'extra-rounded' }
            },
            gold: {
                dotsOptions: { 
                    gradient: { type: 'radial', rotation: 0, colorStops: [{offset:0, color: isDark ? '#ffffff' : '#000000'}, {offset:1, color:'#71717a'}] },
                    type: 'classy' 
                },
                backgroundOptions: { color: isDark ? '#09090b' : '#f4f4f5' },
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
    return (
        <div className={`min-h-screen w-full ${isDark ? 'dark' : ''} bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 selection:bg-zinc-950 dark:selection:bg-white selection:text-white dark:selection:text-black`}>
            <div className="max-w-6xl mx-auto px-8 py-20">
                <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
                <Header />
                <Presets activePreset={activePreset} onSelect={applyPreset} />
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,450px] gap-12 items-start">
                <section className="glass p-10 animate-fade-in [animation-delay:200ms]">
                    <div className="flex flex-col gap-3 mb-8">
                        <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">Data Content</label>
                        <input 
                            type="text" 
                            className="bg-white/50 dark:bg-zinc-950/50 border border-black/5 dark:border-white/5 rounded-2xl px-5 py-4 text-zinc-950 dark:text-white focus:outline-none focus:border-zinc-950/20 dark:focus:border-white/20 transition-all font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                            value={options.data} 
                            onChange={(e) => handleChange('data', e.target.value)}
                            placeholder="https://ajmalfaris.dev"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">Primary Color</label>
                            <div className="h-14 w-full rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all cursor-pointer group">
                                <input 
                                    type="color" 
                                    className="w-[140%] h-[140%] -m-[20%] cursor-pointer bg-none border-none p-0 grayscale-[0.5] group-hover:grayscale-0 transition-all"
                                    value={options.dotsOptions.color || (isDark ? '#ffffff' : '#000000')}
                                    onChange={(e) => updateGradient(gradType, e.target.value, gradColor2)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">Secondary Color</label>
                            <div className="h-14 w-full rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all cursor-pointer group">
                                <input 
                                    type="color" 
                                    className="w-[140%] h-[140%] -m-[20%] cursor-pointer bg-none border-none p-0 grayscale-[0.5] group-hover:grayscale-0 transition-all"
                                    value={gradColor2}
                                    onChange={(e) => {
                                        setGradColor2(e.target.value);
                                        updateGradient(gradType, options.dotsOptions.color, e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">Gradient Style</label>
                            <select 
                                className="bg-white/50 dark:bg-zinc-950/50 border border-black/5 dark:border-white/5 rounded-2xl px-5 py-4 text-zinc-950 dark:text-white focus:outline-none focus:border-zinc-950/20 dark:focus:border-white/20 transition-all appearance-none cursor-pointer font-bold text-xs tracking-widest"
                                value={gradType} 
                                onChange={(e) => {
                                    setGradType(e.target.value);
                                    updateGradient(e.target.value, options.dotsOptions.color, gradColor2);
                                }}>
                                <option value="none">SOLID</option>
                                <option value="linear">LINEAR</option>
                                <option value="radial">RADIAL</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">Background</label>
                            <div className="h-14 w-full rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all cursor-pointer group">
                                <input 
                                    type="color" 
                                    className="w-[140%] h-[140%] -m-[20%] cursor-pointer bg-none border-none p-0"
                                    value={options.backgroundOptions.color}
                                    onChange={(e) => handleChange('backgroundOptions', { color: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="col-span-2 flex flex-col gap-3">
                            <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">Branding Logo</label>
                            <div className="relative bg-white/50 dark:bg-zinc-950/50 border border-dashed border-black/10 dark:border-white/10 rounded-2xl p-6 flex items-center justify-center hover:border-black/30 dark:hover:border-white/30 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all cursor-pointer group">
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleLogoUpload} />
                                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-widest group-hover:text-black dark:group-hover:text-white transition-colors">
                                    {options.image ? '✓ LOGO ATTACHED' : 'UPLOAD BRAND ASSET'}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="glass p-10 flex flex-col gap-10 animate-fade-in [animation-delay:300ms]">
                    <div className="flex justify-center items-center min-h-[350px] w-full" ref={qrRef} id="qr-preview"></div>
                    <div className="grid grid-cols-1 gap-4">
                        <button onClick={() => download('png')} className="bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-black text-[10px] tracking-[0.3em] py-5 rounded-2xl transition-all hover:-translate-y-1 active:translate-y-0 shadow-xl">
                            EXPORT PNG
                        </button>
                        <button onClick={() => download('svg')} className="bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-zinc-950 dark:text-white font-black text-[10px] tracking-[0.3em] py-5 rounded-2xl transition-all border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20">
                            EXPORT SVG
                        </button>
                    </div>
                </section>
            </div>
            </div>
        </div>
    );
};

export default App;
