import React from "react";
import ItemList from "../../components/ItemList";
import QuestionToolbar from "./components/QuestionToolbar";
import QuestionItems from "./components/QuestionItems";
import QuestionTable from "./components/QuestionTable";
import questionAPI from "@/services/api/questionAPI";

function QuestionList() {
    return (
        <ItemList
            toolbar={<QuestionToolbar />}
            mobileVersion={<QuestionItems />}
            desktopVersion={<QuestionTable />}
            fetchAPI={questionAPI.getByPage}
        />
    );
}

export default QuestionList;
