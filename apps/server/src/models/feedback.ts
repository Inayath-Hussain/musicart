import { InferSchemaType, Schema, model } from "mongoose";


export const feedbackTypeEnum = ["bugs", "feedback", "query"] as const

const feedbackSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    feedback_type: { type: String, enum: feedbackTypeEnum, required: true },
    feedback: { type: String, required: true }
})


export type IFeedBack = InferSchemaType<typeof feedbackSchema>

export const FeedBack = model("feedback", feedbackSchema)