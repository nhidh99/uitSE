import React from "react";
import ItemList from "../../components/ItemList";
import RatingToolbar from "./components/RatingToolbar";
import RatingItems from "./components/RatingItems";
import RatingTable from "./components/RatingTable";
import ratingAPI from "@/services/api/ratingAPI";

function RatingList() {
    return (
        <ItemList
            toolbar={<RatingToolbar />}
            mobileVersion={<RatingItems />}
            desktopVersion={<RatingTable />}
            fetchAPI={ratingAPI.getByPage}
        />
    );
}

export default RatingList;
