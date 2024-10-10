'use client';
import { useEffect, useState } from 'react';
import { getUniforms } from '../../services/api.js';
import ProductCard from '../organism/productCard.jsx';
import FormSection from '../organism/FormSection.jsx';
import SkeletonCards from '../atoms/SkeletonCards.jsx';

const Home = () => {
  const [uniforms, setUniforms] = useState([]);
  const [filteredUniforms, setFilteredUniforms] = useState([]);
  const [filters, setFilters] = useState({ name: '', company: '', size: '', upperColor: '', trowserColor: '', seneiority: '', });
  const [selectedUniform, setSelectedUniform] = useState(null);
  const [selectedUniformData, setSelectedUniformData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchUniforms() {
      try {
        const data = await getUniforms();
        setUniforms(data);
        setFilteredUniforms(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching uniforms:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUniforms();
  }, []);

  const handleFormSubmit = () => {
    async function fetchUniforms() {
      const data = await getUniforms();
      setUniforms(data);
      setFilteredUniforms(data);
    }
    fetchUniforms();
    setSelectedUniform(null);
  };

  const handleEdit = (uniform) => {
    setSelectedUniform(uniform);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    const filtered = uniforms.filter((uniform) => {
      return (
        (filters.name === '' || uniform.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.company === '' || uniform.company.toLowerCase().includes(filters.company.toLowerCase())) &&
        (filters.size === '' || uniform.size.toLowerCase().includes(filters.size.toLowerCase())) &&
        (filters.upperColor === '' || uniform.upperColor?.includes(filters.upperColor)) &&
        (filters.trowserColor === '' || uniform.trowserColor?.includes(filters.trowserColor)) &&
        (filters.seneiority === '' || uniform.seneiority?.includes(filters.seneiority))
      );
    });
    setFilteredUniforms(filtered);
  }, [filters, uniforms]);

  const handleCardClick = (uniform) => {
    setSelectedImage(uniform.imageUrl);
    setSelectedUniformData(uniform);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setSelectedUniformData(null);
  };

  return (
    <>
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4 p-4 bg-gray-200 mb-4 md:mb-0">
          <h2 className="font-bold mb-4">Filters</h2>
          {Object.entries(filters).map(([key, value]) => (
            <div className="flex flex-col mb-2" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-full"
              />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <FormSection
            selectedUniform={selectedUniform}
            onFormSubmit={handleFormSubmit}
            className="form mb-6"
            id="form"
          />

          {loading ? (
            <SkeletonCards />
          ) : (
            <>
              <h1 className="text-center">Total: ({filteredUniforms.length})</h1>
              <div className="p-4 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredUniforms.map((uniform) => (
                  <ProductCard
                    key={uniform._id}
                    uniform={uniform}
                    onEdit={handleEdit}
                    onClick={() => handleCardClick(uniform)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Image modal with object data */}
        {selectedImage && selectedUniformData && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={handleCloseImage}
          >
            <div className="bg-white p-4 rounded shadow-md max-w-md w-full flex flex-col md:flex-row">
              <img
                src={selectedImage}
                alt="Full view"
                className="w-full h-auto rounded-xl mb-4 md:mb-0 md:mr-4"
              />
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-2">
                  Company: {selectedUniformData.company}
                </h2>
                <p className="mb-2">Description: {selectedUniformData.name}</p>
                <p className="mb-2">Size: {selectedUniformData.size}</p>
                <p>Color: {selectedUniformData.color}</p>
                <p>Upper Color: {selectedUniformData.upperColor}</p>
                <p>Trowser Color: {selectedUniformData.trowserColor}</p>
                <p>Seniority: {selectedUniformData.seneiority}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
