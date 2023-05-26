import {publicClient as client} from "../client";
import jwt from "jwt-decode";

export default {
    login: async (email, password) => {
        try {
            const response = await client.post('auth/token/', {
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

    logout: () => {
        localStorage.removeItem('token');
    },

    register: (data) => {
        // not implemented yet
        console.log(data);
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

    updateToken: (accessToken) => {
        const token = JSON.parse(localStorage.getItem("token"));

        if (token && token.access) {
            token.access = accessToken;
            localStorage.setItem("token", JSON.stringify(token));
        }
    }
};

