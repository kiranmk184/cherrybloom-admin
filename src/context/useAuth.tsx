import React, { createContext, useEffect, useState } from "react";
import { UserProfile } from "../models/User";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { loginApi } from "../services/AuthService";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    // registerUser: (email: string, username: string, password: string) => void;
    loginUser: (email: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);

    // const registerUser = async (
    //     email: string,
    //     username: string,
    //     password: string
    // ) => {
    //     await registerApi(email, username, password)
    //         .then((res) => {
    //             if (res) {
    //                 // todo: implement a secure storage like HTTP only cookie
    //                 localStorage.setItem("token", res?.data.token);
    //                 const userObj = {
    //                     userName: res?.data.userName,
    //                     email: res?.data.email,
    //                 };
    //                 localStorage.setItem("user", JSON.stringify(userObj));
    //                 setToken(res?.data.token!);
    //                 setUser(userObj!);
    //                 toast.success("Login Success!");
    //                 navigate("/search");
    //             }
    //         })
    //         .catch((e) => toast.warning("Server error occured"));
    // };

    const loginUser = async (email: string, password: string) => {
        await loginApi(email, password)
            .then((res) => {
                if (res) {
                    // todo: implement a secure storage like HTTP only cookie
                    localStorage.setItem("token", res?.data.payload.access_token);
                    const userObj: UserProfile = {
                        id: res?.data.payload.user.id,
                        name: res?.data.payload.user.name,
                        email: res?.data.payload.user.email,
                        emailVerifiedAt: res?.data.payload.user.email_verified_at,
                        roleId: res?.data.payload.user.rold_id,
                        image: res?.data.payload.user.image,
                    };
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(res?.data.token!);
                    setUser(userObj!);
                    toast.success("Login Success!");
                    navigate("/");
                }
            })
            .catch((e) => toast.warning("Server error occured"));
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    };

    return (
        <UserContext.Provider
            // todo: register
            value={{ loginUser, user, token, logout, isLoggedIn, }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);