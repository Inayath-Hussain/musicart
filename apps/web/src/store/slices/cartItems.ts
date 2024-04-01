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
        updateCart: (state, action: PayloadAction<typeof initialState>) => {
            state = action.payload
        },

        updateCartItem: (state, action: PayloadAction<Item>) => {
            state.items = state.items.filter(i => i.product_id === action.payload.product_id)

            state.items = [...state.items, action.payload]

            let q = 0;
            state.items.forEach(i => q = q + Number(i.quantity))

            state.total = q

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