import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductDetailModel from "../../../values/models/ProductDetailModel";
import laptopApi from "../../api/laptopApi";

export const fetchProductDetailById = createAsyncThunk(
    "product/fetchProductDetailById",
    async (productId: number) => {
        const response = await laptopApi.getDetailById(productId);
        return response.data;
    }
);

type ProductDetailState =
    | (ProductDetailModel & {
          show_questions?: boolean;
          show_ratings?: boolean;
      })
    | null;

const productSlice = createSlice({
    name: "product",
    initialState: null as ProductDetailState,
    reducers: {
        clearProductDetail() {
            return null;
        },
        hideQuestionList(state) {
            return state ? { ...state, show_questions: false } : null;
        },

        hideRatingList(state) {
            return state ? { ...state, show_ratings: false } : null;
        },
    },
    extraReducers: {
        [fetchProductDetailById.fulfilled as any]: (state, action) => {
            return { ...action.payload, show_ratings: true, show_questions: true };
        },
        [fetchProductDetailById.rejected as any]: (state, action) => {},
    },
});

export const { clearProductDetail, hideQuestionList, hideRatingList } = productSlice.actions;

export default productSlice.reducer;
