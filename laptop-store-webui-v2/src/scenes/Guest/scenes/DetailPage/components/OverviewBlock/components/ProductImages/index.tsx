import React from "react";
import ReactImageGallery from "react-image-gallery";
import { SC } from "./styles";
import "react-image-gallery/styles/css/image-gallery.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../../services/redux/rootReducer";

const ProductImages = () => {
    const { productId, productAlt, imageIds } = useSelector((state: RootState) => {
        const spec = state.product?.spec;
        const imageIds = state.product?.image_ids ?? [];
        return {
            productId: spec?.id,
            productAlt: spec?.alt,
            imageIds: imageIds,
        };
    });

    const images = [
        {
            fullscreen: `/api/images/1000/laptops/${productId}/${productAlt}.jpg`,
            original: `/api/images/400/laptops/${productId}/${productAlt}.jpg`,
            thumbnail: `/api/images/150/laptops/${productId}/${productAlt}.jpg`,
            thumbnailClass: "thumbnail",
        },
    ].concat(
        imageIds.map((id) => ({
            fullscreen: `/api/images/1000/details/${id}/${productAlt}.jpg`,
            original: `/api/images/400/details/${id}/${productAlt}.jpg`,
            thumbnail: `/api/images/150/details/${id}/${productAlt}.jpg`,
            thumbnailClass: "thumbnail",
        }))
    );

    return (
        <SC.Container>
            <ReactImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={true}
                showNav={false}
                slideDuration={0}
            />
        </SC.Container>
    );
};

export default ProductImages;
