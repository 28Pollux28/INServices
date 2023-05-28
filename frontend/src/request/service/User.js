import {publicClient as client} from "../client";
import jwt from "jwt-decode";

export default {
    login: async (email, password) => {
        try {
            const response = await client.post('auth/login/', {
                email,
                password
            });

            if (response.data.access) {
                localStorage.setItem("token", JSON.stringify(response.data));
                return true;
            }

            return false;
        } catch (error) {
            return false;
        }
    },

    logout: async () => {
        localStorage.removeItem('token');
        return true;
    },

    register: async (data) => {
        try {
            const response = await client.post('auth/register/', data);
            if (response.data.access) {
                localStorage.setItem("token", JSON.stringify(response.data));
                return [true, null];
            }
            return false
        } catch (error) {
            return [false, error.response.data];
        }
    },
    verifyEmail: async (token) => {
        try {
            const response = await client.post('auth/verify/', {
                token
            });
            if (response.data.access) {
                localStorage.setItem("token", JSON.stringify(response.data));
                return true;
            }
            return false
        } catch (error) {
            return false;
        }
    },

    get: () => {
        const token = JSON.parse(localStorage.getItem('token'));

        if (token && token.access) {
            const user = jwt(token.access); // decode the JWT token
            return user;
        }

        return null;
    },

    getToken: () => {
        const token = JSON.parse(localStorage.getItem('token'));

        if (token && token.access) {
            return token.access;
        }

        return null;
    },

    getRefreshToken: () => {
        const token = JSON.parse(localStorage.getItem("token"));

        if (token && token.refresh)
            return token.refresh;
    },

    updateToken: (accessToken) => {
        const token = JSON.parse(localStorage.getItem("token"));

        if (token && token.access) {
            token.access = accessToken;
            localStorage.setItem("token", JSON.stringify(token));
        }
    }
};
