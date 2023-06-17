import axios from 'axios'
import User from './service/User'
import {wait} from "@testing-library/user-event/dist/utils";


export const publicClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const privateClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

let isRefreshing = false;

privateClient.interceptors.request.use(
    (config) => {
        const token = User.getToken();
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

privateClient.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (!originalConfig.url.includes("/auth/login/") && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !isRefreshing) {
                isRefreshing = true;
                originalConfig._retry = true;

                try {
                    const rs = await publicClient.post("/auth/refresh/", {
                        refresh: User.getRefreshToken(),
                    });

                    User.updateToken(rs.data);
                    isRefreshing = false;
                    return privateClient(originalConfig);
                } catch (_error) {
                    localStorage.removeItem("token");
                    return Promise.reject(_error);
                }
            }
            if (isRefreshing) {
                await wait(500);
                return privateClient(originalConfig);
            }
        }

        return Promise.reject(err);
    }
);

