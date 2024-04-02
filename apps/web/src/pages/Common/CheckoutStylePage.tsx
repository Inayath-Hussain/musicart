import GoBackButton from "@web/components/Common/GoBackButton";
import DesktopBranding from "@web/components/Desktop/DesktopBrandingAndProfile";
import useDeviceWidth from "@web/hooks/useDeviceWidth";
import { route } from "@web/routes";


import styles from "./CheckoutStyle.module.css";
import DeliveryAddressSection from "@web/components/Checkout/DeliveryAddress";
import PaymentMethodSection from "@web/components/Checkout/PaymentMethod";
import ReviewItemsSection from "@web/components/Checkout/ReviewItems";
import OrderSummary from "@web/components/Checkout/OrderSummary";
import SecondaryButton from "@web/components/Common/SecondaryButton";



interface IProduct {
    id: string
    image: string
    name: string
    color: string
}

interface Iprops {
    type: "checkout" | "invoice"
    address: string
    paymentMethod: string
    products: IProduct[]

    total_amount: number
    convenienceFee: number

    handleAddressChange?: React.ChangeEventHandler<HTMLTextAreaElement>
    handlePaymentMethodChange?: React.ChangeEventHandler<HTMLSelectElement>

    handleSubmit?: () => Promise<void>

    displayRoute: string
}


const CheckoutStylePage: React.FC<Iprops> = ({ type, displayRoute,
    address, handleAddressChange,
    paymentMethod, handlePaymentMethodChange,
    products, convenienceFee, total_amount,
    handleSubmit = () => { }
}) => {

    const { isDesktop } = useDeviceWidth();

    const backButtonConfig = type === "checkout" ? { link: route.cart, text: "Back to cart" } : { link: route.home, text: "Back to products" }

    return (
        <div className={styles.checkout_page_layout}>

            {
                isDesktop &&
                <DesktopBranding>
                    {displayRoute}
                </DesktopBranding>
            }

            <GoBackButton link={backButtonConfig.link} text={backButtonConfig.text} />


            <h1 className={styles.checkout_page_header}>Checkout</h1>


            {/* grid for width's starting from 768px */}
            <div className={styles.grid}>

                <div>
                    <DeliveryAddressSection address={address} handlechange={handleAddressChange} />

                    <PaymentMethodSection value={paymentMethod} handleChange={handlePaymentMethodChange} />

                    <ReviewItemsSection data={products} />


                    {
                        isDesktop &&
                        <div className={styles.place_order_container}>

                            <SecondaryButton text="Place your order" handleClick={handleSubmit} className={styles.place_order_button} />

                            <div>
                                <p className={styles.total_price}>Order Total : &#8377; {total_amount + convenienceFee}</p>
                                <p className={styles.order_terms}>By placing your order, you agree to Musicart privacy notice and conditions of use.</p>
                            </div>
                        </div>
                    }

                </div>


                <OrderSummary convenienceFee={convenienceFee} total_amount={total_amount} handleSubmit={handleSubmit} />


            </div>


        </div>
    );
}

export default CheckoutStylePage;