/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { Col, Label, Button, Input, Row } from "reactstrap";
import styles from "./styles.module.scss";
import Rating from "react-rating";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { convertCPUType, convertResolutionType } from "../../../../../../services/helper/converter";
import { addToCart } from "../../../../../../services/helper/cart";
import { MAXIMUM_QUANTITY_PER_PRODUCT } from "../../../../../../constants";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

const OverviewBlock = ({ product, promotions, imageIds }) => {
    const images = [
        {
            original: `/cxf/api/images/600/laptops/${product["id"]}/${product["alt"]}.jpg`,
            thumbnail: `/cxf/api/images/400/laptops/${product["id"]}/${product["alt"]}.jpg`,
            thumbnailClass: styles.thumbnail,
        },
    ].concat(
        imageIds.map((id) => {
            return {
                original: `/cxf/api/images/600/details/${id}/${product["alt"]}.jpg`,
                thumbnail: `/cxf/api/images/600/details/${id}/${product["alt"]}.jpg`,
                thumbnailClass: styles.thumbnail,
            };
        })
    );

    const ProductImage = () => (
        <div className={styles.gallery}>
            <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={false}
                showNav={false}
                slideDuration={0}
            />
        </div>
    );

    const ProductOverview = () => (
        <div className={styles.blockChild}>
            <div id="product-name">
                <Label className={styles.productName}>Laptop {product["name"]}</Label>
                <Rating
                    initialRating={product["avg_rating"]}
                    readonly
                    fullSymbol={<FaStar color="#ffc120" className={styles.ratingIcon} />}
                    emptySymbol={<FaStar color="lightgray" className={styles.ratingIcon} />}
                />
            </div>

            <div id="product-price">
                <Label className={styles.currentPrice}>
                    {(product["unit_price"] - product["discount_price"]).toLocaleString()}đ
                </Label>
                <Label className={styles.originPrice}>
                    {product["unit_price"].toLocaleString()}đ
                </Label>
                <Label className={styles.discountPrice}>
                    (Giảm {product["discount_price"].toLocaleString()}đ)
                </Label>
            </div>
        </div>
    );

    const ProductInfo = () => {
        const { cpu, ram, hard_drive, monitor } = product;
        return (
            <div className={styles.blockChild}>
                <Label className={styles.infoLabel}>Thông số cơ bản</Label>
                <br />
                <ul className={styles.infoBlock}>
                    <li>
                        <label className={styles.infoItem}>
                            <b>CPU:</b>{" "}
                            {`${convertCPUType(cpu["type"])} ${cpu["detail"]}, ${cpu["speed"]} GHz`}
                        </label>
                    </li>
                    <li>
                        <label className={styles.infoItem}>
                            <b>RAM:</b> {`${ram["size"]} GB ${ram["type"]} ${ram["bus"]} MHz`}
                        </label>
                    </li>
                    <li>
                        <label className={styles.infoItem}>
                            <b>Ổ cứng: </b>
                            {`${hard_drive["type"]} 
                            ${hard_drive["size"] === 1024 ? "1 TB" : `${hard_drive["size"]} GB`} 
                            ${hard_drive["detail"]}`}
                        </label>
                    </li>
                    <li>
                        <label className={styles.infoItem}>
                            <b>Màn hình: </b>
                            {`${monitor["size"]} inch,
                ${convertResolutionType(monitor["resolution_type"])} 
                (${monitor["resolution_width"]} x ${monitor["resolution_height"]})`}
                        </label>
                    </li>
                </ul>
            </div>
        );
    };

    const ProductPromotions = () => (
        <div className={styles.blockChild}>
            <Label className={styles.promotionLabel}>Quà khuyến mãi</Label>
            {promotions.map((promotion) => (
                <div className={styles.promotionItem}>
                    <img
                        src={`/cxf/api/images/200/promotions/${promotion["id"]}/${promotion["alt"]}.jpg`}
                        className={styles.promotionImg}
                        alt="promotions"
                        title={promotion["name"]}
                    />
                    <Label className={styles.promotionName}>
                        {promotion["name"]} <i>({promotion["price"].toLocaleString()}đ)</i>
                    </Label>
                </div>
            ))}
        </div>
    );

    const ProductActions = () => (
        <div className={styles.blockChild}>
            <Row>
                <Col sm="5" className={styles.quantityCol}>
                    <Label className={styles.quantityLabel}>Số lượng:</Label>
                    <Input
                        id="quantity"
                        type="number"
                        min={1}
                        max={100}
                        defaultValue={1}
                        className={styles.quantityInput}
                    />
                </Col>
                <Col sm="7" className={styles.quantityCol}>
                    <Button color="success" onClick={() => addQuantityToCart(product["id"])}>
                        <FaShoppingCart />
                        &nbsp;&nbsp;Thêm vào giỏ hàng
                    </Button>
                </Col>
            </Row>
            <Label className={styles.quantityError} id="quantity-error">
                Tối đa {MAXIMUM_QUANTITY_PER_PRODUCT} sản phẩm {product["name"]} trong giỏ hàng
            </Label>
        </div>
    );

    const addQuantityToCart = (productId) => {
        const quantity = parseInt(document.getElementById("quantity").value);
        const success = addToCart(productId, quantity);
        const quantityError = document.getElementById("quantity-error");
        if (!success) {
            quantityError.style.display = "inline-block";
        } else {
            quantityError.style.display = "none";
        }
    };

    return (
        <Fragment>
            <Col xs="5" className={styles.blockLeft}>
                <ProductImage />
            </Col>

            <Col xs="7" className={styles.blockRight}>
                <ProductOverview />
                <hr className={styles.divider} />

                <ProductInfo />
                <hr className={styles.divider} />

                {promotions.length > 0 ? (
                    <Fragment>
                        <ProductPromotions />
                        <hr className={styles.divider} />
                    </Fragment>
                ) : null}

                <ProductActions />
            </Col>
        </Fragment>
    );
};

export default OverviewBlock;
