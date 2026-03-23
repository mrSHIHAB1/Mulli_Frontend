import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://uncried-unpreventible-declan.ngrok-free.dev/api/v1',
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;