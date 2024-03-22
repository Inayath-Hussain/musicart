import styles from "./FormError.module.css";

interface Iprops {
    errorMessage: string
    className?: string
}

const FormError: React.FC<Iprops> = ({ errorMessage, className = "" }) => {
    return (
        errorMessage !== "" && <p className={`${styles.error_message} ${className}`}>*{errorMessage}</p>
    );
}

export default FormError;