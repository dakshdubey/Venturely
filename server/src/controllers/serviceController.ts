import { Request, Response } from 'express';
import pool from '../config/db';

export const createServiceRequest = async (req: Request, res: Response) => {
    const { name, email, phone, serviceType, budget, description } = req.body;

    if (!name || !email || !serviceType) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const [result]: any = await pool.execute(
            'INSERT INTO service_requests (name, email, phone, serviceType, budget, description) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, phone, serviceType, budget, description]
        );

        res.status(201).json({
            message: 'Application submitted successfully',
            requestId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllRequests = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM service_requests ORDER BY createdAt DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateRequestStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        await pool.execute('UPDATE service_requests SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Status updated' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
