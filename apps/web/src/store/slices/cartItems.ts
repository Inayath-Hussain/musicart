import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";


export interface CartItem {
    product: string
    quantity: string
}

const initialState = {
    items: [] as CartItem[],
    total_items: 0,
    convenienceFee: 0,
    total_amount: 0
}

const slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCart: (state, action: PayloadAction<Omit<typeof initialState, "total_items">>) => {
            state.items = action.payload.items
            state.total_amount = action.payload.total_amount
            state.convenienceFee = action.payload.convenienceFee

            let total = 0;
            state.items.forEach(i => total = total + Number(i.quantity))

            state.total_items = total

            return state
        },


        updateCartItem: (state, action: PayloadAction<{ item: CartItem, price: number }>) => {

            let total_items = 0;

            state.items = state.items.filter(i => {
                if (i.product !== action.payload.item.product) {
                    total_items = total_items + Number(i.quantity)
                    return true
                }

                state.total_amount = state.total_amount - (Number(i.quantity) * action.payload.price)
                return false
            })

            state.items = [...state.items, action.payload.item]

            state.total_items = total_items + Number(action.payload.item.quantity)

            state.total_amount = state.total_amount + (Number(action.payload.item.quantity) * action.payload.price)

            return state
        }
    }
})




export const { updateCart, updateCartItem } = slice.actions;

export const cartSlice = {
    name: slice.name,
    reducer: slice.reducer
}


export const cartSelector = (state: RootState) => state.cart



export function getQuantity(product_id: string, state: typeof initialState.items) {
    const item = state.find(i => i.product === product_id)

    return Number(item?.quantity) || 0
}