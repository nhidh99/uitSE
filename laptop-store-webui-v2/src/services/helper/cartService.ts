import CartConstants from "../../values/constants/CartConstants";

const getCart = () => {
    // @ts-ignore
    return (localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {}) as { [key: number]: number };
};

const syncStorage = (newCart: { [key: number]: number }) => {
    const json = JSON.stringify(newCart);
    localStorage.setItem("cart", json);
};

const updateItemQuantity = (itemId: number, quantity: number) => {
    if (quantity > 0 && quantity <= CartConstants.MAX_QUANTITY_PER_ITEM) {
        const cart = getCart();
        cart[itemId] = quantity;
        syncStorage(cart);
    }
};

const increaseItemQuantity = (itemId: number, value: number) => {
    const cart = getCart();
    if (value <= 0) return false;
    const quantity = value + (cart?.[itemId] ?? 0);
    if (quantity <= CartConstants.MAX_QUANTITY_PER_ITEM) {
        const cart = getCart();
        cart[itemId] = quantity;
        syncStorage(cart);
        return true;
    }
    return false;
};

const decreaseItemQuantity = (itemId: number, value: number) => {
    const cart = getCart();
    if (value <= 0 || !(itemId in cart)) return;
    const quantity = cart[itemId] - value;
    if (quantity > 0) {
        cart[itemId] = quantity;
        syncStorage(cart);
    }
};

const removeItem = (itemId: number) => {
    const cart = getCart();
    if (itemId in cart) {
        delete cart[itemId];
        syncStorage(cart);
    }
};

export default {
    getCart,
    syncStorage,
    updateItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
};
