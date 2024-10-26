import Product from '../models/Product.js';

class ProductRepository {
    static async getAll(query = {}, options = {}) {
        const filter = query.category ? { category: query.category } : {};  // Filtrar por categoría si es necesario
        return await Product.find(filter)
            .sort({ price: options.sort === 'desc' ? -1 : 1 })  // Ordenar por precio ascendente o descendente
            .limit(options.limit)
            .skip(options.page * options.limit);
    }

    static async getById(productId) {
        return await Product.findById(productId).lean();  // Utilizar lean() para mejorar la eficiencia en consultas
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

    // Verificación de stock optimizada
    static async checkStock(productId, quantity) {
        const product = await Product.findById(productId).lean();
        return product.stock >= quantity;
    }

    static async reduceStock(productId, quantity) {
        return await Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });
    }
}

export default ProductRepository;
