
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication and profile management
 */

import express from 'express';
import { register } from '../Controllers/User.auth.controller.js';
import { login } from '../Controllers/User.auth.controller.js';
import { protect } from '../Middlewares/auth.middlewire.js';
import upload from '../Middlewares/upload.middleware.js';
import { updateProfile } from '../Controllers/updateProfile.controller.js';
import { SearchUserByTech } from '../Controllers/user.search.controller.js';
import { sendConnectionEmail } from '../Controllers/email.controller.js';
import { getPublicProfile } from '../Controllers/User.auth.controller.js';

const userroute = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 20
 *                 example: devuser
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already registered
 *       500:
 *         description: Internal server error
 */
userroute.post('/register', register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userroute.post('/login', login);

/**
 * @swagger
 * /api/users/updateprofile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *               bio:
 *                 type: string
 *                 example: Full-stack developer
 *               skills:
 *                 type: string
 *                 example: JavaScript, React, Node.js
 *               website:
 *                 type: string
 *                 example: https://myportfolio.com
 *               github:
 *                 type: string
 *                 example: https://github.com/username
 *               linkedin:
 *                 type: string
 *                 example: https://linkedin.com/in/username
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userroute.put('/profile', protect, upload.single('image'), updateProfile);

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Search users by tech stack
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tech
 *         schema:
 *           type: string
 *         required: true
 *         description: Technology keyword to search for in user skills (e.g., React, Node)
 *     responses:
 *       200:
 *         description: List of users matching the tech stack
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       username:
 *                         type: string
 *                         example: devuser
 *                       email:
 *                         type: string
 *                         example: dev@example.com
 *                       bio:
 *                         type: string
 *                         example: Passionate full-stack dev
 *                       skills:
 *                         type: string
 *                         example: JavaScript, React, Node.js
 *                       profileImage:
 *                         type: string
 *                         example: /uploads/user123.jpg
 *                       github:
 *                         type: string
 *                         example: https://github.com/devuser
 *                       linkedin:
 *                         type: string
 *                         example: https://linkedin.com/in/devuser
 *       400:
 *         description: Tech query not provided
 *       500:
 *         description: Server error
 */

userroute.get('/search', protect, SearchUserByTech);


/**
 * @swagger
 * /api/users/connect:
 *   post:
 *     summary: Send a collaboration request email
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipientEmail
 *               - message
 *             properties:
 *               recipientEmail:
 *                 type: string
 *                 format: email
 *                 example: developer@example.com
 *               subject:
 *                 type: string
 *                 example: Let's build something awesome!
 *               message:
 *                 type: string
 *                 example: I found your profile interesting and would love to collaborate on a project.
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to send email
 */

userroute.post('/connect', protect, sendConnectionEmail);


/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get all public user profiles with their projects
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all public user profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       username:
 *                         type: string
 *                         example: devuser
 *                       email:
 *                         type: string
 *                         example: dev@example.com
 *                       bio:
 *                         type: string
 *                         example: Full-stack developer
 *                       skills:
 *                         type: string
 *                         example: JavaScript, React, Node.js
 *                       website:
 *                         type: string
 *                         example: https://myportfolio.com
 *                       github:
 *                         type: string
 *                         example: https://github.com/devuser
 *                       linkedin:
 *                         type: string
 *                         example: https://linkedin.com/in/devuser
 *                       profileImage:
 *                         type: string
 *                         example: /uploads/user123.jpg
 *                       Projects:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 101
 *                             title:
 *                               type: string
 *                               example: My Awesome Project
 *                             description:
 *                               type: string
 *                               example: A portfolio website built with React
 *                             image:
 *                               type: string
 *                               example: /uploads/project-image.jpg
 *                             toolsUsed:
 *                               type: string
 *                               example: React, Node.js, MongoDB
 *       500:
 *         description: Internal Server Error
 */


userroute.get('/profile', getPublicProfile);

export default userroute;