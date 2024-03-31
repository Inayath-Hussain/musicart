import { Link, useLocation } from "react-router-dom";

import HomeLogo from "@web/assets/icons/home.svg";
import CartLogo from "@web/assets/icons/cart.svg";
import InvoiceLogo from "@web/assets/icons/invoice.svg";
import AccountLogo from "@web/assets/icons/account.svg";
import { route } from "@web/routes";

import styles from "./NavBar.module.css";


const NavBar = () => {

    const { pathname } = useLocation();


    const getLineClass = (route: string) => route === pathname ? `${styles.line} ${styles.active_link_line}` : styles.line

    const getInvoiceClass = () => pathname === route.cart || pathname === route.checkout ? styles.hide : styles.link

    return (
        <footer className={styles.footer_container} >
            <Link to={route.home} className={styles.link} >
                <div className={getLineClass(route.home)} />
                <img src={HomeLogo} alt="" />
                <p>Home</p>
            </Link>

            <Link to={route.cart} className={styles.link} >
                <div className={getLineClass(route.cart)} />

                <div className={styles.total_cart_items}>0</div>
                <img src={CartLogo} alt="" />
                <p>Cart</p>
            </Link>

            <Link to={route.invoices} className={getInvoiceClass()} >
                <div className={getLineClass(route.invoices)} />
                <img src={InvoiceLogo} alt="" />
                <p>Invoice</p>
            </Link>

            <Link to={route.users.login} className={styles.link} >
                <div className={getLineClass(route.users.login)} />
                <img src={AccountLogo} alt="" />
                <p>Login</p>
            </Link>

        </footer>
    );
}

export default NavBar;