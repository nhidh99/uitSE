/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { SC } from "./styles";
import { FaPaperPlane } from "react-icons/fa";

type RatingReplyProps = {
    ratingId: number;
};

const RatingReply = ({ ratingId }: RatingReplyProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const openReply = () => setIsOpen(!isOpen);

    return (
        <>
            <SC.ReplySwitch onClick={openReply}>Gửi trả lời</SC.ReplySwitch>
            {isOpen ? (
                <>
                    <SC.ReplyBox
                        rows={5}
                        placeholder="Gửi câu trả lời của bạn"
                    />
                    <SC.ReplySubmit>
                        <FaPaperPlane />
                        Gửi trả lời
                    </SC.ReplySubmit>
                </>
            ) : null}
        </>
    );
};

export default RatingReply;
