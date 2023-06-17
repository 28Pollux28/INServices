import {privateClient, publicClient as client} from "../client";
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
            return jwt(token.access);
        }

        return null;
    },

    getMe: async () => {
        try {
            const response = await privateClient.get('user/restricted/me');
            return response.data;
        } catch (error) {
            return null;
        }
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

    updateToken: (token) => {
        if (token && token.access) {
            localStorage.setItem("token", JSON.stringify(token));
        }
    },

    editUser: async (data) => {
        try {
            const response = await privateClient.post('user/restricted/edit', 
            {
                "name": data.name,
                "surname": data.surname,
                "username":data.username,
                "email":data.email,
                "phone":data.phone
            }
            );

            if (response.data) {
                return [true, response.data] ;
            }
            return false
        } catch (error) {
            return [false, error.response.data];
        }
    },
};
