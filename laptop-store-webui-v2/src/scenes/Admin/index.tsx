import React, { useMemo } from "react";
import { FaBoxes, FaComment, FaGift, FaLaptop, FaQuestionCircle, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import MenuBar from "../../components/MenuBar";
import { RootState } from "../../services/redux/rootReducer";
import MenuItemProps from "../../values/props/MenuItemProps";
import OrderPage from "./scenes/OrderPage";
import ProductPage from "./scenes/ProductPage";
import PromotionPage from "./scenes/PromotionPage";
import { SC } from "./styles";
import QuestionPage from "./scenes/QuestionPage";

const Admin = () => {
    const loaderStatus = useSelector((state: RootState) => state.loaderStatus);

    const items = useMemo<MenuItemProps[]>(() => {
        const initialSearch = {
            page: 1,
            order: "desc",
            target: "id",
        };
        return [
            {
                icon: FaLaptop,
                link: "/admin/products",
                title: "Sản phẩm",
                search: initialSearch,
            },
            {
                icon: FaGift,
                link: "/admin/promotions",
                title: "Khuyễn mãi",
                search: initialSearch,
            },
            {
                icon: FaBoxes,
                link: "/admin/orders",
                title: "Đơn hàng",
                search: { ...initialSearch, status: "pending" },
            },
            {
                icon: FaQuestionCircle,
                link: "/admin/questions",
                title: "Câu hỏi",
                search: initialSearch,
            },
            {
                icon: FaStar,
                link: "/admin/ratings",
                title: "Đánh giá",
                search: initialSearch,
            },
            {
                icon: FaComment,
                link: "/admin/replies",
                title: "Trả lời",
                search: initialSearch,
            },
        ];
    }, []);

    return (
        <SC.Container>
            <SC.LeftContainer>
                <MenuBar items={items} />
            </SC.LeftContainer>

            <SC.RightContainer>
                <SC.LoaderContainer>
                    <SC.ContentContainer
                        style={{
                            display: loaderStatus.isFetching ? "none" : "inherit",
                        }}
                    >
                        <Switch>
                            <Route exact path="/admin/products" component={ProductPage} />
                            <Route exact path="/admin/promotions" component={PromotionPage} />
                            <Route exact path="/admin/orders" component={OrderPage} />
                            <Route exact path="/admin/questions" component={QuestionPage} />
                        </Switch>
                    </SC.ContentContainer>
                </SC.LoaderContainer>
            </SC.RightContainer>
        </SC.Container>
    );
};

export default Admin;
