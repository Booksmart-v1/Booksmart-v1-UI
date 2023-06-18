import axios from 'axios';
import { APIURL } from '../constants';

export const saveTokens = (accesToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accesToken);
    localStorage.setItem('refreshToken', refreshToken);
    };

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const getNewToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const resp = await axios.post(APIURL+'v2/refreshUser', {}, {
        headers: {
            authorization: `Bearer ${refreshToken}`,
        },
    });
    if (resp.data.succcess === true) {
        localStorage.setItem('accessToken', resp.data.data.token);
        return resp.data.data.token;
    }
    return null;
}