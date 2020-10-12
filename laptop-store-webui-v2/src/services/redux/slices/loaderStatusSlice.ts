import { createSlice } from "@reduxjs/toolkit";

type LoaderStatusState = {
    isLoading: boolean;
    isFetching: boolean;
};

const initialState: LoaderStatusState = {
    isLoading: false,
    isFetching: false,
};

const loaderStatusSlice = createSlice({
    name: "loaderStatus",
    initialState: initialState,
    reducers: {
        fireLoading(state) {
            return { ...state, isLoading: true };
        },
        fireFetching(state) {
            return { isLoading: true, isFetching: true };
        },
        skipLoading(state) {
            return { ...state, isLoading: false };
        },
        skipFetching(state) {
            return { isLoading: false, isFetching: false };
        },
    },
});

export const { fireLoading, fireFetching, skipFetching, skipLoading } = loaderStatusSlice.actions;

export default loaderStatusSlice.reducer;
