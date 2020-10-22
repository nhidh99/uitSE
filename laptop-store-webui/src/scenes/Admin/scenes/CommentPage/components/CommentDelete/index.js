import React, { Fragment } from "react";
import { FaTrash } from "react-icons/fa";
import { Button } from "reactstrap";
import commentApi from "../../../../../../services/api/commentApi";
import store from "../../../../../../services/redux/store";
import { buildErrorModal, buildModal } from "../../../../../../services/redux/actions";

const CommentDelete = ({ comment }) => {
    const confirmDelete = () => {
        const modal = {
            title: `Xóa câu hỏi #${comment["id"]}`,
            message: (
                <Fragment>
                    Xác nhận xóa câu hỏi{" "}
                    <b>
                        #{comment["id"]} - "{comment["question"]}"
                    </b>
                    ?
                </Fragment>
            ),
            confirm: () => deleteComment,
        };
        store.dispatch(buildModal(modal));
    };

    const deleteComment = async () => {
        try {
            await commentApi.deleteComment(comment["id"]);
            window.location.reload();
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    return (
        <Button color="danger" onClick={confirmDelete}>
            <FaTrash />
        </Button>
    );
};

export default CommentDelete;
