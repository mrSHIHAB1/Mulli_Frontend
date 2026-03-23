import axios from "axios";
import { useNavigate } from "react-router"; // use react-router-dom
import { useEffect } from "react";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
    baseURL: "https://uncried-unpreventible-declan.ngrok-free.dev/api/v1",
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }

});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if (!auth) return; // prevent null destructuring

        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("accessToken");
                if (token) config.headers.Authorization = `Bearer ${token}`;

                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                if ((status === 401 || status === 403) && auth.logOut) {
                    await auth.logOut();
                    navigate("/login");
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [auth, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;