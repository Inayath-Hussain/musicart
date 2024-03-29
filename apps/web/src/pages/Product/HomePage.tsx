
import NavBar from "@web/components/Products/NavBar";

import styles from "./HomePage.module.css";
import Footer from "@web/components/Common/Footer";
import { Outlet } from "react-router-dom";

const HomePage = () => {
    return (
        <div className={styles.page_layout} >

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