import { Outlet, useLocation } from "react-router-dom";

import Footer from "@web/components/Common/Footer";
import Header from "@web/components/Common/Header";
import NavBar from "@web/components/Mobile/NavBar";
import { route } from "@web/routes";

import styles from "./HomePage.module.css";


const HomePage = () => {

    const { pathname } = useLocation();

    const fixedHeightClass = pathname === route.cart ? styles.fixed_height : ""

    return (
        <div className={`${styles.page_layout} ${fixedHeightClass}`} >

            <Header />

            <main className={styles.main_content_container}>
                <Outlet />
            </main>

            {/* render only in mobile */}
            <NavBar />

            {/* render only in pc's */}
            <Footer className={styles.rights_reserved_footer} />
        </div>
    );
}

export default HomePage;