import axios from "axios";

const localHost = 'http://localhost:8080/api/v1';

export const PostService = (url, data) => {
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

export const GetService = (url) => {
    return axios.get(
        `${localHost}${url}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};