import { MAXIMUM_QUANTITY_PER_PRODUCT } from "../../constants";
import { getCookie } from "./cookie";
import userApi from "../api/userApi";

const getCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart ? cart : {};
};

const sync = async (cart) => {
    const syncDatabase = async () => {
        const token = getCookie("access_token");
        if (!token) return true;
        try {
            await userApi.putCurrentUserCart(cart);
            return true;
        } catch (err) {
            return null;
        }
    };

    const syncLocalStorage = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
        const cartQuantity = document.getElementById("cart-quantity");
        const quantity = Object.values(cart).reduce((a, b) => a + b, 0);
        cartQuantity.innerText = quantity;
    };

    const response = await syncDatabase();
    if (response) {
        syncLocalStorage();
    }
    return response;
};

const cartService = {
    syncWithDatabase: async (cart) => {
        const token = getCookie("access_token");
        if (!token) return;
        try {
            await userApi.putCurrentUserCart(cart);
        } catch (err) {
            console.log("err");
        }
    },

    addProduct: async (productId, quantity = 1) => {
        const cart = getCart();
        const newQty = productId in cart ? cart[productId] + quantity : quantity;
        if (newQty <= MAXIMUM_QUANTITY_PER_PRODUCT) {
            cart[productId] = newQty;
            return await sync(cart);
        } else {
            return false;
        }
    },

    minusProduct: async (productId) => {
        const cart = getCart();
        if (productId in cart) {
            const newQty = cart[productId] - 1;
            if (newQty > 0) {
                cart[productId] = newQty;
                return await sync(cart);
            } else {
                return false;
            }
        }
    },

    updateProduct: async (productId, newQty) => {
        const cart = getCart();
        if (productId in cart) {
            if (newQty > 0 && newQty <= MAXIMUM_QUANTITY_PER_PRODUCT) {
                cart[productId] = newQty;
                return await sync(cart);
            } else {
                return false;
            }
        }
    },

    removeProduct: async (productId) => {
        const cart = getCart();
        if (productId in cart) {
            delete cart[productId];
            return await sync(cart);
        }
    },
};

export default cartService;
