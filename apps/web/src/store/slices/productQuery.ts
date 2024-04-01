// reducer containing all user's product query options(filter, sort, search)

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { createQueryString } from "@web/utilities/createQueryString";


// { value: "price_asc", displayText: "Price : Lowest" },
// { value: "price_desc", displayText: "Price : Highest" },
// { value: "name_asc", displayText: "Name : (A-Z)" },
// { value: "name_desc", displayText: "Name : (Z-A)" }

// const sortValues = ["price_asc", "price_desc", "name_asc", "name_desc"] as const


export interface IUpdateProductQueryActionPayload {
    key: keyof typeof initialState.queryOptions
    value: string
}




const initialState = {
    queryOptions: {
        sortBy: "",
        name: "",
        company: "",
        headphoneType: "",
        color: "",
        price: ""
    },

    queryString: "",

    options: {
        extracted: false,

        color: {},

        company: {}
    }

}

export type IProductQueryData = typeof initialState



const slice = createSlice({
    name: "productQuery",
    initialState: initialState,
    reducers: {
        updateProductQuery: (state, action: PayloadAction<IUpdateProductQueryActionPayload>) => {
            const { key, value } = action.payload;
            state.queryOptions[key] = value

            state.queryString = createQueryString(state.queryOptions)
            // map sort value with appropriate
        },


        updateOptions: (state, action: PayloadAction<IProductQueryData["options"]>) => {
            state.options.extracted = action.payload.extracted
            state.options.color = action.payload.color
            state.options.company = action.payload.company
        }
    }
})


export const { updateProductQuery, updateOptions } = slice.actions;

export const productQuerySlice = {
    name: slice.name,
    reducer: slice.reducer
}


export const productQuerySelector = (state: RootState) => state.productQuery