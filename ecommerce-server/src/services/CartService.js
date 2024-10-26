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
            throw new Error('Product not available in the requested quantity');
        }

        const productInCart = cart.products.find(item => item.productId.toString() === productId);
        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await ProductRepository.reduceStock(productId, quantity);
        return await CartRepository.updateCartProducts(cartId, cart.products);
    }

    static async purchaseCart(cartId) {
        const cart = await CartRepository.getById(cartId);
        let totalAmount = 0;
        const unavailableProducts = [];
    
        // Verificar stock y calcular el total
        for (let item of cart.products) {
            const product = await ProductRepository.getById(item.productId);
            if (product && product.stock >= item.quantity) {
                totalAmount += product.price * item.quantity;
                await ProductRepository.reduceStock(item.productId, item.quantity);
            } else {
                unavailableProducts.push({ productId: item.productId, name: product.name });
            }
         }
    
        if (unavailableProducts.length > 0) {
            return {
                message: 'Algunos productos no están disponibles',
                unavailableProducts,
            };
        }
    
        if (totalAmount > 0) {
            const ticket = {
                code: uuidv4(),
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: cart.user.email,
            };
            await TicketRepository.create(ticket);
        }
    
        cart.products = cart.products.filter(item => !unavailableProducts.some(unp => unp.productId === item.productId));
        await CartRepository.updateCartProducts(cartId, cart.products);
    
        return { message: 'Compra realizada con éxito' };
    }
}
    
export default CartService;