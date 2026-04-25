import { Router } from 'express';
import { createServiceRequest, getAllRequests, updateRequestStatus } from '../controllers/serviceController';
import { authenticateJWT, authorizeAdmin } from '../middleware/auth';

const router = Router();

router.post('/apply', createServiceRequest);
router.get('/all', authenticateJWT, authorizeAdmin, getAllRequests);
router.patch('/:id/status', authenticateJWT, authorizeAdmin, updateRequestStatus);

export default router;
