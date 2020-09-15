import { combineReducers } from "@reduxjs/toolkit";
import productInfoSlice from "./slices/productInfoSlice";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
    productInfo: productInfoSlice,
    user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
