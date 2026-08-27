import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/soft-skills', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM soft_skills ORDER BY sort_order');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/soft-skills', async (req, res) => {
    try {
        const { text, sort_order = 0 } = req.body;
        const [result] = await pool.query('INSERT INTO soft_skills (text, sort_order) VALUES (?, ?)', [text, sort_order]);
        res.status(201).json({ id: result.insertId, text, sort_order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/soft-skills/:id', async (req, res) => {
    try {
        const { text, sort_order } = req.body;
        await pool.query('UPDATE soft_skills SET text=?, sort_order=? WHERE id=?', [text, sort_order || 0, req.params.id]);
        res.json({ id: Number(req.params.id), text, sort_order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/soft-skills/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM soft_skills WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
