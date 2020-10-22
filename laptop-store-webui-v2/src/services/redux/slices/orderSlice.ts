import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderDetailModel from "../../../values/models/OrderDetailModel";
import orderApi from "../../api/orderApi";

export const fetchOrderById = createAsyncThunk(
    "order/fetchOrderById",
    async (orderId: number) => {
        const response = await orderApi.getById(orderId);
        return response.data;
    }
);

type OrderState = OrderDetailModel | null;

const orderSlice = createSlice({
    name: "order",
    initialState: null as OrderState,
    reducers: {},
    extraReducers: {
        [fetchOrderById.fulfilled as any]: (state, action) => {
            return action.payload;
        },
    },
});

export default orderSlice.reducer;
