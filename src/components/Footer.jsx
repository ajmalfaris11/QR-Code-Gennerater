import React from 'react';

const Footer = () => (
    <footer className="max-w-6xl mx-auto px-8 py-12 mt-12 animate-fade-in [animation-delay:400ms] border-t border-black/[0.05] dark:border-white/[0.05]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-2 text-center md:text-left">
                <span className="text-sm font-bold tracking-widest text-zinc-950 dark:text-white uppercase">Lumina QR</span>
                <p className="text-xs text-zinc-400 dark:text-zinc-600 font-medium">© 2024 Design Labs. All rights reserved.</p>
            </div>
            <div className="flex gap-8">
                <a href="#" className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 hover:text-zinc-950 dark:hover:text-white transition-colors tracking-widest">PRIVACY</a>
                <a href="#" className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 hover:text-zinc-950 dark:hover:text-white transition-colors tracking-widest">TERMS</a>
                <a href="#" className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 hover:text-zinc-950 dark:hover:text-white transition-colors tracking-widest">CONTACT</a>
            </div>
        </div>
    </footer>
);

export default Footer;
