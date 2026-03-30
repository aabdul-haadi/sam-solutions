import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const generatePdf = async (letterContent: string, applicantName: string) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 750]);
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.Helvetica-Bold);

    const margin = 50;
    const contentWidth = width - 2 * margin;

    // You can fetch and embed your company logo here
    // const logoUrl = '/logo.png';
    // const logoImageBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
    // const logoImage = await pdfDoc.embedPng(logoImageBytes);
    // const logoDims = logoImage.scale(0.25); // Scale as needed
    // page.drawImage(logoImage, {
    //     x: margin,
    //     y: height - margin - logoDims.height,
    //     width: logoDims.width,
    //     height: logoDims.height,
    // });

    const lines = letterContent.trim().split('\n');
    let y = height - margin - 50; // Initial y position, adjusted for logo space

    for (const line of lines) {
        if (y < margin) {
            // This simple implementation doesn't handle page breaks.
            // For longer letters, you would need to add new pages.
            break;
        }

        // Basic formatting logic (can be expanded)
        let currentFont = font;
        let fontSize = 10;
        let lineToDraw = line.trim();

        if (lineToDraw.startsWith('SAM CREATIVE solutions') || lineToDraw.startsWith('Best regards,')) {
            currentFont = boldFont;
            fontSize = 12;
        }
        if (lineToDraw.startsWith('Dear')) {
            fontSize = 11;
        }

        page.drawText(lineToDraw, {
            x: margin,
            y: y,
            font: currentFont,
            size: fontSize,
            color: rgb(0.1, 0.1, 0.1),
            maxWidth: contentWidth,
            lineHeight: 14,
        });

        y -= (fontSize + 6); // Adjust spacing based on font size
    }

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${applicantName}_Offer_Letter.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
