import { useEffect } from "react";

import Banner from "@web/components/Products/Banner";
import FilterSection from "@web/components/Products/FilterSection";
import ProductsList from "@web/components/Products/ProductsList";
import { useGetProductsQuery } from "@web/store/slices/productApi";

import styles from "./ListProductsPage.module.css";
import SearchBar from "@web/components/Products/SearchBar";
import useDeviceWidth from "@web/hooks/useDeviceWidth";
import LogoAndLink from "@web/components/Products/LogoAndLink";



const ListProductsPage = () => {

    const { isDesktop } = useDeviceWidth();

    const { data, isError } = useGetProductsQuery("");
    console.log(data, isError)

    // make api call to get all products and store it in redux
    useEffect(() => {

    }, [])



    return (
        <div className={styles.list_product_layout}>
            {isDesktop && <LogoAndLink />}

            <Banner />

            {isDesktop && <SearchBar className={styles.input} placeholder="Search by Product Name" />}

            <FilterSection />

            <hr className={styles.horizontal_rule} />

            <ProductsList />
        </div>
    );
}

export default ListProductsPage;