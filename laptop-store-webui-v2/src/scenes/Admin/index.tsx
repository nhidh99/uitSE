import React, { useMemo } from "react";
import { FaBoxes, FaComment, FaGift, FaLaptop, FaQuestionCircle, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import Loader from "../../components/Loader";
import MenuBar from "../../components/MenuBar";
import { RootState } from "../../services/redux/rootReducer";
import MenuItemProps from "../../values/props/MenuItemProps";
import OrderPage from "./scenes/OrderPage";
import ProductPage from "./scenes/ProductPage";
import PromotionPage from "./scenes/PromotionPage";
import { SC } from "./styles";
import queryString from "query-string";

const Admin = () => {
    const loaderStatus = useSelector((state: RootState) => state.loaderStatus);

    const items = useMemo<MenuItemProps[]>(() => {
        const initialSearch = queryString.stringify({
            page: 1,
            order: "desc",
            target: "id",
        });
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
                search: initialSearch,
            },
            {
                icon: FaQuestionCircle,
                link: "/admin/comments",
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
                    <Loader loading={loaderStatus.isLoading} loadOnce={loaderStatus.isFetching} />
                    <SC.ContentContainer
                        style={{
                            display: loaderStatus.isFetching ? "none" : "inherit",
                        }}
                    >
                        <Switch>
                            <Route exact path="/admin/products" component={ProductPage} />
                            <Route exact path="/admin/promotions" component={PromotionPage} />
                            <Route exact path="/admin/orders" component={OrderPage} />
                        </Switch>
                    </SC.ContentContainer>
                </SC.LoaderContainer>
            </SC.RightContainer>
        </SC.Container>
    );
};

export default Admin;
