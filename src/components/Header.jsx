import React from 'react';

const Header = () => (
    <header className="fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>
            QR <span className="gradient-text">Aura</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
            Generate premium, customized QR codes in seconds.
        </p>
    </header>
);

export default Header;
