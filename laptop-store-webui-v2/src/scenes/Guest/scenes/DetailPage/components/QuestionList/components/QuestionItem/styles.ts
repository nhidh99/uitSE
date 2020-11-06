import styled from "styled-components";

const Container = styled.div`
    overflow: auto;
    padding: 10px 20px;

    :not(:last-of-type) {
        border-bottom: 1px dashed #ddd;
    }

    > :not(:last-child) {
        margin-bottom: 10px;
    }
`;

const CommentDetail = styled.div`
    display: block;
    font-weight: 600;
`;

const CommentInfo = styled.div`
    font-size: 12px;
    font-style: italic;
    display: block;
`;

const UserFullName = styled.span`
    font-weight: 600;
    color: #bf081f;
`;

export const SC = {
    Container,
    CommentDetail,
    CommentInfo,
    UserFullName,
};
