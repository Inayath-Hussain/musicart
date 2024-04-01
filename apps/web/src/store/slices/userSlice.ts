import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

const slice = createSlice({
    name: "user",
    initialState: { name: "" },
    reducers: {
        updateUserName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        }
    }
})



export const { updateUserName } = slice.actions

export const userSliceSelector = (state: RootState) => state.user

export const userSlice = {
    name: slice.name,
    reducer: slice.reducer
}