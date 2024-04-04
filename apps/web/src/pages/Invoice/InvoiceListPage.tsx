import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import GoBackButton from "@web/components/Common/GoBackButton";
import InvoiceIcon from "@web/components/Icons/Invoice";
import InvoiceItem from "@web/components/Invoice/Item";
import { authTokenContext } from "@web/context/authTokens";
import { useOnline } from "@web/hooks/useOnline";
import { route } from "@web/routes";
import { UnauthorizedError } from "@web/services/errors";
import { IOrderList, getOrderListService } from "@web/services/order/getOrderList";
import { userSliceSelector } from "@web/store/slices/userSlice";

import styles from "./InvoiceList.module.css";
import DesktopBranding from "@web/components/Desktop/DesktopBrandingAndProfile";
import useDeviceWidth from "@web/hooks/useDeviceWidth";



const InvoiceListPage = () => {

    const { logout } = useContext(authTokenContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { isOnline } = useOnline();
    const { name } = useSelector(userSliceSelector);

    const { isDesktop } = useDeviceWidth();

    const redirectURL = route.users.login + "?path=" + pathname

    useEffect(() => {

        const call = async () => {
            if (isOnline === false) {
                // you are offline toast
                setError("You are offline")
                return
            }

            setLoading(true)
            getOrderListService()
                .then(data => {
                    setOrders(data);
                    setLoading(false);
                    setError("");
                })
                .catch(err => {
                    setLoading(false);
                    setError("Something went wrong");

                    switch (true) {
                        case (err instanceof UnauthorizedError):
                            navigate(redirectURL);
                            logout();
                            // please login again toast
                            return

                        default:
                            // Please try again later toast
                            navigate(route.home)
                    }
                })



        }

        call();
    }, [])

    const [orders, setOrders] = useState<IOrderList[] | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");




    return (
        <div className={styles.invoice_list_page_layout}>

            {
                isDesktop &&
                <DesktopBranding>
                    Home / Invoices
                </DesktopBranding>
            }

            <GoBackButton text="Back to Home" />

            <div className={styles.header_container}>
                <InvoiceIcon />
                <h1>My Invoices</h1>
            </div>

            {
                orders ?
                    orders.length > 0 ?

                        // when user has placed atleast one order
                        <>
                            {orders.map(o => (
                                <InvoiceItem key={o._id} address={o.address} order_id={o._id} name={name} />
                            ))}
                        </>

                        :

                        // when user hasn't placed any order
                        <h1 className={styles.message}>You have not placed any order yet</h1>

                    :

                    loading ?

                        // when data is still being fetched
                        <h1>Please wait fetching your orders ... </h1>
                        :

                        // when an error occured in fetching data 
                        <h1>{error}</h1>
            }

        </div>
    );
}

export default InvoiceListPage;