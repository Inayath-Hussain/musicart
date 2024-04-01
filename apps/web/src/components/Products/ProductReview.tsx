import StarIcon from "../Icons/Star";
import styles from "./ProductReview.module.css";

interface Iprops {
    rating: number
    total_customers_rating: number
}

const ProductReview: React.FC<Iprops> = ({ rating, total_customers_rating }) => {

    const ratings = [1, 2, 3, 4, 5]

    return (
        <div className={`${styles.flex} ${styles.product_review_container}`}>

            <div className={`${styles.flex} ${styles.stars_container}`}>

                {ratings.map(r => (
                    <StarIcon fill={r <= rating ? "#FFD600" : "#fff"} key={r} />
                ))}

            </div>


            <p>({total_customers_rating} Cutomer reviews)</p>

        </div>
    );
}

export default ProductReview;