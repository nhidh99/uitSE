import { ActionType } from "../actions";

const productDetailReducer = (state = null, action) => {
    switch (action.type) {
        case ActionType.SET_PRODUCT_DETAIL:
            state = action.payload;
            break;
        default:
            break;
    }
    return state;
};

export default productDetailReducer;
