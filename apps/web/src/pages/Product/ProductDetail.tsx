import { useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom"


import { authTokenContext } from "@web/context/authTokens";
import { route } from "@web/routes";
import { addToCartService } from "@web/services/cart/addToCart";
import { updateCartItem } from "@web/store/slices/cartItems";
import { useGetProductsQuery } from "@web/store/slices/productApi";
import { productQuerySelector } from "@web/store/slices/productQuery";
import useDeviceWidth from "@web/hooks/useDeviceWidth";
import DesktopBranding from "@web/components/Desktop/DesktopBrandingAndProfile";
import GoBackButton from "@web/components/Common/GoBackButton";
import MobileProductDetail from "@web/components/Mobile/ProductDetail";
import DesktopProductDetail from "@web/components/Desktop/ProductDetail";


import styles from "./ProductDetail.module.css";
import { UnauthorizedError } from "@web/services/errors";
import { toast } from "react-toastify";


const ProductDetail = () => {

    const { isDesktop } = useDeviceWidth();

    const { id } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { accessToken, refreshToken } = useContext(authTokenContext);

    const { queryString } = useSelector(productQuerySelector)
    const { data } = useGetProductsQuery(queryString)

    const getData = () => {
        return data?.data.find(d => d._id === id)
    }

    const productDetail = useMemo(getData, [id, data])

    const addToCart = async (buyNow: boolean = false) => {

        if (accessToken || refreshToken) {

            // make api call
            addToCartService({ product_id: productDetail?._id as string })
                // dispatch
                .then(result => {
                    dispatch(updateCartItem(1))

                    if (buyNow === true) navigate(route.checkout)
                })
                .catch(err => {
                    switch (true) {
                        case (err instanceof UnauthorizedError):
                            navigate(route.users.login)
                            toast("please login again")
                            return

                        default:
                            toast(err.message)
                            return
                    }
                })
        }
        else {
            navigate(route.users.login + `?path=${pathname}`)
        }

    }


    return (
        <div className={styles.page_layout}>


            {isDesktop &&
                <DesktopBranding>
                    Home/{productDetail?.name}
                </DesktopBranding>
            }


            <GoBackButton />


            <div className={styles.content_padding}>
                {productDetail === undefined ?

                    <h1>Product Doesn't Exist</h1>
                    :

                    isDesktop ?
                        <DesktopProductDetail productDetail={productDetail} addToCart={addToCart} />
                        :
                        <MobileProductDetail productDetail={productDetail} addToCart={addToCart} />
                }
            </div>
        </div>
    );
}

export default ProductDetail;