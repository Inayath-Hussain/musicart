
import styles from "./MobileSearchBarHeader.module.css";

interface Iprops {
    className?: string
}


/**
 * this is rendered only in mobile screen's and tabs.
 */
const MobileSearchBarHeader: React.FC<Iprops> = ({ className = "" }) => {
    return (
        <header className={`${styles.container} ${className}`}>
            <input type="text" placeholder="Search Musicart"
                className={styles.input} />
        </header>
    );
}

export default MobileSearchBarHeader;