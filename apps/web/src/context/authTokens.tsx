import { updateCart } from "@web/store/slices/cartItems";
import { updateUserName } from "@web/store/slices/userSlice";
import { PropsWithChildren, createContext } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";




export const authTokenContext = createContext({
    accessToken: "", refreshToken: "",
    logout: () => { }
});



export const AuthTokenProvider: React.FC<PropsWithChildren> = ({ children }) => {

    // stateVariable is an array containing state variable, setter for state variable and function to remove the cookie
    const stateVariables = useCookies(["accessToken", "refreshToken"]);

    const { accessToken, refreshToken } = stateVariables[0];
    const removeCookie = stateVariables[2]

    const dispatch = useDispatch()

    const logout = () => {
        removeCookie("accessToken")
        removeCookie("refreshToken")

        // clear cart
        dispatch(updateCart(0))
        // clear name
        dispatch(updateUserName(""))
    }

    return (
        <authTokenContext.Provider value={{ accessToken: accessToken || "", refreshToken: refreshToken || "", logout }}>
            {children}
        </authTokenContext.Provider>
    );
}