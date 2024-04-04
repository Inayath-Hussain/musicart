import { Link } from "react-router-dom";
import SecondaryButton from "../Common/SecondaryButton";
import { route } from "@web/routes";

import styles from "./CartPage.module.css";
import { ICartData } from "@web/services/cart/getCartItems";
import { IhandleQuantityChange } from "@web/pages/Cart/interface";



interface Iprops {
    quantityOptions: number[]
    data: ICartData["data"]

    convenienceFee: number
    total_items_price: number
    total_amount: number

    handleQuantityChange: IhandleQuantityChange
}

const MobileCartPage: React.FC<Iprops> = ({ total_amount, convenienceFee, total_items_price, data, handleQuantityChange, quantityOptions }) => {

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

                                <select value={Number(p.quantity) > 8 ? 8 : p.quantity}
                                    onChange={(e) => handleQuantityChange(p.product_id, Number(e.target.value), Number(p.quantity))} >
                                    {quantityOptions.map(q => (
                                        <option key={q} value={q}>{q}</option>
                                    ))}
                                </select>

                                {/* <p>{p.quantity}</p> */}
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



            <div className={styles.order_summary_layout}>

                <div className={styles.order_summary_container}>
                    <p>Total MRP</p>
                    <p>Convenience Fee</p>
                    <p>Total Amount</p>
                </div>


                <div className={styles.order_summary_container}>
                    <p>&#8377; {total_items_price}</p>
                    <p>&#8377; {convenienceFee}</p>
                    <p><b>&#8377; {total_amount}</b></p>
                </div>

            </div>

            <Link to={route.checkout}>
                <SecondaryButton text="PLACE ORDER" handleClick={() => { }} className={styles.place_order_button} />
            </Link>

        </div>
    );
}

export default MobileCartPage;