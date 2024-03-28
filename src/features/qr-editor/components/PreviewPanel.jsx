import React from 'react';

const PreviewPanel = ({ qrRef, download, isDark }) => {
    return (
        <section className="glass p-6 md:p-16 flex flex-col gap-14 animate-fade-in [animation-delay:300ms]">
            <div className="flex justify-center items-center min-h-[350px] w-full" ref={qrRef} id="qr-preview"></div>
            <div className="grid grid-cols-2 gap-5">
                <button
                    onClick={() => download('png')}
                    className={`font-black text-[10px] tracking-[0.3em] py-5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl ${isDark ? 'bg-white text-black hover:bg-zinc-100 shadow-white/5' : 'bg-zinc-950 text-white hover:bg-zinc-800'}`}
                >
                    DOWNLOAD PNG
                </button>
                <button
                    onClick={() => download('svg')}
                    className={`bg-transparent font-black text-[10px] tracking-[0.3em] py-5 rounded-full transition-all border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 ${isDark ? 'text-white hover:bg-white/5' : 'text-zinc-950 hover:bg-black/5'}`}
                >
                    DOWNLOAD SVG
                </button>
                <button
                    onClick={() => download('webp')}
                    className={`bg-transparent font-black text-[10px] tracking-[0.3em] py-5 rounded-full transition-all border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 ${isDark ? 'text-white hover:bg-white/5' : 'text-zinc-950 hover:bg-black/5'}`}
                >
                    DOWNLOAD WEBP
                </button>
                <button
                    onClick={() => download('jpeg')}
                    className={`bg-transparent font-black text-[10px] tracking-[0.3em] py-5 rounded-full transition-all border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 ${isDark ? 'text-white hover:bg-white/5' : 'text-zinc-950 hover:bg-black/5'}`}
                >
                    DOWNLOAD JPEG
                </button>
            </div>
        </section>
    );
};

export default PreviewPanel;
