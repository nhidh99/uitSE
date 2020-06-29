import React from "react";
import { Col, Input, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaInstagram, FaYoutube,  } from 'react-icons/fa';
import styles from './styles.module.scss';
const Footer = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <Row>
                    <Col sm="7">
                            <div className={styles.header}>
                                <p className={styles.paragraph}><b>Thông tin liên hệ </b>
                                </p>
                            </div>
                            <div className={styles.contact}>
                                <p className={styles.paragraph}><b>Địa chỉ:</b> Lớp KTPM2017 - Trường đại học Công Nghệ Thông Tin
                            </p>
                                <p className={styles.paragraph}><b>Điện thoại: </b>
                                0782369351 (Đạt) / 0336887109 (Nhi)
                            </p>
                                <p className={styles.paragraph}><b>Email: </b>
                                    17520343@gm.uit.edu.vn / 17520853@gm.uit.edu.vn
                                </p>
                            </div>
                        </Col>
                        <Col sm="5">
                            {/* <p className={styles.paragraph}>
                                © 2020 DT Laptop Store
                            </p> */}
                            <div className={styles.header}>
                                <p className={styles.paragraph}><b>Liên kết </b>
                                </p>
                            </div>
                            <div className={styles.connect}>
                                <FaFacebook />
                                <FaGithub className={styles.icon} />
                                <FaInstagram className={styles.icon}/>
                                <FaYoutube className={styles.icon}/>
                            </div>
                        </Col>
                        
                    </Row>

                </div>
            </div>
        </footer>

    );
}
export default Footer;