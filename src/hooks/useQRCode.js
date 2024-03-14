import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

export const useQRCode = (options) => {
    const qrRef = useRef(null);
    const qrCode = useRef(new QRCodeStyling(options));

    useEffect(() => {
        if (qrRef.current) {
            qrCode.current.append(qrRef.current);
        }
    }, []);

    useEffect(() => {
        qrCode.current.update(options);
    }, [options]);

    const download = (extension) => {
        qrCode.current.download({ 
            name: 'lumina-qr', 
            extension,
            ...(extension === 'svg' ? { saveAsBlob: true } : {})
        });
    };

    return { qrRef, download };
};
