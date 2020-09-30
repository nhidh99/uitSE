import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartConstants from "../../../values/constants/CartConstants";

const cartStatusSlice = createSlice({
    name: "cartStatus",
    initialState: CartConstants.IDLE,
    reducers: {
        setCartStatus(state, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export const { setCartStatus } = cartStatusSlice.actions;

export default cartStatusSlice.reducer;
