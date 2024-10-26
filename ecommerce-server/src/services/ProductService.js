import ProductRepository from '../repositories/ProductRepository.js';

class ProductService {
    static async getAllProducts(query = {}, options = {}) {
        return await ProductRepository.getAll(query, options);
    }

    static async getProductById(productId) {
        return await ProductRepository.getById(productId);
    }

    static async createProduct(productData) {
        return await ProductRepository.create(productData);
    }

    static async updateProduct(productId, updateData) {
        return await ProductRepository.update(productId, updateData);
    }

    static async deleteProduct(productId) {
        return await ProductRepository.delete(productId);
    }

    static async checkProductStock(productId, quantity) {
        return await ProductRepository.checkStock(productId, quantity);
    }

    static async reduceProductStock(productId, quantity) {
        return await ProductRepository.reduceStock(productId, quantity);
    }
}

export default ProductService;
