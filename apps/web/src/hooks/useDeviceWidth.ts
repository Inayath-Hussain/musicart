import { useEffect, useState } from "react";

const useDeviceWidth = () => {

    const [deviceWidth, setDeviceWidth] = useState(window.screen.width);

    useEffect(() => {

        const handleResize = () => setDeviceWidth(window.screen.width)

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const isDesktop = deviceWidth >= 768

    return { isDesktop };
}

export default useDeviceWidth;