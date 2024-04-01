import { useGetProductsQuery } from "@web/store/slices/productApi";
import Card from "./Card";
import styles from "./ProductsList.module.css";
import { useSelector } from "react-redux";
import { productQuerySelector } from "@web/store/slices/productQuery";


const ProductsList = () => {
    const w = window.screen.width

    const { queryString } = useSelector(productQuerySelector);

    const { data } = useGetProductsQuery(queryString);

    return (
        <div className={styles.container}>

            {data?.data.map(d => (
                <Card key={d.name} color={d.color} name={d.name} imageURL={d.main_image}
                    headphoneType={d.headphone_type} price={d.price} id={d._id} />
            ))}


            {w}
        </div>
    );
}

export default ProductsList;