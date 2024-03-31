
import styles from "./CustomSelect.module.css";


export interface ICustomSelectoption {
    [value: string]: string
}

export interface ICustomSelectProps {
    options: ICustomSelectoption
    className?: string
    defaultText: string

    value: string
    handleChange: React.ChangeEventHandler<HTMLSelectElement>
}


const CustomSelect: React.FC<ICustomSelectProps> = ({ className = "", options, handleChange, defaultText, value }) => {


    return (

        <select className={`${styles.select} ${className}`} value={value} onChange={handleChange}>

            <option className={styles.option} value="" hidden disabled>{defaultText}</option>

            <option className={styles.option}
                value={"Featured"}>Featured</option>

            {Object.keys(options).map(o => (
                <option className={styles.option} key={options[o]}
                    value={o}>{options[o]}</option>
            ))}


        </select>

    );
}

export default CustomSelect;