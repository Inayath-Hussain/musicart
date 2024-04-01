// createApi slice


// api slice takes a query string as param,
// a function to convert all the user product query into url query and use it to get data



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "@web/env";
import { apiURLs } from "@web/services/URLs";


interface IProductData {
    _id: string
    brand: string
    color: string
    name: string
    full_title: string
    headphone_type: string
    price: number
    description: string[]
    main_image: string
    other_images: string[]

    review: {
        id: string
        total_customer_reviews: number
        rating: number
    }
}


export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: env.VITE_SERVER_API_BASE_URL, credentials: "include" }),

    endpoints: (builder) => ({
        getProducts: builder.query<{ data: IProductData[] }, string>({ query: (queryString = "") => ({ url: `${apiURLs.getProducts}?${queryString}` }) })
    })
})




export const { useGetProductsQuery } = productsApi;