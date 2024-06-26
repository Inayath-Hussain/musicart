import { Link } from "react-router-dom";

import GoBack from "@web/assets/icons/go_back.svg";
import useDeviceWidth from "@web/hooks/useDeviceWidth";
import { route } from "@web/routes";

import styles from "./GoBackButton.module.css";


interface Iprops {
    link?: string
    text?: string
}

const GoBackButton: React.FC<Iprops> = ({ link = route.home, text = "Back to products" }) => {

    const { isDesktop } = useDeviceWidth()

    return (
        <Link to={link} className={styles.go_back_link}>
            {isDesktop ?
                <button className={styles.desktop_button}>
                    {text}
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