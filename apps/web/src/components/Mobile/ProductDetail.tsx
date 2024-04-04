import { IProductData } from "@web/store/slices/productApi";
import BuyNowButton from "../Common/BuyNowButton";
import Carousel from "../ProductDetail/Carousel";
import ProductReview from "../Products/ProductReview";
import DescriptionPoints from "../Products/DescriptionPoints";
import SecondaryButton from "../Common/SecondaryButton";

import styles from "./ProductDetail.module.css";
import ColorAndType from "../Common/ColorAndType";


interface Iprops {
    productDetail: IProductData
    addToCart: (buyNow?: boolean) => Promise<void>
}

const MobileProductDetail: React.FC<Iprops> = ({ productDetail, addToCart }) => {

    const cartHandler = () => addToCart(false)

    const buyHandler = () => addToCart(true)

    return (
        <>
            <BuyNowButton handleClick={buyHandler} className={styles.buy_now_button_top} />

            {/* images */}
            <Carousel images={[productDetail.main_image, ...productDetail.other_images]} />

            {/* product name */}
            <p className={styles.name}>{productDetail.name}</p>

            {/* customer ratings */}
            <ProductReview rating={productDetail.review.rating} total_customers_rating={productDetail.review.total_customer_reviews} />

            {/* full title */}
            <p className={styles.full_title}>{productDetail.full_title}</p>

            {/* color and headphone type */}
            <ColorAndType color={productDetail.color} type={productDetail.headphone_type} className={styles.color_and_type} />


            {/* about product */}
            <DescriptionPoints points={productDetail.description} />

            <p><b>Available</b> - {productDetail.available ? "In" : "Out of"} stock</p>

            <p><b>Brand</b> - {productDetail.brand}</p>


            <SecondaryButton text="Add to cart" handleClick={cartHandler} className={styles.add_to_cart_button} />

            <BuyNowButton handleClick={buyHandler} className={styles.buy_now_button_bottom} />

        </>
    );
}

export default MobileProductDetail;