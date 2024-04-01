import styles from "./DescriptionPoints.module.css";


interface Iprops {
    points: string[]
}


const DescriptionPoints: React.FC<Iprops> = ({ points }) => {
    return (
        <>
            <p>About this item</p>
            <ul>
                {points.map(p => (
                    <li className={styles.point}>{p}</li>
                ))}
            </ul>
        </>
    );
}

export default DescriptionPoints;