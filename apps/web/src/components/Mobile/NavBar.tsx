import { useContext } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import InvoiceIcon from "../Icons/Invoice";
import HomeLogo from "@web/assets/icons/home.svg";
import CartLogo from "@web/assets/icons/cart.svg";
import LoginLogo from "@web/assets/icons/account.svg";
import LogoutLogo from "@web/assets/icons/logout.svg";
import { authTokenContext } from "@web/context/authTokens";
import { route } from "@web/routes";
import { cartSelector } from "@web/store/slices/cartItems";

import styles from "./NavBar.module.css";


const NavBar = () => {

    const { pathname } = useLocation();

    const { accessToken, refreshToken, logout } = useContext(authTokenContext);
    const total_items = useSelector(cartSelector)


    const getLineClass = (route: string) => route === pathname ? `${styles.line} ${styles.active_link_line}` : styles.line

    const getInvoiceClass = () => pathname === route.cart || pathname === route.checkout ? styles.hide : styles.link


    // redirects user to login if not authenticated
    const getLink = (link: string) => accessToken || refreshToken ? link : route.users.login

    return (
        <footer className={styles.footer_container} >
            <Link to={route.home} className={styles.link} >
                <div className={getLineClass(route.home)} />
                <img src={HomeLogo} alt="" className={styles.image} />
                <p>Home</p>
            </Link>

            <Link to={getLink(route.cart)} className={styles.link} >
                <div className={getLineClass(route.cart)} />

                <div className={styles.total_cart_items}>{total_items}</div>
                <img src={CartLogo} alt="" className={styles.image} />
                <p>Cart</p>
            </Link>


            <Link to={getLink(route.invoices.index)} className={getInvoiceClass()} >
                <div className={getLineClass(route.invoices.index)} />
                {/* <img src={InvoiceLogo} alt="" /> */}
                <InvoiceIcon width={24} height={25} />
                <p>Invoice</p>
            </Link>

            {
                (accessToken || refreshToken) ?
                    <button className={`${styles.link} ${styles.button}`} onClick={logout} >
                        <div className={getLineClass(route.users.login)} />
                        <img src={LogoutLogo} alt="" className={styles.image} />
                        <p>Logout</p>
                    </button>
                    :
                    <Link to={route.users.login} className={styles.link} >
                        <div className={getLineClass(route.users.login)} />
                        <img src={LoginLogo} alt="" className={styles.image} />
                        <p>Login</p>
                    </Link>
            }

        </footer>
    );
}

export default NavBar;