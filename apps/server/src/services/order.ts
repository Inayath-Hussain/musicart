import { IOrder, Order } from "../models/order";


class OrderService {
    async addOrder(data: IOrder) {
        const newOrderDoc = new Order(data)

        return await newOrderDoc.save()
    }
}


export const orderService = new OrderService();