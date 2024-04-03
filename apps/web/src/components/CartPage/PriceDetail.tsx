import styles from "./PriceDetail.module.css";


interface Iprops {
    total_items_price: string
    convenienceFee: string
    total_amount: string
}

/**
 * component made only for devices with screen width atleast 768px
 */
const PriceDetail: React.FC<Iprops> = ({ total_items_price, convenienceFee, total_amount }) => {
    return (
        <div className={styles.price_detail_container}>

            {/* detail */}
            <div className={styles.price_detail}>
                <p className={styles.price_detail_header}>Price Details</p>

                <div className={styles.price_info}>
                    <p>Total MRP</p>
                    <p>&#8377; {total_items_price}</p>
                </div>

                <div className={styles.price_info}>
                    <p>Discount on MRP</p>
                    <p>&#8377; 0</p>
                </div>


                <div className={styles.price_info}>
                    <p>Convenience Fee</p>
                    <p>&#8377; {convenienceFee}</p>
                </div>
            </div>



            <div className={`${styles.price_info} ${styles.price_total}`}>
                <p>Total Amount</p>
                <p>&#8377; {total_amount}</p>
            </div>


        </div>
    );
}

export default PriceDetail;