"use client";
import { useEffect, useState } from "react";
import { getUniforms } from "../../services/api.js";
import ProductCard from "../organism/productCard.jsx";
import SkeletonCards from "../atoms/SkeletonCards.jsx";
import "../../app/globals.css"
import Link from "next/link.js";

const Home = () => {
  const [uniforms, setUniforms] = useState([]);
  const [filteredUniforms, setFilteredUniforms] = useState([]); // Filtered uniforms
  const [filters, setFilters] = useState({
    company: "",
    size: "",
    upperColor: "",
    trowserColor: "",
    seneiority: "",
  }); // Filter state
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

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

 

  // Handle edit
  const handleEdit = (uniform) => {
    e.preventDefault();
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
        (filters.company === "" ||
          uniform.company
            .toLowerCase()
            .includes(filters.company.toLowerCase())) &&
        (filters.size === "" ||
          uniform.size.toLowerCase().includes(filters.size.toLowerCase())) &&
        (filters.upperColor === "" ||
          uniform.upperColor?.includes(filters.upperColor)) &&
        (filters.trowserColor === "" ||
          uniform.trowserColor?.includes(filters.trowserColor)) &&
        (filters.seneiority === "" ||
          uniform.seneiority?.includes(filters.seneiority))
      );
    });
    setFilteredUniforms(filtered); // Update filtered uniforms
  }, [filters, uniforms]);

 

 
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="container p-4 flex flex-col md:flex-row ">
        {/* Button to toggle sidebar on mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden bg-blue-500 text-white p-2 rounded mb-4"
        >
          {isSidebarOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Sidebar Filters */}
        <div
          className={`w-full md:w-1/4 p-4 bg-gray-200 transition-transform duration-300
             ${
            isSidebarOpen ? "block" : "hidden"
          } xl:block lg:block `}
        >
          <h2 className="font-bold mb-4">Filters</h2>
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
            <label>Seniority:</label>
            <input
              type="text"
              name="seneiority"
              value={filters.seneiority}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          {/* Loading indicator */}
          {loading ? (
            <SkeletonCards />
          ) : (
            <>
              {/* Display total uniforms */}
              <h1 className="text-center">
                Total: ({filteredUniforms.length})
              </h1>

              {/* Uniforms list */}
              <div className="grid grid-cols-4 gap-2">
                {filteredUniforms.map((uniform) => (
                  <Link key={uniform._id} href={`/product/${uniform._id}`}>
                    <ProductCard uniform={uniform} onEdit={handleEdit} hide={"hidden"} />
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
