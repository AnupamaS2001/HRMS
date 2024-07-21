import axios from 'axios';

const Url = import.meta.env.VITE_URL;

const instance = axios.create({
    baseURL: Url
});

export const addEmployeeLeave = async (employee_id) => {
    try {
      const response = await instance.post(`/leave/add/${employee_id}`);
      // console.log(response.data, 'response');
     
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };