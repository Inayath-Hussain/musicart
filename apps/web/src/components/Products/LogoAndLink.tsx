import { Link } from "react-router-dom";

import DesktopBranding from "../Desktop/DesktopBrandingAndProfile";
import { route } from "@web/routes";
import { useContext } from "react";
import { authTokenContext } from "@web/context/authTokens";



const LogoAndLink = () => {

    const { accessToken, refreshToken } = useContext(authTokenContext);

    return (
        <DesktopBranding>
            <Link to={route.home}>
                Home
            </Link>


            {(accessToken || refreshToken) &&
                <Link to={route.invoices}>
                    Invoice
                </Link>
            }
        </DesktopBranding>
    )
}

export default LogoAndLink;