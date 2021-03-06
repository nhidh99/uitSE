import { ActionType } from "../actions";

const initState = {
    "default-id": null,
};

const addressReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionType.SET_DEFAULT_ADDRESS_ID:
            state = action.payload;
            break;
        default:
            break;
    }
    return state;
};

export default addressReducer;
