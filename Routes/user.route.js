// import express from 'express';
// import { register } from '../Controllers/User.auth.controller.js';
// import { login } from '../Controllers/User.auth.controller.js';
// import { protect } from '../Middlewares/auth.middlewire.js';
// import upload from '../Middlewares/upload.middleware.js';
// import { updateProfile } from '../Controllers/updateProfile.controller.js';

// const userroute = express.Router();

// userroute.post('/register', register);
// userroute.post('/login', login);
// userroute.put('/profile',protect,upload.single('image'),updateProfile)

// export default userroute;

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
 * /api/users/profile:
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

export default userroute;