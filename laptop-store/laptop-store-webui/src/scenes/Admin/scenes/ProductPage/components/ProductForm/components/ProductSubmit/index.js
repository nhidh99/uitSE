import React from "react";
import { Button } from "reactstrap";
import laptopApi from "../../../../../../../../services/api/laptopApi";

const ProductSubmit = ({ product, disabled }) => {
    const submit = async (e) => {
        e.target.disabled = true;
        const details = buildDetailsData();
        const image = buildProductImageData();

        const detailsJSON = new Blob([JSON.stringify(details)], { type: "application/json" });
        const imageBlob = image
            ? image
            : new File([new Blob()], "empty.jpg", { type: "image/jpeg" });

        const formData = new FormData();
        formData.append("details", detailsJSON);
        formData.append("image", imageBlob);

        try {
            await (product
                ? laptopApi.putLaptop(product["id"], formData)
                : laptopApi.postLaptop(formData));
            window.location.reload();
        } catch (err) {
            console.log("fail");
        }
    };

    const buildDetailsData = () => {
        return [
            buildProductStringData(),
            buildProductIntData(),
            buildProductFloatData(),
            buildProductArrayData(),
        ].reduce((a, b) => Object.assign(a, b));
    };

    const buildProductStringData = () => {
        const output = {};
        [
            "name",
            "brand",
            "cpu-type",
            "cpu-detail",
            "ram-type",
            "hd-type",
            "hd-detail",
            "resolution-type",
            "graphics-card",
            "ports",
            "os",
            "design",
        ].forEach((name) => {
            const input = document.getElementById(name);
            output[name] = input.value;
        });
        return output;
    };

    const buildProductIntData = () => {
        const output = {};
        [
            "unit-price",
            "discount-price",
            "quantity",
            "ram-size",
            "ram-bus",
            "ram-extra-slot",
            "hd-size",
            "resolution-width",
            "resolution-height",
        ].forEach((name) => {
            const input = document.getElementById(name);
            output[name] = parseInt(input.value.replace(/,/g, ""));
        });

        output["cpu-id"] = product ? product["cpu"]["id"] : null;
        output["ram-id"] = product ? product["ram"]["id"] : null;
        output["monitor-id"] = product ? product["monitor"]["id"] : null;
        output["hd-id"] = product ? product["hard_drive"]["id"] : null;

        return output;
    };

    const buildProductFloatData = () => {
        const output = {};
        ["cpu-speed", "cpu-max-speed", "monitor-size", "thickness", "weight"].forEach((name) => {
            const input = document.getElementById(name);
            output[name] = parseFloat(input.value.replace(/,/g, ""));
        });
        return output;
    };

    const buildProductArrayData = () => {
        const output = {};
        ["promotions", "tags"].forEach((name) => {
            const inputs = Array.from(document.querySelectorAll(`input[name=${name}]:checked`));
            output[name] = inputs.map((input) => parseInt(input.value));
        });
        return output;
    };

    const buildProductImageData = () => {
        const files = document.getElementById("image").files;
        return files.length > 0 ? files[0] : null;
    };

    return (
        <Button color="success" disabled={disabled} onClick={submit}>
            Xác nhận
        </Button>
    );
};

export default ProductSubmit;
