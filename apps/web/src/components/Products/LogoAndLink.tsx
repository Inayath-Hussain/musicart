import { Link } from "react-router-dom";

import Logo from "@web/assets/images/music-cart-logo.png";
import ViewCart from "@web/assets/icons/view_cart.svg"
import { route } from "@web/routes";

import styles from "./LogoAndLink.module.css";
import Profile from "./Profile";


const LogoAndLink = () => {
    return (
        <div className={`${styles.flex} ${styles.logo_and_links_section_container}`}>

            <div className={`${styles.flex} ${styles.logo_and_links_container}`}>
                <div className={styles.logo_container}>
                    <img src={Logo} alt="" />

                    <div className={`${styles.flex} ${styles.text_container}`}>

                        <h1>Musicart</h1>

                        <Link to={route.home}>
                            Home
                        </Link>

                        {/*  */}
                        <Link to={route.invoices}>
                            Invoice
                        </Link>

                    </div>
                </div>
            </div>




            <div className={`${styles.flex} ${styles.cart_and_profile_container}`}>

                <Link to={route.cart} className={`${styles.flex} ${styles.cart_link}`}>
                    <img src={ViewCart} alt="" />

                    <p>View Cart</p>

                    0
                </Link>


                <Profile />

            </div>

        </div>
    );
}

export default LogoAndLink;