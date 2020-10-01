import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../services/redux/rootReducer";
import store from "../../services/redux/store";
import { clearMessage } from "../../services/redux/slices/messageSlice";
import { SC } from "./styles";

const MessageBox = () => {
    const timeout = useRef<number | null>(null);
    const message = useSelector((state: RootState) => state.message);

    useEffect(() => {
        if (!message) return;

        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => {
            store.dispatch(clearMessage());
        }, 3000);
    }, [message]);

    return message ? <SC.Container>{message}</SC.Container> : null;
};

export default MessageBox;
