import { configureStore } from "@reduxjs/toolkit";
import { productQuerySlice } from "./slices/productQuery";
import { productsApi } from "./slices/productApi";
import { productView } from "./slices/productView";


export const store = configureStore({
    reducer: {
        [productQuerySlice.name]: productQuerySlice.reducer,
        [productsApi.reducerPath]: productsApi.reducer,

        [productView.name]: productView.reducer
    },

    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(productsApi.middleware)
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch