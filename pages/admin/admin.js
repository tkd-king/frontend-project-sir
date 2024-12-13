"use client";
import { useEffect, useState } from "react";
import { getUniforms } from "../../services/api.js";
import ProductCard from "../../components/organism/productCard.jsx";
import SkeletonCards from "../../components/atoms/SkeletonCards.jsx";
import "@/app/globals.css"
import App from "@/components/molicules/NavBar.jsx";
import Footer from "@/components/organism/Footer.jsx";

const Home = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [uniforms, setUniforms] = useState([]);
  const [filteredUniforms, setFilteredUniforms] = useState([]); // Filtered uniforms
  const [filters, setFilters] = useState({
    company: "",
    size: "",
    upperColor: "",
    trowserColor: "",
    seneiority: "",
    category:"",
    uniformNumberFormat:"",
  }); // Filter state
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  useEffect(() => {
    // Fetch uniforms when component loads
    async function fetchUniforms(page=1) {
      try {
        setLoading(true)
        const data = await getUniforms(filters, page);
        setUniforms(data.uniforms);
        setFilteredUniforms(data.uniforms); // Set initial uniforms to filtered as well
        setCurrentPage(data.currentPage)
        setTotalPages(data.totalPages)
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching uniforms:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUniforms(currentPage);
  }, [currentPage, filters]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page); // Change page
    }
  };

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
      const matchCompany =
        filters.company === "" ||
        uniform.company.includes(filters.company);
  
      const matchSize =
        filters.size === "" ||
        uniform.size.includes(filters.size);
  
      const matchUpperColor =
        filters.upperColor === "" || uniform.upperColor?.includes(filters.upperColor);
  
      const matchTrowserColor =
        filters.trowserColor === "" || uniform.trowserColor?.includes(filters.trowserColor);
  
      const matchSeneiority =
        filters.seneiority === "" || uniform.seneiority?.includes(filters.seneiority);
  
      const matchUniformNumberFormat =
        filters.uniformNumberFormat === "" ||
        uniform.uniformNumberFormat?.includes(filters.uniformNumberFormat);
  
      const matchCategory =
        filters.category === "" || uniform.category?.includes(filters.category);
  
      return (
        matchCompany &&
        matchSize &&
        matchUpperColor &&
        matchTrowserColor &&
        matchSeneiority &&
        matchUniformNumberFormat &&
        matchCategory
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
    <App />
      <div className="container p-4 flex flex-col md:flex-row ">
        {/* Button to toggle sidebar on mobile helo */}
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
            <label htmlFor="uniformNumberFormat">Product No.</label>
            <input
              type="text"
              name="uniformNumberFormat"
              value={filters.uniformNumberFormat}
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
            <label>category:</label>
            <input
              type="text"
              name="category"
              value={filters.category}
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
                  <div key={uniform._id}>
                    <ProductCard uniform={uniform} onEdit={handleEdit} hide={"block"} />
                  </div>
                ))}
              </div>
              <button
                className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none`}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
  <Footer />

    </>
  );
};

export default Home;