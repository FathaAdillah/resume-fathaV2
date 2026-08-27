import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/organizations', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM organizations ORDER BY sort_order');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/organizations', async (req, res) => {
    try {
        const { name, role, period, institution, icon, initials, color, sort_order = 0 } = req.body;
        const [result] = await pool.query(
            'INSERT INTO organizations (name, role, period, institution, icon, initials, color, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, role, period, institution, icon, initials, color, sort_order]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/organizations/:id', async (req, res) => {
    try {
        const { name, role, period, institution, icon, initials, color, sort_order } = req.body;
        await pool.query(
            'UPDATE organizations SET name=?, role=?, period=?, institution=?, icon=?, initials=?, color=?, sort_order=? WHERE id=?',
            [name, role, period, institution, icon, initials, color, sort_order || 0, req.params.id]
        );
        res.json({ id: Number(req.params.id), ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/organizations/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM organizations WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
