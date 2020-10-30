import QuestionFormValues from "../../values/forms/QuestionFormValues";
import axiosAuthClient from "../axios/axiosAuthClient";

const questionApi = {
    postQuestion(data: QuestionFormValues) {
        const url = "/questions";
        return axiosAuthClient.post(url, data);
    },
};

export default questionApi;
