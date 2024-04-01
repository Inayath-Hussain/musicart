import { Schema, InferSchemaType, model } from "mongoose";

export const headphoneTypeEnum = ["over-ear", "in-ear", "on-ear"] as const

const productDetailsSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    full_title: { type: String, required: true },
    color: { type: String, required: true },
    headphone_type: { type: String, enum: headphoneTypeEnum, required: true },
    main_image: { type: String, required: true },
    other_images: [{ type: String, required: true }],
    description: [{ type: String, required: true }],
    available: { type: Boolean, required: true },

    review: { type: Schema.Types.ObjectId, ref: "productReview", required: true }
})


export type IProductDetails = InferSchemaType<typeof productDetailsSchema>


export const ProductDetails = model("productDetail", productDetailsSchema)