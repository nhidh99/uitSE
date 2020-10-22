import styled from "styled-components";

const ReplySwitch = styled.label`
    display: block;
    color: #007bff;
    cursor: pointer;

    :hover {
        text-decoration: underline;
    }
`;

const ReplyBox = styled.textarea`
    display: inline-block;
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
`;

const ReplySubmit = styled.button`
    border-radius: 5px;
    border: none;
    background-color: #0062cc;
    color: white;
    width: 150px;
    padding: 8px;
    float: right;

    svg {
        margin-bottom: -1px;
        margin-right: 5px;
    }
`;

export const SC = {
    ReplySwitch,
    ReplyBox,
    ReplySubmit,
};
