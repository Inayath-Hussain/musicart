import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import useDeviceWidth from "@web/hooks/useDeviceWidth";
import { route } from "@web/routes";
import { productQuerySelector, updateProductQuery } from "@web/store/slices/productQuery";
import { useGetProductsQuery } from "@web/store/slices/productApi";

import styles from "./SearchBar.module.css"


interface Iprops {
    className?: string
    placeholder?: string
}

const SearchBar: React.FC<Iprops> = ({ className = "", placeholder = "" }) => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { queryString } = useSelector(productQuerySelector)
    const dispatch = useDispatch();

    const { isDesktop } = useDeviceWidth()
    // used to get new
    useGetProductsQuery(queryString);

    const timeOutRef = useRef<NodeJS.Timeout>();

    // debounce function to minimize sending api requests
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        clearTimeout(timeOutRef.current)

        timeOutRef.current = setTimeout(() => {
            console.log(e.target.value)
            dispatch(updateProductQuery({ key: "name", value: e.target.value }))

            // in mobile device when user's use search bar from other pages such as cart then user is navigated to products list page
            if (isDesktop === false && pathname !== route.home) navigate(route.home)
        }, 900)
    }

    return (
        <input type="text" placeholder={placeholder} onChange={handleChange}
            className={`${styles.input} ${className}`} />
    );
}

export default SearchBar;