// filter actions
export const toggleFilter = () => ({ type: ActionType.TOGGLE_FILTER });
export const closeFilter = () => ({ type: ActionType.CLOSE_FILTER });

// modal actions
export const toggleModal = () => ({ type: ActionType.TOGGLE_MODAL });
export const buildModal = (modal) => ({
    type: ActionType.BUILD_MODAL,
    payload: modal,
});
export const buildErrorModal = () => ({ type: ActionType.BUILD_ERROR_MODAL });

// images actions
export const clearImages = () => ({ type: ActionType.CLEAR_IMAGES });
export const setImages = (images) => ({
    type: ActionType.SET_IMAGES,
    payload: images,
});

// default-address actions
export const setCurrentUser = (payload) => ({
    type: ActionType.SET_CURRENT_USER,
    payload,
});

export const setDefaultAddressId = (addressId) => ({
    type: ActionType.SET_DEFAULT_ADDRESS_ID,
    payload: addressId,
});

// cart actions
export const setCartStatus = (status) => ({
    type: ActionType.SET_CART_STATUS,
    payload: status,
});

// product-detail actions
export const setProductDetail = (payload) => ({
    type: ActionType.SET_PRODUCT_DETAIL,
    payload,
});

// order actions
export const setOrderDetail = (payload) => ({
    type: ActionType.SET_ORDER_DETAIL,
    payload,
});

export const ActionType = {
    TOGGLE_FILTER: "toggle_filter",
    CLOSE_FILTER: "close_filter",
    TOGGLE_MODAL: "toggle_modal",
    BUILD_MODAL: "build_modal",
    BUILD_ERROR_MODAL: "build_error_modal",
    CLEAR_IMAGES: "clear_images",
    SET_IMAGES: "set_images",
    SET_CURRENT_USER: "set_current_user",
    SET_DEFAULT_ADDRESS_ID: "set_default_address_id",
    SET_CART_STATUS: "set_cart_status",
    SET_PRODUCT_DETAIL: "set_product_detail",
    SET_ORDER_DETAIL: "set_order_detail",
};
