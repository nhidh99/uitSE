import { TOGGLE_MODAL, BUILD_MODAL } from "../actions";

const initState = {
    title: "",
    message: "",
    confirm: null,
    open: false,
};

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            state["open"] = !state["open"];
            break;

        case BUILD_MODAL:
            Object.assign(state, action.payload);
            state["open"] = true;
            break;

        default:
            break;
    }
    return state;
};

export default modalReducer;
