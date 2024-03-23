import styles from "./FormButton.module.css"

interface Iprops {
    text: string
    type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
    className?: string
    variant: "filled" | "outline"
    loading?: boolean
    disabled?: boolean
}

const FormButton: React.FC<Iprops> = ({ text, type, className = "", variant, loading = false, disabled = false }) => {

    const isDisabled = disabled || loading

    const variantClass = variant === "filled" ? styles.filled : styles.outline

    const loadingClass = loading ? styles.loading : ""
    return (
        <button type={type} className={`${styles.button} ${variantClass} ${className} ${loadingClass}`}
            disabled={isDisabled} >{text}</button>
    );
}

export default FormButton;