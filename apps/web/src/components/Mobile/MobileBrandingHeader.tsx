
import Logo from "@web/assets/images/music-cart-logo.png";

import styles from "./MobileBrandingHeader.module.css";



interface Iprops {
    className?: string
}


/**
 * this is rendered only in mobile devices and tabs
 */
const MobileBrandingHeader: React.FC<Iprops> = ({ className = "" }) => {
    return (
        <header className={`${styles.mobile_branding_container} ${className}`}>
            <img src={Logo} alt="" className={styles.mobile_logo} />
            <p>Musicart</p>
        </header>
    );
}

export default MobileBrandingHeader;