
import Image from '@web/assets/images/banner_image.png'

import styles from "./Banner.module.css";


const Banner = () => {
    return (
        <div className={styles.container} >

            <div className={styles.text_container}>

                <h1 className={styles.text}>
                    Grab upto 50% off on <br />
                    Selected headphones
                </h1>

                <p className={styles.button}>Buy Now</p>
            </div>


            <img src={Image} alt="" className={styles.image} />

        </div>
    );
}

export default Banner;