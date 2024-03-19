import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const CustomSelect = ({ label, value, options, onChange, isDark }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col gap-5 relative" ref={containerRef}>
            <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-300 uppercase tracking-[0.5em] pl-1">{label}</label>
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className={`backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-full px-8 py-6 transition-all cursor-pointer font-bold text-[10px] tracking-[0.3em] shadow-xl flex justify-between items-center group ${isDark ? 'bg-zinc-900/50 text-white hover:border-white/20' : 'bg-zinc-100/50 text-zinc-950 hover:border-black/20'}`}
            >
                <span className="uppercase">{options.find(opt => opt.value === value)?.label || value}</span>
                <FiChevronDown className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''} text-zinc-400`} />
            </div>
            {isOpen && (
                <div className="absolute z-[100] top-full mt-4 left-0 w-full glass !rounded-[2rem] overflow-hidden animate-fade-in py-3 border border-white/20 dark:border-white/10 shadow-2xl">
                    {options.map(opt => (
                        <div 
                            key={opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                            className={`px-8 py-4 cursor-pointer text-[9px] font-black tracking-[0.2em] uppercase transition-all hover:bg-black/5 dark:hover:bg-white/5 ${value === opt.value ? (isDark ? 'text-white bg-white/10' : 'text-black bg-black/5') : 'text-zinc-500 dark:text-zinc-400'}`}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
