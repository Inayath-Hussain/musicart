import { useSelector } from "react-redux";

import { userSliceSelector } from "@web/store/slices/userSlice";
import CheckoutSection from "./CheckoutSection";


import styles from "./DeliveryAddress.module.css";


interface Iprops {
    address: string;
    handlechange?: React.ChangeEventHandler<HTMLTextAreaElement>;

    viewOnly?: boolean
}

const DeliveryAddressSection: React.FC<Iprops> = ({ address, handlechange = () => { }, viewOnly = false }) => {

    const { name } = useSelector(userSliceSelector);

    return (
        <CheckoutSection text="1. Delivery Address">
            <p>{name}</p>

            {
                viewOnly ?
                    <p>{address}</p>
                    :
                    <textarea value={address} onChange={handlechange} disabled={viewOnly}
                        className={styles.textarea} rows={4} />
            }
        </CheckoutSection>
    );
}

export default DeliveryAddressSection;