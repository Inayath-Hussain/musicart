import { InferSchemaType, Schema, model } from "mongoose";

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    product: { type: Schema.Types.ObjectId, ref: "productDetail", required: true },
    quantity: { type: Number, required: true }
})


export type ICart = InferSchemaType<typeof cartSchema>

export const Cart = model("cart", cartSchema)