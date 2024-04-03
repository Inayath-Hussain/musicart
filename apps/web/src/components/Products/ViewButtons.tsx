import GridIcon from "../Icons/Grid";
import ListIcon from "../Icons/List";
import { ViewStyle } from "./ProductsList";

import styles from "./ViewButtons.module.css";


interface Iprops {
    viewStyle: ViewStyle

    handleViewStyleChange: (value: ViewStyle) => void
}

const ViewButtons: React.FC<Iprops> = ({ viewStyle, handleViewStyleChange }) => {

    const getFillColor = (value: ViewStyle) => viewStyle === value ? "#000" : "#fff"

    return (
        <div className={styles.view_buttons_container}>
            <label>
                <GridIcon fill={getFillColor("grid")} />
                <input type="radio" name="view_button" defaultChecked className={styles.input}
                    checked={viewStyle === "grid"} onChange={() => handleViewStyleChange("grid")} />
            </label>

            <label>
                <ListIcon fill={getFillColor("list")} />
                <input type="radio" name="view_button" className={styles.input}
                    checked={viewStyle === "list"} onChange={() => handleViewStyleChange("list")} />
            </label>
        </div>
    );
}

export default ViewButtons;