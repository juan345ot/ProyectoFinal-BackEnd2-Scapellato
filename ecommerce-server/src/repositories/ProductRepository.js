import Product from '../models/Product.js';

class ProductRepository {
    static async getAll(query = {}, options = {}) {
        return await Product.find(query).sort(options.sort).limit(options.limit).skip(options.page * options.limit);
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

    static async checkStock(productId, quantity) {
        const product = await Product.findById(productId);
        return product.stock >= quantity;
    }

    static async reduceStock(productId, quantity) {
        return await Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });
    }
}

export default ProductRepository;
