import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs/";

let token = "";

const addToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  console.log("Token:", token);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const put = async (objectToUpdate) => {
  const config = {
    headers: { Authorization: token },
  };
  const updateUrl = baseUrl + objectToUpdate.id;
  const response = await axios.put(updateUrl, objectToUpdate, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const deleteUrl = baseUrl + id;
  const response = await axios.delete(deleteUrl, config);
  console.log("Delete response..." + response.data);
  return response.data;
};

export { getAll, addToken, create, put, remove };
