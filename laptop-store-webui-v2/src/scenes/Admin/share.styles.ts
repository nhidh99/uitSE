import styled, { css } from "styled-components";

const AdminTable = css`
    width: 100%;
    background-color: white;
    border-collapse: collapse;
    margin-bottom: 15px;

    td,
    th {
        line-height: 1.5em;
        &.select {
            border-right: 1px dashed #ddd;
        }
    }

    th {
        text-align: center;
        user-select: none;
        &.select,
        &.sortable {
            cursor: pointer;
            :hover {
                opacity: 0.75;
            }
        }
    }

    tr:not(:first-of-type) {
        :hover {
            background-color: #eee;
            cursor: pointer;
        }
    }

    tr:not(:last-of-type) {
        border-bottom: 1px solid #ddd;
    }

    td,
    th {
        input[type="checkbox"] {
            cursor: pointer;
        }
        padding: 15px 10px;
    }

    input[type="checkbox"] {
        transform: scale(1.2);
        margin: 0;
    }
`;

const SectionTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
    line-height: 1em;
    display: flex;
    justify-content: space-between;

    div {
        margin-bottom: -10px;
        button {
            font-size: 14px;
            border: none;
            cursor: pointer;
            padding: 5px 8px;
            color: #333;

            :hover {
                background-color: #dedede;
            }

            &.delete {
                color: #d01929;
            }

            &.insert {
                color: forestgreen;
            }

            svg {
                margin-bottom: -2px;
                margin-right: 3px;
            }
        }
    }
`;

const SearchContainer = styled.div`
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
`;

const SearchForm = styled.form`
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
`;

const SearchInput = styled.input`
    border-radius: 0;
    background-color: white;
    padding: 10px;
    width: 100%;
    border: none;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

const SearchButton = styled.button`
    min-width: 160px;
    padding: 0;
    border: none;
    :focus {
        outline: 0;
    }
    background-color: #0062cc;
    color: white;
    padding: 0 10px;
    border-radius: 0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

const Select = styled.select`
    padding: 0 10px;
    border-radius: 0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    border: none;
    :focus {
        outline: 0;
    }
`;

const EmptyContainer = styled.div`
    background-color: white;
    padding: 30px;
`;

export const SS = { AdminTable };
export const SSC = {
    SectionTitle,
    SearchContainer,
    SearchInput,
    SearchButton,
    SearchForm,
    Select,
    EmptyContainer,
};
