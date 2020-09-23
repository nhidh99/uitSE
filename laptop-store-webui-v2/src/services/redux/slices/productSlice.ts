import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductDetailModel from "../../../values/models/ProductDetailModel";
import laptopApi from "../../api/laptopApi";

export const fetchProductDetailById = createAsyncThunk(
    "product/fetchProductDetailById",
    async (productId: number) => {
        const response = await laptopApi.getById(productId);
        return response.data;
    }
);

type ProductDetailState = ProductDetailModel | null;

const productSlice = createSlice({
    name: "product",
    initialState: null as ProductDetailState,
    reducers: {},
    extraReducers: {
        [fetchProductDetailById.fulfilled as any]: (state, action) => {
            return action.payload;
        },
        [fetchProductDetailById.rejected as any]: (state, action) => {
        },
    },
});

export default productSlice.reducer;
