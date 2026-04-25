import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateQuotationPDF = async (data: any, outputPath: string) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });

        const stream = fs.createWriteStream(outputPath);
        doc.pipe(stream);

        // Header
        doc.fillColor('#444444').fontSize(20).text('VENTURELY', { align: 'right' });
        doc.fontSize(10).text('Digital Agency Solutions', { align: 'right' });
        doc.moveDown();

        // Title
        doc.fillColor('#000000').fontSize(20).text('QUOTATION', { align: 'center' });
        doc.moveDown();

        // Client Info
        doc.fontSize(12).text(`Client Name: ${data.name}`);
        doc.text(`Client Email: ${data.email}`);
        doc.text(`Date: ${new Date().toLocaleDateString()}`);
        doc.moveDown();

        // Table Header
        doc.fontSize(12).fillColor('#000000');
        doc.text('Service Description', 50, doc.y, { width: 400 });
        doc.text('Amount', 450, doc.y, { align: 'right' });
        doc.moveDown();
        doc.strokeColor('#aaaaaa').moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown();

        // Items
        data.breakdown.forEach((item: any) => {
            doc.text(item.description, 50, doc.y, { width: 400 });
            doc.text(`₹${item.amount}`, 450, doc.y, { align: 'right' });
            doc.moveDown();
        });

        doc.strokeColor('#aaaaaa').moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown();

        // Total
        doc.fontSize(14).text(`Total: ₹${data.total}`, { align: 'right' });
        doc.moveDown(2);

        // Footer
        doc.fontSize(10).text('Thank you for choosing Venturely. This is a computer-generated quotation.', { align: 'center' });

        doc.end();

        stream.on('finish', () => resolve(outputPath));
        stream.on('error', reject);
    });
};
