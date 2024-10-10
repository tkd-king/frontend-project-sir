'use client';
import { useEffect, useState } from 'react';
import { getUniforms } from '../../services/api.js';
import ProductCard from '../organism/productCard.jsx';
import FormSection from '../organism/FormSection.jsx';
import SkeletonCards from '../atoms/SkeletonCards.jsx';


const Home = () => {
  const [uniforms, setUniforms] = useState([]);
  const [filteredUniforms, setFilteredUniforms] = useState([]); // Filtered uniforms
  const [filters, setFilters] = useState({ name: '', company: '', size: '', upperColor: '', trowserColor: '', seneiority: '', }); // Filter state
  const [selectedUniform, setSelectedUniform] = useState(null);
  const [selectedUniformData, setSelectedUniformData] = useState(null); // Object data
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch uniforms when component loads
    async function fetchUniforms() {
      try {
        const data = await getUniforms();
        setUniforms(data);
        setFilteredUniforms(data); // Set initial uniforms to filtered as well
        setLoading(false);
      } catch (error) {
        console.error("Error fetching uniforms:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUniforms();
  }, []);
 

  // Handle form submission
  const handleFormSubmit = () => {
    async function fetchUniforms() {
      const data = await getUniforms();
      setUniforms(data);
      setFilteredUniforms(data); // Update filtered uniforms after form submission
    }
    fetchUniforms();
    setSelectedUniform(null); // Reset selected uniform
  };
console.log(filteredUniforms,"haelo :)");

  // Handle edit
  const handleEdit = (uniform) => {
    setSelectedUniform(uniform);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter uniforms based on filters
  useEffect(() => {
    const filtered = uniforms.filter((uniform) => {
      return (
        (filters.name === '' || uniform.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.company === '' || uniform.company.toLowerCase().includes(filters.company.toLowerCase())) &&
        (filters.size === '' || uniform.size.toLowerCase().includes(filters.size.toLowerCase()))&&
        (filters.upperColor === '' || uniform.upperColor?.includes(filters.upperColor))&& 
        (filters.trowserColor === '' || uniform.trowserColor?.includes(filters.trowserColor))&& 
        (filters.seneiority === '' || uniform.seneiority?.includes(filters.seneiority)) 
      );
    });
    setFilteredUniforms(filtered); // Update filtered uniforms
  }, [filters, uniforms]);

  //image open or close handle
  const handleCardClick = (uniform) => {
    setSelectedImage(uniform.imageUrl);
    setSelectedUniformData(uniform); // Set the object data for the clicked uniform
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setSelectedUniformData(null); // Clear the object data
  };

  return (
    <>

    <FormSection />
    <ProductCard uniform={uniforms} onEdit={handleEdit} onClick={handleCardClick} />
      <div className="relative  container mx-auto p-4 flex">

        {/* Image modal with object data */}
        {selectedImage && selectedUniformData && (
          <div
            className="absolute top-0 left-0 inset-0 bg-white flex items-center justify-center z-50  "
            onClick={handleCloseImage}
          >
            <div className="py-[50px] flex items-center justify-center">
            <div className="grid grid-cols-2">
              <img
                src={selectedImage}
                alt="Full view"
                className=""
              />
              <div className=" bg-gray-100 p-4 rounded pl-[50px] pt-[50px]">
                <h2 className="text-xl font-bold mb-2">
                Company: <span className="text-md font-normal "> {selectedUniformData.company}</span>
                </h2>
                <p className="mb-2  text-xl font-bold  ">Discaription: <span className="text-md font-normal">{selectedUniformData.name}</span></p>
                <p className="mb-2 text-xl font-bold  ">Size:<span className="text-md font-normal"> {selectedUniformData.size}</span></p>
                <p className="mb-2 text-xl font-bold">Color: <span className="text-md font-normal">{selectedUniformData.color}</span></p>
                <p className="mb-2 text-xl font-bold">Upper Color: <span className="text-md font-normal">{selectedUniformData.upperColor}</span></p>
                <p className="mb-2 text-xl font-bold">Trowser Color:<span className="text-md font-normal"> {selectedUniformData.trowserColor}</span></p>
                <p className="mb-2 text-xl font-bold">Seneiority : <span className="text-md font-normal">{selectedUniformData.seneiority}</span></p>
              </div>
            </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
