import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const menuStatusSlice = createSlice({
    name: "menuStatus",
    initialState: window.innerWidth >= 768 ? "open" : "close",
    reducers: {
        setMenuStatus(state, action: PayloadAction<string>) {
            return action.payload;
        }
    }
});

export const { setMenuStatus } = menuStatusSlice.actions;

export default menuStatusSlice.reducer;
