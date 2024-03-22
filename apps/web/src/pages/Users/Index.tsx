import { Outlet } from "react-router-dom";

import Logo from "@web/assets/images/music-cart-logo.png"
import styles from "./index.module.css";

const UserPage = () => {
    return (
        <div className={styles.page_container}>
            <main className={styles.main_container}>

                <div className={styles.branding_container}>
                    <img src={Logo} alt="" className={styles.logo} />
                    <p>Musicart</p>
                </div>

                <Outlet />
            </main>

            <footer className={styles.footer_container}>
                Musicart | All rights reserved
            </footer>
        </div>
    );
}

export default UserPage;