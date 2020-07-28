import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import modalReducer from "./modalReducer";
import imageReducer from "./imageReducer";
import addressReducer from "./addressReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
    filter: filterReducer,
    modal: modalReducer,
    images: imageReducer,
    address: addressReducer,
    cart: cartReducer,
});
