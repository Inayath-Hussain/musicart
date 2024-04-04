import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CheckoutStylePage from "../Common/CheckoutStylePage";
import OrderPlaced from "@web/components/Checkout/OrderPlaced";
import { authTokenContext } from "@web/context/authTokens";
import { useOnline } from "@web/hooks/useOnline";
import { route } from "@web/routes";
import { NoCartItems, PlaceOrderBodyError, placeOrderService } from "@web/services/order/placeOrder";
import { UnauthorizedError } from "@web/services/errors";
import { EmptyCart, ICartData, getCartService } from "@web/services/cart/getCartItems";
import { useDispatch } from "react-redux";
import { updateCart } from "@web/store/slices/cartItems";
import { toast } from "react-toastify";



const CheckoutPage: React.FC = () => {

    const { logout } = useContext(authTokenContext)
    const navigate = useNavigate();

    useEffect(() => {

        const call = async () => {
            const result = await getCartService()

            if (result instanceof EmptyCart) {
                navigate(route.home)
                toast("no items in cart")
                return
            }

            setCartItems(result)
        }

        call();
    }, [])

    const [cartItems, setCartItems] = useState<ICartData | null>(null);



    const { isOnline } = useOnline();

    const dispatch = useDispatch();

    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const [orderPlaced, setOrderPlaced] = useState(false);


    const initalErrors = { address: "", paymentMethod: "" }
    const [errors, setErrors] = useState(initalErrors);


    // validate's address and payment method values
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
            toast("you are offline")
            return
        }

        // validate address and payment method
        const validStatus = validate()
        if (validStatus === false) return


        // make api call
        try {
            await placeOrderService({ address, paymentMethod })

            toast("order placed", { type: "success" })
            setOrderPlaced(true)
            setErrors(initalErrors)
            setAddress("");
            setPaymentMethod("");

            dispatch(updateCart(0))
        }

        catch (ex) {
            switch (true) {
                case (ex instanceof PlaceOrderBodyError):
                    setErrors(ex.errors)
                    break;

                case (ex instanceof UnauthorizedError):
                    toast("please login again")
                    logout();
                    navigate(route.users.login);
                    break;

                case (ex instanceof NoCartItems):
                    toast("no cart items found")
                    navigate(route.home);
            }
            console.log(ex)
        }

    }

    return (

        orderPlaced ?

            <OrderPlaced />

            :

            cartItems

                ?

                <CheckoutStylePage displayRoute="Home/Checkout" type="checkout" products={cartItems.data}

                    address={address} handleAddressChange={e => setAddress(e.target.value)} addressError={errors.address}

                    paymentMethod={paymentMethod} handlePaymentMethodChange={e => setPaymentMethod(e.target.value)} paymentMethodError={errors.paymentMethod}

                    total_items_price={cartItems.total_items_price} convenienceFee={cartItems?.convenienceFee} total_amount={cartItems.totalAmount}

                    handleSubmit={handleSubmit} />


                :

                <h1>Please wait fetching cart items ...</h1>

    );
}

export default CheckoutPage;