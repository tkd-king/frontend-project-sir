"use client";
import { useEffect, useState } from "react";
import { getUniforms } from "../../services/api.js";
import ProductCard from "../organism/productCard.jsx";
import SkeletonCards from "../atoms/SkeletonCards.jsx";
import Link from "next/link.js";

const Home = () => {
  const [uniforms, setUniforms] = useState([]);
  const [filteredUniforms, setFilteredUniforms] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    company: "",
    size: "",
    upperColor: "",
    trowserColor: "",
    seneiority: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchUniforms() {
      try {
        const data = await getUniforms();
        setUniforms(data);
        setFilteredUniforms(data);
      } catch (error) {
        console.error("Error fetching uniforms:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUniforms();
  }, []);

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

  // Filter uniforms
  useEffect(() => {
    const filtered = uniforms.filter((uniform) => {
      return (
        (filters.name === "" || uniform.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.company === "" || uniform.company.toLowerCase().includes(filters.company.toLowerCase())) &&
        (filters.size === "" || uniform.size.toLowerCase().includes(filters.size.toLowerCase())) &&
        (filters.upperColor === "" || uniform.upperColor?.includes(filters.upperColor)) &&
        (filters.trowserColor === "" || uniform.trowserColor?.includes(filters.trowserColor)) &&
        (filters.seneiority === "" || uniform.seneiority?.includes(filters.seneiority))
      );
    });
    setFilteredUniforms(filtered);
  }, [filters, uniforms]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="container p-4 flex flex-row flex-shrink-0">
        <div className={`w-full md:w-1/4 p-4 bg-gray-200 block`}>
          <h2 className="font-bold mb-4">Filters</h2>
          {Object.keys(filters).map((key) => (
            <div key={key} className="flex flex-col mb-2">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                type="text"
                name={key}
                value={filters[key]}
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          ))}
        </div>

        <div className="w-full md:w-3/4">
          {loading ? (
            <SkeletonCards />
          ) : (
            <>
              <h1 className="text-center mb-4 text-xl font-semibold">
                Total: ({filteredUniforms.length})
              </h1>

              <div className="flex flex-wrap gap-4 justify-center bg-gray-100 p-4">
                {filteredUniforms.map((uniform) => (
                  <Link key={uniform._id} href={`/product/${uniform._id}`}>
                    <ProductCard uniform={uniform} onEdit={handleEdit} />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
