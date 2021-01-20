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

const ReplyContainer = styled.div`
    border-left: 1px solid #d9d9d9;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const MoreReplies = styled.span`
    margin-left: 10px;
    color: #007bff;
    cursor: pointer;
    font-size: 13px;

    :hover {
        text-decoration: underline;
    }
`;


export const SC = {
    Container,
    CommentDetail,
    CommentInfo,
    UserFullName,
    ReplyContainer,
    MoreReplies
};
