import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/profile (public)
router.get('/profile', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM profile WHERE id = 1');
        if (rows.length === 0) return res.status(404).json({ error: 'Profile not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/profile (protected)
router.put('/profile', async (req, res) => {
    try {
        const { name, title, email, phone, location, github, linkedin, credly, bio } = req.body;
        await pool.query(
            'UPDATE profile SET name=?, title=?, email=?, phone=?, location=?, github=?, linkedin=?, credly=?, bio=? WHERE id=1',
            [name, title, email, phone, location, github, linkedin, credly, bio]
        );
        const [rows] = await pool.query('SELECT * FROM profile WHERE id = 1');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
