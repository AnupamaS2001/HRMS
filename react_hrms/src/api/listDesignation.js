import axios from 'axios'

const Url=import.meta.env.VITE_URL


const instance=axios.create({
    baseURL:Url
})
export const getDesignation=()=>{
    return instance.get('/designation/all')
    .then(res =>{
        return res.data;
    })
    .catch(error =>{console.error('Error....',error);
        throw error;
    });
};