/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "./styles.module.scss";
import store from "../../../../../../services/redux/store";
import { setImages } from "../../../../../../services/redux/actions";
import ImageUploader from "../ImageUploader";

const ProductUploader = ({ defaultURLs }) => {
    const onDrop = (pictures, urls) => {
        const images = {
            deleteIds: defaultURLs
                .filter((url) => !urls.includes(url))
                .map((url) => parseInt(url.split("/")[6])),
            uploads: pictures,
        };
        console.table(pictures);
        console.table(urls);
        store.dispatch(setImages(images));
    };

    return (
        <ImageUploader
            id="img-uploader"
            withIcon={true}
            withLabel={false}
            withPreview={true}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            buttonText="Chọn hình ảnh"
            fileSizeError="có kích thước quá lớn"
            fileTypeError="không được hỗ trợ"
            className={styles.uploader}
            defaultImages={defaultURLs} 
        />
    );
};

export default ProductUploader;
