import React from "react";
import ItemList from "../../components/ItemList";
import PromotionItems from "./components/PromotionItems";
import PromotionTable from "./components/PromotionTable";
import PromotionToolbar from "./components/PromotionToolbar";
import promotionAPI from "@/services/api/promotionAPI";

function PromotionList() {
    return (
        <ItemList
            toolbar={<PromotionToolbar />}
            mobileVersion={<PromotionItems />}
            desktopVersion={<PromotionTable />}
            fetchAPI={promotionAPI.getByPage}
        />
    );
}

export default PromotionList;
