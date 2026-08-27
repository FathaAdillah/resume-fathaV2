import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/dashboard/stats (protected)
router.get('/dashboard/stats', async (req, res) => {
    try {
        const [[expCount]] = await pool.query('SELECT COUNT(*) AS count FROM experiences');
        const [[skillCount]] = await pool.query('SELECT COUNT(*) AS count FROM skills');
        const [[projCount]] = await pool.query('SELECT COUNT(*) AS count FROM projects');
        const [[certCount]] = await pool.query('SELECT COUNT(*) AS count FROM certifications');
        const [[msgCount]] = await pool.query('SELECT COUNT(*) AS count FROM contact_messages');
        res.json({
            experiences: expCount.count,
            skills: skillCount.count,
            projects: projCount.count,
            certifications: certCount.count,
            messages: msgCount.count,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
