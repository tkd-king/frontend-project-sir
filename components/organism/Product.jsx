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
      <div className="container mx-auto p-4 flex">
        {/* Sidebar Filters */}
        <div className="w-1/4 p-4 bg-gray-200">
          <h2 className="font-bold mb-4">Filters</h2>
          <div className="flex flex-col">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label>Company:</label>
            <input
              type="text"
              name="company"
              value={filters.company}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label>Size:</label>
            <input
              type="text"
              name="size"
              value={filters.size}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label>Upper Color:</label>
            <input
              type="text"
              name="upperColor"
              value={filters.upperColor}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label>Trowser Color:</label>
            <input
              type="text"
              name="trowserColor"
              value={filters.trowserColor}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="flex flex-col">
            <label>Seniority :</label>
            <input
              type="text"
              name="seneiority"
              value={filters.seneiority}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>

<<<<<<< HEAD
        {/* Main content */}
        <div className="w-3/4">
          {/* Form section */}
          <FormSection
            selectedUniform={selectedUniform}
            onFormSubmit={handleFormSubmit}
            className="form mb-6"
            id="form"
          />

          {/* Loading indicator */}
          {loading ? (
            <SkeletonCards />
          ) : (
            <>
              {/* Display total uniforms */}
              <h1 className="text-center">Total: ({filteredUniforms.length})</h1>

              {/* Uniforms list */}
              <div className="p-4 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredUniforms.map((uniform) => (
                  <ProductCard
                    key={uniform._id}
                    uniform={uniform}
                    onEdit={handleEdit}
                    onClick={() => handleCardClick(uniform)} // Pass the whole uniform object
                  />
                ))}
              </div>
            </>
          )}
        </div>
=======
    <FormSection />
    <ProductCard uniform={uniforms} onEdit={handleEdit} onClick={handleCardClick} />
      <div className="relative  container mx-auto p-4 flex">
>>>>>>> 1064324779694473a6a1228da76f9422a7f65678

        {/* Image modal with object data */}
        {selectedImage && selectedUniformData && (
          <div
            className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50"
            onClick={handleCloseImage}
          >
            <div className="grid grid-cols-2">
              <img
                src={selectedImage}
                alt="Full view"
                className="  rounded-xl"
              />
              <div className=" bg-gray-100 p-4 rounded shadow-md">
                <h2 className="text-lg font-bold mb-2">
                Company:  {selectedUniformData.company}
                </h2>
                <p className="mb-2">Discaription: {selectedUniformData.name}</p>
                <p className="mb-2">size: {selectedUniformData.size}</p>
                <p>Color: {selectedUniformData.color}</p>
                <p>Upper Color: {selectedUniformData.upperColor}</p>
                <p>Trowser Color: {selectedUniformData.trowserColor}</p>
                <p>Seneiority : {selectedUniformData.seneiority}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;