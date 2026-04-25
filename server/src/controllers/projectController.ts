import { Request, Response } from 'express';
import pool from '../config/db';

export const createProject = async (req: Request, res: Response) => {
    const { quotationId, userId, title } = req.body;

    try {
        const [result]: any = await pool.execute(
            'INSERT INTO projects (quotationId, userId, title) VALUES (?, ?, ?)',
            [quotationId, userId, title]
        );

        res.status(201).json({
            message: 'Project created successfully',
            projectId: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getProjectDetails = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const [rows]: any = await pool.execute('SELECT * FROM projects WHERE id = ?', [id]);
        const project = rows[0];

        if (!project) {
            return res.status(44).json({ message: 'Project not found' });
        }

        const [updates] = await pool.execute('SELECT * FROM project_updates WHERE projectId = ? ORDER BY createdAt DESC', [id]);

        res.json({ ...project, updates });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProjectStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        await pool.execute('UPDATE projects SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Project status updated' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const addProjectUpdate = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { updateText } = req.body;

    try {
        await pool.execute('INSERT INTO project_updates (projectId, updateText) VALUES (?, ?)', [id, updateText]);
        res.status(201).json({ message: 'Update added' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
