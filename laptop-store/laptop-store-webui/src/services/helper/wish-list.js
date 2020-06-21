import { getCookie } from "./cookie";

export const getWishList = () => {
    const wishList = JSON.parse(localStorage.getItem("wishlist"));
    return wishList ? wishList : [];
};

export const addToWishList = (productId) => {
    let wishList = JSON.parse(localStorage.getItem("wishlist"));
    if (!wishList) wishList = [];
    if((wishList.indexOf(productId) === -1)) {
        wishList[wishList.length] = productId;
    } 
    updateWishListDatabase(wishList);
};

export const removeFromWishList = async (productId) => {
    let wishList = JSON.parse(localStorage.getItem("wishlist"));
    let index = wishList.indexOf(productId);
    if (wishList && index !== -1) {
        wishList.splice(index, 1);
        await updateWishListDatabase(wishList);
    }
};

export const updateWishListDatabase = async (wishList) => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));

    const token = getCookie("access_token");
    if (!token) return;

    await fetch("/cxf/api/users/me/wish-list", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(wishList),
    });
};