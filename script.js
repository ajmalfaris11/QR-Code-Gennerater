document.addEventListener('DOMContentLoaded', () => {
    const qrForm = document.getElementById('qr-form');
    const qrPreview = document.getElementById('qr-preview');
    const urlInput = document.getElementById('url');
    const dotColorInput = document.getElementById('dot-color');
    const dotColor2Input = document.getElementById('dot-color-2');
    const gradientTypeInput = document.getElementById('gradient-type');
    const bgColorInput = document.getElementById('bg-color');
    const dotStyleInput = document.getElementById('dot-style');
    const cornerStyleInput = document.getElementById('corner-style');
    const logoUpload = document.getElementById('logo-upload');
    const downloadPng = document.getElementById('download-png');
    const downloadSvg = document.getElementById('download-svg');
    const presetBtns = document.querySelectorAll('.preset-btn');

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
        const gradientType = gradientTypeInput.value;
        const dotsOptions = {
            type: dotStyleInput.value
        };

        if (gradientType === 'none') {
            dotsOptions.color = dotColorInput.value;
            dotsOptions.gradient = null;
        } else {
            dotsOptions.gradient = {
                type: gradientType,
                rotation: 0,
                colorStops: [
                    { offset: 0, color: dotColorInput.value },
                    { offset: 1, color: dotColor2Input.value }
                ]
            };
        }

        qrCode.update({
            data: urlInput.value || "https://github.com/ajmalfaris11",
            dotsOptions: dotsOptions,
            backgroundOptions: {
                color: bgColorInput.value,
            },
            cornersSquareOptions: {
                type: cornerStyleInput.value
            },
            image: currentLogo
        });
    };

    const applyPreset = (preset) => {
        const themes = {
            neon: {
                dot1: "#00f2ff", dot2: "#bc00ff", grad: "linear", bg: "#000000", dotStyle: "dots", corner: "dot"
            },
            corporate: {
                dot1: "#1e3a8a", dot2: "#3b82f6", grad: "linear", bg: "#ffffff", dotStyle: "square", corner: "square"
            },
            minimal: {
                dot1: "#ffffff", dot2: "#94a3b8", grad: "none", bg: "#0f172a", dotStyle: "rounded", corner: "extra-rounded"
            },
            gold: {
                dot1: "#fbbf24", dot2: "#d97706", grad: "radial", bg: "#1a1a1a", dotStyle: "classy", corner: "extra-rounded"
            }
        };

        const theme = themes[preset];
        if (theme) {
            dotColorInput.value = theme.dot1;
            dotColor2Input.value = theme.dot2;
            gradientTypeInput.value = theme.grad;
            bgColorInput.value = theme.bg;
            dotStyleInput.value = theme.dotStyle;
            cornerStyleInput.value = theme.corner;
            updateQR();
        }
    };

    qrForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updateQR();
    });

    // Real-time preview
    [dotColorInput, dotColor2Input, gradientTypeInput, bgColorInput, dotStyleInput, cornerStyleInput].forEach(input => {
        input.addEventListener('change', updateQR);
    });

    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyPreset(btn.dataset.preset);
        });
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
