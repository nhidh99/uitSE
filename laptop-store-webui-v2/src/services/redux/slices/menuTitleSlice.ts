import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MenuTitleState = string | null;

const initialState = null as MenuTitleState;

const menuTitleSlice = createSlice({
    name: "menuTitle",
    initialState: initialState,
    reducers: {
        setMenuTitle(state, action: PayloadAction<MenuTitleState>) {
            return action.payload;
        },
    },
});

export const { setMenuTitle } = menuTitleSlice.actions;

export default menuTitleSlice.reducer;