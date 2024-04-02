import { PropsWithChildren } from "react";
import styles from "./CheckoutSection.module.css";


interface Iprops {
    text: string;
}

const CheckoutSection: React.FC<PropsWithChildren<Iprops>> = ({ text, children }) => {
    return (
        <div className={styles.checkout_section}>

            <p className={styles.section_header}>{text}</p>

            <div className={styles.details_container}>
                {children}
            </div>
        </div>
    );
}

export default CheckoutSection;