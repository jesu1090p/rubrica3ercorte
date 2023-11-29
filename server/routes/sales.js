import express from 'express';
import salesController from '../controllers/salesController.js';

const router = express.Router();

router.get('/', salesController.getAllsales);
router.post('/', salesController.createProduct);
router.patch('/:id', salesController.updateProduct);
router.delete('/:id', salesController.deleteProduct);

export default router;