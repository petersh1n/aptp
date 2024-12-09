import { API } from './config';

export const sendCustomData = async (customData) => {
    try {
        const response = await API.post('/api/custom/', customData);
        return response.data;
    } catch (error) {
        throw error;
    }
}; 