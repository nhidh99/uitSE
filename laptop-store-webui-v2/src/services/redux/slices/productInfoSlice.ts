import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProductDetailModel from "../../../values/models/ProductDetailModel";

type ProductDetailState = ProductDetailModel | null;

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