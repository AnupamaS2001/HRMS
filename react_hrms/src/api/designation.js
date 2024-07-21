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

export const postDesignation=(data)=>{
    return instance.post('/designation/add',data)
    .then(res =>{
        return res.data;
    })
    .catch(error =>{console.error('Error....',error);
        throw error;
    });
};

export const putDesignation=(data,successCb,errorCb)=>{
    console.log(data,"data")
    return instance.put(`/designation/update/${data.id}`,data).then(
        (res) =>{
            successCb();
        return res;
    })
    .catch(error =>{
        console.error('Error....',error);
        errorCb(error);
        throw error;
    });
}