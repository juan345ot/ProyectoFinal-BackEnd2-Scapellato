import express from 'express';
import ProductService from '../services/ProductService.js';
import CartService from '../services/CartService.js';

const router = express.Router();

// Ruta para la página principal
router.get('/', async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query;
        const options = {
            limit: parseInt(limit) || 10,
            page: parseInt(page) || 0,
            sort: sort || 'asc',
        };
        const products = await ProductService.getAllProducts(query, options);
        res.render('home', { products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para ver un carrito específico
router.get('/cart/:id', async (req, res) => {
    try {
        const cart = await CartService.getCartById(req.params.id);
        res.render('cart', { cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
