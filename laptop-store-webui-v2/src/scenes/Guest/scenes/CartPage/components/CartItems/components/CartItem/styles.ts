import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
    padding: 0 20px 0 0;
    font-size: 13px;
    box-sizing: border-box;
    border: 1px dashed #ccc;
    text-decoration: none;

    :not(:first-of-type) {
        margin-top: 20px;
    }
`;

const ItemInfo = styled.div`
    margin-top: 25px;
    > div {
        margin-bottom: 6px;
    }
`;

const ItemImage = styled.img`
    display: inline-block;
    margin: 0 auto;
    width: 120px;
    height: 120px;
    user-select: none;
    padding: 10px 30px 10px 20px;
`;

const ItemSpec = styled.div`
    color: #007bff;
    margin-bottom: 2px;
    font-size: 12px;
    color: #666;
    font-weight: 600;
`;

const ItemRating = styled.span`
    color: darkorange;
`;

const ItemName = styled.div`
    font-size: 15px;
    color: #3b5998;
    font-weight: 600;
    margin-bottom: 5px;
`;

const UnitPrice = styled.label`
    color: #bf081f;
    font-weight: bold;
    margin-right: 10px;
`;

const OriginPrice = styled.label`
    text-decoration: line-through;
    font-size: 13px;
    color: #777;
`;

const Button = styled.button`
    border: none;
    padding: 7px 15px 5px 15px;
    background-color: transparent;
    color: #3b5998;
    background-color: #f3f3f3;

    svg {
        margin-right: 6px;
    }

    :not(:first-of-type) {
        margin-left: 15px;
    }
    :hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;

const InputContainer = styled.div`
    margin-top: 20px;
    margin-left: auto;
`;

export const SC = {
    Container,
    ItemInfo,
    ItemImage,
    ItemSpec,
    ItemRating,
    ItemName,
    UnitPrice,
    OriginPrice,
    Button,
    InputContainer,
};
