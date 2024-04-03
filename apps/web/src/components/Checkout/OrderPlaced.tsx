import { Link } from "react-router-dom";

import PrimaryButton from "../Common/PrimaryButton";
import ConfettiImage from "@web/assets/images/confetti.png";
import { route } from "@web/routes";

import styles from "./OrderPlaced.module.css";
import LogoAndName from "../Common/LogoAndName";


const OrderPlaced = () => {
    return (
        <div className={styles.order_placed_page_layout}>

            <LogoAndName />

            <div className={styles.order_placed_container}>

                <img src={ConfettiImage} alt="" className={styles.image} />

                <p className={styles.main_message} >Order is placed successfully!</p>

                <p className={styles.secondary_message}>You  will be receiving a confirmation email with
                    order details</p>


                <Link to={route.home} className={styles.link}>
                    <PrimaryButton text="Go back to Home page" className={styles.button} />
                </Link>

            </div>

        </div>
    );
}

export default OrderPlaced;