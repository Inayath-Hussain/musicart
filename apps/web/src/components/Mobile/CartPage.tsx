import { Link } from "react-router-dom";
import SecondaryButton from "../Common/SecondaryButton";
import { route } from "@web/routes";

import styles from "./CartPage.module.css";
import { ICartData } from "@web/services/cart/getCartItems";



interface Iprops {
    quantityOptions: number[]
    data: ICartData["data"]

    convenienceFee: string
    total_items_price: string
    total_amount: string
}

const MobileCartPage: React.FC<Iprops> = ({ total_amount, data }) => {

    return (
        <div className={styles.items_container}>

            {data && data.map(p => (
                <div className={styles.item} key={p.id}>

                    <img src={p.image} alt="" className={styles.image} />


                    <div className={styles.info_container}>

                        <div>
                            <p className={styles.name}>{p.name}</p>

                            <p className={styles.price}>&#8377; {p.price}</p>

                            <p>Color : {p.color}</p>

                            <p>{p.available ? "In" : "Out of"} stock</p>

                            <div className={styles.quantity}>
                                <p>Quantity</p>
                                <p>{p.quantity}</p>
                            </div>
                        </div>



                        <div className={styles.total_price_container}>
                            <p>Total :</p>

                            <p className={styles.total_price}>&#8377; {p.total_price}</p>
                        </div>

                    </div>

                </div>
            ))}


            <hr className={styles.horizontal_rule} />


            <p>Total Amount <b>&#8377; {total_amount}</b></p>

            <Link to={route.checkout}>
                <SecondaryButton text="PLACE ORDER" handleClick={() => { }} className={styles.place_order_button} />
            </Link>

        </div>
    );
}

export default MobileCartPage;