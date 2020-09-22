import { combineReducers } from "@reduxjs/toolkit";
import productInfoSlice from "./slices/productInfoSlice";
import userSlice from "./slices/userSlice";
import menuTitleSlice from "./slices/menuTitleSlice";

const rootReducer = combineReducers({
    productInfo: productInfoSlice,
    menuTitle: menuTitleSlice,
    user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
