import { Types } from "mongoose";
import { IOrder, Order } from "../models/order";



type Iproduct = IOrder["products"][number] & { total_price: number }

interface IGetUserOrdersResult extends IOrder {
    products: Iproduct[]
    total_amount: number
}

class OrderService {
    async addOrder(data: IOrder) {
        const newOrderDoc = new Order(data)

        return await newOrderDoc.save()
    }


    async getUsrOrderList(user_id: Types.ObjectId) {
        return await Order.find({ user: user_id })
    }


    async getUserOrder(user_id: Types.ObjectId, order_id: string) {

        const result = await Order.aggregate<IGetUserOrdersResult>([
            { $match: { user: user_id, _id: new Types.ObjectId(order_id) } },

            {
                $addFields: {
                    products: {
                        $map: {
                            input: "$products", // specify the array field
                            as: "product",   // assign variable used to refer each document or element when iterating

                            in: {
                                $mergeObjects: [
                                    "$$product",
                                    {
                                        total_price: { $multiply: ["$$product.price", "$$product.quantity"] }
                                    }
                                ]
                            }
                        }
                    },


                    total_amount: { $sum: ["$deliveryFee", "$total_items_price"] }
                }
            }

        ])


        if (result.length === 0) return null

        return result[0]
    }
}


export const orderService = new OrderService();