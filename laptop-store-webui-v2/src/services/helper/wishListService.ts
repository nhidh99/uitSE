import CartConstants from "../../values/constants/CartConstants";
import userApi from "../api/userApi";
import { setCartStatus } from "../redux/slices/cartStatusSlice";
import store from "../redux/store";

const getWishList = (): number[] => {
    return localStorage.getItem("wish_list")
        ? // @ts-ignore
          JSON.parse(localStorage.getItem("wish_list"))
        : [];
};

const syncStorage = async (newList: number[]) => {
    try {
        const listJSON = JSON.stringify(newList);
        await userApi.putCurrentUserWishList(listJSON);
        await new Promise((r) => setTimeout(r, 250));
        localStorage.setItem("wish_list", listJSON);
    } catch (err) {
        throw err;
    }
};

const clearWishList = () => {
    localStorage.removeItem("wish_list");
};

const addToWishList = async (itemId: number) => {
    const list = getWishList();
    if (!list.includes(itemId)) {
        list.unshift(itemId);
        await syncStorage(list);
    }
};

const removeFromWishList = async (itemId: number) => {
    store.dispatch(setCartStatus(CartConstants.LOADING));
    const list = getWishList();
    if (list.includes(itemId)) {
        const newList = list.filter((id) => id !== itemId);
        await new Promise((r) => setTimeout(r, 500));
        await syncStorage(newList);
    }
    store.dispatch(setCartStatus(CartConstants.FETCHING));
};

export const wishListService = {
    getWishList,
    addToWishList,
    removeFromWishList,
    clearWishList,
    syncStorage,
};
