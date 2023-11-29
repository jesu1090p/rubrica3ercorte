import { Router } from 'express';
import { login, logout, register, obtenerRol } from '../controllers/authController.js';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.get('/obtenerRol/:usuario', obtenerRol);


export default router;
