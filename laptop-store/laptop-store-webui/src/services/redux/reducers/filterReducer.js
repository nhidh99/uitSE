import { ActionType } from "../actions";

const filterReducer = (state = false, action) => {
    switch (action.type) {
        case ActionType.TOGGLE_FILTER:
            state = !state;
            return state;

        case ActionType.CLOSE_FILTER:
            state = false;
            return state;

        default:
            return state;
    }
};

export default filterReducer;
