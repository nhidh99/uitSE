import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserModel from "../../../values/models/UserModel";

type UserState = UserModel | null;

const initialState = null as UserState;

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state = action.payload;
            return state;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;