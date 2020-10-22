import styled from "styled-components";

const Spinner = styled.div`
    border: 5px solid #f0f0f0;
    border-radius: 50%;
    border-top: 5px solid #aaa;
    width: 30px;
    height: 30px;
    -webkit-animation: spin 0.75s linear infinite; /* Safari */
    animation: spin 0.75s linear infinite;
    margin: 0 auto;

    /* Safari */
    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default Spinner;
