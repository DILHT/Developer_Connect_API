import express from 'express';
import { getProjects,createProject } from '../Controllers/project.controller.js';
import { protect } from '../Middlewares/auth.middlewire.js';


const router = express.Router();

router.post('/addProject',protect, createProject);
router.get('/myProjects',protect, getProjects);

export default router;