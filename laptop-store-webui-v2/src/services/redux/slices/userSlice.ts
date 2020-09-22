import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserModel from "../../../values/models/UserModel";

type UserState = UserModel | null;

const initialState = null as UserState;

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            return action.payload;
        },
        setDefaultAddressId(state, action: PayloadAction<number>) {
            if (state !== null) {
                return { ...state, address_id: action.payload };
            }
            return state;
        },
    },
});

export const { setUser, setDefaultAddressId } = userSlice.actions;

export default userSlice.reducer;
