import { ActionType } from "../actions";

const orderReducer = (state = null, action) => {
    switch (action.type) {
        case ActionType.SET_ORDER_DETAIL:
            state = action.payload;
            break;
        default:
            break;
    }
    return state;
};

export default orderReducer;
