export const toggleFilter = () => ({ type: TOGGLE_FILTER });
export const closeFilter = () => ({ type: CLOSE_FILTER });

export const toggleModal = () => ({ type: TOGGLE_MODAL });
export const buildModal = (modal) => ({ type: BUILD_MODAL, payload: modal });

export const TOGGLE_FILTER = "toggle_filter";
export const CLOSE_FILTER = "close_filter";
export const TOGGLE_MODAL = "toggle_modal";
export const BUILD_MODAL = "build_modal";
