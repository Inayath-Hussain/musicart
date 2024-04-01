import { Types } from "mongoose";
import { Cart } from "../models/cart";

class CartService {
    async addToCart(user_id: Types.ObjectId, product_id: string, quantity: string) {

        // find if user already added product to cart
        const existingDoc = await Cart.findOne({ user: user_id, product: product_id })

        // if already added increase the quantity
        if (existingDoc !== null) {
            existingDoc.quantity = Number(quantity);

            return await existingDoc.save()
        }

        // else create new record
        const newDoc = new Cart({ user: user_id, product: product_id, quantity })

        return await newDoc.save()
    }


    async getCartItems(user_id: Types.ObjectId) {
        const items = await Cart.find({ user: user_id })

        return items
    }
}




export const cartService = new CartService();