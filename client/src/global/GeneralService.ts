import axios from "axios";

const localHost = 'http://localhost:8080/api/v1';

export const authService = (url, data) => {
    return axios.post(
        `${localHost}${url}`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};

export const PostService = (url, data, userToken) => {
    return axios.post(
        `${localHost}${url}`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${userToken}`,

            },
        }
    );
};

export const GetService = (url, userToken) => {
    return axios.get(
        `${localHost}${url}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${userToken}`,
            },
        }
    );
};