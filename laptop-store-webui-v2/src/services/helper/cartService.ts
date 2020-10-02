import CartConstants from "../../values/constants/CartConstants";
import userApi from "../api/userApi";
import { setCartStatus } from "../redux/slices/cartStatusSlice";
import store from "../redux/store";
import { getCookie } from "./cookie";

const getCart = (): { [key: number]: number } => {
    return localStorage.getItem("cart")
        ? // @ts-ignore
          JSON.parse(localStorage.getItem("cart"))
        : {};
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
        throw err;
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

export default {
    getCart,
    getTotalQuantity,
    syncStorage,
    addItem,
    removeItem,
    isEmptyCart,
};
