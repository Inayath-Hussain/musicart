import { useSelector } from "react-redux";
import GridCard from "./GridCard";
import { useGetProductsQuery } from "@web/store/slices/productApi";
import { productQuerySelector } from "@web/store/slices/productQuery";

import styles from "./ProductsList.module.css";
import ListItem from "./ListItem";


export type ViewStyle = "grid" | "list"
interface Iprops {
    viewStyle: ViewStyle
}

const ProductsList: React.FC<Iprops> = ({ viewStyle }) => {
    const { queryString } = useSelector(productQuerySelector);

    const { data } = useGetProductsQuery(queryString);

    const displayStyle = viewStyle === "grid" ? styles.grid : styles.list

    return (
        <div className={`${styles.container} ${displayStyle}`}>

            {data?.data.map(d => (

                viewStyle === "grid" ?

                    <GridCard key={d.name} color={d.color} name={d.name} imageURL={d.main_image}
                        headphoneType={d.headphone_type} price={d.price} id={d._id} />

                    :

                    <ListItem key={d._id} name={d.name} fullTitle={d.full_title} color={d.color} imageURL={d.main_image}
                        headphoneType={d.headphone_type} price={d.price} id={d._id} />
            ))}

        </div>
    );
}

export default ProductsList;