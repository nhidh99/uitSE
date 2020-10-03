import CartConstants from "../../values/constants/CartConstants";
import userApi from "../api/userApi";
import { setCartStatus } from "../redux/slices/cartStatusSlice";
import { setMessage } from "../redux/slices/messageSlice";
import store from "../redux/store";
import { getCookie } from "./cookie";

const getCart = (): { [key: number]: number } => {
    return localStorage.getItem("cart")
        ? // @ts-ignore
          JSON.parse(localStorage.getItem("cart"))
        : {};
};

const getWishList = (): number[] => {
    return localStorage.getItem("wish_list")
        ? // @ts-ignore
          JSON.parse(localStorage.getItem("wish_list"))
        : [];
};

const getTotalQuantity = () => {
    return Object.values(getCart()).reduce((a, b) => a + b, 0);
};

const syncStorage = async (newCart: { [key: number]: number }) => {
    try {
        const cartJSON = JSON.stringify(newCart);
        if (getCookie("access_token")) {
            await userApi.putCurrentUserCart(cartJSON);
            await new Promise((r) => setTimeout(r, 250));
        } else {
            await new Promise((r) => setTimeout(r, 300));
        }
        localStorage.setItem("cart", cartJSON);
    } catch (err) {
        store.dispatch(setMessage(err.response));
    }
};

const addItem = async (itemId: number, value: number) => {
    store.dispatch(setCartStatus(CartConstants.LOADING));
    const cart = getCart();
    const quantity = value + (cart?.[itemId] ?? 0);
    if (quantity <= CartConstants.MAX_QUANTITY_PER_ITEM) {
        const cart = getCart();
        cart[itemId] = quantity;
        await syncStorage(cart);
    }
    store.dispatch(setCartStatus(CartConstants.IDLE));
};

const removeItem = async (itemId: number) => {
    store.dispatch(setCartStatus(CartConstants.LOADING));
    const cart = getCart();
    delete cart[itemId];
    await syncStorage(cart);
    store.dispatch(setCartStatus(CartConstants.FETCHING));
};

const isEmptyCart = () => {
    return Object.keys(getCart()).length === 0;
};

const moveItemToWishList = async (itemId: number) => {
    store.dispatch(setCartStatus(CartConstants.LOADING));
    try {
        await userApi.postItemFromCartToWishList(itemId);
        const cart = getCart();
        const wishlist = getWishList();
        delete cart[itemId];
        wishlist.unshift(itemId);
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("wish_list", JSON.stringify(wishlist));
    } catch (err) {
        store.dispatch(setMessage(err.response));
    }
    store.dispatch(setCartStatus(CartConstants.FETCHING));
};

export default {
    getCart,
    getTotalQuantity,
    syncStorage,
    addItem,
    removeItem,
    isEmptyCart,
    moveItemToWishList,
};
