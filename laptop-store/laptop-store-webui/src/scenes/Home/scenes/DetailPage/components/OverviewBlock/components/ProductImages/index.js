import React from "react";
import ReactImageGallery from "react-image-gallery";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import "react-image-gallery/styles/scss/image-gallery.scss";

const ProductImages = () => {
    const images = useSelector((state) => {
        if (!state.productDetail) return [];
        const { product, imageIds } = state.productDetail;
        return [
            {
                fullscreen: `/cxf/api/images/1000/laptops/${product["id"]}/${product["alt"]}.jpg`,
                original: `/cxf/api/images/400/laptops/${product["id"]}/${product["alt"]}.jpg`,
                thumbnail: `/cxf/api/images/150/laptops/${product["id"]}/${product["alt"]}.jpg`,
                thumbnailClass: styles.thumbnail,
            },
        ].concat(
            imageIds.map((id) => ({
                fullscreen: `/cxf/api/images/1000/details/${id}/${product["alt"]}.jpg`,
                original: `/cxf/api/images/400/details/${id}/${product["alt"]}.jpg`,
                thumbnail: `/cxf/api/images/150/details/${id}/${product["alt"]}.jpg`,
                thumbnailClass: styles.thumbnail,
            }))
        );
    });

    return (
        <div className={styles.gallery}>
            <ReactImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={true}
                showNav={false}
                slideDuration={0}
            />
        </div>
    );
};

export default ProductImages;
