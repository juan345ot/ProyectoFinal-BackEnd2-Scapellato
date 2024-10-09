import Product from '../models/Product.js';

class ProductRepository {
    static async getAll() {
        return await Product.find();
    }

    static async getById(productId) {
        return await Product.findById(productId);
    }

    static async create(productData) {
        return await Product.create(productData);
    }

    static async update(productId, updateData) {
        return await Product.findByIdAndUpdate(productId, updateData, { new: true });
    }

    static async delete(productId) {
        return await Product.findByIdAndDelete(productId);
    }
}

export default ProductRepository;
