import styles from "./Footer.module.css";

interface Iprops {
    className?: string
}

const Footer: React.FC<Iprops> = ({ className = "" }) => {
    return (
        <footer className={`${styles.footer_container} ${className}`}>
            Musicart | All rights reserved
        </footer>
    );
}

export default Footer;