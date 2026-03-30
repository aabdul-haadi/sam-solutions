import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Application } from '../types';

export const generatePdf = async (application: Application) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 700]);

    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    // Add a placeholder for the company logo
    // You can replace this with your actual logo
    // const logoImage = await pdfDoc.embedPng(logoBytes); 
    // page.drawImage(logoImage, { x: 50, y: 620, width: 100, height: 50 });

    page.drawText('[Your Company Name]', { x: 50, y: 650, font: boldFont, size: 24, color: rgb(0.1, 0.1, 0.1) });

    page.drawText('Internship Offer Letter', { x: 50, y: 600, font: boldFont, size: 18, color: rgb(0.2, 0.2, 0.2) });

    const text = `
Dear ${application.name},

We are delighted to offer you an internship position as a ${application.fieldOfInterest} at [Your Company Name]. 
Your impressive background and skills have stood out to us, and we are excited to see the contributions you 
will bring to our team.

This is a full-time internship, and your expected start date is [Start Date]. You will be reporting to 
[Supervisor Name] at our [Location] office. 

We are confident that this internship will be a valuable experience for you, and we look forward to 
welcoming you to the team.


Sincerely,

The [Your Company Name] Team
    `;

    page.drawText(text, { x: 50, y: 550, font, size: 12, lineHeight: 18, color: rgb(0.3, 0.3, 0.3) });

    const pdfBytes = await pdfDoc.save();

    // Create a blob and trigger the download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${application.name}_Offer_Letter.pdf`;
    link.click();
};
