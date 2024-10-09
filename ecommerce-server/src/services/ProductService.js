import ProductRepository from '../repositories/ProductRepository.js';

class ProductService {
    static async getAllProducts() {
        return await ProductRepository.getAll();
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
}

export default ProductService;
