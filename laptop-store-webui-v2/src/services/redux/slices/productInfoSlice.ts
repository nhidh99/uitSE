import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDetailType } from "../../../global/types";

type ProductDetailState = ProductDetailType | null;

const INITIAL_STATE = null as ProductDetailState;

const productInfoSlice = createSlice({
    name: "productInfo",
    initialState: INITIAL_STATE,
    reducers: {
        setProductDetail(state, action: PayloadAction<ProductDetailState>) {
            state = action.payload;
            return state;
        },
    },
});

export const { setProductDetail } = productInfoSlice.actions;

export default productInfoSlice.reducer;