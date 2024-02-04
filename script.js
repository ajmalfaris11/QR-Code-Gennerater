document.addEventListener('DOMContentLoaded', () => {
    const qrForm = document.getElementById('qr-form');
    const qrPreview = document.getElementById('qr-preview');
    const urlInput = document.getElementById('url');

    let qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data: "https://github.com/ajmalfaris11",
        dotsOptions: {
            color: "#6366f1",
            type: "rounded"
        },
        backgroundOptions: {
            color: "#ffffff",
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 10
        }
    });

    qrCode.append(qrPreview);

    qrForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = urlInput.value || "https://github.com/ajmalfaris11";
        qrCode.update({
            data: data
        });
    });
});
