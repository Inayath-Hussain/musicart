import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";


interface Item {
    product_id: string
    quantity: string
}

const initialState = {
    items: [] as Item[],
    total: 0
}

const slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCart: (state, action: PayloadAction<typeof initialState.items>) => {
            state.items = action.payload

            let total = 0;
            state.items.forEach(i => total = total + Number(i.quantity))

            state.total = total

            return state
        },

        updateCartItem: (state, action: PayloadAction<Item>) => {
            state.items = state.items.filter(i => i.product_id === action.payload.product_id)

            state.items = [...state.items, action.payload]

            let total = 0;
            state.items.forEach(i => total = total + Number(i.quantity))

            state.total = total

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
    const item = state.find(i => i.product_id === product_id)

    return Number(item?.quantity) || 0
}