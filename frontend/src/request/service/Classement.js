import {publicClient as pubClient, privateClient} from "../client";

export default {
    pubRankings: async ()=> {
        try {
            const response = await pubClient.get('user/public/rankings/');
            if(response.data){
                // console.log(response.data);
                return response.data
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    privRankings: async ()=> {
        try {
            const response = await privateClient.get('user/restricted/rankings/');
            if(response.data){
                // console.log(response.data);
                return response.data
            }
            return null;
        } catch (error) {
            return null;
        }
    }
}
