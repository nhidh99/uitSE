import React, { Fragment, useEffect, useState } from "react";
import FacebookSync from "./components/FacebookSync";
import GoogleSync from "./components/GoogleSync";
import userApi from "../../../../../../../../services/api/userApi";

const SocialMediaSync = () => {
    const [auth, setAuth] = useState({ fbAuth: null, googleAuth: null });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await userApi.getCurrentUserSocialAuth();
        const auth = response.data;
        setAuth({ fbAuth: auth["FACEBOOK"], googleAuth: auth["GOOGLE"] });
    };

    return (
        <Fragment>
            <FacebookSync auth={auth["fbAuth"]} />
            <GoogleSync auth={auth["googleAuth"]} />
        </Fragment>
    );
};

export default SocialMediaSync;
