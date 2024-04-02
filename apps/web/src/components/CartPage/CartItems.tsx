import { ICartPageData, IhandleQuantityChange } from "@web/pages/Cart/interface";
import styles from "./CartItems.module.css";
import { Fragment } from "react";


interface Iprops {
    data: ICartPageData[]
    quantityOptions: number[]
    total_items: number
    total_amount: number

    getTotalOfItem: (product_id: string) => number
    handleQuantityChange: IhandleQuantityChange
}

/**
 * component made only for devices with screen width atleast 768px
 */
const CartItems: React.FC<Iprops> = ({ data, getTotalOfItem, quantityOptions, total_items, total_amount, handleQuantityChange }) => {

    return (
        <div className={styles.items_container}>
            <div className={styles.items_list_container}>

                {data.map(p => (
                    <Fragment key={p._id}>

                        <div className={styles.item}>

                            <img src={p.main_image} alt="" />


                            {/* name and color */}
                            <div className={styles.name_and_color}>
                                <p className={styles.name}>{p.name}</p>

                                <div className={styles.color_container}>
                                    <p>Color :</p>
                                    <p>{p.color}</p>
                                </div>

                                <p>{p.available ? "In" : "out of"} stock</p>
                            </div>



                            {/* price */}
                            <div className={styles.price_container}>
                                <p>Price</p>
                                <p>&#8377; {p.price}</p>
                            </div>



                            {/* quantity */}
                            <div>
                                <p><b>Quantity</b></p>
                                <select value={Number(p.quantity) > 8 ? 8 : p.quantity}
                                    onChange={(e) => handleQuantityChange(p._id, Number(e.target.value), p.price)} >
                                    {quantityOptions.map(q => (
                                        <option key={q} value={q}>{q}</option>
                                    ))}
                                </select>
                            </div>



                            <div>
                                <p><b>Total</b></p>
                                <p>&#8377; {getTotalOfItem(p._id)}</p>
                            </div>

                        </div>

                    </Fragment>
                ))}

            </div>

            <div className={`${styles.item} ${styles.total_container}`}>
                <p className={styles.total_item}>{total_items} items</p>

                <p className={styles.total_price_of_items}>{total_amount}</p>
            </div>
        </div>
    );
}

export default CartItems;