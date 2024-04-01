import { PropsWithChildren, useContext } from "react";
import { useSelector } from "react-redux";

import Profile from "../Products/Profile";
import Logo from "@web/assets/images/music-cart-logo.png";
import ViewCart from "@web/assets/icons/view_cart.svg"
import { Link } from "react-router-dom";
import { route } from "@web/routes";
import { cartSelector } from "@web/store/slices/cartItems";

import styles from "./DesktopBrandingAndProfile.module.css"
import { authTokenContext } from "@web/context/authTokens";



const DesktopBranding: React.FC<PropsWithChildren> = ({ children }) => {

    const { accessToken, refreshToken } = useContext(authTokenContext);


    const { total } = useSelector(cartSelector)

    return (
        <div className={`${styles.flex} ${styles.logo_and_links_section_container}`}>

            <div className={`${styles.flex} ${styles.logo_and_links_container}`}>
                <div className={styles.logo_container}>
                    <img src={Logo} alt="" />

                    <div className={`${styles.flex} ${styles.text_container}`}>

                        <h1>Musicart</h1>

                        {children}

                    </div>
                </div>
            </div>



            {
                (accessToken || refreshToken) &&

                <div className={`${styles.flex} ${styles.cart_and_profile_container}`}>

                    <Link to={route.cart} className={`${styles.flex} ${styles.cart_link}`}>
                        <img src={ViewCart} alt="" />

                        <p>View Cart</p>

                        {total}
                    </Link>


                    <Profile />

                </div>
            }

        </div>
    );
}

export default DesktopBranding;