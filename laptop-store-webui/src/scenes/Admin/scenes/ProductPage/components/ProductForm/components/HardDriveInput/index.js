import React, { Fragment } from "react";
import { Input } from "reactstrap";

const HardDriveInput = (props) => {
    const { hd } = props;
    return (
        <Fragment>
            <span>
                <Input id="hd-type" type="select" defaultValue={hd?.["type"]}>
                    <option value="SSD">SSD</option>
                    <option value="HDD">HDD</option>
                </Input>
            </span>
            <span>
                <Input id="hd-size" type="select" defaultValue={hd?.["size"]}>
                    <option value="128">128 GB</option>
                    <option value="256">256 GB</option>
                    <option value="512">512 GB</option>
                    <option value="1024">1 TB</option>
                </Input>
            </span>
            <span>
                <Input
                    id="hd-detail"
                    type="text"
                    placeholder="Chi tiết ổ cứng"
                    defaultValue={hd?.["detail"]}
                />
            </span>
        </Fragment>
    );
};

export default HardDriveInput;
