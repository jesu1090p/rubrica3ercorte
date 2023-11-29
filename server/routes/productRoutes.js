import { Router } from 'express';
import productController from '../controllers/productController.js';
//import authMiddleware from '../middleware/authMiddleWare.js';

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:codigo', productController.getProductByCode);

//router.use(authMiddleware);

router.post('/', productController.createProduct);
router.patch('/:codigo', productController.updateProduct);
router.delete('/:codigo', productController.deleteProduct);

export default router;

