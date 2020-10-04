import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartConstants from "../../../values/constants/CartConstants";

const loaderStatusSlice = createSlice({
    name: "loaderStatus",
    initialState: CartConstants.IDLE,
    reducers: {
        setLoaderStatus(state, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export const { setLoaderStatus } = loaderStatusSlice.actions;

export default loaderStatusSlice.reducer;
