import React from 'react';

const SpaceBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div id="stars" className="absolute inset-0"></div>
            <div id="stars2" className="absolute inset-0"></div>
            <div id="stars3" className="absolute inset-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 dark:to-black/60"></div>
        </div>
    );
};

export default SpaceBackground;
