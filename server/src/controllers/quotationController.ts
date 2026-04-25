import { Request, Response } from 'express';
import pool from '../config/db';
import { createPaymentLink } from '../utils/razorpay';
import { generateQuotationPDF } from '../utils/pdfGenerator';
import path from 'path';
import fs from 'fs';

export const createQuotation = async (req: Request, res: Response) => {
    const { requestId, clientEmail, clientName, amount, breakdown } = req.body;

    try {
        // 1. Create Payment Link
        const paymentLink = await createPaymentLink(amount, clientEmail, clientName, `Quotation for ${requestId}`);

        // 2. Generate PDF
        const pdfDir = path.join(__dirname, '../../uploads/quotations');
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir, { recursive: true });
        }
        const pdfPath = path.join(pdfDir, `quotation_${requestId}.pdf`);
        await generateQuotationPDF({ name: clientName, email: clientEmail, breakdown, total: amount }, pdfPath);

        // 3. Save to DB
        const [result]: any = await pool.execute(
            'INSERT INTO quotations (requestId, clientEmail, amount, breakdown, qrLink, pdfUrl) VALUES (?, ?, ?, ?, ?, ?)',
            [requestId, clientEmail, amount, JSON.stringify(breakdown), paymentLink.short_url, `/uploads/quotations/quotation_${requestId}.pdf`]
        );

        // 4. Update request status
        await pool.execute('UPDATE service_requests SET status = ? WHERE id = ?', ['quoted', requestId]);

        res.status(201).json({
            message: 'Quotation generated and sent',
            quotationId: result.insertId,
            paymentLink: paymentLink.short_url
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating quotation' });
    }
};

export const getQuotation = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [rows]: any = await pool.execute('SELECT * FROM quotations WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
