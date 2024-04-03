import { Types } from "mongoose";
import { Cart, ICart } from "../models/cart";
import { IProductDetails } from "../models/productDetails";


interface IGetCartResult {
    total_items: number
    total_item_prices: number

    items: {
        id: Types.ObjectId
        name: string
        color: string
        quantity: number
        price: number
        total_price: number
        image: string
    }[]
}


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


    async getUserCart(user_id: Types.ObjectId) {
        const result = await Cart.aggregate<IGetCartResult>([
            { $match: { user: user_id } },
            { $lookup: { from: "productdetails", localField: "product", foreignField: "_id", as: "product" } },
            { $unwind: "$product" },
            { $project: { _id: 1, user: "$user", product_name: "$product.name", color: "$product.color", image: "$product.main_image", price: "$product.price", quantity: "$quantity", total_price: { $multiply: ["$quantity", "$product.price"] }, } },

            { $group: { _id: null, items: { $push: { id: "$_id", name: "$product_name", image: "$image", color: "$color", quantity: "$quantity", price: "$price", total_price: "$total_price" } }, total_items: { $sum: "$quantity" }, total_item_prices: { $sum: "$total_price" } } }
        ])

        const data = result[0];

        return { items: data.items, total_items: data.total_items, total_item_prices: data.total_item_prices }
    }



    async deleteCarts(cart_ids: Types.ObjectId[]) {
        return await Cart.deleteMany({ _id: { $in: cart_ids } })
    }
}




export const cartService = new CartService();