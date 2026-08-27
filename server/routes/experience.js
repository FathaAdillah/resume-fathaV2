import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/experiences (public)
router.get('/experiences', async (req, res) => {
    try {
        const [experiences] = await pool.query('SELECT * FROM experiences ORDER BY sort_order');
        const result = await Promise.all(experiences.map(async (exp) => {
            const [bullets] = await pool.query(
                'SELECT text FROM experience_bullets WHERE experience_id = ? ORDER BY sort_order', [exp.id]
            );
            const [achievements] = await pool.query(
                'SELECT text FROM experience_achievements WHERE experience_id = ? ORDER BY sort_order', [exp.id]
            );
            return {
                ...exp,
                bullets: bullets.map(b => b.text),
                achievements: achievements.map(a => a.text),
            };
        }));
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/experiences/:id (public)
router.get('/experiences/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM experiences WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
        const exp = rows[0];
        const [bullets] = await pool.query(
            'SELECT text FROM experience_bullets WHERE experience_id = ? ORDER BY sort_order', [exp.id]
        );
        const [achievements] = await pool.query(
            'SELECT text FROM experience_achievements WHERE experience_id = ? ORDER BY sort_order', [exp.id]
        );
        res.json({ ...exp, bullets: bullets.map(b => b.text), achievements: achievements.map(a => a.text) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/experiences (protected)
router.post('/experiences', async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { company, role, period, current, bullets = [], achievements = [], sort_order = 0 } = req.body;
        await conn.beginTransaction();
        const [result] = await conn.query(
            'INSERT INTO experiences (company, role, period, `current`, sort_order) VALUES (?, ?, ?, ?, ?)',
            [company, role, period, current || false, sort_order]
        );
        const expId = result.insertId;
        for (let i = 0; i < bullets.length; i++) {
            await conn.query(
                'INSERT INTO experience_bullets (experience_id, text, sort_order) VALUES (?, ?, ?)',
                [expId, bullets[i], i + 1]
            );
        }
        for (let i = 0; i < achievements.length; i++) {
            await conn.query(
                'INSERT INTO experience_achievements (experience_id, text, sort_order) VALUES (?, ?, ?)',
                [expId, achievements[i], i + 1]
            );
        }
        await conn.commit();
        res.status(201).json({ id: expId, company, role, period, current, bullets, achievements, sort_order });
    } catch (err) {
        await conn.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        conn.release();
    }
});

// PUT /api/experiences/:id (protected)
router.put('/experiences/:id', async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { company, role, period, current, bullets = [], achievements = [], sort_order } = req.body;
        const id = req.params.id;
        await conn.beginTransaction();
        await conn.query(
            'UPDATE experiences SET company=?, role=?, period=?, `current`=?, sort_order=? WHERE id=?',
            [company, role, period, current || false, sort_order || 0, id]
        );
        await conn.query('DELETE FROM experience_bullets WHERE experience_id = ?', [id]);
        await conn.query('DELETE FROM experience_achievements WHERE experience_id = ?', [id]);
        for (let i = 0; i < bullets.length; i++) {
            await conn.query(
                'INSERT INTO experience_bullets (experience_id, text, sort_order) VALUES (?, ?, ?)',
                [id, bullets[i], i + 1]
            );
        }
        for (let i = 0; i < achievements.length; i++) {
            await conn.query(
                'INSERT INTO experience_achievements (experience_id, text, sort_order) VALUES (?, ?, ?)',
                [id, achievements[i], i + 1]
            );
        }
        await conn.commit();
        res.json({ id: Number(id), company, role, period, current, bullets, achievements, sort_order });
    } catch (err) {
        await conn.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        conn.release();
    }
});

// DELETE /api/experiences/:id (protected)
router.delete('/experiences/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM experiences WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
