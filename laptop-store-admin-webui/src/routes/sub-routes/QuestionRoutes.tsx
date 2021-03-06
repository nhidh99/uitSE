import { PATHS } from "@/constants/paths";
import QuestionList from "@/pages/Home/pages/QuestionList/QuestionList";
import React, { memo } from "react";
import { Switch } from "react-router-dom";
import AuthenticatedGuard from "../AuthenticatedGuard";

function QuestionRoutes() {
    return (
        <Switch>
            <AuthenticatedGuard exact path={PATHS.QUESTIONS} component={QuestionList} />
        </Switch>
    );
}

export default memo(QuestionRoutes);
