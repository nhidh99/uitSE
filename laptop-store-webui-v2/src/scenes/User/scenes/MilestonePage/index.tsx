/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
    FaCoins,
    FaMoneyBillWave,
    FaMoneyCheck,
    FaQuestionCircle,
    FaStar,
    FaTrophy,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import userApi from "../../../../services/api/userApi";
import { fireFetching, skipFetching } from "../../../../services/redux/slices/loaderStatusSlice";
import MilestoneModel from "../../../../values/models/MilestoneModel";
import { SC } from "./styles";

const MilestonePage = () => {
    const [milestones, setMilestones] = useState<MilestoneModel[] | null>(null);
    const dispatch = useDispatch();

    const icons = useMemo(
        () => ({
            MONEY: <FaMoneyBillWave color="forestgreen" />,
            ORDER: <FaMoneyCheck color="#3b5998" />,
            PROMOTION: <FaCoins color="darkorange" />,
            QUESTION: <FaQuestionCircle color="purple" />,
            RATING: <FaStar color="#f9d71c" />,
        }),
        []
    ) as { [key: string]: ReactNode };

    const colors = useMemo(
        () => ({
            NONE: "#282828",
            BRONZE: "#cd7f32",
            SILVER: "#68707c",
            GOLD: "fcc200",
        }),
        []
    ) as { [key: string]: string };

    useEffect(() => {
        const loadData = async () => {
            dispatch(fireFetching());
            const response = await userApi.getCurrentUserMilestones();
            setMilestones(response.data);
            dispatch(skipFetching());
        };

        loadData();
    }, []);

    return (
        <SC.OuterContainer>
            {milestones?.map((milestone) => (
                <SC.MilestoneContainer>
                    <SC.IconContainer>{icons[milestone.id]}</SC.IconContainer>
                    <SC.InfoContainer>
                        <SC.Title>{milestone.title}</SC.Title>
                        <div>
                            {milestone.description.replace("_", milestone.target.toLocaleString())}
                        </div>
                        <div>
                            <i>Hiện tại đã đạt: {milestone.cur_value.toLocaleString()}</i>
                        </div>
                    </SC.InfoContainer>
                    <SC.TrophyContainer>
                        <FaTrophy size={30} color={colors[milestone.level]} />
                    </SC.TrophyContainer>
                </SC.MilestoneContainer>
            ))}
        </SC.OuterContainer>
    );
};

export default MilestonePage;
