import styles from "./BuyButton.module.css";


interface Iprops {
    className?: string
}

const BuyNowButton: React.FC<Iprops> = ({ className = "" }) => {

    // add to cart
    // navigate to carrt page

    return (
        <button className={`${styles.buy_now_button} ${className}`}>
            Buy Now
        </button>
    );
}

export default BuyNowButton;