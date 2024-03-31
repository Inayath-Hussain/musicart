import Logo from "@web/assets/images/music-cart-logo.png"

import styles from "./LogoAndName.module.css";


/**
 * this is rendered only in bigger screen's(768px and above)
 */
const LogoAndName = () => {
    return (
        <div className={styles.branding_container}>
            <img src={Logo} alt="" className={styles.logo} />
            <p>Musicart</p>
        </div>
    );
}

export default LogoAndName;