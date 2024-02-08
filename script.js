document.addEventListener('DOMContentLoaded', () => {
    const qrForm = document.getElementById('qr-form');
    const qrPreview = document.getElementById('qr-preview');
    const urlInput = document.getElementById('url');
    const dotColorInput = document.getElementById('dot-color');
    const bgColorInput = document.getElementById('bg-color');
    const dotStyleInput = document.getElementById('dot-style');
    const cornerStyleInput = document.getElementById('corner-style');
    const logoUpload = document.getElementById('logo-upload');
    const downloadPng = document.getElementById('download-png');
    const downloadSvg = document.getElementById('download-svg');

    let currentLogo = null;

    const qrCode = new QRCodeStyling({
        width: 1000,
        height: 1000,
        type: "svg",
        data: "https://github.com/ajmalfaris11",
        dotsOptions: {
            color: "#6366f1",
            type: "rounded"
        },
        backgroundOptions: {
            color: "#ffffff",
        },
        cornersSquareOptions: {
            type: "extra-rounded",
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 10
        }
    });

    qrCode.append(qrPreview);

    const updateQR = () => {
        qrCode.update({
            data: urlInput.value || "https://github.com/ajmalfaris11",
            dotsOptions: {
                color: dotColorInput.value,
                type: dotStyleInput.value
            },
            backgroundOptions: {
                color: bgColorInput.value,
            },
            cornersSquareOptions: {
                type: cornerStyleInput.value
            },
            image: currentLogo
        });
    };

    qrForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updateQR();
    });

    // Real-time preview
    [dotColorInput, bgColorInput, dotStyleInput, cornerStyleInput].forEach(input => {
        input.addEventListener('change', updateQR);
    });

    logoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                currentLogo = event.target.result;
                updateQR();
            };
            reader.readAsDataURL(file);
        }
    });

    downloadPng.addEventListener('click', () => {
        qrCode.download({ name: "qr-aura", extension: "png" });
    });

    downloadSvg.addEventListener('click', () => {
        qrCode.download({ name: "qr-aura", extension: "svg" });
    });
});
