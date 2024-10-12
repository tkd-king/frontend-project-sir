import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1';

export const getUniforms = async () => {
  try {
    const response = await axios.get(`${API_URL}/uniforms/find-uniform`);
    return response.data;
  } catch (error) {
    console.error('Error fetching uniforms api.js', error);
    throw error;
  }
};

export const findOneUniform = async(id) => {
  try {
    const response = await axios.get(`${API_URL}/uniforms/find-one/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching one uniform api.js', error);
    throw error;
  }
}
export const addUniform = async (uniformData) => {
  try {
    const response = await axios.post(`${API_URL}/uniforms/post-uniform`, uniformData);
    console.log("added product::",response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding uniform', error);
    throw error;
  }
};

export const updateUniform = async (id, uniformData) => {
  try {
    const response = await axios.put(`${API_URL}/uniforms/update-one/${id}`, uniformData);
    console.log(uniformData);
    return response.data; 
    
  } catch (error) {
    console.error('Error updating uniform', error);
    throw error;
  }
};

export const deleteUniform = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/uniforms/delete-uniform/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting uniform', error);
    throw error;
  }
};
