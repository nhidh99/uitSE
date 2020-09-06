/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router";
import laptopApi from "../../../../services/api/laptopApi";
import LoadingBlock from "./components/LoadingBlock";
import store from "../../../../services/redux/store";
import { setProductDetail } from "../../../../services/redux/slices/productInfoSlice";
import OverviewBlock from "./components/OverviewBlock";
import ContentBlock from "./components/ContentBlock";
import SpecBlock from "./components/SpecBlock";

type LocationState = {
    loading: boolean;
};

const DetailPage = () => {
    const location = useLocation<LocationState>();
    const history = useHistory();
    const { productId } = useParams();

    const [loading, setLoading] = useState<boolean>(
        location.state?.loading ?? true
    );

    useEffect(() => {
        const loadData = async () => {
            try {
                const includes = {
                    images: true,
                    ratings: true,
                    comments: true,
                    promotions: true,
                    suggestions: true,
                };
                const response = await laptopApi.getById(productId, includes);
                const data = response.data;
                store.dispatch(setProductDetail(data));
                setLoading(false);
            } catch (err) {
                setLoading(true);
            }
        };

        window.scroll(0, 0);
        window.history.replaceState(null, "");
        if (isNaN(parseInt(productId))) {
            history.push("/");
            return;
        }
        loadData();
    }, []);

    return loading ? (
        <>
            {[...Array(5)].map((_) => (
                <LoadingBlock />
            ))}
        </>
    ) : (
        <>
            <ContentBlock
                title="Thong tin"
                component={OverviewBlock}
                show={true}
            />
            <ContentBlock
                title="Thông tin chi tiết"
                component={SpecBlock}
                show={true}
            />
        </>
    );
};

export default DetailPage;
