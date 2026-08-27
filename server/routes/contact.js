import { Router } from 'express';
import pool from '../db.js';
import authGuard from '../middleware/authGuard.js';

const router = Router();

// POST /api/contact  (public — no auth)
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }
        await pool.query(
            'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );
        res.status(201).json({ success: true });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'This email has already submitted a message' });
        }
        res.status(500).json({ error: err.message });
    }
});

// GET /api/contact  (protected — admin only)
router.get('/', authGuard, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM contact_messages ORDER BY created_at DESC'
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/contact/:id  (protected — admin only)
router.delete('/:id', authGuard, async (req, res) => {
    try {
        await pool.query('DELETE FROM contact_messages WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
