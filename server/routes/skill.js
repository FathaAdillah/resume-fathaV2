import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/skills (public) — returns grouped: { "Backend Development": ["PHP", ...] }
router.get('/skills', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT c.name AS category, s.name AS skill FROM skills s JOIN skill_categories c ON s.category_id = c.id ORDER BY c.id, s.sort_order'
        );
        const grouped = {};
        rows.forEach(r => {
            if (!grouped[r.category]) grouped[r.category] = [];
            grouped[r.category].push(r.skill);
        });
        res.json(grouped);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/skill-categories (public)
router.get('/skill-categories', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM skill_categories ORDER BY id');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/skill-categories (protected)
router.post('/skill-categories', async (req, res) => {
    try {
        const { name } = req.body;
        const [result] = await pool.query('INSERT INTO skill_categories (name) VALUES (?)', [name]);
        res.status(201).json({ id: result.insertId, name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/skill-categories/:id (protected)
router.delete('/skill-categories/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM skill_categories WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/skills (protected)
router.post('/skills', async (req, res) => {
    try {
        const { category_id, name, sort_order = 0 } = req.body;
        const [result] = await pool.query(
            'INSERT INTO skills (category_id, name, sort_order) VALUES (?, ?, ?)',
            [category_id, name, sort_order]
        );
        res.status(201).json({ id: result.insertId, category_id, name, sort_order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/skills/:id (protected)
router.put('/skills/:id', async (req, res) => {
    try {
        const { name, category_id, sort_order } = req.body;
        await pool.query(
            'UPDATE skills SET name=?, category_id=?, sort_order=? WHERE id=?',
            [name, category_id, sort_order || 0, req.params.id]
        );
        res.json({ id: Number(req.params.id), name, category_id, sort_order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/skills/:id (protected)
router.delete('/skills/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM skills WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
