import { apiConnector } from "../apiConnector.js";
import { authEndpoints } from "../apis.js";
import {toast} from "react-hot-toast";
import { setUser } from "../../Slices/authSlice.js";
import {setToken} from "../../Slices/authSlice.js"

const {
    LOGIN_API,
    REGISTER_API,
    LOGOUT_API,
} = authEndpoints


//====================Login====================

export const login = (username, password, navigate)  => {
    return async (dispatch) => {
        const toastId = toast.loading('Logging in...');

        console.log(username, password);

        try {
            const response = await apiConnector(
                "POST",
                LOGIN_API,
                {username, password},
            )

            const user = response.data.data.user;

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            
            
            dispatch(setToken(response.data.data.accessToken));
            
            dispatch(setUser(user));
            
            
            localStorage.setItem("user", JSON.stringify({ ...response.data.data.user}));
            localStorage.setItem("accessToken", response.data.data?.accessToken);
            
            toast.success("Login Successfull");
            navigate("/")
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("LOGIN_API ERROR", error);
        } 
        toast.dismiss(toastId);
    }
}


//====================Register====================

export const register = (username, password, email, fullname, phone, avatar, metaMaskAddress, navigate) => {
    return async (dispatch) => {

        const toastId = toast.loading('Registering...');
        console.log(metaMaskAddress);

        try{
            const response = await apiConnector(
                "POST",
                REGISTER_API,
                {
                    fullname,
                    username,
                    email,
                    phone,
                    password,
                    avatar,
                    metaMaskAddress
                },
                {
                    "Content-Type": "multipart/form-data",
                }
            )


            console.log(response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            const user = response.data.data.CreatedUser;

            console.log(user);

            dispatch(setToken(response.data.accessToken));

            //console.log(response.data.data.accessToken);

            dispatch(setUser(user));

            localStorage.setItem("user", JSON.stringify({ ...response.data.data.createdUser}));
            localStorage.setItem("accessToken", response.data.data?.accessToken);

            toast.dismiss(toastId);
            toast.success("Register Successfull");
            navigate("/")
            window.location.reload();
        } catch (error){
            toast.error(error.response?.data?.message)
            console.log("REGISTER_API ERROR", error);
        }
        toast.dismiss(toastId);
    }
}



//====================Logout====================
export const logout = (token, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading('Logging out...');

        try {
            const response = await apiConnector(
                "GET",
                LOGOUT_API,
                null,
                {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            )

            console.log(response.data.data);
            console.log("hello");

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            dispatch(setToken(null));
            toast.success("Logout Successfull");
            navigate("/")
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("LOGOUT_API ERROR", error);
        } 
        toast.dismiss(toastId);
    }
}