import axios from 'axios';

const Url = import.meta.env.VITE_URL;

const instance = axios.create({
    baseURL: Url
});

export const postEmployee = async (employeeData, successCb, errorCb) => {
    const url = '/employee/add'; // No need to prepend `Url` here as it is already set in the instance

    return instance.post(url, employeeData)
        .then((response) => {
            if (successCb) successCb(response.data);
            return response.data;
        })
        .catch((error) => {
            if (errorCb) errorCb(error);
            throw error;
        });
};