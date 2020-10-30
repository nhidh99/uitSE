import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

type ModalState = {
    isOpen: boolean;
    body: ReactNode;
};

const modalSlice = createSlice({
    name: "modal",
    initialState: { isOpen: false, body: null as ReactNode },
    reducers: {
        openModal(state, action: PayloadAction<ReactNode>) {
            return { isOpen: true, body: action.payload };
        },

        closeModal(state) {
            return { isOpen: false, body: null as ReactNode };
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
