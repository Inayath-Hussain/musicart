import styles from "./FormInput.module.css";

export interface FormInputProps {
    label: string
    value: string | number | undefined
    onChange: React.ChangeEventHandler<HTMLInputElement>
    className?: string
    type: React.HTMLInputTypeAttribute
    multiple?: boolean
}

const FormInput: React.FC<FormInputProps> = ({ label, onChange, value, className = "", type, multiple = false }) => {
    return (
        <>
            <label className={styles.label} htmlFor={label}>{label}</label>
            <input id={label} type={type} value={value} onChange={onChange}
                className={`${styles.input} ${className}`} multiple={multiple} />
        </>
    );
}

export default FormInput;