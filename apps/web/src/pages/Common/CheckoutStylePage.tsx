import DeliveryAddressSection from "@web/components/Checkout/DeliveryAddress";
import DesktopBranding from "@web/components/Desktop/DesktopBrandingAndProfile";
import GoBackButton from "@web/components/Common/GoBackButton";
import PaymentMethodSection from "@web/components/Checkout/PaymentMethod";
import ReviewItemsSection from "@web/components/Checkout/ReviewItems";
import OrderSummary from "@web/components/Checkout/OrderSummary";
import SecondaryButton from "@web/components/Common/SecondaryButton";
import useDeviceWidth from "@web/hooks/useDeviceWidth";
import { route } from "@web/routes";


import styles from "./CheckoutStyle.module.css";



interface IProduct {
    image: string
    name: string
    color: string
}

interface Iprops {
    type: "checkout" | "invoice"
    address: string
    addressError?: string
    handleAddressChange?: React.ChangeEventHandler<HTMLTextAreaElement>

    paymentMethod: string
    paymentMethodError?: string
    handlePaymentMethodChange?: React.ChangeEventHandler<HTMLSelectElement>

    products: IProduct[]

    total_items_price: number
    convenienceFee: number
    total_amount: number

    handleSubmit?: () => Promise<void>

    displayRoute: string
}


const CheckoutStylePage: React.FC<Iprops> = ({ type, displayRoute,
    address, handleAddressChange, addressError = "",
    paymentMethod, handlePaymentMethodChange, paymentMethodError = "",
    products,
    total_items_price, convenienceFee, total_amount,
    handleSubmit = () => { }
}) => {

    const { isDesktop } = useDeviceWidth();

    const backButtonConfig = type === "checkout" ? { link: route.cart, text: "Back to cart" } : { link: route.home, text: "Back to products" }

    const viewOnly = type === "invoice" ? true : false

    const headerText = type === "checkout" ? "Checkout" : "Invoice"

    return (
        <div className={styles.checkout_page_layout}>

            {
                isDesktop &&
                <DesktopBranding>
                    {displayRoute}
                </DesktopBranding>
            }

            <GoBackButton link={backButtonConfig.link} text={backButtonConfig.text} />


            <h1 className={styles.checkout_page_header}>{headerText}</h1>


            {/* grid for width's starting from 768px */}
            <div className={styles.grid}>

                <div>
                    <DeliveryAddressSection address={address} handleChange={handleAddressChange} errorMessage={addressError} viewOnly={viewOnly} />

                    <PaymentMethodSection value={paymentMethod} handleChange={handlePaymentMethodChange} errorMessage={paymentMethodError} viewOnly={viewOnly} />

                    <ReviewItemsSection data={products} />


                    {
                        (isDesktop && viewOnly === false) &&
                        <div className={styles.place_order_container}>

                            <SecondaryButton text="Place your order" handleClick={handleSubmit} className={styles.place_order_button} />

                            <div>
                                <p className={styles.total_price}>Order Total : &#8377; {total_amount}</p>
                                <p className={styles.order_terms}>By placing your order, you agree to Musicart privacy notice and conditions of use.</p>
                            </div>
                        </div>
                    }

                </div>


                <OrderSummary viewOnly={viewOnly}
                    total_items_price={total_items_price} convenienceFee={convenienceFee} total_amount={total_amount} handleSubmit={handleSubmit} />


            </div>


        </div>
    );
}

export default CheckoutStylePage;