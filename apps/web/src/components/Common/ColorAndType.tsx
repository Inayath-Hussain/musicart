import styles from "./ColorAndType.module.css";

interface Iprops {
    color: string
    type: string
    className?: string
}


const ColorAndType: React.FC<Iprops> = ({ color, type, className = "" }) => {
    return (
        <div className={`${styles.color_and_type_container} ${className}`}>
            <p className={styles.capitalize}>{color}</p> |
            <p className={styles.capitalize}>{type} headphone</p>
        </div>
    );
}

export default ColorAndType;