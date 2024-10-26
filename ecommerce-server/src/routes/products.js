import express from 'express';
import ProductService from '../services/ProductService.js';
import { authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
    const { limit, page, sort, query } = req.query;
    const options = {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 0,
        sort: sort || 'asc',
    };
    const products = await ProductService.getAllProducts(query, options);
    res.json(products);
});

// Crear un nuevo producto (solo administradores)
router.post('/', authorizeAdmin, async (req, res) => {
    try {
        const product = await ProductService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un producto existente (solo administradores)
router.put('/:id', authorizeAdmin, async (req, res) => {
    try {
        const product = await ProductService.updateProduct(req.params.id, req.body);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un producto (solo administradores)
router.delete('/:id', authorizeAdmin, async (req, res) => {
    try {
        await ProductService.deleteProduct(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
