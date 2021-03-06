import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const Form = styled.form`
    flex: 3;
    padding: 20px;
`;

const InputContainer = styled.div`
    margin-bottom: 1em;
`;

const Label = styled.label`
    font-weight: 600;
    display: block;
    width: fit-content;
    margin-bottom: 8px;
`;

const RatingStar = styled(FaStar)`
    font-size: 24px;
    margin-top: 5px;
    margin-right: 5px;
`;

const RatingTitle = styled.input`
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #ccc;
    width: 100%;
    box-sizing: border-box;
`;

const RatingDetail = styled.textarea`
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #ccc;
    width: 100%;
    box-sizing: border-box;

    :focus {
        outline: none;
    }
`;

const RatingSubmit = styled.button`
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: white;
    background-color: #0062cc;
    width: 100%;
    cursor: pointer;
    opacity: 1;

    svg {
        margin-bottom: -2px;
    }

    :disabled {
        opacity: 0.6;
        cursor: default;
    }
`;

export const SC = {
    Form,
    InputContainer,
    Label,
    RatingStar,
    RatingTitle,
    RatingDetail,
    RatingSubmit,
};
