import React from 'react';
import ColorControl from './ColorControl';
import CustomSelect from '../../../components/CustomSelect';

const ConfigPanel = ({ 
    isDark, 
    options, 
    handleChange, 
    handleDotChange, 
    handleLogoUpload, 
    gradType, 
    setGradType, 
    gradColor2, 
    setGradColor2, 
    updateGradient,
    showPicker,
    setShowPicker
}) => {
    return (
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
                <ColorControl 
                    label="Primary Tone"
                    color={options.dotsOptions.color || (isDark ? '#ffffff' : '#000000')}
                    onChange={(color) => updateGradient(gradType, color, gradColor2)}
                    isOpen={showPicker === 'primary'}
                    onToggle={() => setShowPicker(showPicker === 'primary' ? null : 'primary')}
                    isDark={isDark}
                />
                
                <ColorControl 
                    label="Secondary Tone"
                    color={gradColor2}
                    onChange={(color) => {
                        setGradColor2(color);
                        updateGradient(gradType, options.dotsOptions.color, color);
                    }}
                    isOpen={showPicker === 'secondary'}
                    onToggle={() => setShowPicker(showPicker === 'secondary' ? null : 'secondary')}
                    isDark={isDark}
                />

                <CustomSelect 
                    label="Visual Logic"
                    value={gradType}
                    options={[
                        { value: 'none', label: 'SOLID' },
                        { value: 'linear', label: 'LINEAR' },
                        { value: 'radial', label: 'RADIAL' }
                    ]}
                    onChange={(val) => {
                        setGradType(val);
                        updateGradient(val, options.dotsOptions.color, gradColor2);
                    }}
                    isDark={isDark}
                />

                <CustomSelect 
                    label="Data Pattern"
                    value={options.dotsOptions.type}
                    options={[
                        { value: 'rounded', label: 'ROUNDED' },
                        { value: 'dots', label: 'DOTS' },
                        { value: 'classy', label: 'CLASSY' },
                        { value: 'classy-rounded', label: 'CLASSY ROUND' },
                        { value: 'square', label: 'SQUARE' },
                        { value: 'extra-rounded', label: 'EXTRA ROUND' }
                    ]}
                    onChange={(val) => handleDotChange({ type: val })}
                    isDark={isDark}
                />

                <CustomSelect 
                    label="Eye Style"
                    value={options.cornersSquareOptions.type}
                    options={[
                        { value: 'extra-rounded', label: 'ROUNDED' },
                        { value: 'dot', label: 'DOT' },
                        { value: 'square', label: 'SQUARE' }
                    ]}
                    onChange={(val) => handleChange('cornersSquareOptions', { type: val })}
                    isDark={isDark}
                />

                <ColorControl 
                    label="Canvas Fill"
                    color={options.backgroundOptions.color}
                    onChange={(color) => handleChange('backgroundOptions', { color })}
                    isOpen={showPicker === 'canvas'}
                    onToggle={() => setShowPicker(showPicker === 'canvas' ? null : 'canvas')}
                    isDark={isDark}
                />

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
    );
};

export default ConfigPanel;
