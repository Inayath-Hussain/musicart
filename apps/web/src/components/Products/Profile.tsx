import { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";


const Profile = () => {

    const name = "Devargnoering erongnk Rastogirfergrg"

    const [open, setOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        const handleClose = () => setOpen(false);

        window.addEventListener("scroll", handleClose)

        return () => {
            window.removeEventListener("scroll", handleClose)
        }

    }, [])

    const logo = () => {

        const [first, last] = name.split(" ")

        return `${first[0].toUpperCase()} ${last[0].toUpperCase()}`
    }

    return (
        <div className={styles.profile_container} >
            <button className={styles.profile_button} onClick={() => setOpen(prev => !prev)}>
                {logo()}

            </button>

            {open && <div className={styles.profile} ref={profileRef}>
                <p>{name}</p>

                <button className={styles.logout_button}>
                    Logout
                </button>
            </div>}

        </div>
    );
}

export default Profile;