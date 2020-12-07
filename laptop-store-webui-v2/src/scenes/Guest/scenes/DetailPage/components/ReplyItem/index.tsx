import React, { memo } from "react";
import { FaLaptop } from "react-icons/fa";
import ReplyModel from "../../../../../../values/models/ReplyModel";
import { SC } from "./styles";

type ReplyItemProps = {
    reply: ReplyModel;
};

const ReplyItem = ({ reply }: ReplyItemProps) => (
    <SC.Container>
        <SC.Detail>{reply.detail}</SC.Detail>
        <SC.Info>
            <SC.Name>
                {reply.is_admin ? (
                    <FaLaptop style={{ marginBottom: "-2px", marginRight: "5px" }} />
                ) : null}
                {reply.author_name}
            </SC.Name>{" "}
            - {reply.created_at}
        </SC.Info>
    </SC.Container>
);

export default memo(ReplyItem);
