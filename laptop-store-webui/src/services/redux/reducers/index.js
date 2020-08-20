import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import modalReducer from "./modalReducer";
import imageReducer from "./imageReducer";
import addressReducer from "./addressReducer";
import cartReducer from "./cartReducer";
import productDetailReducer from "./productDetailReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
    filter: filterReducer,
    modal: modalReducer,
    images: imageReducer,
    address: addressReducer,
    cartStatus: cartReducer,
    productDetail: productDetailReducer,
    orderDetail: orderReducer,
    user: userReducer,
});
