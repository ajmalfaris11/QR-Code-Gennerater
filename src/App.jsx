import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Presets from './components/Presets';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import SpaceBackground from './components/SpaceBackground';
import ConfigPanel from './features/qr-editor/components/ConfigPanel';
import PreviewPanel from './features/qr-editor/components/PreviewPanel';
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
            color: '#000000',
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
    const [showPicker, setShowPicker] = useState(null);

    const { qrRef, download } = useQRCode({
        ...options,
        width: 1000,
        height: 1000,
        margin: 40,
        imageOptions: { margin: 10, crossOrigin: 'anonymous' }
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const handleChange = (key, value) => setOptions(prev => ({ ...prev, [key]: value }));

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
        if (!file) return;
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
                    <ConfigPanel 
                        isDark={isDark}
                        options={options}
                        handleChange={handleChange}
                        handleDotChange={handleDotChange}
                        handleLogoUpload={handleLogoUpload}
                        gradType={gradType}
                        setGradType={setGradType}
                        gradColor2={gradColor2}
                        setGradColor2={setGradColor2}
                        updateGradient={updateGradient}
                        showPicker={showPicker}
                        setShowPicker={setShowPicker}
                    />

                    <PreviewPanel 
                        qrRef={qrRef}
                        download={download}
                        isDark={isDark}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default App;
