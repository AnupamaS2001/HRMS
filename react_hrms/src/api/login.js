// import axios from 'axios';

// const Url= import.meta.env.VITE_URL
// const instance=axios.create({
//     baseURL:Url
// })
// export const login = async (LoginUser,successCb,errorCb) => {
//     const url=`${import.meta.env.VITE_URL}/login`;

//     return axios.post(url,LoginUser).then((response)=>{
//         successCb(response.data)
//     }).catch((error)=>{
//         errorCb(error)
//     })

// };
import axios from 'axios';

// Ensure the environment variable is correctly set

export const login = async (username,password, successCb, errorCb) => {
    const Url = `${import.meta.env.VITE_URL}/login`;
    console.log(password,"password")

    // Use the created instance instead of the global axios
    return axios.post(Url, { username, password })
    .then((response) => {
        successCb(response.data);
    }).catch((error) => {
        errorCb(error);
    });
};