import { useState, useEffect } from 'react';
import { getUniforms } from '../../services/api.js';
import ProductCard from '../organism/productCard.jsx';

const FilterSidebar = () => {
  const [uniforms, setUniforms] = useState([]);
  const [filteredUniforms, setFilteredUniforms] = useState([]);

  // Alag alag search terms for each field
  const [searchName, setSearchName] = useState('');
  const [searchCompany, setSearchCompany] = useState('');
  const [searchSize, setSearchSize] = useState('');

  // Get all uniforms initially
  useEffect(() => {
    async function fetchUniforms() {
      const data = await getUniforms();
      setUniforms(data);
      setFilteredUniforms(data); // Default: show all uniforms
    }

    fetchUniforms();
  }, []);

  // Filter uniforms based on multiple fields
  useEffect(() => {
    const results = uniforms.filter((uniform) => {
      return (
        (searchName === '' || uniform.name.toLowerCase().includes(searchName.toLowerCase())) &&
        (searchCompany === '' || uniform.company.toLowerCase().includes(searchCompany.toLowerCase())) &&
        (searchSize === '' || uniform.size.toLowerCase().includes(searchSize.toLowerCase()))
      );
    });
    setFilteredUniforms(results);
  }, [searchName, searchCompany, searchSize, uniforms]);

  return (
    <div className="flex">
      
      {/* Sidebar for Filters */}
      <div className="w-1/4 bg-gray-200 p-4 h-screen sticky top-0">
        <h2 className="font-bold text-lg mb-4">Filters</h2>

        {/* Search by Name */}
        <div className="mb-4">
          <label htmlFor='name' className="block font-semibold mb-2">Name:</label>
          <input
            id='name'
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        {/* Search by Company */}
        <div className="mb-4">
          <label htmlFor='compony' className="block font-semibold mb-2">Company:</label>
          <input
            id='compony'
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search by company..."
            value={searchCompany}
            onChange={(e) => setSearchCompany(e.target.value)}
          />
        </div>

        {/* Search by Size */}
        <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor='size'>Size:</label>
          <input
            id='size'
            name='text'
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search by size..."
            value={searchSize}
            onChange={(e) => setSearchSize(e.target.value)}
          />
        </div>
      </div>

      {/* Display Filtered Results */}
      <div className="w-3/4 p-4">
        <h1 className='text-center mb-6'>Total Results: ({filteredUniforms.length})</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUniforms.map((uniform) => (
            <ProductCard key={uniform._id} uniform={uniform} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
