import React, { memo, useMemo } from "react";
import ReactImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import { SC } from "./styles";

const Slider = () => {
    const images = useMemo(
        () => [
            {
                original: "https://i.ibb.co/sQN21DW/acer-1200-140-1200x140.png",
                description: "/search?name=acer",
                originalAlt: "Acer Discount",
            },
            {
                original: "https://i.ibb.co/QkPxqJD/dell-1200-140-1200x140.png",
                description: "/search?name=dell",
                originalAlt: "Dell Discount",
            },
            {
                original: "https://i.ibb.co/Msw2s3w/hp-1200-140-1200x140.png",
                description: "/search?name=hp",
                originalAlt: "HP Discount",
            },
            {
                original: "https://i.ibb.co/jWkyHzZ/lenovo-1200-140-1200x140.png",
                description: "/search?name=lenovo",
                originalAlt: "Lenovo Discount",
            },
        ],
        []
    );

    return (
        <SC.Container>
            <ReactImageGallery
                items={images}
                showThumbnails={false}
                showBullets={true}
                showFullscreenButton={false}
                showPlayButton={false}
                disableKeyDown={true}
                renderItem={(i) => (
                    <Link to={i?.description ?? ""}>
                        <img src={i.original} alt={i.originalAlt} />
                    </Link>
                )}
            />
        </SC.Container>
    );
};

export default memo(Slider);
