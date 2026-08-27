import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/projects (public)
router.get('/projects', async (req, res) => {
    try {
        const [projects] = await pool.query('SELECT * FROM projects ORDER BY sort_order');
        const result = await Promise.all(projects.map(async (p) => {
            const [images] = await pool.query(
                'SELECT gradient, label FROM project_images WHERE project_id = ? ORDER BY sort_order', [p.id]
            );
            return { ...p, images };
        }));
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/projects (protected)
router.post('/projects', async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { title, description, tags, gradient, icon, images = [], sort_order = 0 } = req.body;
        await conn.beginTransaction();
        const [result] = await conn.query(
            'INSERT INTO projects (title, description, tags, gradient, icon, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, JSON.stringify(tags || []), gradient, icon, sort_order]
        );
        const projectId = result.insertId;
        for (let i = 0; i < images.length; i++) {
            await conn.query(
                'INSERT INTO project_images (project_id, gradient, label, sort_order) VALUES (?, ?, ?, ?)',
                [projectId, images[i].gradient, images[i].label, i + 1]
            );
        }
        await conn.commit();
        res.status(201).json({ id: projectId, title, description, tags, gradient, icon, images, sort_order });
    } catch (err) {
        await conn.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        conn.release();
    }
});

// PUT /api/projects/:id (protected)
router.put('/projects/:id', async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { title, description, tags, gradient, icon, images = [], sort_order } = req.body;
        const id = req.params.id;
        await conn.beginTransaction();
        await conn.query(
            'UPDATE projects SET title=?, description=?, tags=?, gradient=?, icon=?, sort_order=? WHERE id=?',
            [title, description, JSON.stringify(tags || []), gradient, icon, sort_order || 0, id]
        );
        await conn.query('DELETE FROM project_images WHERE project_id = ?', [id]);
        for (let i = 0; i < images.length; i++) {
            await conn.query(
                'INSERT INTO project_images (project_id, gradient, label, sort_order) VALUES (?, ?, ?, ?)',
                [id, images[i].gradient, images[i].label, i + 1]
            );
        }
        await conn.commit();
        res.json({ id: Number(id), title, description, tags, gradient, icon, images, sort_order });
    } catch (err) {
        await conn.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        conn.release();
    }
});

// DELETE /api/projects/:id (protected)
router.delete('/projects/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
