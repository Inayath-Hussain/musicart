import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"

import GoBack from "@web/assets/icons/go_back.svg";
import { useGetProductsQuery } from "@web/store/slices/productApi";
import { productQuerySelector } from "@web/store/slices/productQuery";

import styles from "./ProductDetail.module.css";
import BuyNowButton from "@web/components/Common/BuyNowButton";
import { route } from "@web/routes";
import Carousel from "@web/components/Products/Carousel";
import ProductReview from "@web/components/Products/ProductReview";
import DescriptionPoints from "@web/components/Products/DescriptionPoints";
import SecondaryButton from "@web/components/Common/SecondaryButton";


const ProductDetail = () => {

    const { id } = useParams();

    const { queryString } = useSelector(productQuerySelector)
    const { data } = useGetProductsQuery(queryString)

    const getData = () => {
        return data?.data.find(d => d._id === id)
    }

    const productDetail = useMemo(getData, [id])

    const addToCart = () => {

    }


    return (
        <div className={styles.page_layout}>

            <Link to={route.home} className={styles.go_back_link}>
                <button className={styles.go_back_button}>
                    <img src={GoBack} alt="" />
                </button>
            </Link>


            <div className={styles.content_padding}>
                {productDetail === undefined ?

                    <h1>Product Doesn't Exist</h1>
                    :

                    <>
                        <BuyNowButton className={styles.buy_now_button_top} />

                        {/* images */}
                        <Carousel images={[productDetail.main_image, ...productDetail.other_images]} />

                        {/* product name */}
                        <p className={styles.name}>{productDetail.name}</p>

                        {/* customer ratings */}
                        <ProductReview rating={productDetail.review.rating} total_customers_rating={productDetail.review.total_customer_reviews} />

                        {/* full title */}
                        <p className={styles.full_title}>{productDetail.full_title}</p>

                        {/* color and headphone type */}
                        <div className={styles.color_and_type}>
                            <p className={styles.capitalize}>{productDetail.color}</p> | <p className={styles.capitalize}>{productDetail.headphone_type}</p> headphone
                        </div>


                        {/* about product */}
                        <DescriptionPoints points={productDetail.description} />

                        <p><b>Available</b> - In stock</p>

                        <p><b>Brand</b> - {productDetail.brand}</p>


                        <SecondaryButton text="Add to cart" handleClick={addToCart} className={styles.add_to_cart_button} />

                        <BuyNowButton className={styles.buy_now_button_bottom} />

                    </>
                }
            </div>
        </div>
    );
}

export default ProductDetail;