import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name: "wishList",
    initialState: [] as number[],
    reducers: {
        setWishList(state, action: PayloadAction<number[] | null>) {
            return action?.payload ?? [];
        },

        clearWishList(state) {
            return [];
        },

        removeWishListItem(state, action: PayloadAction<number>) {
            return state.filter((id) => id !== action.payload);
        },

        addWishListItem(state, action: PayloadAction<number>) {
            const itemId = action.payload;
            if (!state.includes(itemId)) {
                return [itemId, ...state];
            }
            return state;
        },
    },
});

export const {
    setWishList,
    clearWishList,
    removeWishListItem,
    addWishListItem,
} = wishListSlice.actions;

export default wishListSlice.reducer;
