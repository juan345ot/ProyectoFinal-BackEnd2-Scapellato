import ProductService from '../services/ProductService.js';

class ProductController {
    static async getAllProducts(req, res) {
        try {
            const products = await ProductService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener productos' });
        }
    }

    static async getProductById(req, res) {
        const { pid } = req.params;
        try {
            const product = await ProductService.getProductById(pid);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener producto' });
        }
    }

    static async createProduct(req, res) {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'No autorizado' });
        }
        const productData = req.body;
        try {
            const newProduct = await ProductService.createProduct(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear producto' });
        }
    }

    static async updateProduct(req, res) {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'No autorizado' });
        }
        const { pid } = req.params;
        const updateData = req.body;
        try {
            const updatedProduct = await ProductService.updateProduct(pid, updateData);
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar producto' });
        }
    }

    static async deleteProduct(req, res) {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'No autorizado' });
        }
        const { pid } = req.params;
        try {
            await ProductService.deleteProduct(pid);
            res.status(200).json({ message: 'Producto eliminado' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar producto' });
        }
    }
}

export default ProductController;
