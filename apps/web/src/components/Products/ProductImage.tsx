import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import CartIcon from "../Icons/Cart";
import { authTokenContext } from "@web/context/authTokens";
import { useOnline } from "@web/hooks/useOnline";
import { route } from "@web/routes";
import { addToCartService } from "@web/services/cart/addToCart";
import { UnauthorizedError } from "@web/services/errors";
import { updateCartItem } from "@web/store/slices/cartItems";


import styles from "./ProductImage.module.css";
import { toast } from "react-toastify";


interface Iprops {
    imageURL: string;
    id: string;
}


const ProductImage: React.FC<Iprops> = ({ imageURL, id }) => {

    const { accessToken, refreshToken, logout } = useContext(authTokenContext);
    const { isOnline } = useOnline();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const dispatch = useDispatch();

    const addToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (isOnline === false) return toast("you are offline")

        const redirectURL = route.users.login + `?path=${pathname}`

        // if user is authenticated send api request
        if (accessToken || refreshToken) {
            addToCartService({ product_id: id }).then(result =>
                dispatch(updateCartItem(1))
            ).catch(err => {

                if (err instanceof UnauthorizedError) {
                    navigate(redirectURL)
                    logout();
                    toast("please login again")
                    return
                }

                toast(err.message)
            })
            return
        }

        // else
        navigate(redirectURL)

    }

    return (
        <div className={styles.image_container} >
            <img src={imageURL} alt="" className={styles.image} />

            <button className={styles.add_to_cart_button} onClick={addToCart} title="Add to cart">
                <CartIcon fill="#1D7000" width={30} />
            </button>
        </div>
    );
}

export default ProductImage;