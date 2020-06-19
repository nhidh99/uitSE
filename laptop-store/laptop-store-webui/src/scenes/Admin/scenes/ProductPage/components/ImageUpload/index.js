/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import styles from "./styles.module.scss";
import store from "../../../../../../services/redux/store";
import { setImages } from "../../../../../../services/redux/actions";

const ImageUpload = ({ defaultURLs }) => {
    const [pictures, setPictures] = useState([]);
    const [urls, setUrls] = useState(defaultURLs);

    useEffect(() => {
        const images = {
            deleteIds: defaultURLs
                .filter((url) => !urls.includes(url))
                .map((url) => parseInt(url.split("/")[6])),
            uploads: pictures,
        };
        store.dispatch(setImages(images));
    }, [pictures]);

    const onDrop = (pictures, urls) => {
        setPictures(pictures);
        setUrls(urls);
        console.log(urls);
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
            defaultImages={urls}
        />
    );
};

export default ImageUpload;
