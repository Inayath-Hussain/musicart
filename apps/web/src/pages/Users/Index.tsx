import { Outlet } from "react-router-dom";

import Footer from "@web/components/Common/Footer";
import LogoAndName from "@web/components/Common/LogoAndName";
import MobileBrandingHeader from "@web/components/Mobile/MobileBrandingHeader";

import styles from "./index.module.css";


const UserPage = () => {
    return (
        <div className={styles.page_container}>
            <main className={styles.main_container}>

                <MobileBrandingHeader />

                {/* this is rendered only in pc's */}
                <LogoAndName />

                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default UserPage;