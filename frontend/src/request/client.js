import axios from 'axios'
import User from './service/User'


export const publicClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const privateClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { Authorization: `Bearer ${User.getToken()}` },
});

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

        if (!originalConfig.url.includes("/auth/signin/") && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await privateClient.post("/auth/token/refresh/", {
                        refresh: User.getRefreshToken(),
                    });

                    User.updateToken(rs.data.access);

                    return privateClient(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

