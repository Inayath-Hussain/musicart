import { Link } from "react-router-dom";

import InvoiceIcon from "../Icons/Invoice";
import { route } from "@web/routes";
import PrimaryButton from "../Common/PrimaryButton";

import styles from "./Item.module.css";
import useDeviceWidth from "@web/hooks/useDeviceWidth";


interface Iprops {
    name: string;
    address: string
    order_id: string
}

const InvoiceItem: React.FC<Iprops> = ({ address, name, order_id }) => {

    const { isDesktop } = useDeviceWidth();

    const iconSize = isDesktop ? 32 : 26

    return (
        <div className={styles.order_item_container}>

            <InvoiceIcon fill="#828282" width={iconSize} height={iconSize} />

            <div className={styles.name_and_address_container}>

                <p className={styles.name}>{name}</p>
                <p className={styles.address}>{address}</p>

            </div>


            <Link to={route.invoices.id(order_id)}>
                <PrimaryButton text="View Invoice" className={styles.button} />
            </Link>

        </div>
    );
}

export default InvoiceItem;