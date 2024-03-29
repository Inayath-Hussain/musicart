import { Outlet } from "react-router-dom";

import Logo from "@web/assets/images/music-cart-logo.png"
import styles from "./index.module.css";
import Footer from "@web/components/Common/Footer";
import MobileBrandingHeader from "@web/components/Mobile/MobileBrandingHeader";

const UserPage = () => {
    return (
        <div className={styles.page_container}>
            <main className={styles.main_container}>

                <MobileBrandingHeader />

                {/* this is rendered only in pc's */}
                <div className={styles.branding_container}>
                    <img src={Logo} alt="" className={styles.logo} />
                    <p>Musicart</p>
                </div>

                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default UserPage;