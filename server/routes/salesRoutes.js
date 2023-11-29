import { Router } from 'express';
import salesController from '../controllers/salesController.js'
//import authMiddleware from '../middleware/authMiddleWare.js';

const router = Router();

router.get('/', salesController.getAllSales);
router.get('/:codigo', salesController.getSaleByCode);

//router.use(authMiddleware);
router.post('/', salesController.createSale);
router.patch('/:codigo', salesController.updateSale);
router.delete('/:codigo', salesController.deleteSale);

export default router;