import styles from "./FormButton.module.css"

interface Iprops {
    text: string
    type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
    className?: string
    variant: "filled" | "outline"
}

const FormButton: React.FC<Iprops> = ({ text, type, className = "", variant }) => {

    const variantClass = variant === "filled" ? styles.filled : styles.outline

    return (
        <button type={type} className={`${styles.button} ${variantClass} ${className}`}>{text}</button>
    );
}

export default FormButton;