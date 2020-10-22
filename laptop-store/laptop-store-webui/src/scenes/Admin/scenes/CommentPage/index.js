import React, { Fragment } from "react";
import CommentFilter from "./components/CommentFilter";
import CommentList from "./components/CommentList";

const CommentPage = () => (
    <Fragment>
        <CommentFilter />
        <CommentList />
    </Fragment>
);

export default CommentPage;
