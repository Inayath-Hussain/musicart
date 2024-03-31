import CartIcon from "../Icons/Cart";

import styles from "./Card.module.css";

interface Iprops {
    imageURL: string
    name: string
    price: number
    color: string
    headphoneType: string
}

const Card: React.FC<Iprops> = ({ imageURL, name, price, color, headphoneType }) => {

    const formattedPrice = Intl.NumberFormat("en-In").format(price)

    return (
        <div className={styles.card_container}>

            <div className={styles.image_container}>
                <img src={imageURL} alt="" className={styles.image} />

                <button className={styles.add_to_cart_button}>
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

        </div>
    );
}

export default Card;