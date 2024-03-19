import React from 'react';
import { HexColorPicker } from 'react-colorful';

const ColorControl = ({ label, color, onChange, isOpen, onToggle, isDark }) => {
    return (
        <div className="flex flex-col gap-5 relative">
            <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-300 uppercase tracking-[0.5em] pl-1">{label}</label>
            <div 
                onClick={onToggle}
                className="flex items-center gap-4 bg-black/5 dark:bg-white/5 p-3 rounded-full border border-black/5 dark:border-white/10 backdrop-blur-xl group transition-all hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
            >
                <div 
                    className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg"
                    style={{ backgroundColor: color }}
                />
                <span className="text-xs font-mono font-bold tracking-widest text-zinc-600 dark:text-zinc-400">
                    {color.toUpperCase()}
                </span>
            </div>
            {isOpen && (
                <div className="absolute z-[100] mt-24 left-0 animate-fade-in">
                    <div className="fixed inset-0" onClick={onToggle} />
                    <div className="relative glass p-4 !rounded-3xl shadow-2xl border border-white/20 dark:border-white/10">
                        <HexColorPicker 
                            color={color} 
                            onChange={onChange} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorControl;
