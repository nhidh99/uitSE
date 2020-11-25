import styled from "styled-components";

const ActionButton = styled.button`
    background-color: white;
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 10px;
    cursor: pointer;

    svg {
        font-size: 16px;
        color: #888;
        margin-bottom: -2px;
    }

    :hover {
        background-color: #ddd !important;

        svg {
            &.edit {
                color: #007bff;
            }

            &.delete {
                color: #bf081f;
            }

            &.view {
                color: forestgreen;
            }
        }
    }
`;

export default ActionButton;
