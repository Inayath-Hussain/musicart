import { useRef, useState } from "react";
import Slider, { Settings } from "react-slick"

import CarouselArrow from "@web/assets/icons/carousel_button.svg";

import styles from "./Carousel.module.css";


interface Iprops {
    images: string[]
}

const Carousel: React.FC<Iprops> = ({ images }) => {

    const sliderRef = useRef<Slider | null>(null);

    const [activeSlide, setActiveSlide] = useState(0);

    const settings: Settings = {
        arrows: false,
        dots: false,
        speed: 500,
        pauseOnDotsHover: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToScroll: 1,
        slidesToShow: 1,

        beforeChange(currentSlide, nextSlide) {
            setActiveSlide(nextSlide);
        }
    }

    return (
        <>
            <div className={styles.carousel_container}>

                <Slider ref={sliderRef}
                    {...settings}
                >
                    {images.map(i => (
                        <img src={i} alt="" key={i} className={styles.image} />
                    ))}
                </Slider>


            </div>

            <div className={styles.controls_container}>

                {/* previous button */}
                <button onClick={() => sliderRef.current?.slickPrev()}
                    className={styles.carousel_button} title="Previous">
                    <img src={CarouselArrow} alt="" height={14} />
                </button>


                {/* dots */}
                {images.map((image, index) => (

                    <label onClick={() => sliderRef.current?.slickGoTo(index)}
                        className={`${styles.dot} ${activeSlide === index ? styles.dot_selected : ""}`} key={index}>
                        <input type="radio" name="current_slide" className={styles.input} />
                    </label>

                ))}

                {/* next button */}
                <button onClick={() => sliderRef.current?.slickNext()}
                    className={styles.carousel_button} title="Next">
                    <img src={CarouselArrow} alt="" className={styles.next_button_image} height={14} />
                </button>

            </div>
        </>

    );
}

export default Carousel;