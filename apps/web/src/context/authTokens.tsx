import { PropsWithChildren, createContext } from "react";
import { useCookies } from "react-cookie";




export const authTokenContext = createContext({
    accessToken: "", refreshToken: "",
    logout: () => { }
});



export const AuthTokenProvider: React.FC<PropsWithChildren> = ({ children }) => {

    // stateVariable is an array containing state variable, setter for state variable and function to remove the cookie
    const stateVariables = useCookies(["accessToken", "refreshToken"]);

    const { accessToken, refreshToken } = stateVariables[0];
    const removeCookie = stateVariables[2]

    const logout = () => {
        removeCookie("accessToken")
        removeCookie("refreshToken")
    }

    return (
        <authTokenContext.Provider value={{ accessToken: accessToken || "", refreshToken: refreshToken || "", logout }}>
            {children}
        </authTokenContext.Provider>
    );
}