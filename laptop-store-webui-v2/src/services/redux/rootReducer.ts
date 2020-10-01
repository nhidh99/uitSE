import { combineReducers } from "@reduxjs/toolkit";
import productInfoSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";
import menuTitleSlice from "./slices/menuTitleSlice";
import orderSlice from "./slices/orderSlice";
import cartStatusSlice from "./slices/cartStatusSlice";
import messageSlice from "./slices/messageSlice";

const rootReducer = combineReducers({
    menuTitle: menuTitleSlice,
    product: productInfoSlice,
    user: userSlice,
    order: orderSlice,
    cartStatus: cartStatusSlice,
    message: messageSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
