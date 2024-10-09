import CartRepository from '../repositories/CartRepository.js';
import ProductRepository from '../repositories/ProductRepository.js';
import TicketRepository from '../repositories/TicketRepository.js';
import { v4 as uuidv4 } from 'uuid';

class CartService {
    static async getCartById(cartId) {
        return await CartRepository.getById(cartId);
    }

    static async addProductToCart(cartId, productId, quantity) {
        const cart = await CartRepository.getById(cartId);
        const product = await ProductRepository.getById(productId);

        if (!product || product.stock < quantity) {
            throw new Error('Stock insuficiente o producto no encontrado');
        }

        cart.addProduct(product, quantity);
        product.stock -= quantity;

        await CartRepository.update(cartId, cart);
        await ProductRepository.update(productId, product);

        return cart;
    }

    static async purchaseCart(cartId) {
        const cart = await CartRepository.getById(cartId);
        let totalAmount = 0;
        const unavailableProducts = [];

        for (let item of cart.products) {
            const product = await ProductRepository.getById(item.productId);
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                totalAmount += product.price * item.quantity;
                await ProductRepository.update(product._id, product);
            } else {
                unavailableProducts.push(product._id);
            }
        }

        // Crear ticket si hay productos disponibles
        if (totalAmount > 0) {
            const ticket = {
                code: uuidv4(),
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: cart.user.email,
            };
            await TicketRepository.create(ticket);
        }

        // Actualizar el carrito, eliminando los productos comprados
        cart.products = cart.products.filter(item => unavailableProducts.includes(item.productId));
        await CartRepository.update(cartId, cart);

        return {
            message: 'Compra realizada',
            unavailableProducts,
        };
    }
}

export default CartService;
