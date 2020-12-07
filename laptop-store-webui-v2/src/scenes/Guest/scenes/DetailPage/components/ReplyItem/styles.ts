import styled from "styled-components";

const Container = styled.div`
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Info = styled.div`
    font-size: 12px;
    font-style: italic;
    display: block;
`;

const Name = styled.span`
    font-weight: 600;
    color: #bf081f;
`;

const Detail = styled.div`
    white-space: pre;
    line-height: 1.8em;
`;

export const SC = {
    Container,
    Info,
    Detail,
    Name,
};
