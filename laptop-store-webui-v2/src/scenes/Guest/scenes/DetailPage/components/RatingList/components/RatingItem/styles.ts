import styled from "styled-components";

const OuterContainer = styled.div`
    display: flex;
    :not(:last-of-type) {
        border-bottom: 1px dashed #ddd;
    }
`;

const LeftContainer = styled.div`
    flex: 1;
    padding: 15px 10px;
    border-right: 1px dashed #ddd;

    label {
        display: block;
        text-align: center;

        :not(:last-of-type) {
            margin-bottom: 10px;
        }
    }
`;

const RightContainer = styled.div`
    flex: 3;
    padding: 15px;
`;

const UserFullName = styled.label`
    color: #bf081f;
    font-weight: bold;
`;

const RatingStar = styled.label`
    color: darkorange;
    font-size: 18px;
    svg {
        margin-bottom: -2px;
        margin-left: 4px;
    }
`;

const RatingDate = styled.label`
    display: block;
`;

const RatingDetail = styled.div`
    margin-bottom: 5px;
    line-height: 1.5em;
`;

export const SC = {
    OuterContainer,
    LeftContainer,
    RightContainer,
    UserFullName,
    RatingStar,
    RatingDate,
    RatingDetail,
};
