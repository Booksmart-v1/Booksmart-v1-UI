import axios from 'axios';
import { getAccessToken, getNewToken } from './authToken';

export const get = async (url: string) => {
    let token = getAccessToken();
    let retry = false;
    for (let i = 0; i < 2; i++) {
        const resp = await axios.get(url, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        if (resp.data.success === true) {
            return resp.data;
        } else if (resp.status === 401) {
            retry = true;
            token = await getNewToken();
        }
        if (retry === false) {
            break;
        }
    }
    return null;
}

export const post = async (url: string, data: any) => {
    let token = getAccessToken();
    let retry = false;
    for (let i = 0; i < 2; i++) {
        const resp = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        });
        if (resp.data.success === true) {
            return resp.data;
        } else if (resp.status === 401) {
            retry = true;
            token = await getNewToken();
        }
        if (retry === false) {
            break;
        }
    }
    return null;
}

export const formPost = async (url: string, formData: any) => {
    let token = getAccessToken();
    let retry = false;
    for (let i = 0; i < 2; i++) {
        const resp = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data;',
                authorization: `Bearer ${token}`,
            },
        });
        if (resp.data.success === true) {
            return resp.data;
        } else if (resp.status === 401) {
            retry = true;
            token = await getNewToken();
        }
        if (retry === false) {
            break;
        }
    }
    return null;
}