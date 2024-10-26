import express from 'express';
import CartService from '../services/CartService.js';
import { authorizeUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Obtener carrito por ID
router.get('/:id', async (req, res) => {
    try {
        const cart = await CartService.getCartById(req.params.id);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Agregar productos al carrito (solo usuarios)
router.post('/:id/products', authorizeUser, async (req, res) => {
    try {
        const cart = await CartService.addProductToCart(req.params.id, req.body.productId, req.body.quantity);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Finalizar la compra del carrito (solo usuarios)
router.post('/:id/purchase', authorizeUser, async (req, res) => {
    try {
        const result = await CartService.purchaseCart(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
