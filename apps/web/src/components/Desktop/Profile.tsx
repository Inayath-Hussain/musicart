import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import { authTokenContext } from "@web/context/authTokens";
import { useSelector } from "react-redux";
import { userSliceSelector } from "@web/store/slices/userSlice";


const Profile = () => {

    const { logout } = useContext(authTokenContext);

    const { name } = useSelector(userSliceSelector)

    const [open, setOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement | null>(null);


    // close profile when user scrolls
    useEffect(() => {
        const handleClose = () => setOpen(false);

        window.addEventListener("scroll", handleClose)

        return () => {
            window.removeEventListener("scroll", handleClose)
        }

    }, [])

    const logo = () => {

        const [first, last] = name.split(" ")

        return `${first ? first[0].toUpperCase() : ""} ${last ? last[0].toUpperCase() : ""}`
    }

    return (
        <div className={styles.profile_container} >
            <button className={styles.profile_button} onClick={() => setOpen(prev => !prev)}>
                {logo()}

            </button>

            {open && <div className={styles.profile} ref={profileRef}>
                <p>{name}</p>

                <button className={styles.logout_button} onClick={logout}>
                    Logout
                </button>
            </div>}

        </div>
    );
}

export default Profile;