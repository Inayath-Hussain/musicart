import { Link, useLocation } from "react-router-dom";

import PhoneLogo from "@web/assets/icons/phone.svg";
import MobileBrandingHeader from "../Mobile/MobileBrandingHeader";
import MobileSearchBarHeader from "../Mobile/MobileSearchBarHeader";
import { route } from "@web/routes";

import styles from "./Header.module.css"
import { useContext } from "react";
import { authTokenContext } from "@web/context/authTokens";

const Header = () => {

    const { pathname } = useLocation();

    const { accessToken, refreshToken, logout } = useContext(authTokenContext);

    const shouldDisplayBrandingHeader = pathname === route.checkout || pathname === route.invoices

    // add's class to hide branding component when user is not in appropriate route
    const mobileBrandingClass = shouldDisplayBrandingHeader ? "" : styles.hide;

    // add's class to hide search bar component when user is not in appropriate route
    const mobileSearchBarHeaderClass = shouldDisplayBrandingHeader ? styles.hide : ""

    return (
        <>

            {/* headers for mobile display */}
            {
                shouldDisplayBrandingHeader ?
                    <MobileBrandingHeader className={mobileBrandingClass} />
                    :
                    <MobileSearchBarHeader className={mobileSearchBarHeaderClass} />
            }





            {/* headers for pc's(devices with screen width of 768 and aboce) */}
            <div className={styles.container}>

                {/* contact number */}
                <div className={`${styles.flex} ${styles.contact_info_container}`}>
                    <img src={PhoneLogo} alt="" width={22} />
                    <p>912121131313</p>
                </div>



                {/* active offers advertisement */}
                <div className={`${styles.flex} ${styles.offers_container}`}>
                    <p>Get 50% off on selected items</p>

                    <div className={styles.vertical_line_offers} />

                    <p>Shop Now</p>
                </div>


                {/* login and register links */}
                <div className={`${styles.flex} ${styles.links_container}`}>

                    {
                        (accessToken || refreshToken) ?

                            <button className={styles.logout_button} onClick={logout}>
                                Logout
                            </button>
                            :
                            <>
                                <Link to={route.users.login}>
                                    <p>Login</p>
                                </Link>

                                <div className={styles.vertical_line_links} />

                                <Link to={route.users.register}>
                                    <p>Signup</p>
                                </Link>
                            </>
                    }
                </div>

            </div>
        </>
    );
}

export default Header;