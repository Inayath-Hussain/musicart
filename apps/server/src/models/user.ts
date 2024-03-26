import { Schema, model, InferSchemaType } from "mongoose";

const roles = ["admin", "buyer"] as const

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile_number: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: roles, default: "buyer" }
})


export type IUser = InferSchemaType<typeof userSchema>

export const User = model("user", userSchema)