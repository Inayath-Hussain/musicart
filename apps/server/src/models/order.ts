import { Schema, Types, model } from "mongoose";


export const paymentMethodEnum = ["POD", "UPI", "CARD"] as const

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
    total_items_price: number
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
    total_items_price: { type: Number, required: true }
})



export const Order = model("order", orderSchema);