import styles from "./BuyButton.module.css";


interface Iprops {
    className?: string
    handleClick: () => void
}

const BuyNowButton: React.FC<Iprops> = ({ className = "", handleClick }) => {



    // add to cart
    // navigate to cart page

    return (
        <button onClick={handleClick}
            className={`${styles.buy_now_button} ${className}`}>
            Buy Now
        </button>
    );
}

export default BuyNowButton;