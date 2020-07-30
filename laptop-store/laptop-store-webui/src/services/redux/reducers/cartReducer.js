import { ActionType } from "../actions";
import { CartStatus } from "../../../constants";

const cartReducer = (state = CartStatus.LOADING, action) => {
    switch (action.type) {
        case ActionType.SET_CART_STATUS:
            state = action.payload;
            break;
        default:
            break;
    }
    return state;
};

export default cartReducer;
