import styles from "./FormInput.module.css";

export interface FormInputProps {
    label: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    className?: string
    type: React.HTMLInputTypeAttribute
}

const FormInput: React.FC<FormInputProps> = ({ label, onChange, value, className = "", type }) => {
    return (
        <>
            <label className={styles.label}>{label}</label>
            <input type={type} value={value} onChange={onChange}
                className={`${styles.input} ${className}`} />
        </>
    );
}

export default FormInput;