import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authGuard from './middleware/authGuard.js';

import profileRoutes from './routes/profile.js';
import experienceRoutes from './routes/experience.js';
import skillRoutes from './routes/skill.js';
import projectRoutes from './routes/project.js';
import certificationRoutes from './routes/certification.js';
import educationRoutes from './routes/education.js';
import organizationRoutes from './routes/organization.js';
import knowledgeRoutes from './routes/knowledge.js';
import softSkillRoutes from './routes/softSkill.js';
import dashboardRoutes from './routes/dashboard.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// ─── Global middleware ──────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Public auth route (no guard) ───────────────────────────────────────────
app.use('/api/auth', authRoutes);

// ─── Contact route (POST = public, GET/DELETE = protected via inline guard) ─
app.use('/api/contact', contactRoutes);

// ─── Conditional guard: skips auth for GET requests, enforces for POST/PUT/DELETE ─
function conditionalGuard(req, res, next) {
    if (req.method === 'GET') return next();
    return authGuard(req, res, next);
}

// ─── All content routes (GET = public, POST/PUT/DELETE = protected) ─────────
const routes = [
    profileRoutes,
    experienceRoutes,
    skillRoutes,
    projectRoutes,
    certificationRoutes,
    educationRoutes,
    organizationRoutes,
    knowledgeRoutes,
    softSkillRoutes,
    dashboardRoutes,
];

routes.forEach(r => app.use('/api', conditionalGuard, r));

// ─── Serve frontend in production ───────────────────────────────────────────
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('{*path}', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// ─── Start server ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
