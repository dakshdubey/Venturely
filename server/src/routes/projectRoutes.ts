import { Router } from 'express';
import { createProject, getProjectDetails, updateProjectStatus, addProjectUpdate } from '../controllers/projectController';
import { authenticateJWT, authorizeAdmin } from '../middleware/auth';
import { upload } from '../utils/cloudinary';

const router = Router();

router.post('/', authenticateJWT, authorizeAdmin, createProject);
router.get('/:id', authenticateJWT, getProjectDetails);
router.patch('/:id/status', authenticateJWT, authorizeAdmin, updateProjectStatus);
router.post('/:id/updates', authenticateJWT, authorizeAdmin, upload.array('files'), addProjectUpdate);

export default router;
