import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
    filter: filterReducer,
    modal: modalReducer,
});
