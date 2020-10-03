/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { wishListService } from "../../../../../../services/helper/wishListService";
import { setMessage } from "../../../../../../services/redux/slices/messageSlice";
import store from "../../../../../../services/redux/store";
import ProductOverviewModel from "../../../../../../values/models/ProductSummaryModel";
import { SC } from "./styles";

type WishListItemProps = {
    item: ProductOverviewModel;
};

const WishListItem = ({ item }: WishListItemProps) => {
    const removeItem = useCallback(async () => {
        try {
            await wishListService.removeFromWishList(item.id);
        } catch (err) {
            const message = "Khong the xoa san pham";
            store.dispatch(setMessage(message));
        }
    }, []);

    return (
        <SC.Container>
            <SC.Button onClick={removeItem} />
            <SC.InfoContainer>
                <Link
                    to={{
                        pathname: `/products/${item["alt"]}/${item["id"]}`,
                        state: { loading: true },
                    }}
                >
                    <SC.ItemImage
                        src={`/api/images/150/laptops/${item.id}/${item.alt}.jpg`}
                    />
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
                            {(
                                item["unit_price"] + item["discount_price"]
                            ).toLocaleString()}
                            <sup>đ</sup>
                        </SC.OriginPrice>
                    </div>
                </SC.ItemInfo>
            </SC.InfoContainer>
        </SC.Container>
    );
};

export default memo(WishListItem);
