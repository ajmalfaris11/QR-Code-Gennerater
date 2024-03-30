import React from 'react';

const Header = () => (
    <header className="animate-fade-in text-center mb-20 relative">
        <div className="sparkle top-0 left-[20%] scale-150">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
        </div>
        <div className="sparkle bottom-0 right-[20%] scale-75 [animation-delay:1s]">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
        </div>

        <div className="inline-block px-4 py-1.5 rounded-full border border-black/50 dark:border-white/50 bg-black dark:bg-black backdrop-blur-md mb-8 text-[10px] font-bold tracking-[0.3em] text-zinc-500 dark:text-zinc-300 uppercase">
            Precision Design • Agency Ready
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tightest mb-6 leading-none bg-gradient-to-r from-zinc-950 via-zinc-400 to-zinc-950 dark:from-white dark:via-zinc-500 dark:to-white bg-clip-text text-transparent animate-gradient">
            Free QR Generator
        </h1>
        <p className="max-w-2xl mx-auto text-zinc-500 dark:text-zinc-300 text-lg md:text-xl font-medium tracking-tight px-4">
            World-class QR generation for high-end digital architecture and brand storytelling.
        </p>
    </header>
);

export default Header;
