import axios from "axios";

export const logout = async (successCb, errorCb) => {
    const url = `${import.meta.env.VITE_URL}/logout`;
    console.log("logout called");
    return axios.post(url)
        .then((response) => {
            console.log(response,"logout succes response");
            successCb(response.data);
        })
        .catch((error) => {
            console.log(error,"logout error response");
            errorCb(error);
        });
}