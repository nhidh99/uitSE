import React from "react";
import { Label, Col, Row, ListGroup, ListGroupItem } from "reactstrap";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import ReplyBlock from "./components/ReplyBlock";

const QuestionList = (props) => {
    const comments = props.comments;
    return (
        <ListGroup className={styles.listGroup}>
            {comments.map((comment) => {
                const replies = comment["replies"];
                const commentDate = comment
                    ? new Date(
                        comment["comment_date"]["year"],
                        comment["comment_date"]["monthValue"] - 1,
                        comment["comment_date"]["dayOfMonth"]
                    )
                    : null;
                return (
                    <ListGroupItem>
                        <Row>
                            <Col sm="2" className={styles.blockLeft}>
                                <Label className={styles.commentAuthor}>
                                    {comment["user"]["name"]}
                                </Label>
                                <br />
                                <Label>{commentDate.toLocaleDateString()}</Label>
                            </Col>
                            <Col sm="10" className={styles.blockRight}>
                                <Label className={styles.question}>
                                    {comment["question"]}
                                </Label>
                                <ReplyBlock comment={comment} replies={replies}/>
                                <br />
                                <Link
                                    id={"toggler-" + comment["id"] }
                                    style={{ marginBottom: "1rem" }}
                                >
                                    Gửi trả lời
                        </Link>
                            </Col>
                        </Row>
                    </ListGroupItem>
                );
            })}
        </ListGroup>
    );
};

export default QuestionList;
