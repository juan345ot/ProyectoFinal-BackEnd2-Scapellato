import CartService from '../services/CartService.js';

class CartController {
    static async getCart(req, res) {
        const { cid } = req.params;
        try {
            const cart = await CartService.getCartById(cid);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el carrito' });
        }
    }

    static async addProductToCart(req, res) {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        try {
            const updatedCart = await CartService.addProductToCart(cid, pid, quantity);
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar producto al carrito' });
        }
    }

    static async purchaseCart(req, res) {
        const { cid } = req.params;
        try {
            const result = await CartService.purchaseCart(cid);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Error al procesar la compra' });
        }
    }
}

export default CartController;
