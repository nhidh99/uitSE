import React from "react";
import { Label } from "reactstrap";
import styles from "./styles.module.scss";
import { useParams, withRouter } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const SuggestBlock = (props) => {
    const suggestions = useSelector((state) => state.productDetail.suggestions);
    const { alt, productId } = useParams();

    const redirectToProduct = (product) => {
        props.history.push(`/product/${product["alt"]}/${product["id"]}`);
    };

    return suggestions.map((product) => (
        <div className={styles.cell} onClick={() => redirectToProduct(product)}>
            <div className={styles.redirect}>
                <img
                    src={`/cxf/api/images/400/laptops/${product["id"]}/${product["alt"]}.jpg`}
                    width={200}
                    height={200}
                    alt="suggest"
                    className={styles.img}
                />
                <label className={styles.itemInfo}>
                    <label className={styles.itemRating}>
                        {product["avg_rating"].toFixed(1)}{" "}
                        <FaStar className={styles.icon} size={10} />
                    </label>{" "}
                    - RAM {product["ram"]["size"]}GB -{" "}
                    {product["hard_drive"]["type"]}{" "}
                    {product["hard_drive"]["size"] === 1024
                        ? "1TB"
                        : `${product["hard_drive"]["size"]}GB`}
                </label>
                <Label className={styles.name}>{product["name"]}</Label>
                <br />
            </div>
            
            <Label className={styles.unitPrice}>
                {product["unit_price"].toLocaleString()}
                <sup>đ</sup>
            </Label>
            &nbsp;&nbsp;

            <Label className={styles.originPrice}>
                {(
                    product["unit_price"] + product["discount_price"]
                ).toLocaleString()}
                <sup>đ</sup>
            </Label>
            <br />

            <a
                href={`/product/compare/${alt}-vs-${product["alt"]}/${productId}/${product["id"]}`}
                className={styles.suggest}
                onClick={(e) => e.stopPropagation()}
            >
                So sánh chi tiết
            </a>
        </div>
    ));
};

export default withRouter(SuggestBlock);
