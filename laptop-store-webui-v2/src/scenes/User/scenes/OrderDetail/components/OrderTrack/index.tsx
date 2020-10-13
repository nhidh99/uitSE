import React from "react";
import OrderTrackModel from "../../../../../../values/models/OrderTrackModel";
import { SC } from "./styles";

type OrderTrackProps = {
    track: OrderTrackModel;
    step: number;
};
const OrderTrack = ({ track, step }: OrderTrackProps) => (
    <SC.Container>
        <SC.Step>{step}</SC.Step>
        <SC.LeftContainer>{track.status}</SC.LeftContainer>
        <SC.RightContainer>{track.created_at}</SC.RightContainer>
    </SC.Container>
);

export default OrderTrack;
