import { Request, Response } from 'express';
import pool from '../config/db';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const handleRazorpayWebhook = async (req: Request, res: Response) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'your_webhook_secret';
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest !== req.headers['x-razorpay-signature']) {
        return res.status(400).json({ message: 'Invalid signature' });
    }

    const event = req.body.event;
    if (event === 'payment_link.paid') {
        const payload = req.body.payload.payment_link.entity;
        const clientEmail = payload.customer.email;
        const clientName = payload.customer.name;
        const amount = payload.amount / 100;

        try {
            // 1. Find the quotation
            const [quotations]: any = await pool.execute('SELECT * FROM quotations WHERE clientEmail = ? AND status = "unpaid" ORDER BY createdAt DESC LIMIT 1', [clientEmail]);
            const quotation = quotations[0];

            if (!quotation) {
                console.error('No pending quotation found for email:', clientEmail);
                return res.json({ status: 'ok' });
            }

            // 2. Update quotation status
            await pool.execute('UPDATE quotations SET status = "paid", paymentId = ? WHERE id = ?', [payload.id, quotation.id]);

            // 3. Create or find user
            const [users]: any = await pool.execute('SELECT * FROM users WHERE email = ?', [clientEmail]);
            let userId;
            let password = '';

            if (users.length === 0) {
                password = Math.random().toString(36).slice(-8);
                const hashedPassword = await bcrypt.hash(password, 10);
                const [userResult]: any = await pool.execute(
                    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                    [clientName, clientEmail, hashedPassword, 'user']
                );
                userId = userResult.insertId;

                // Send credentials via email
                await transporter.sendMail({
                    from: '"Venturely Team" <no-reply@venturely.com>',
                    to: clientEmail,
                    subject: 'Your Venturely Account is Ready!',
                    text: `Hi ${clientName},\n\nThank you for your payment. Your project is now being initialized.\n\nLogin to your dashboard at: ${process.env.FRONTEND_URL}/login\nEmail: ${clientEmail}\nPassword: ${password}\n\nBest,\nVenturely Team`,
                });
            } else {
                userId = users[0].id;
            }

            // 4. Create Project
            await pool.execute(
                'INSERT INTO projects (quotationId, userId, title, status) VALUES (?, ?, ?, ?)',
                [quotation.id, userId, `Project for Request #${quotation.requestId}`, 'pending']
            );

            res.json({ status: 'ok' });
        } catch (error) {
            console.error('Webhook error:', error);
            res.status(500).json({ status: 'error' });
        }
    } else {
        res.json({ status: 'ok' });
    }
};
