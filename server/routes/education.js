import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/education', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM education ORDER BY sort_order');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/education', async (req, res) => {
    try {
        const { institution, degree, period, detail, icon, initials, color, sort_order = 0 } = req.body;
        const [result] = await pool.query(
            'INSERT INTO education (institution, degree, period, detail, icon, initials, color, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [institution, degree, period, detail, icon, initials, color, sort_order]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/education/:id', async (req, res) => {
    try {
        const { institution, degree, period, detail, icon, initials, color, sort_order } = req.body;
        await pool.query(
            'UPDATE education SET institution=?, degree=?, period=?, detail=?, icon=?, initials=?, color=?, sort_order=? WHERE id=?',
            [institution, degree, period, detail, icon, initials, color, sort_order || 0, req.params.id]
        );
        res.json({ id: Number(req.params.id), ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/education/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM education WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
