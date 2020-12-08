import { combineReducers } from "@reduxjs/toolkit";
import menuSlice from "./slices/menuSlice";

const rootReducer = combineReducers({
    menuStatus: menuSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
