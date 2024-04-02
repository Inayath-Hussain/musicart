import { Types } from "mongoose";
import { Cart, ICart } from "../models/cart";
import { IProductDetails } from "../models/productDetails";

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
        const items = await Cart.find({ user: user_id }).populate<{ product: Pick<IProductDetails, "price"> }>("product", "price")

        const result: ICart[] = []

        let total_amount = 0;
        for (let i of items) {
            total_amount = total_amount + (i.quantity * i.product.price)

            const docObj = i.toObject();

            docObj.product = docObj.product._id

            result.push(docObj);


            console.log(docObj)
        }

        return { items: result, total_amount }
    }



    // async getTotal
}




export const cartService = new CartService();