import express from 'express';
import CartController from '../controllers/CartController.js';
import { isUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas del carrito
router.get('/:cid', isUser, CartController.getCart);
router.post('/:cid/products/:pid', isUser, CartController.addProductToCart);

// Ruta para finalizar la compra
router.post('/:cid/purchase', isUser, CartController.purchaseCart);

export default router;
