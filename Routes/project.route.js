// import express from 'express';
// import { getProjects,createProject } from '../Controllers/project.controller.js';
// import { protect } from '../Middlewares/auth.middlewire.js';


// const router = express.Router();

// router.post('/addProject',protect, createProject);
// router.get('/myProjects',protect, getProjects);

// export default router;

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Developer project management
 */

import express from 'express';
import { getProjects, createProject } from '../Controllers/project.controller.js';
import { protect } from '../Middlewares/auth.middlewire.js';

const router = express.Router();

/**
 * @swagger
 * /api/projects/addProject:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 20
 *                 example: My Awesome Project
 *               description:
 *                 type: string
 *                 example: A project to connect developers
 *               image:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               toolsUsed:
 *                 type: string
 *                 example: React, Node.js, MongoDB
 *     responses:
 *       201:
 *         description: Project created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/addProject', protect, createProject);

/**
 * @swagger
 * /api/projects/myProjects:
 *   get:
 *     summary: Get all projects for the authenticated user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/myProjects', protect, getProjects);

export default router;