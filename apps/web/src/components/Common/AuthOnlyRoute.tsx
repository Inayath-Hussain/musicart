import { authTokenContext } from "@web/context/authTokens";
import { route } from "@web/routes";
import { PropsWithChildren, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthOnlyRoute: React.FC<PropsWithChildren> = ({ children }) => {

    const naviagte = useNavigate();

    const { accessToken, refreshToken } = useContext(authTokenContext);

    // useEffect(() => {
    //     if (!accessToken && !refreshToken) {
    //         naviagte(route.users.login)
    //     }
    // }, [])

    if (!accessToken && !refreshToken) return (
        <Navigate to={route.users.login} />
    )

    return (
        children
    );
}

export default AuthOnlyRoute;