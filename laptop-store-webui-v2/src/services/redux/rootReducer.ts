import { combineReducers } from "@reduxjs/toolkit";
import productInfoSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";
import menuTitleSlice from "./slices/menuTitleSlice";
import orderSlice from "./slices/orderSlice";

const rootReducer = combineReducers({
    menuTitle: menuTitleSlice,
    product: productInfoSlice,
    user: userSlice,
    order: orderSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
