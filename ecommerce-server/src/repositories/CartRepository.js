import Cart from '../models/Cart.js';

class CartRepository {
    static async getById(cartId) {
        return await Cart.findById(cartId).populate('products.productId');
    }

    static async create(cartData) {
        return await Cart.create(cartData);
    }

    static async update(cartId, updateData) {
        return await Cart.findByIdAndUpdate(cartId, updateData, { new: true });
    }

    static async delete(cartId) {
        return await Cart.findByIdAndDelete(cartId);
    }

    static async updateCartProducts(cartId, products) {
        return await Cart.findByIdAndUpdate(cartId, { products: products }, { new: true });
    }
}

export default CartRepository;
