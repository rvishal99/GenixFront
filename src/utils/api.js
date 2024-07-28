import axios from 'axios';

export const fetchProduct = async (productId) => {
    const response = await axios.get(`/api/products/${productId}`);
    return response.data;
};

export const placeBid = async (productId, bidData) => {
    const response = await axios.post(`/api/products/${productId}/bid`, bidData);
    return response.data;
};
