import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../../api/orderApi";

export const fetchOrderById = createAsyncThunk(
    "order/fetchOrderById",
    async (orderId: number) => {
        const response = await orderApi.getById(orderId);
        return response.data;
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState: null,
    reducers: {},
    extraReducers: {
        [fetchOrderById.fulfilled as any]: (state, action) => {
            return action.payload;
        },
        [fetchOrderById.rejected as any]: (state, action) => {},
    },
});

export default orderSlice.reducer;
