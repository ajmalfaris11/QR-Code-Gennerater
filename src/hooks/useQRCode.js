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

    const download = async (extension) => {
        if (!qrCode.current) return;
        
        try {
            // Attempt to get raw blob data for more control over naming and extension
            const blob = await qrCode.current.getRawData(extension);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `lumina-qr-${Date.now()}.${extension}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            // Fallback to library's built-in download if getRawData is not supported
            qrCode.current.download({ 
                name: `lumina-qr-${Date.now()}`, 
                extension 
            });
        }
    };

    return { qrRef, download };
};
