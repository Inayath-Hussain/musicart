import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { IhandleQuantityChange } from "./interface";
import GoBackButton from "@web/components/Common/GoBackButton";
import DesktopBranding from "@web/components/Desktop/DesktopBrandingAndProfile";
import DesktopCartPage from "@web/components/Desktop/CartPage";
import MobileCartPage from "@web/components/Mobile/CartPage";
import { authTokenContext } from "@web/context/authTokens";
import useDeviceWidth from "@web/hooks/useDeviceWidth";
import { useOnline } from "@web/hooks/useOnline";
import { AddToCartBodyError, addToCartService } from "@web/services/cart/addToCart";
import { UnauthorizedError } from "@web/services/errors";
import { EmptyCart, ICartData, getCartService } from "@web/services/cart/getCartItems";
import { updateCart, updateCartItem } from "@web/store/slices/cartItems";
import { route } from "@web/routes";


import styles from "./CartPage.module.css"
import { toast } from "react-toastify";



const CartPage = () => {

    const { accessToken, refreshToken, logout } = useContext(authTokenContext)

    const { isOnline } = useOnline();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const redirectRoute = `${route.users.login}?path=${pathname}`
    if (!accessToken || !refreshToken) {


        return (
            <Navigate to={redirectRoute} replace />
        )
    }

    const dispatch = useDispatch();

    // function to get cart user's cart data
    const call = () => {

        if (isOnline === false) return toast("you are offline")

        setLoading(true);
        getCartService()
            .then(result => {
                setLoading(false);
                if (result instanceof EmptyCart) {
                    toast("no cart items")
                    return navigate(route.home)
                }

                setCartData(result)
                dispatch(updateCart(Number(result.total_items)))
            })
            .catch(err => {
                setLoading(false);
                if (err instanceof UnauthorizedError) {
                    navigate(redirectRoute)
                    logout();
                    toast("please login again")
                    return
                }

                toast(err.message)
            })
    }

    useEffect(() => {
        call();
    }, [])

    const [loading, setLoading] = useState(false);

    const [cartData, setCartData] = useState<ICartData | null>(null);

    const [quantityOptions] = useState(Array.from({ length: 8 }, (_, index) => index + 1))

    const { isDesktop } = useDeviceWidth();



    const handleQuantityChange: IhandleQuantityChange = async (product_id, newQuantity, prevQuantity) => {

        if (isOnline === false) {
            toast("you are offline")
            return
        }

        addToCartService({ product_id, quantity: newQuantity })
            .then(result => {
                // get difference between previous quantity and now quantity
                const diff = newQuantity - prevQuantity
                dispatch(updateCartItem(diff))

                call();
            })
            .catch(err => {

                if (err instanceof AddToCartBodyError) {
                    console.log(err)
                }

                if (err instanceof UnauthorizedError) {
                    navigate(redirectRoute)
                    logout();
                    toast("please login again")
                    return
                }

                toast(err.message)
            })

    }


    return (
        <div className={styles.cart_page_layout}>

            {
                isDesktop &&
                <DesktopBranding>
                    Home/Cart
                </DesktopBranding>
            }


            <GoBackButton />

            {
                loading ?

                    <h1>Please wait fetching your cart .... </h1>
                    :
                    cartData === null ?

                        <h1>Some Error occurred</h1>
                        :
                        isDesktop ?
                            <DesktopCartPage data={cartData.data} quantityOptions={quantityOptions}
                                total_items_price={cartData.total_items_price} convenienceFee={cartData.convenienceFee} total_amount={cartData.totalAmount}
                                total_items={cartData.total_items}
                                handleQuantityChange={handleQuantityChange} />
                            :
                            <MobileCartPage data={cartData.data} quantityOptions={quantityOptions} handleQuantityChange={handleQuantityChange}
                                total_amount={cartData.totalAmount} convenienceFee={cartData.convenienceFee} total_items_price={cartData.total_items_price} />
            }

        </div>
    );
}

export default CartPage;