import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";



// interface ICartItem<T> {
//     id: string
//     name: string
//     quantity: T
// }

// interface CartData<T> {
//     data: ICartItem<T>[]
//     total_items: T
// }


// type State = CartData<number>

// type UpdateCartPayload = CartData<string>

// const initialState: State = {
//     data: [],
//     total_items: 0
// }




const slice = createSlice({
    name: "cart",
    initialState: 0,
    reducers: {
        updateCart: (state, action: PayloadAction<number>) => {

            state = action.payload
            return state

            // state.total_items = Number(action.payload.total_items)

            // const data: CartData<number>["data"] = []
            // action.payload.data.forEach(d => {
            //     data.push({ id: d.id, name: d.name, quantity: Number(d.quantity) })
            // })

            // state.data = data

            // return state
        },


        updateCartItem: (state, action: PayloadAction<number>) => {

            state = state + action.payload
            return state

            // let total_items = 0;

            // state.data = state.data.filter(d => {
            //     if (d.id !== action.payload.cart_id) {
            //         total_items = total_items + d.quantity
            //         return true
            //     }

            //     return false
            // })

            // state.total_items = total_items + Number(action.payload.quantity)

            // return state
        }
    }
})




export const { updateCart, updateCartItem } = slice.actions;

export const cartSlice = {
    name: slice.name,
    reducer: slice.reducer
}


export const cartSelector = (state: RootState) => state.cart



// export function getQuantity(product_id: string, state: typeof initialState.items) {
//     const item = state.find(i => i.product === product_id)

//     return Number(item?.quantity) || 0
// }