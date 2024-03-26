import { InferSchemaType, Schema, model } from "mongoose";


const productReviewSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: "productDetail", required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    total_customer_reviews: { type: Number, required: true, min: 0 }
})


export type IProductReview = InferSchemaType<typeof productReviewSchema>


export const ProductReview = model("productReview", productReviewSchema)