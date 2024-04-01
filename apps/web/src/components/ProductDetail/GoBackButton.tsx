import { Link } from "react-router-dom";

import GoBack from "@web/assets/icons/go_back.svg";
import useDeviceWidth from "@web/hooks/useDeviceWidth";
import { route } from "@web/routes";

import styles from "./GoBackButton.module.css";


const GoBackButton = () => {

    const { isDesktop } = useDeviceWidth()

    return (
        <Link to={route.home} className={styles.go_back_link}>
            {isDesktop ?
                <button className={styles.desktop_button}>
                    Back to products
                </button>
                :
                <button className={styles.go_back_button}>
                    <img src={GoBack} alt="" />
                </button>
            }
        </Link>
    );
}

export default GoBackButton;