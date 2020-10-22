/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import styles from "./styles.module.scss";
import {
    FaTrophy,
    FaMoneyCheck,
    FaCoins,
    FaQuestionCircle,
    FaStar,
    FaMoneyBillWave,
} from "react-icons/fa";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import userApi from "../../../../../../services/api/userApi";

const RewardPage = () => {
    const [loading, setLoading] = useState(true);
    const [rewards, setRewards] = useState([]);

    const items = [
        {
            id: "ORDER",
            label: "Khách hàng gắn bó",
            desc: "Có _ đơn hàng được giao thành công",
            icon: <FaMoneyCheck size={50} color="#3b5998" />,
        },
        {
            id: "MONEY",
            label: "Thương gia thân thiết",
            desc: "Tổng trị giá các đơn hàng đạt _",
            icon: <FaMoneyBillWave size={50} color="forestgreen" />,
        },
        {
            id: "PROMOTION",
            label: "Thợ săn khuyến mãi",
            desc: "Tổng trị giá khuyến mãi các đơn hàng đạt _",
            icon: <FaCoins size={50} color="darkorange" />,
        },
        {
            id: "QUESTION",
            label: "Học giả tò mò",
            desc: "Có tổng số _ câu hỏi được duyệt",
            icon: <FaQuestionCircle size={50} color="purple" />,
        },
        {
            id: "RATING",
            label: "Chuyên gia thẩm định",
            desc: "Có tổng số _ đánh giá sản phẩm được duyệt",
            icon: <FaStar size={50} color="#f9d71c" />,
        },
    ];

    const colors = {
        NONE: "#282828",
        BRONZE: "#cd7f32",
        SILVER: "#68707c",
        GOLD: "fcc200",
    };

    const ItemBlock = ({ item, userReward }) => {
        const reward = userReward["reward"];
        const level = userReward["level"];
        const color = colors[level];
        const nextValue = {
            NONE: reward["bronze_value"],
            BRONZE: reward["silver_value"],
            SILVER: reward["gold_value"],
            GOLD: reward["gold_value"],
        }[level];

        return (
            <div className={styles.itemBlock}>
                <div className={styles.blockLeft}>{item["icon"]}</div>

                <div className={styles.blockCenter}>
                    <label className={styles.rewardTitle}>{item["label"]}</label>
                    <br />
                    <label className={styles.rewardDesc}>
                        {item["desc"].replace("_", nextValue.toLocaleString())}
                        <sup>{["MONEY", "PROMOTION"].includes(item["id"]) ? "đ" : ""}</sup>
                    </label>
                    <br />
                    <label className={styles.rewardProgress}>
                        <em>
                            Hiện tại đã đạt: {userReward["cur_value"].toLocaleString()}
                            <sup>{["MONEY", "PROMOTION"].includes(item["id"]) ? "đ" : ""}</sup>
                        </em>
                    </label>
                </div>

                <div className={styles.blockRight}>
                    <FaTrophy size={40} color={color} />
                </div>
            </div>
        );
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await userApi.getCurrentUserRewards();
            const rewards = response.data;
            setRewards(rewards);
            setLoading(false);
        } catch (err) {
            console.log("fail");
        }
    };

    return (
        <Fragment>
            <div className={styles.title}>
                <label className={styles.header}>
                    <FaTrophy />
                    &nbsp;&nbsp;DANH SÁCH CỘT MỐC
                </label>
            </div>
            {loading ? (
                <EmptyBlock
                    loading={loading}
                    icon={<FaTrophy />}
                    loadingText="Đang tải các cột mốc"
                />
            ) : (
                items.map((item) => (
                    <ItemBlock
                        item={item}
                        userReward={rewards.find((r) => r["type"] === item["id"])}
                    />
                ))
            )}
        </Fragment>
    );
};

export default withRouter(RewardPage);
