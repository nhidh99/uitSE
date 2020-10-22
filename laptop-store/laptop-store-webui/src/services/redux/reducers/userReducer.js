import { ActionType } from "../actions";

const userReducer = (state = null, action) => {
    switch (action.type) {
        case ActionType.SET_CURRENT_USER:
            state = action.payload;
            break;
        default:
            break;
    }
    return state;
};

export default userReducer;
