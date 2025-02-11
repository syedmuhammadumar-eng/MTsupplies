import axios from "axios";

const localHost = import.meta.env.REACT_APP_LOCALHOST;

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

export const AllProductsGetService = (url) => {
    return axios.get(
        `${localHost}${url}`,
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

export const FormPostService = (url, data, userToken) => {
    return axios.post(
        `${localHost}${url}`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
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

export const DeleteService = (url, id, userToken) => {
    return axios.delete(
        `${localHost}${url}${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${userToken}`,

            },
        },
    );
};