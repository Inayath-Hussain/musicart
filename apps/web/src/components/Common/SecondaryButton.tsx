import styles from "./SecondaryButton.module.css";


interface Iprops {
    text: string
    handleClick: React.MouseEventHandler<HTMLButtonElement>
    className?: string
}


const SecondaryButton: React.FC<Iprops> = ({ text, handleClick, className = "" }) => {
    return (
        <button className={`${styles.secondary_button} ${className}`} onClick={handleClick}>
            {text}
        </button>
    );
}

export default SecondaryButton;