import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePdfFromElement = async (element: HTMLElement, applicantName?: string): Promise<Blob> => {
    const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: true,
        width: element.scrollWidth,
        height: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // A4 dimensions in points: 595.28 x 841.89
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const canvasAspectRatio = canvasWidth / canvasHeight;
    const pdfAspectRatio = pdfWidth / pdfHeight;

    let finalCanvasWidth, finalCanvasHeight;

    // Adjust canvas size to fit into PDF
    if (canvasAspectRatio > pdfAspectRatio) {
        finalCanvasWidth = pdfWidth;
        finalCanvasHeight = pdfWidth / canvasAspectRatio;
    } else {
        finalCanvasHeight = pdfHeight;
        finalCanvasWidth = pdfHeight * canvasAspectRatio;
    }

    const marginX = (pdfWidth - finalCanvasWidth) / 2;
    const marginY = (pdfHeight - finalCanvasHeight) / 2;

    pdf.addImage(imgData, 'PNG', marginX, marginY, finalCanvasWidth, finalCanvasHeight);
    if (applicantName) {
        pdf.save(`${applicantName}_Offer_Letter.pdf`);
    }
    return pdf.output('blob');
};
