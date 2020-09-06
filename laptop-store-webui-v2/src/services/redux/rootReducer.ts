import { combineReducers } from "@reduxjs/toolkit";
import productInfoSlice from "./slices/productInfoSlice";

const rootReducer = combineReducers({
    productInfo: productInfoSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
