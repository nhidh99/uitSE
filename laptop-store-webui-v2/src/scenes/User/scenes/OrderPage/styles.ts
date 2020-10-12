import styled from "styled-components";

const PaginateContainer = styled.div`
    position: relative;
    overflow: auto;
    ul {
        cursor: pointer;
        margin: 0;
        padding: 0;
        float: right;
        background-color: white;
        display: flex;
        border: 1px solid #ddd;
        border-radius: 5px;
        li {
            list-style-type: none;

            :not(:last-of-type) {
                border-right: 1px solid #ddd;
            }

            a {
                padding: 12px;
                display: inline-block;
                :focus {
                    outline: none;
                }
            }

            &.selected {
                background-color: #ddd !important;
            }
        }
    }
`;

export const SC = { PaginateContainer };
