import { Outlet } from "react-router-dom";

import Footer from "@web/components/Common/Footer";
import NavBar from "@web/components/Mobile/NavBar";

import styles from "./HomePage.module.css";
import Header from "@web/components/Common/Header";

const HomePage = () => {


    return (
        <div className={styles.page_layout} >

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