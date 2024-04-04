import { authTokenContext } from "@web/context/authTokens";
import { route } from "@web/routes";
import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";

const AuthOnlyRoute: React.FC<PropsWithChildren> = ({ children }) => {

    const { accessToken, refreshToken } = useContext(authTokenContext);

    if (!accessToken && !refreshToken) return (
        <Navigate to={route.users.login} />
    )

    return (
        children
    );
}

export default AuthOnlyRoute;