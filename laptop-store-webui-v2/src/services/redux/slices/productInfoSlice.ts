import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDetailType } from "../../../global/types";

type ProductDetailState = ProductDetailType | null;

const initialState = null as ProductDetailState;

const productInfoSlice = createSlice({
    name: "productInfo",
    initialState: initialState,
    reducers: {
        setProductDetail(state, action: PayloadAction<ProductDetailState>) {
            state = action.payload;
            return state;
        },
    },
});

export const { setProductDetail } = productInfoSlice.actions;

export default productInfoSlice.reducer;