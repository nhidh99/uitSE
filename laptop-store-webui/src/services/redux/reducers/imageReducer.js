import { ActionType } from "../actions";

const initState = {
    deleteIds: [],
    uploads: [],
};

const imageReducer = (state = [], action) => {
    switch (action.type) {
        case ActionType.CLEAR_IMAGES:
            state = initState;
            break;
        case ActionType.SET_IMAGES:
            state = action.payload;
            break;
        default:
            break;
    }
    return state;
};

export default imageReducer;
