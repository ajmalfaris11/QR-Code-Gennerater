import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

export const useQRCode = (options) => {
    const qrRef = useRef(null);
    const qrCode = useRef(null);

    useEffect(() => {
        const qrOptions = { 
            ...options, 
            data: options.data || ' ',
            imageOptions: { ...options.imageOptions, hideBackgroundDots: true }
        };

        if (!qrCode.current) {
            qrCode.current = new QRCodeStyling(qrOptions);
            if (qrRef.current) {
                qrCode.current.append(qrRef.current);
            }
        } else {
            qrCode.current.update(qrOptions);
        }
    }, [options]);

    const download = (extension) => {
        if (!qrCode.current) return;
        qrCode.current.download({ 
            name: "qr-code", 
            extension: extension 
        });
    };

    return { qrRef, download };
};
