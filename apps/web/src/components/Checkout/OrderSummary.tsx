import useDeviceWidth from "@web/hooks/useDeviceWidth";

import styles from "./OrderSummary.module.css";
import SecondaryButton from "../Common/SecondaryButton";


interface Iprops {
    viewOnly: boolean
    total_items_price: number
    convenienceFee: number
    total_amount: number
    handleSubmit?: () => void
}

const OrderSummary: React.FC<Iprops> = ({ total_items_price, convenienceFee, total_amount, viewOnly, handleSubmit = () => { } }) => {

    const { isDesktop } = useDeviceWidth();


    return (
        <div className={styles.order_layout}>

            {
                (isDesktop && viewOnly === false) &&
                <p className={styles.order_terms}>
                    By placing your order, you agree to Musicart privacy
                    notice and conditions of use.
                </p>
            }



            {/* order summary, lists all prices added to order */}
            <div className={styles.order_summary_container}>
                <p className={styles.order_summary_header}>Order Summary</p>

                <div className={styles.price_detail}>

                    <div>
                        <p>Items :</p>
                        <p>Delivery :</p>
                    </div>


                    <div>
                        <p>&#8377; {total_items_price}</p>
                        <p>&#8377; {convenienceFee}</p>
                    </div>
                </div>
            </div>


            {/* total order price */}
            <div className={`${styles.price_detail} ${styles.total}`}>
                <p>Order Total :</p>
                <p>&#8377; {total_amount}</p>
            </div>


            {/* place order button */}
            {viewOnly === false && <SecondaryButton text="Place your order" className={styles.place_order_button} handleClick={handleSubmit} />}

        </div>
    );
}

export default OrderSummary;