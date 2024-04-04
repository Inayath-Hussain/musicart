import { useState } from "react";

import Banner from "@web/components/Products/Banner";
import FilterSection from "@web/components/Products/FilterSection";
import LogoAndLink from "@web/components/Products/LogoAndLink";
import ProductsList, { ViewStyle } from "@web/components/Products/ProductsList";
import SearchBar from "@web/components/Products/SearchBar";
import useDeviceWidth from "@web/hooks/useDeviceWidth";
import { useGetProductsQuery } from "@web/store/slices/productApi";


import styles from "./ListProductsPage.module.css";
import FeedBack from "@web/components/Desktop/FeedBack";



const ListProductsPage = () => {

    const { isDesktop } = useDeviceWidth();

    const { data, isError } = useGetProductsQuery("");
    console.log(data, isError)


    const [viewStyle, setViewStyle] = useState<ViewStyle>("grid");


    return (
        <div className={styles.list_product_layout}>
            {isDesktop && <LogoAndLink />}

            <Banner />

            {isDesktop && <SearchBar className={styles.input} placeholder="Search by Product Name" />}

            <FilterSection viewStyle={viewStyle} handleViewStyleChange={(value) => setViewStyle(value)} />

            <hr className={styles.horizontal_rule} />

            <ProductsList viewStyle={viewStyle} />

            {isDesktop && <FeedBack />}
        </div>
    );
}

export default ListProductsPage;