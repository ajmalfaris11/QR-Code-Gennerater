import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

export const useQRCode = (options) => {
    const qrRef = useRef(null);
    const qrCode = useRef(null);

    useEffect(() => {
        const qrOptions = { 
            ...options, 
            data: options.data || 'https://unity11solutions.com',
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

    const download = async (extension) => {
        if (!qrCode.current) return;
        
        try {
            // Force manual download to ensure filename and extension are respected
            const blob = await qrCode.current.getRawData(extension);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            
            // Set explicit download attributes
            link.href = url;
            link.download = `lumina-qr.${extension}`;
            
            // Append to body to ensure it's "clickable" in all browsers
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 100);
        } catch (err) {
            // Fallback to library's built-in download if manual fails
            qrCode.current.download({ 
                name: "lumina-qr", 
                extension: extension 
            });
        }
    };

    return { qrRef, download };
};
