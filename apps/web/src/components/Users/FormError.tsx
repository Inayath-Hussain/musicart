import styles from "./FormError.module.css";

interface Iprops {
    errorMessage: string
    className?: string
    type: "field" | "form"
}

const FormError: React.FC<Iprops> = ({ errorMessage, className = "", type }) => {
    const message = type === "field" ? `*${errorMessage}` : errorMessage

    return (
        errorMessage !== "" && <p className={`${styles.error_message} ${className}`}>
            {message}
        </p>
    );
}

export default FormError;