
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

const axiosPublic = axios.create({
    baseURL: "https://uncried-unpreventible-declan.ngrok-free.dev/api/v1",
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }
});

// Add a request interceptor
axiosPublic.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            const res = await axiosPublic.get("/auth/me");

            setUser(res.data.data);
        
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (credentials) => {
        setLoading(true);
        try {
            const res = await axiosPublic.post("/auth/login", credentials);
            console.log(res)
            const accessToken = res.data?.data?.accessToken;

            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            }

            await loadUser();
        } finally {
            setLoading(false);
        }

    };


    const logOut = async () => {
        setLoading(true);
        try {
            await axiosPublic.post("/auth/logout");
        } catch (error) {
            console.error("Logout API failed:", error);
        } finally {
            localStorage.removeItem("accessToken");
            setUser(null);
            setLoading(false);
        }
    };

    const authInfo = {
        user,
        loading,
        login,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;