import { Schema, Types, model } from "mongoose";


export const paymentMethodEnum = ["POD", "UPI", "Card"] as const

export interface IOrder {
    user: Types.ObjectId
    products: {
        name: string
        image: string
        color: string
        quantity: number
        price: number
    }[]

    address: string
    paymentMethod: typeof paymentMethodEnum[number]

    deliveryFee: number
    total_item_prices: number
}

const orderSchema = new Schema<IOrder>({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    products: [{
        name: { type: String, required: true },
        image: { type: String, required: true },
        color: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],

    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },

    deliveryFee: { type: Number, required: true },
    total_item_prices: { type: Number, required: true }
})



export const Order = model("order", orderSchema);