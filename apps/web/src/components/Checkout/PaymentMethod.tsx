import CheckoutSection from "./CheckoutSection";

import styles from "./PaymentMethod.module.css";


interface Iprops {
    value: string
    handleChange?: React.ChangeEventHandler<HTMLSelectElement>
    viewOnly?: boolean
}

const PaymentMethodSection: React.FC<Iprops> = ({ handleChange = () => { }, value, viewOnly = false }) => {
    return (
        <CheckoutSection text="2. Payment method">


            <select value={value} onChange={handleChange} disabled={viewOnly}
                className={styles.payment_method_input}>

                <option value="" hidden>Mode of payment</option>
                <option value="POD">Pay on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="card">Card</option>

            </select>

        </CheckoutSection>
    );
}

export default PaymentMethodSection;