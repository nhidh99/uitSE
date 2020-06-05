/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { FaStar } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import LazyLoad from "react-lazyload";
import ReactPlaceHolder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

const ItemCategory = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const { title, url, history } = props;

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await fetch(`${url}?page=${page + 1}`);
        if (response.ok) {
            const data = await response.json();
            const length = parseInt(response.headers.get("X-Total-Count"));
            const newProducts = products.concat(data);
            setProducts(newProducts);
            setLoading(false);
            setPage(page + 1);
            return newProducts.length !== length;
        }
        return true;
    };

    const toggleMore = async (e) => {
        const button = e.target;
        button.disabled = true;
        const isMore = await loadData();
        if (isMore) {
            button.disabled = false;
        } else {
            button.style.display = "none";
        }
    };

    const redirectToDetail = (product) => {
        history.push(`/product/${product["alt"]}/${product["id"]}`);
    };

    const Item = ({ product }) => {
        return (
            <div onClick={() => redirectToDetail(product)} className={styles.itemBlock}>
                <LazyLoad height={200} offset={100} once>
                    <img
                        width={200}
                        height={200}
                        className={styles.itemImg}
                        src={`/cxf/api/images/400/laptops/${product["id"]}/${product["alt"]}.jpg`}
                        alt="Laptop"
                    />
                </LazyLoad>

                <label className={styles.itemInfo}>
                    <label className={styles.itemRating}>
                        {product["avg_rating"].toFixed(1)}{" "}
                        <FaStar className={styles.icon} size={10} />
                    </label>{" "}
                    - RAM {product["ram"]["size"]}GB - {product["hard_drive"]["type"]}{" "}
                    {product["hard_drive"]["size"] === 1024
                        ? "1TB"
                        : `${product["hard_drive"]["size"]}GB`}
                </label>

                <label className={styles.itemName}>{product["name"]}</label>

                <label className={styles.itemUnitPrice}>
                    {product["unit_price"].toLocaleString()}
                    <sup>đ</sup>
                </label>

                <label className={styles.itemOriginPrice}>
                    {(product["unit_price"] + product["discount_price"]).toLocaleString()}
                    <sup>đ</sup>
                </label>
            </div>
        );
    };

    const EmptyItem = () => (
        <div className={styles.itemBlock}>
            <ReactPlaceHolder type="rect" className={styles.imgHolder} showLoadingAnimation />
            {[...Array(4)].map((_) => (
                <ReactPlaceHolder type="textRow" showLoadingAnimation />
            ))}
        </div>
    );

    return (
        <div className={styles.category}>
            <header className={styles.categoryHeader}>{title}</header>
            <div className={styles.itemList}>
                {loading
                    ? [...Array(8)].map((x) => <EmptyItem />)
                    : products.map((product) => <Item product={product} />)}
            </div>
            <button className={styles.moreBtn} onClick={toggleMore}>
                Xem thêm
            </button>
        </div>
    );
};

export default withRouter(ItemCategory);
