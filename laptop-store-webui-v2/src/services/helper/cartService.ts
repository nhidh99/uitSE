import CartConstants from "../../values/constants/CartConstants";
import { setCartStatus } from "../redux/slices/cartStatusSlice";
import store from "../redux/store";

const getCart = () => {
    return (localStorage.getItem("cart")
        ? // @ts-ignore
          JSON.parse(localStorage.getItem("cart"))
        : {}) as { [key: number]: number };
};

const syncStorage = async (newCart: { [key: number]: number }) => {
    store.dispatch(setCartStatus(CartConstants.LOADING));
    localStorage.setItem("cart", JSON.stringify(newCart));
    await new Promise((r) => setTimeout(r, 500));
    store.dispatch(setCartStatus(CartConstants.IDLE));
};

const addItem = async (itemId: number, value: number) => {
    store.dispatch(setCartStatus(CartConstants.LOADING));
    const cart = getCart();
    const quantity = value + (cart?.[itemId] ?? 0);
    if (quantity <= CartConstants.MAX_QUANTITY_PER_ITEM) {
        const cart = getCart();
        cart[itemId] = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        await new Promise((r) => setTimeout(r, 500));
    }
    store.dispatch(setCartStatus(CartConstants.IDLE));
};

const removeItem = async (itemId: number) => {
    store.dispatch(setCartStatus(CartConstants.LOADING));
    const cart = getCart();
    delete cart[itemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    await new Promise((r) => setTimeout(r, 500));
    store.dispatch(setCartStatus(CartConstants.FETCHING));
};

const isEmptyCart = () => {
    return Object.keys(getCart()).length === 0;
};

export default {
    getCart,
    syncStorage,
    addItem,
    removeItem,
    isEmptyCart,
};
