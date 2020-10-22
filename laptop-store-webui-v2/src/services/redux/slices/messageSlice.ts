import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MessageState = string | null;

const messageSlice = createSlice({
    name: "message",
    initialState: null as MessageState,
    reducers: {
        setMessage(state, action: PayloadAction<string>) {
            return action.payload;
        },

        clearMessage(state) {
            return null;
        },
    },
});

export const { setMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;
