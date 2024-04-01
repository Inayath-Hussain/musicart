import { IProductData } from "@web/store/slices/productApi";

import { useState } from "react";
import ProductReview from "../Products/ProductReview";
import ColorAndType from "../Common/ColorAndType";
import DescriptionPoints from "../Products/DescriptionPoints";
import SecondaryButton from "../Common/SecondaryButton";
import BuyNowButton from "../Common/BuyNowButton";

import styles from "./ProductDetail.module.css";



interface Iprops {
    productDetail: IProductData
    addToCart: () => Promise<void>
}


const DesktopProductDetail: React.FC<Iprops> = ({ addToCart, productDetail }) => {

    const [bigDisplayImage, setBigDisplayImage] = useState(productDetail.main_image);

    const [sideImages, setSideImages] = useState(productDetail.other_images);


    // change's main image when any of the side image is selected
    const handleImageChange = (url: string) => {
        setSideImages(prev => {
            const newState = prev.filter(p => p !== url)

            return [...newState, bigDisplayImage]
        })

        setBigDisplayImage(url)
    }

    const formattedPrice = Intl.NumberFormat("en-In").format(productDetail.price)

    return (
        <>
            <h1 className={styles.full_title}>{productDetail.full_title}</h1>


            <div className={styles.images_and_description}>

                {/* images */}
                <div>
                    {/* main image */}
                    <img src={bigDisplayImage} alt="" className={styles.main_image} />


                    <div className={styles.side_images_container}>
                        {/* other images */}
                        {sideImages.map(image => (
                            <img src={image} alt="" className={styles.side_image} onClick={() => handleImageChange(image)} />
                        ))}
                    </div>
                </div>



                {/* product info */}
                <div className={styles.info_container}>
                    <p className={styles.name}>{productDetail.name}</p>

                    <ProductReview rating={productDetail.review.rating} total_customers_rating={productDetail.review.total_customer_reviews} />

                    <p><b>Price</b> - &#8377; {formattedPrice}</p>

                    <ColorAndType color={productDetail.color} type={productDetail.headphone_type} className={styles.color_and_type} />

                    <DescriptionPoints points={productDetail.description} />


                    <p className={styles.big_font}><b>Available</b> - {productDetail.available ? "In" : "Out of"} stock</p>

                    <p className={styles.big_font}><b>Brand</b> - {productDetail.brand}</p>


                    <SecondaryButton text="Add to cart" handleClick={addToCart} className={styles.cart_button} />

                    <BuyNowButton className={styles.buy_button} />
                </div>

            </div>

        </>
    );
}

export default DesktopProductDetail;