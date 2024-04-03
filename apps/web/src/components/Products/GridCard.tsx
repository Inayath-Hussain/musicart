import { Link } from "react-router-dom";

import ProductImage from "./ProductImage";
import { route } from "@web/routes";

import styles from "./GridCard.module.css";

interface Iprops {
    imageURL: string
    name: string
    price: number
    color: string
    headphoneType: string
    id: string
}

const GridCard: React.FC<Iprops> = ({ imageURL, name, price, color, headphoneType, id }) => {

    const formattedPrice = Intl.NumberFormat("en-In").format(price)

    return (
        <Link to={route.products.detail(id)} className={styles.card_container}>

            <ProductImage id={id} imageURL={imageURL} />


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

export default GridCard;