
import axios from 'axios';


export const login = async (username,password, successCb, errorCb) => {
    const Url = `${import.meta.env.VITE_URL}/login`;
    console.log(password,"password")

    return axios.post(Url, { username, password })
    .then((response) => {
        successCb(response.data);
    }).catch((error) => {
        errorCb(error);
    });
};