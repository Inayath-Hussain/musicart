import { useContext, useEffect, useState } from "react";
import styles from "./InvoiceDetailPage.module.css";
import { authTokenContext } from "@web/context/authTokens";
import { IOrderDetail, OrderNotFound, getOrderService } from "@web/services/order/getOrder";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { route } from "@web/routes";
import { UnauthorizedError } from "@web/services/errors";
import { useOnline } from "@web/hooks/useOnline";
import CheckoutStylePage from "../Common/CheckoutStylePage";
import { toast } from "react-toastify";


const InvoiceDetailPage = () => {

    const { logout } = useContext(authTokenContext);
    const { isOnline } = useOnline();

    const { pathname } = useLocation();
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const call = () => {

            if (isOnline === false) {
                toast("you are offline")
                return
            }

            if (!id) return navigate(route.home)

            setIsLoading(true);
            getOrderService(id)
                .then(data => {
                    setOrderDetail(data)
                    setIsLoading(false);
                })
                .catch(err => {
                    switch (true) {
                        case (err instanceof UnauthorizedError):
                            navigate(route.users.login + "?path=" + pathname)
                            toast("Please login again")
                            logout();
                            return

                        case (err instanceof OrderNotFound):
                            navigate(route.home);
                            toast("Order Not Found")
                            return


                        default:
                            navigate(route.home)
                            toast(err.message)
                            return

                    }


                })
        }


        call();
    }, [])


    const [orderDetail, setOrderDetail] = useState<IOrderDetail | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    return (
        orderDetail ?

            <CheckoutStylePage displayRoute="Home / Invoice" type="invoice" products={orderDetail.products}

                address={orderDetail.address} paymentMethod={orderDetail.paymentMethod}

                total_items_price={orderDetail.total_items_price} convenienceFee={orderDetail.deliveryFee} total_amount={orderDetail.total_amount}
            />
            :

            isLoading ?

                <h1 className={styles.message}>Please wait ... fetching your order</h1>

                :

                <h1 className={styles.message}>Something went wrong</h1>
    );
}

export default InvoiceDetailPage;