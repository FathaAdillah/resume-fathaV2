import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/knowledge', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM knowledge ORDER BY sort_order');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/knowledge', async (req, res) => {
    try {
        const { text, sort_order = 0 } = req.body;
        const [result] = await pool.query('INSERT INTO knowledge (text, sort_order) VALUES (?, ?)', [text, sort_order]);
        res.status(201).json({ id: result.insertId, text, sort_order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/knowledge/:id', async (req, res) => {
    try {
        const { text, sort_order } = req.body;
        await pool.query('UPDATE knowledge SET text=?, sort_order=? WHERE id=?', [text, sort_order || 0, req.params.id]);
        res.json({ id: Number(req.params.id), text, sort_order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/knowledge/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM knowledge WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
