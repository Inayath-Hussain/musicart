import { useSelector } from "react-redux";

import { userSliceSelector } from "@web/store/slices/userSlice";
import CheckoutSection from "./CheckoutSection";


import styles from "./DeliveryAddress.module.css";
import FormError from "../Users/FormError";


interface Iprops {
    address: string;
    handleChange?: React.ChangeEventHandler<HTMLTextAreaElement>;

    errorMessage?: string
    viewOnly?: boolean
}

const DeliveryAddressSection: React.FC<Iprops> = ({ address, handleChange = () => { }, viewOnly = false, errorMessage = "" }) => {

    const { name } = useSelector(userSliceSelector);

    const inputClass = errorMessage !== "" ? `${styles.textarea} ${styles.error}` : styles.textarea

    return (
        <CheckoutSection text="1. Delivery Address">
            <p>{name}</p>

            {
                viewOnly ?
                    <p>{address}</p>
                    :
                    <>
                        <textarea value={address} onChange={handleChange} disabled={viewOnly}
                            className={inputClass} rows={4} />
                        <FormError type="field" errorMessage={errorMessage} className={styles.error_message} />
                    </>
            }
        </CheckoutSection>
    );
}

export default DeliveryAddressSection;