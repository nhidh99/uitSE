import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { Label } from "reactstrap";
import { FaCaretRight } from "react-icons/fa";
import { convertBrandType } from "../../../../../../services/helper/converter";
import { useSelector } from "react-redux";

const ProductTitle = () => {
    const product = useSelector((state) => state.productDetail.product);
    return (
        <Label className={styles.title}>
            <Link to="/" className={styles.redirect}>
                Trang chủ
            </Link>
            &nbsp;
            <FaCaretRight color="#007bff" />
            &nbsp;
            <Link to={`/search?brands=${product["brand"]}`} className={styles.redirect}>
                {convertBrandType(product["brand"])}
            </Link>
            &nbsp;
            <FaCaretRight color="#007bff" />
            &nbsp;Laptop {product["name"]}
        </Label>
    );
};

export default ProductTitle;
