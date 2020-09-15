import { ActionType } from "../actions";

const userReducer = (state = null, action) => {
    switch (action.type) {
        case ActionType.SET_CURRENT_USER:
            state = action.payload;
            break;
        case ActionType.SET_DEFAULT_ADDRESS_ID:
            state["address_id"] = action.payload;
            break;
        default:
            break;
    }
    return state;
};

export default userReducer;
