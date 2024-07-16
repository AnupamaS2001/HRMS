import axios from 'axios'

const Url=import.meta.env.VITE_URL


const instance=axios.create({
    baseURL:Url
})
export const getEmployee=()=>{
    return instance.get('/employee/all')
    .then(res =>{
        return res.data;
    })
    .catch(error =>{console.error('Error....',error);
        throw error;
    });
};

export const getDetailEmployee=(id)=>{
    return instance.get(`/employee/${id}`)
    .then(res =>{
        return res.data;
    })
    .catch(error =>{console.error('Error....',error);
        throw error;
    });
}

// export const putEmployee=(id)=>{
//     return instance.put (`/employee/update/${id}`)
//     .then(res =>{
//         return res.data;
//     })
//     .catch(error =>{console.error('Error....',error);
//         throw error;
//     });
// };



export const putEmployee = async (employeeData, successCb, errorCb) => {
    const url = '/employee/update/<int:id>' // No need to prepend `Url` here as it is already set in the instance

    return instance.put(url, employeeData)
        .then((response) => {
            if (successCb) successCb(response.data);
            return response.data;
        })
        .catch((error) => {
            if (errorCb) errorCb(error);
            throw error;
        });
};

export const postEmployeeLeave=()=>{
    return instance.get('/leave/add/<int:emp_id>')
    .then(res =>{
        return res.data;
    })
    .catch(error =>{console.error('Error....',error);
        throw error;
    });
};
