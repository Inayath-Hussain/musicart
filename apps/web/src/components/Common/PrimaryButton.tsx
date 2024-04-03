import styles from "./PrimaryButton.module.css";


interface Iprops {
    text: string
    handleClick?: () => void

    className?: string
}


const PrimaryButton: React.FC<Iprops> = ({ text, handleClick, className = "" }) => {
    return (
        <button className={`${styles.primary_button} ${className}`} onClick={handleClick}>
            {text}
        </button>
    );
}

export default PrimaryButton;