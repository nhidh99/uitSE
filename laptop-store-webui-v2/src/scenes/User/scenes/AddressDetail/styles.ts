import styled from "styled-components";

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-left: 110px;
`;

const SubmitButton = styled.button`
    border: none;
    background-color: #5cb85c;
    color: white;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 0;
    width: 200px;
    cursor: pointer;
    border-radius: 5px;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const AddressButton = styled.button`
    border: none;
    background-color: #0062cc;
    color: white;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 0;
    width: 200px;
    cursor: pointer;
    border-radius: 5px;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const SC = {
    ButtonContainer,
    SubmitButton,
    AddressButton,
};
