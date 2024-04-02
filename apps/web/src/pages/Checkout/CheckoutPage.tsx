import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import CheckoutStylePage from "../Common/CheckoutStylePage";
import useDeviceWidth from "@web/hooks/useDeviceWidth";
import { cartSelector } from "@web/store/slices/cartItems";
import { useGetProductsQuery } from "@web/store/slices/productApi";
import { ICheckoutProduct } from "./interface";



const CheckoutPage = () => {

    const { isDesktop } = useDeviceWidth();

    const { items, total_amount, convenienceFee } = useSelector(cartSelector);

    const { data } = useGetProductsQuery("");

    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const getProducts = () => {

        let result: ICheckoutProduct[] = []

        for (let i of items) {
            const product = data?.data.find(p => p._id === i.product)

            if (product) {
                result.push({ color: product.color, id: product._id, image: product.main_image, name: product.name })
            }
        }
        return result
    }

    const products = useMemo(getProducts, [items])

    const handleSubmit = async () => {

        // validate address and payment method

        // make api call


    }

    return (
        <CheckoutStylePage displayRoute="Home/Checkout" type="checkout" products={products}
            address={address} handleAddressChange={e => setAddress(e.target.value)}
            paymentMethod={paymentMethod} handlePaymentMethodChange={e => setPaymentMethod(e.target.value)}
            total_amount={total_amount} convenienceFee={convenienceFee} handleSubmit={handleSubmit} />
    );
}

export default CheckoutPage;