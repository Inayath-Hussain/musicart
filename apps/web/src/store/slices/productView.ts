import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";


type IViews = "grid" | "list"

const slice = createSlice({
    name: "productView",
    initialState: "grid",
    reducers: {
        updateProductView: (state, action: PayloadAction<IViews>) => {
            state = action.payload
            return state
        }
    }
})



export const { updateProductView } = slice.actions

export const productView = {
    name: slice.name,
    reducer: slice.reducer
}


export const productViewSelector = (state: RootState) => state.productView