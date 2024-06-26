import { Link } from "react-router-dom";

import PriceDetail from "../CartPage/PriceDetail";
import CartItems from "../CartPage/CartItems";
import SecondaryButton from "../Common/SecondaryButton";
import CartPageLogo from "@web/assets/icons/cart_page_logo.svg"
import { IhandleQuantityChange } from "@web/pages/Cart/interface";
import { route } from "@web/routes";

import styles from "./CartPage.module.css";
import { ICartData } from "@web/services/cart/getCartItems";


interface Iprops {
    data: ICartData["data"]
    quantityOptions: number[]
    total_items: number

    total_items_price: number
    convenienceFee: number
    total_amount: number
    handleQuantityChange: IhandleQuantityChange
}


const DesktopCartPage: React.FC<Iprops> = ({ data, quantityOptions,
    total_items_price, convenienceFee, total_amount, total_items, handleQuantityChange }) => {
    return (
        <>
            <div className={styles.header_container}>
                <img src={CartPageLogo} alt="" />

                <h1>My Cart</h1>
            </div>


            <div className={styles.grid}>


                {/* left section ( items ) */}
                <CartItems data={data} quantityOptions={quantityOptions}
                    total_items={total_items} total_items_price={total_items_price}
                    handleQuantityChange={handleQuantityChange} />



                {/* price detail */}
                <PriceDetail total_items_price={total_items_price} total_amount={total_amount} convenienceFee={convenienceFee} />

            </div>


            <div className={`${styles.grid} ${styles.place_order_grid}`}>

                <Link to={route.checkout} className={styles.place_order_link}>
                    <SecondaryButton text="Place Order" handleClick={() => { }}
                        className={styles.place_order_button} />
                </Link>
            </div>
        </>
    );
}

export default DesktopCartPage;