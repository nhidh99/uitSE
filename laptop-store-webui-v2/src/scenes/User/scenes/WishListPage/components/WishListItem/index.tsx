/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback } from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userApi from "../../../../../../services/api/userApi";
import { RootState } from "../../../../../../services/redux/rootReducer";
import { fireLoading } from "../../../../../../services/redux/slices/loaderStatusSlice";
import { removeWishListItem } from "../../../../../../services/redux/slices/wishListSlice";
import ProductOverviewModel from "../../../../../../values/models/ProductOverviewModel";
import ActionButton from "../../../../components/ActionButton/style";
import { SC } from "./styles";

type WishListItemProps = {
    item: ProductOverviewModel;
};

const WishListItem = ({ item }: WishListItemProps) => {
    const wishList = useSelector((state: RootState) => state.wishList);
    const dispatch = useDispatch();

    const removeItem = useCallback(async () => {
        dispatch(fireLoading());
        const listJSON = JSON.stringify(wishList.filter((id) => id !== item.id));
        await userApi.putCurrentUserWishList(listJSON);
        dispatch(removeWishListItem(item.id));
    }, []);

    return (
        <SC.Container>
            <ActionButton style={{ float: "right", marginTop: "25px" }} onClick={removeItem}>
                <FaTrash className="delete" />
            </ActionButton>
            <SC.InfoContainer>
                <Link
                    to={{
                        pathname: `/products/${item["alt"]}/${item["id"]}`,
                        state: { loading: true },
                    }}
                >
                    <SC.ItemImage src={`/api/images/150/laptops/${item.id}/${item.alt}.jpg`} />
                </Link>

                <SC.ItemInfo>
                    <Link
                        to={{
                            pathname: `/products/${item["alt"]}/${item["id"]}`,
                            state: { loading: true },
                        }}
                    >
                        <SC.ItemName>{item.name}</SC.ItemName>
                    </Link>

                    <SC.ItemSpec>
                        <SC.ItemRating>
                            {item["avg_rating"].toFixed(1)} <FaStar size={10} />
                        </SC.ItemRating>{" "}
                        - RAM {item["ram"]} - {item["hard_drive"]}
                    </SC.ItemSpec>

                    <div>
                        <SC.UnitPrice>
                            {item["unit_price"].toLocaleString()}
                            <sup>đ</sup>
                        </SC.UnitPrice>

                        <SC.OriginPrice>
                            {(item["unit_price"] + item["discount_price"]).toLocaleString()}
                            <sup>đ</sup>
                        </SC.OriginPrice>
                    </div>
                </SC.ItemInfo>
            </SC.InfoContainer>
        </SC.Container>
    );
};

export default memo(WishListItem);
