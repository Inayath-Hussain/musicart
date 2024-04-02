import { CartItem } from "@web/store/slices/cartItems";
import { IProductData } from "@web/store/slices/productApi";

export type ICartPageData = IProductData & Pick<CartItem, "quantity">

export type IhandleQuantityChange = (product_id: string, quantity: number, price: number) => Promise<void>