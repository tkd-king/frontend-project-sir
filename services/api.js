import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

 const getUniforms = async ( filters, page ) => {
  try {
    const query = new URLSearchParams({
      ...filters, // Spread the filter object into query params
      page: page,
      limit: 10, // Define your pagination limit here
    });
    const response = await axios.get(`${API_URL}/uniforms/find-uniform?${query.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching uniforms api.js', error);
    throw error;
  }
};

 const findOneUniform = async(id) => {
  try {
    const response = await axios.get(`${API_URL}/uniforms/find-one/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching one uniform api.js', error);
    throw error;
  }
}
 const addUniform = async (uniformData) => {
  try {
    const response = await axios.post(`${API_URL}/uniforms/post-uniform`, uniformData);
    console.log("added product::",response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding uniform', error);
    throw error;
  }
};

 const updateUniform = async (id, uniformData) => {
  try {
    const response = await axios.put(`${API_URL}/uniforms/update-one/${id}`, uniformData);
    console.log(uniformData);
    return response.data; 
    
  } catch (error) {
    console.error('Error updating uniform', error);
    throw error;
  }
};

 const deleteUniform = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/uniforms/delete-uniform/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting uniform', error);
    throw error;
  }
};
const sellProduct = async (productId) => {
  try {
    const response = await axios(`${API_URL}/uniforms/add-sellProduct`,{ body: JSON.stringify({ productId }) }) ;
    if (!response.ok) {
      throw new Error("Failed to sell product");
    }

    console.log("respose this file api.js line::69",response);
    return response;
    
  } catch (error) {
    console.error("Error in selling product:", error);
    return { error: error.message };
  }
};


export  {
  findOneUniform,
  getUniforms,
  addUniform,
  updateUniform,
  deleteUniform,
  sellProduct
}