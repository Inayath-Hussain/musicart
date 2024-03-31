
import styles from "./MobileSearchBarHeader.module.css";
import SearchBar from "../Products/SearchBar";

interface Iprops {
    className?: string
}


/**
 * this is rendered only in mobile screen's and tabs.
 */
const MobileSearchBarHeader: React.FC<Iprops> = ({ className = "" }) => {
    return (
        <header className={`${styles.container} ${className}`}>
            <SearchBar placeholder="Search Musicart" className={styles.input} />
        </header>
    );
}

export default MobileSearchBarHeader;