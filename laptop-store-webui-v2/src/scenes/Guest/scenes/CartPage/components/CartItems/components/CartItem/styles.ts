import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
    padding: 10px 20px;
    font-size: 13px;
    box-sizing: border-box;
    border: 1px dashed #ccc;
    text-decoration: none;
    gap: 40px;

    :not(:last-of-type) {
        margin-bottom: 20px;
    }
`;

const ItemInfo = styled.div`
    margin-top: 15px;
    > div {
        margin-bottom: 6px;
    }
`;

const ItemImage = styled.img`
    display: inline-block;
    margin: 0 auto;
    width: 120px;
    height: 120px;
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
    color: #3b5998;
    font-weight: 600;
    font-size: 13px;
    display: block;
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
    margin-top: 10px;
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
