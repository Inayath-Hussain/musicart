import { useState } from "react";

import GridIcon from "../Icons/Grid";
import ListIcon from "../Icons/List";

import styles from "./ViewButtons.module.css";


type ViewOptions = "grid" | "list"

const ViewButtons = () => {

    const [viewState, setViewState] = useState<ViewOptions>("grid");

    const getFillColor = (value: ViewOptions) => viewState === value ? "#000" : "#fff"

    return (
        <div className={styles.view_buttons_container}>
            <label>
                <GridIcon fill={getFillColor("grid")} />
                <input type="radio" name="view_button" defaultChecked className={styles.input}
                    checked={viewState === "grid"} onChange={() => setViewState("grid")} />
            </label>

            <label>
                <ListIcon fill={getFillColor("list")} />
                <input type="radio" name="view_button" className={styles.input}
                    checked={viewState === "list"} onChange={() => setViewState("list")} />
            </label>
        </div>
    );
}

export default ViewButtons;