import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/certifications', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM certifications ORDER BY sort_order');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/certifications', async (req, res) => {
    try {
        const { title, issuer, category, gradient, icon, issuer_bg, issuer_text, accent_color, cert_label, recipient_name, date, sort_order = 0 } = req.body;
        const [result] = await pool.query(
            `INSERT INTO certifications (title, issuer, category, gradient, icon, issuer_bg, issuer_text, accent_color, cert_label, recipient_name, \`date\`, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, issuer, category, gradient, icon, issuer_bg, issuer_text, accent_color, cert_label, recipient_name, date, sort_order]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/certifications/:id', async (req, res) => {
    try {
        const { title, issuer, category, gradient, icon, issuer_bg, issuer_text, accent_color, cert_label, recipient_name, date, sort_order } = req.body;
        await pool.query(
            `UPDATE certifications SET title=?, issuer=?, category=?, gradient=?, icon=?, issuer_bg=?, issuer_text=?, accent_color=?, cert_label=?, recipient_name=?, \`date\`=?, sort_order=? WHERE id=?`,
            [title, issuer, category, gradient, icon, issuer_bg, issuer_text, accent_color, cert_label, recipient_name, date, sort_order || 0, req.params.id]
        );
        res.json({ id: Number(req.params.id), ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/certifications/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM certifications WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
