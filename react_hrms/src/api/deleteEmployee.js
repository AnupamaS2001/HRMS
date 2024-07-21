import axios from 'axios';

export const deleteEmployee = async (id, successCb, errorCb) => {
  const url = `${import.meta.env.VITE_URL}/employee/delete/${id}`;
  return axios
    .post(url)
    .then((response) => {
      successCb(response.data);
    })
    .catch((error) => {
      errorCb(error);
    });
};
