import { Link } from "react-router-dom";

import { route } from "@web/routes";


import styles from "./ListItem.module.css";
import ColorAndType from "../Common/ColorAndType";
import PrimaryButton from "../Common/PrimaryButton";
import ProductImage from "./ProductImage";


interface Iprops {
    imageURL: string
    name: string
    price: number
    color: string
    headphoneType: string
    id: string

    fullTitle: string
}


const ListItem: React.FC<Iprops> = ({ imageURL, id, name, price, color, headphoneType, fullTitle }) => {

    const formattedPrice = Intl.NumberFormat("en-In").format(price)




    return (
        <div className={styles.item_container}>

            <ProductImage id={id} imageURL={imageURL} />


            <div className={styles.item_info}>
                <h2 className={styles.name}>{name}</h2>

                <p>Price - &#8377; {formattedPrice}</p>

                <ColorAndType color={color} type={headphoneType} />

                <p className={styles.full_title}>{fullTitle}</p>

                <Link to={route.products.detail(id)}>
                    <PrimaryButton text="Details" className={styles.details_button} />
                </Link>

            </div>

        </div>
    );
}

export default ListItem;