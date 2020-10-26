import { combineReducers } from "@reduxjs/toolkit";
import productInfoSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";
import orderSlice from "./slices/orderSlice";
import loaderStatusSlice from "./slices/loaderStatusSlice";
import messageSlice from "./slices/messageSlice";
import wishListSlice from "./slices/wishListSlice";

const rootReducer = combineReducers({
    product: productInfoSlice,
    user: userSlice,
    order: orderSlice,
    loaderStatus: loaderStatusSlice,
    message: messageSlice,
    wishList: wishListSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
