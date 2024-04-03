import { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CheckoutStylePage from "../Common/CheckoutStylePage";
import { ICheckoutProduct } from "./interface";
import OrderPlaced from "@web/components/Checkout/OrderPlaced";
import { authTokenContext } from "@web/context/authTokens";
import { useOnline } from "@web/hooks/useOnline";
import { route } from "@web/routes";
import { NoCartItems, PlaceOrderBodyError, placeOrderService } from "@web/services/order/placeOrder";
import { UnauthorizedError } from "@web/services/errors";
import { cartSelector } from "@web/store/slices/cartItems";
import { useGetProductsQuery } from "@web/store/slices/productApi";



const CheckoutPage: React.FC = () => {

    const { logout } = useContext(authTokenContext)
    const navigate = useNavigate();

    useEffect(() => {

        // make api call to get cart
    }, [])

    const { isOnline } = useOnline();

    const { items, total_amount, convenienceFee } = useSelector(cartSelector);

    const { data } = useGetProductsQuery("");

    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const [orderPlaced, setOrderPlaced] = useState(false);


    const initalErrors = { address: "", paymentMethod: "" }
    const [errors, setErrors] = useState(initalErrors);

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

    const products = useMemo(getProducts, [items]);


    const validate = () => {

        let valid = true;

        const localErrorObj = { ...initalErrors };

        if (address === "") { valid = false; localErrorObj.address = "required" }
        if (paymentMethod === "") { valid = false; localErrorObj.paymentMethod = "required" }

        setErrors(localErrorObj)
        return valid
    }

    const handleSubmit = async () => {

        if (isOnline === false) {
            // toast you are offline
            return
        }

        // validate address and payment method
        const validStatus = validate()
        if (validStatus === false) return


        // make api call
        try {
            await placeOrderService({ address, paymentMethod })

            // toast message here
            setOrderPlaced(true)
            setErrors(initalErrors)
            setAddress("");
            setPaymentMethod("");
        }

        catch (ex) {
            switch (true) {
                case (ex instanceof PlaceOrderBodyError):
                    setErrors(ex.errors)
                    break;

                case (ex instanceof UnauthorizedError):
                    // toast message please login again
                    logout();
                    navigate(route.users.login);
                    break;

                case (ex instanceof NoCartItems):
                    // toast message no cart items found
                    navigate(route.home);
            }
            console.log(ex)
        }

    }

    return (

        orderPlaced ?

            <OrderPlaced />

            :

            <CheckoutStylePage displayRoute="Home/Checkout" type="checkout" products={products}

                address={address} handleAddressChange={e => setAddress(e.target.value)} addressError={errors.address}

                paymentMethod={paymentMethod} handlePaymentMethodChange={e => setPaymentMethod(e.target.value)} paymentMethodError={errors.paymentMethod}

                total_amount={total_amount} convenienceFee={convenienceFee} handleSubmit={handleSubmit} />
    );
}

export default CheckoutPage;