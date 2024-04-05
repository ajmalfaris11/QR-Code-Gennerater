import React from 'react';
import { FiGithub, FiTwitter, FiInstagram, FiLinkedin, FiGlobe } from 'react-icons/fi';

const Footer = () => (
    <footer className="max-w-7xl mx-auto px-8 py-12 mt-12 animate-fade-in [animation-delay:400ms] border-t border-black/[0.05] dark:border-white/[0.05]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col gap-3 text-center md:text-left">
                <span className="text-sm font-black tracking-[0.3em] text-zinc-950 dark:text-white uppercase">Generate QR</span>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest">© 2024 Design Labs • Built by ajmalfaris11</p>
            </div>
            <div className="flex items-center gap-6">
                <a href="https://ajmalfaris.me" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:scale-110 transition-all border border-transparent hover:border-black/10 dark:hover:border-white/10">
                    <FiGlobe size={18} />
                </a>
                <a href="https://github.com/ajmalfaris11" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:scale-110 transition-all border border-transparent hover:border-black/10 dark:hover:border-white/10">
                    <FiGithub size={18} />
                </a>
                <a href="https://www.linkedin.com/in/ajmal-faris11/" className="p-3 rounded-full bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:scale-110 transition-all border border-transparent hover:border-black/10 dark:hover:border-white/10">
                    <FiLinkedin size={18} />
                </a>
                <a href="https://x.com/AjmalFaris11/" className="p-3 rounded-full bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:scale-110 transition-all border border-transparent hover:border-black/10 dark:hover:border-white/10">
                    <FiTwitter size={18} />
                </a>
                <a href="https://www.instagram.com/ajmal_faris11/" className="p-3 rounded-full bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:scale-110 transition-all border border-transparent hover:border-black/10 dark:hover:border-white/10">
                    <FiInstagram size={18} />
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;
