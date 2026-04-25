import { Router } from 'express';
import { createQuotation, getQuotation } from '../controllers/quotationController';
import { authenticateJWT, authorizeAdmin } from '../middleware/auth';

const router = Router();

router.post('/', authenticateJWT, authorizeAdmin, createQuotation);
router.get('/:id', authenticateJWT, getQuotation);

export default router;
