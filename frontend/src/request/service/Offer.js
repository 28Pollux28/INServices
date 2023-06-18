import {publicClient, privateClient} from "../client";

export default {
    getLatest: async () => {
        try {
            const response = await publicClient.get('offers/public/latest', {});

            if (response.data) {
                return response.data;
            }

            return false;
        } catch (error) {
            return false;
        }
    },

    getPubUser: async (id) => {
        try {
            const response = await publicClient.post(`user/public/${id}`, {});

            if (response.data) {
                return response.data;
            }

            return false;
        } catch (error) {
            return false;
        }
    },

    add: async (annonce) => {
        try {
            const response = await privateClient.post(`offers/restricted/create`,
                annonce
            );

            if (response) {
                return response.data;
            }

            return false;
        } catch (error) {
            return false;
        }
    },
    acceptOffer: async (id) => {
        try {
            const response = await privateClient.post(`offers/restricted/accept/${id}`, {});
            console.log("REPONSE SERVER", response);
            if (response.data) {
                return [true, response.data];
            }

            return false;
        } catch (error) {
            return [false, error.response.data];
        }
    },

    getMyOffers: async () => {
        try {
            const response = await privateClient.get(`offers/restricted/my`);

            if (response) {
                return response.data;
            }

            return false;
        } catch (error) {
            return error.response.data;
        }
    },
    deleteOffer: async (id) => {
        try {
            const response = await privateClient.post(`offers/restricted/delete/${id}`);

            if (response) {
                return [true, response.data];
            }

            return [false, null];
        } catch (error) {
            return [false, error.response.data];
        }
    },

    editOffer: async (id, data) => {
        try {
            const response = await privateClient.post(`offers/restricted/edit/${id}`, data);

            if (response) {
                return [true, response.data];
            }

            return [false, null];
        } catch (error) {
            return [false, error.response.data];
        }
    },

    acceptOffer: async (id) => {
        try {
            const response = await privateClient.post(`offers/restricted/accept/${id}`);

            if (response) {
                return [true, response.data];
            }

            return [false, null];
        } catch (error) {
            return [false, error.response.data];
        }
    },

    completeOffer: async (id) => {
        try {
            const response = await privateClient.post(`offers/restricted/complete/${id}`);

            if (response) {
                return [true, response.data];
            }

            return [false, null];
        } catch (error) {
            return [false, error.response.data];
        }
    }


};
