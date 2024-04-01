import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomSelect, { ICustomSelectoption } from "./CustomSelect";
import ViewButtons from "./ViewButtons";
import useDeviceWidth from "@web/hooks/useDeviceWidth";
import { useGetProductsQuery } from "@web/store/slices/productApi";
import { updateProductQuery, IUpdateProductQueryActionPayload, productQuerySelector, updateOptions } from "@web/store/slices/productQuery";

import styles from "./FilterSection.module.css";


const FilterSection = () => {

    const { isDesktop } = useDeviceWidth();

    const { queryOptions, queryString, options } = useSelector(productQuerySelector);
    const dispatch = useDispatch()

    // dispatch function for updateProductQuery action
    const updateProductQueryDispatch = (payload: IUpdateProductQueryActionPayload) => dispatch(updateProductQuery(payload))


    // event handlers for all select elements.
    // it is a function which takes onChange event handler paramter and returns functions for different select elements
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => ({

        sort: () => updateProductQueryDispatch({ key: "sortBy", value: e.target.value }),
        headphoneType: () => updateProductQueryDispatch({ key: "headphoneType", value: e.target.value }),
        company: () => updateProductQueryDispatch({ key: "company", value: e.target.value }),
        color: () => updateProductQueryDispatch({ key: "color", value: e.target.value }),
        price: () => updateProductQueryDispatch({ key: "price", value: e.target.value })

    })


    const { isSuccess, data } = useGetProductsQuery(queryString);

    useEffect(() => {

        const company: ICustomSelectoption = {}
        const color: ICustomSelectoption = {}

        if (isSuccess && !options.extracted) {
            data.data.forEach(d => {
                company[d.brand] = d.brand
                color[d.color] = d.color
            })

            dispatch(updateOptions({ extracted: true, color, company }))
        }

    }, [isSuccess])




    const sortOptions: ICustomSelectoption = {
        "price_asc": "Price : Lowest",
        "price_desc": "Price : Highest",
        "name_asc": "Name : (A-Z)",
        "name_desc": "Name : (Z-A)"
    }


    const headphoneTypeOptions: ICustomSelectoption = {
        "in-ear": "In-ear headphone",
        "on-ear": "On-ear headphone",
        "over-ear": "Over-ear headphone"
    }

    const rupeeSymbol = String.fromCharCode(8377)

    const getPriceFormat = (value: number) => `${rupeeSymbol}${Intl.NumberFormat("en-In").format(value)}`

    const priceOptions: ICustomSelectoption = {
        "0-1000": `${getPriceFormat(0)} - ${getPriceFormat(1000)}`,
        "1000-10000": `${getPriceFormat(1000)} - ${getPriceFormat(10000)}`,
        "10000-20000": `${getPriceFormat(10000)} - ${getPriceFormat(20000)}`
    }


    return (
        <div className={styles.section_container} >

            {/* sorting */}
            <CustomSelect defaultText="Sort by" options={sortOptions} handleChange={e => handleChange(e).sort()} value={queryOptions.sortBy} />


            {/*  */}
            <div className={styles.view_button_and_filters_container}>

                {isDesktop && <ViewButtons />}


                {/* filtering */}
                <div className={styles.filter_container}>

                    {/* headphone type */}
                    <CustomSelect defaultText="Headphone type" options={headphoneTypeOptions} handleChange={e => handleChange(e).headphoneType()} value={queryOptions.headphoneType}
                        className={styles.filter_input} />

                    {/* company */}
                    <CustomSelect defaultText="Company" options={options.company} handleChange={e => handleChange(e).company()} value={queryOptions.company}
                        className={styles.filter_input} />


                    {/* color */}
                    <CustomSelect defaultText="Color" options={options.color} handleChange={e => handleChange(e).color()} value={queryOptions.color}
                        className={styles.filter_input} />

                    {/* price */}
                    <CustomSelect defaultText="Price" options={priceOptions} handleChange={e => handleChange(e).price()} value={queryOptions.price}
                        className={styles.filter_input} />

                </div>


            </div>



        </div>
    );
}

export default FilterSection;