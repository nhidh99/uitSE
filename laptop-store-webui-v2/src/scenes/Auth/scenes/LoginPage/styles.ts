import styled from "styled-components";

const LoginForm = styled.form`
    background-color: white;
    margin: 0 auto;
    width: fit-content;
    padding: 25px 50px;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 0 20px #eaeaea;
    width: 350px;
`;

const Header = styled.header`
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 20px;
`;

const Submit = styled.button`
    width: 100%;
    background-color: #727272;
    color: white;
    padding: 10px;
    border-radius: 5px;
    border: none;
    margin-bottom: 12px;
    cursor: pointer;
`;

const RegisterRedirect = styled.div`
    a {
        color: #007bff;
        :hover {
            text-decoration: underline;
        }
    }
`;

const Status = styled.label`
    display: block;
    margin-top: 12px;
    color: #bf081f;
    font-weight: 600;
`;

export const SC = {
    LoginForm,
    Header,
    Submit,
    RegisterRedirect,
    Status,
};
