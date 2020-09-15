import React, { memo } from "react";
import LazyLoad from "react-lazyload";
import { FaStar } from "react-icons/fa";
import { SC } from "./styles";

type ProductItemProps = {
    product: {
        id: number;
        alt: string;
        name: string;
        avg_rating: number;
        unit_price: number;
        discount_price: number;
        ram: {
            size: number;
        };
        hard_drive: {
            type: string;
            size: number;
        };
    };
    compareLink?: string | null;
};

const ProductItem = ({ product, compareLink = null }: ProductItemProps) => (
    <SC.Container
        to={{
            pathname: `/products/${product["alt"]}/${product["id"]}`,
            state: { loading: true },
        }}
    >
        <LazyLoad height={200} offset={100} once>
            <SC.ItemImage
                width={200}
                height={200}
                src={`/api/images/400/laptops/${product["id"]}/${product["alt"]}.jpg`}
                alt="Laptop"
            />
        </LazyLoad>

        <SC.ItemInfo>
            <SC.ItemSpec>
                <SC.ItemRating>
                    {product["avg_rating"].toFixed(1)} <FaStar size={10} />
                </SC.ItemRating>{" "}
                - RAM {product["ram"]["size"]}GB -{" "}
                {product["hard_drive"]["type"]}{" "}
                {product["hard_drive"]["size"] >= 1024
                    ? `${product["hard_drive"]["size"] / 1024}TB`
                    : `${product["hard_drive"]["size"]}GB`}
            </SC.ItemSpec>

            <SC.ItemName>{product["name"]}</SC.ItemName>
            <br />

            <SC.UnitPrice>
                {product["unit_price"].toLocaleString()}
                <sup>đ</sup>
            </SC.UnitPrice>

            <SC.OriginPrice>
                {(
                    product["unit_price"] + product["discount_price"]
                ).toLocaleString()}
                <sup>đ</sup>
            </SC.OriginPrice>

            {compareLink ? (
                <SC.Compare
                    to={{
                        pathname: compareLink,
                        state: { loading: false },
                    }}
                >
                    So sánh sản phẩm
                </SC.Compare>
            ) : null}
        </SC.ItemInfo>
    </SC.Container>
);

export default memo(ProductItem);
