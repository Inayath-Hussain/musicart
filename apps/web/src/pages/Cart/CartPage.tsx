import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ICartPageData } from "./interface";
import DesktopBranding from "@web/components/Desktop/DesktopBrandingAndProfile";
import GoBackButton from "@web/components/Desktop/GoBackButton";
import MobileCartPage from "@web/components/Mobile/CartPage";
import DesktopCartPage from "@web/components/Desktop/CartPage";
import useDeviceWidth from "@web/hooks/useDeviceWidth";
import { cartSelector, updateCartItem } from "@web/store/slices/cartItems";
import { useGetProductsQuery } from "@web/store/slices/productApi";


import styles from "./CartPage.module.css"
import { addToCartService } from "@web/services/cart/addToCart";



const CartPage = () => {

    const [quantityOptions] = useState(Array.from({ length: 8 }, (_, index) => index + 1))

    const dispatch = useDispatch();

    const { isDesktop } = useDeviceWidth();

    const { items, convenienceFee, total_amount, total_items } = useSelector(cartSelector)

    const { data } = useGetProductsQuery("")

    const getProducts = () => {

        let result: ICartPageData[] = []

        for (let i of items) {
            const product = data?.data.find(p => p._id === i.product)

            if (product) {
                result.push({ ...product, quantity: i.quantity })
            }
        }
        return result
    }

    console.log(total_amount)

    const cartInfo = useMemo(getProducts, [items, data])



    const handleQuantityChange = async (product_id: string, quantity: number, price: number) => {
        addToCartService({ product_id, quantity })
            .then(result => {
                dispatch(updateCartItem({ item: { product: result.data.product_id, quantity: result.data.quantity }, price }))
            })
            .catch(message => {
                //toast message here
            })

    }

    // calculate's the total of one particular item
    const getTotalOfItem = (product_id: string) => {

        const item = cartInfo.find(i => i._id === product_id)

        return Number(item?.price) * Number(item?.quantity)
    }

    return (
        <div className={styles.cart_page_layout}>

            {
                isDesktop &&
                <DesktopBranding>
                    Home/Cart
                </DesktopBranding>
            }


            <GoBackButton />

            {
                isDesktop ?
                    <DesktopCartPage data={cartInfo} quantityOptions={quantityOptions} total_amount={total_amount}
                        convenienceFee={convenienceFee} total_items={total_items}
                        getTotalOfItem={getTotalOfItem} handleQuantityChange={handleQuantityChange} />
                    :
                    <MobileCartPage data={cartInfo} total_amount={total_amount} quantityOptions={quantityOptions}
                        getTotalOfItem={getTotalOfItem} />
            }

        </div>
    );
}

export default CartPage;