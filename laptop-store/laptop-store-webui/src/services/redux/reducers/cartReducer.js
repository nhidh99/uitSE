import { ActionType } from "../actions";

const cartReducer = (state = null, action) => {
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
