import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

export const useQRCode = (options) => {
    const qrRef = useRef(null);
    const qrCode = useRef(null);

    useEffect(() => {
        qrCode.current = new QRCodeStyling(options);
        if (qrRef.current) {
            qrRef.current.innerHTML = '';
            qrCode.current.append(qrRef.current);
        }
    }, [options]);

    const download = (extension) => {
        if (!qrCode.current) return;
        qrCode.current.download({ 
            name: `lumina-qr-${Date.now()}`, 
            extension 
        });
    };

    return { qrRef, download };
};
