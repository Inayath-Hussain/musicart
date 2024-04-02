
import { useState } from "react";
import CheckoutSection from "./CheckoutSection";


import styles from "./ReviewItems.module.css";


interface Idata {
    id: string
    image: string
    name: string
    color: string
}

interface Iprops {
    data: Idata[]
}

const ReviewItemsSection: React.FC<Iprops> = ({ data }) => {

    const [selectedProduct, setSelectedProduct] = useState(data[0].id);

    const productInfo = data.find(d => d.id === selectedProduct);

    return (
        <CheckoutSection text="3. Review items and delivery">
            <div className={styles.images_grid}>

                {data.map(d => (
                    <img src={d.image} alt="" className={styles.image} onClick={() => setSelectedProduct(d.id)} key={d.id} />
                ))}

            </div>


            <p className={styles.name}>{productInfo?.name}</p>

            <div className={styles.color}>
                Color :
                <p className={styles.color_text}>{productInfo?.color}</p>
            </div>


            <p className={styles.estimated_delivery}>Estimated delivery : <br />
                Monday — FREE Standard Delivery</p>

        </CheckoutSection>
    );
}

export default ReviewItemsSection;