import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Presets from './components/Presets';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import SpaceBackground from './components/SpaceBackground';
import { useQRCode } from './hooks/useQRCode';
import { HexColorPicker } from 'react-colorful';

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
    const [showPicker, setShowPicker] = useState(null); // 'primary', 'secondary', 'canvas'

    const { qrRef, download } = useQRCode({
        ...options,
        width: 1000,
        height: 1000,
        margin: 40,
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
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const size = Math.min(img.width, img.height);
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext('2d');
                    ctx.beginPath();
                    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                    ctx.clip();
                    ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);
                    handleChange('image', canvas.toDataURL());
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const applyPreset = (preset) => {
        const themes = {
            neon: {
                dotsOptions: {
                    gradient: { type: 'linear', rotation: 0, colorStops: [{ offset: 0, color: isDark ? '#ffffff' : '#000000' }, { offset: 1, color: '#3f3f46' }] },
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
                backgroundOptions: { color: isDark ? '#000000' : '#ffffff' },
                cornersSquareOptions: { type: 'extra-rounded' }
            },
            gold: {
                dotsOptions: {
                    gradient: { type: 'radial', rotation: 0, colorStops: [{ offset: 0, color: isDark ? '#ffffff' : '#000000' }, { offset: 1, color: '#71717a' }] },
                    type: 'classy'
                },
                backgroundOptions: { color: isDark ? '#000000' : '#ffffff' },
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
        <div className={`min-h-screen w-full transition-colors duration-1000 selection:bg-zinc-950 dark:selection:bg-white selection:text-white dark:selection:text-black ${isDark ? 'bg-black text-white dark' : 'bg-white text-zinc-950'}`}>
            <SpaceBackground />
            <div className="max-w-6xl mx-auto px-8 py-16 md:py-24 relative z-10">
                <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
                <Header />
                <Presets activePreset={activePreset} onSelect={applyPreset} />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr,450px] gap-16 items-start">
                    <section className="glass p-10 md:p-16 animate-fade-in [animation-delay:200ms] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-zinc-500/5 dark:bg-white/5 rounded-full -mr-40 -mt-40 blur-3xl transition-opacity group-hover:opacity-100 opacity-50"></div>

                        <div className="flex flex-col gap-6 mb-12 relative z-10">
                            <div className="flex items-center gap-4">
                                <span className={`w-1.5 h-6 rounded-full ${isDark ? 'bg-white' : 'bg-zinc-950'}`}></span>
                                <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-300 uppercase tracking-[0.5em]">Identity Input</label>
                            </div>
                            <input
                                type="text"
                                className={`backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-full px-8 py-6 transition-all font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-700 shadow-xl ${isDark ? 'bg-zinc-900/50 text-white focus:border-white/20' : 'bg-zinc-100/50 text-zinc-950 focus:border-zinc-950/30'}`}
                                value={options.data}
                                onChange={(e) => handleChange('data', e.target.value)}
                                placeholder="Enter URL or content..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-10 relative z-10">
                            <div className="flex flex-col gap-5 relative">
                                <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-300 uppercase tracking-[0.5em] pl-1">Primary Tone</label>
                                <div 
                                    onClick={() => setShowPicker(showPicker === 'primary' ? null : 'primary')}
                                    className="flex items-center gap-4 bg-black/5 dark:bg-white/5 p-3 rounded-full border border-black/5 dark:border-white/10 backdrop-blur-xl group transition-all hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                                >
                                    <div 
                                        className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg"
                                        style={{ backgroundColor: options.dotsOptions.color || (isDark ? '#ffffff' : '#000000') }}
                                    />
                                    <span className="text-xs font-mono font-bold tracking-widest text-zinc-600 dark:text-zinc-400">
                                        {(options.dotsOptions.color || (isDark ? '#FFFFFF' : '#000000')).toUpperCase()}
                                    </span>
                                </div>
                                {showPicker === 'primary' && (
                                    <div className="absolute z-[100] mt-24 left-0 animate-fade-in">
                                        <div className="fixed inset-0" onClick={() => setShowPicker(null)} />
                                        <div className="relative glass p-4 !rounded-3xl shadow-2xl border border-white/20 dark:border-white/10">
                                            <HexColorPicker 
                                                color={options.dotsOptions.color || (isDark ? '#ffffff' : '#000000')} 
                                                onChange={(color) => updateGradient(gradType, color, gradColor2)} 
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-5 relative">
                                <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-300 uppercase tracking-[0.5em] pl-1">Secondary Tone</label>
                                <div 
                                    onClick={() => setShowPicker(showPicker === 'secondary' ? null : 'secondary')}
                                    className="flex items-center gap-4 bg-black/5 dark:bg-white/5 p-3 rounded-full border border-black/5 dark:border-white/10 backdrop-blur-xl group transition-all hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                                >
                                    <div 
                                        className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg"
                                        style={{ backgroundColor: gradColor2 }}
                                    />
                                    <span className="text-xs font-mono font-bold tracking-widest text-zinc-600 dark:text-zinc-400">
                                        {gradColor2.toUpperCase()}
                                    </span>
                                </div>
                                {showPicker === 'secondary' && (
                                    <div className="absolute z-[100] mt-24 left-0 animate-fade-in">
                                        <div className="fixed inset-0" onClick={() => setShowPicker(null)} />
                                        <div className="relative glass p-4 !rounded-3xl shadow-2xl border border-white/20 dark:border-white/10">
                                            <HexColorPicker 
                                                color={gradColor2} 
                                                onChange={(color) => {
                                                    setGradColor2(color);
                                                    updateGradient(gradType, options.dotsOptions.color, color);
                                                }} 
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-5">
                                <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-300 uppercase tracking-[0.5em] pl-1">Visual Logic</label>
                                <select
                                    className={`backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-full px-8 py-6 transition-all appearance-none cursor-pointer font-bold text-xs tracking-[0.3em] shadow-xl ${isDark ? 'bg-zinc-900/50 text-white focus:border-white/20' : 'bg-zinc-100/50 text-zinc-950 focus:border-zinc-950/30'}`}
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
                            <div className="flex flex-col gap-5">
                                <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-300 uppercase tracking-[0.5em] pl-1">Data Pattern</label>
                                <select
                                    className={`backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-full px-8 py-6 transition-all appearance-none cursor-pointer font-bold text-xs tracking-[0.3em] shadow-xl ${isDark ? 'bg-zinc-900/50 text-white focus:border-white/20' : 'bg-zinc-100/50 text-zinc-950 focus:border-zinc-950/30'}`}
                                    value={options.dotsOptions.type}
                                    onChange={(e) => handleDotChange({ type: e.target.value })}>
                                    <option value="rounded">ROUNDED</option>
                                    <option value="dots">DOTS</option>
                                    <option value="classy">CLASSY</option>
                                    <option value="classy-rounded">CLASSY ROUND</option>
                                    <option value="square">SQUARE</option>
                                    <option value="extra-rounded">EXTRA ROUND</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-5">
                                <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-300 uppercase tracking-[0.5em] pl-1">Eye Style</label>
                                <select
                                    className={`backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-full px-8 py-6 transition-all appearance-none cursor-pointer font-bold text-xs tracking-[0.3em] shadow-xl ${isDark ? 'bg-zinc-900/50 text-white focus:border-white/20' : 'bg-zinc-100/50 text-zinc-950 focus:border-zinc-950/30'}`}
                                    value={options.cornersSquareOptions.type}
                                    onChange={(e) => handleChange('cornersSquareOptions', { type: e.target.value })}>
                                    <option value="extra-rounded">ROUNDED</option>
                                    <option value="dot">DOT</option>
                                    <option value="square">SQUARE</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-5 relative">
                                <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-300 uppercase tracking-[0.5em] pl-1">Canvas Fill</label>
                                <div 
                                    onClick={() => setShowPicker(showPicker === 'canvas' ? null : 'canvas')}
                                    className="flex items-center gap-4 bg-black/5 dark:bg-white/5 p-3 rounded-full border border-black/5 dark:border-white/10 backdrop-blur-xl group transition-all hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                                >
                                    <div 
                                        className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg"
                                        style={{ backgroundColor: options.backgroundOptions.color }}
                                    />
                                    <span className="text-xs font-mono font-bold tracking-widest text-zinc-600 dark:text-zinc-400">
                                        {options.backgroundOptions.color.toUpperCase()}
                                    </span>
                                </div>
                                {showPicker === 'canvas' && (
                                    <div className="absolute z-[100] mt-24 left-0 animate-fade-in">
                                        <div className="fixed inset-0" onClick={() => setShowPicker(null)} />
                                        <div className="relative glass p-4 !rounded-3xl shadow-2xl border border-white/20 dark:border-white/10">
                                            <HexColorPicker 
                                                color={options.backgroundOptions.color} 
                                                onChange={(color) => handleChange('backgroundOptions', { color })} 
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-span-2 flex flex-col gap-5">
                                <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-300 uppercase tracking-[0.5em] pl-1">Brand Signature</label>
                                <div className={`relative backdrop-blur-xl border border-dashed rounded-2xl p-12 flex items-center justify-center transition-all cursor-pointer group shadow-inner ${isDark ? 'bg-zinc-900/30 border-white/10 hover:border-white/30 hover:bg-white/[0.02]' : 'bg-zinc-100/30 border-black/10 hover:border-black/30 hover:bg-black/[0.02]'}`}>
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleLogoUpload} />
                                    <span className="text-[10px] text-zinc-400 dark:text-zinc-400 font-black uppercase tracking-[0.3em] group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                                        {options.image ? '✓ ASSET SYNCED' : 'UPLOAD BRAND ASSET'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="glass p-10 md:p-16 flex flex-col gap-14 animate-fade-in [animation-delay:300ms]">
                        <div className="flex justify-center items-center min-h-[350px] w-full" ref={qrRef} id="qr-preview"></div>
                        <div className="flex flex-col gap-6">
                            <button
                                onClick={() => download('png')}
                                className={`font-black text-[12px] tracking-[0.5em] py-6 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl ${isDark ? 'bg-white text-black hover:bg-zinc-100 shadow-white/5' : 'bg-zinc-950 text-white hover:bg-zinc-800'}`}
                            >
                                DOWNLOAD PNG
                            </button>
                            <button
                                onClick={() => download('svg')}
                                className={`bg-transparent font-black text-[12px] tracking-[0.5em] py-6 rounded-full transition-all border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 ${isDark ? 'text-white hover:bg-white/5' : 'text-zinc-950 hover:bg-black/5'}`}
                            >
                                DOWNLOAD SVG
                            </button>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default App;
