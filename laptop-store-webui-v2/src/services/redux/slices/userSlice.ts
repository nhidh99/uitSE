import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserModel from "../../../values/models/UserModel";

type UserState = {
    email: string;
    name: string;
    phone: string;
    role: string;
    gender: string;
    address_id: number | null;
} | null;

const initialState = null as UserState;

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserModel | null>) {
            if (action.payload === null) {
                return null;
            }
            const { cart, wish_list, ...userProps } = action.payload;
            return { ...userProps };
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
