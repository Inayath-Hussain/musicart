import FormError from "../Users/FormError";
import CheckoutSection from "./CheckoutSection";

import styles from "./PaymentMethod.module.css";


interface Iprops {
    value: string
    handleChange?: React.ChangeEventHandler<HTMLSelectElement>
    errorMessage?: string

    viewOnly?: boolean
}

const PaymentMethodSection: React.FC<Iprops> = ({ handleChange = () => { }, value, viewOnly = false, errorMessage = "" }) => {

    const selectClass = errorMessage !== "" ? `${styles.payment_method_input} ${styles.error}` : styles.payment_method_input

    return (
        <CheckoutSection text="2. Payment method">


            <select value={value} onChange={handleChange} disabled={viewOnly}
                className={selectClass}>

                <option value="" hidden>Mode of payment</option>
                <option value="POD">Pay on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="CARD">Card</option>

            </select>
            <FormError errorMessage={errorMessage} type="field" className={styles.error_message} />

        </CheckoutSection>
    );
}

export default PaymentMethodSection;