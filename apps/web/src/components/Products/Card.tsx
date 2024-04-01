import { Link, useLocation, useNavigate } from "react-router-dom";
import CartIcon from "../Icons/Cart";

import styles from "./Card.module.css";
import { route } from "@web/routes";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, getQuantity, updateCartItem } from "@web/store/slices/cartItems";
import { addToCartService } from "@web/services/cart/addToCart";
import { useContext } from "react";
import { authTokenContext } from "@web/context/authTokens";

interface Iprops {
    imageURL: string
    name: string
    price: number
    color: string
    headphoneType: string
    id: string
}

const Card: React.FC<Iprops> = ({ imageURL, name, price, color, headphoneType, id }) => {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { pathname } = useLocation();

    const { accessToken, refreshToken } = useContext(authTokenContext);

    const { items } = useSelector(cartSelector);



    const addToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // if user is authenticated send api request
        if (accessToken || refreshToken) {

            const quantity = getQuantity(id, items)

            addToCartService({ product_id: id, quantity: quantity + 1 }).then(result =>
                dispatch(updateCartItem(result.data))
            ).catch(message => {
                // toast message here
            })
            return
        }

        // else
        navigate(route.users.login + `?path=${pathname}`)

    }



    const formattedPrice = Intl.NumberFormat("en-In").format(price)

    return (
        <Link to={route.products.detail(id)} className={styles.card_container}>

            <div className={styles.image_container}>
                <img src={imageURL} alt="" className={styles.image} />

                <button className={styles.add_to_cart_button} onClick={addToCart}>
                    <CartIcon fill="#1D7000" width={30} />
                </button>
            </div>


            {/* text container */}
            <div className={styles.text_container}>
                {/* product name */}
                <p className={styles.name}>{name}</p>

                {/* product price */}
                <p>Price - &#8377; {formattedPrice} </p>

                {/* color and headphone type */}
                <div>
                    <p className={styles.capitalize}>{color}</p> | <p className={styles.capitalize}>{headphoneType}</p> headphone
                </div>
            </div>

        </Link>
    );
}

export default Card;