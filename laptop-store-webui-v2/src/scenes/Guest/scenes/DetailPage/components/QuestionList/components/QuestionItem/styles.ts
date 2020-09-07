import styled from "styled-components";

const Container = styled.div`
    overflow: auto;
    > :not(:last-child) {
        margin-bottom: 8px;
    }
`;

const CommentDetail = styled.label`
    display: block;
    font-weight: 600;
`;

const CommentInfo = styled.label`
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
