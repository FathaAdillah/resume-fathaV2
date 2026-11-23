-- ─── Projects: real screenshots + links, replace portfolio with Solitapp ─────
-- Run: mysql -u root -p resume_db < server/migrations/003_solitapp_projects.sql
USE resume_db;
SET NAMES utf8mb4;

ALTER TABLE projects ADD COLUMN links JSON NULL AFTER tags;
ALTER TABLE project_images ADD COLUMN image_url VARCHAR(500) NULL AFTER label;

DELETE FROM projects;

INSERT INTO projects (id, title, description, tags, links, gradient, icon, sort_order) VALUES
(1, 'Solitapp — Crowdfunding Platform',
 'Crowdfunding and donation platform built on a microservice architecture. A Laravel REST API powers campaigns, donors, reconciliation, Tabungan & Qurban, and distribution; Next.js serves the public donor site and the admin dashboard. Donations are processed through a payment gateway, and an LLM-powered assistant chatbot is in development.',
 '["Microservices","Laravel API","Next.js","Payment Gateway","LLM Chatbot (in development)"]',
 '[{"label":"Frontend","url":"https://solitapp.my.id/"},{"label":"Admin Dashboard","url":"https://admin.solitapp.my.id/"}]',
 'from-emerald-600 to-green-800', '🤲', 1);

INSERT INTO project_images (project_id, gradient, label, image_url, sort_order) VALUES
(1, 'from-emerald-500 to-green-700', 'Admin — Dashboard', '/images/projects/solitapp-admin-dashboard.png', 1),
(1, 'from-emerald-500 to-green-700', 'Admin — Campaigns', '/images/projects/solitapp-admin-campaigns.png', 2),
(1, 'from-emerald-500 to-green-700', 'Frontend — Home', '/images/projects/solitapp-home.png', 3),
(1, 'from-emerald-500 to-green-700', 'Frontend — Donation Programs', '/images/projects/solitapp-programs.png', 4);
