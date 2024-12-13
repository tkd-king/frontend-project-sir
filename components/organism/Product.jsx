"use client";
import { useEffect, useState } from "react";
import { getUniforms } from "../../services/api.js";
import ProductCard from "../organism/productCard.jsx";
import SkeletonCards from "../atoms/SkeletonCards.jsx";
import "../../app/globals.css";
import Link from "next/link.js";
import { LuRefreshCw } from "react-icons/lu";

const Home = () => {
  const [letcahnge, setletcahnge] = useState(false);
  const [uniforms, setUniforms] = useState([]);
  const [filteredUniforms, setFilteredUniforms] = useState([]); // Filtered uniforms
  const [filters, setFilters] = useState({
    company: "",
    size: "",
    upperColor: "",
    trowserColor: "",
    seneiority: "",
    category: "",
    uniformNumberFormat: "",
  }); // Filter state
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUniformsInFront, setTotalUniformsInFront] = useState(0);
  

  // Fetch uniforms with pagination
  const fetchUniforms = async (page = 1) => {
    try {
      setLoading(true); // Show loading state
      const data = await getUniforms(filters, page);
      setUniforms(data.uniforms);
      console.log("data in fetching func",uniforms);
      
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalUniformsInFront(data.totalUniforms);
      setFilteredUniforms(data.uniforms); // Set initial uniforms to filtered as well
    } catch (error) {
      console.error("Error fetching uniforms:", error.message);
    } finally {
      setLoading(false); // Hide loading state
    }
  };
  //filter products  here :)
  // const handleFilter = async () => {
  //   try {
  //     setLoading(true);
  //     const data = await getUniforms(filters); // Fetch all filtered data without pagination
  //     setFilteredUniforms(data.uniforms); // Set the filtered data state
  //     navigate("/filtered-results", { state: { uniforms: data.uniforms } }); // Navigate to filtered results page
  //   } catch (error) {
  //     console.error("Error applying filter:", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch uniforms whenever page changes
  const toggleRefresh = async () => {
    await fetchUniforms(currentPage);
  };
  useEffect(() => {
    fetchUniforms(currentPage);
  }, [currentPage, letcahnge]);
  let hiddenWord = 0;
  if (currentPage === totalPages) {
    hiddenWord = "hidden";
  }
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
   const  updatedFilters = {
      ...filters,
      [name]: value,
    };
    console.log("look at this point :)->", updatedFilters);

    setFilters(updatedFilters); // Update filters state
  };
  const applyFilter = () => {
    setLoading(true);
    setletcahnge(true);
    console.log("loading data start...");
    const filtered = uniforms.filter((uniform) => {      
      return (
        (filters.company === "" ||
          uniform.company
            .toLowerCase()
            .includes(filters.company.toLowerCase())) &&
        (filters.size === "" ||
          uniform.size
            .toLowerCase()
            .includes(filters.size.toLowerCase())) &&
        (filters.upperColor === "" ||
          uniform.upperColor?.includes(filters.upperColor)) &&
        (filters.trowserColor === "" ||
          uniform.trowserColor?.includes(filters.trowserColor)) &&
        (filters.seneiority === "" ||
          uniform.seneiority?.includes(filters.seneiority)) &&
        (filters.uniformNumberFormat === "" ||
          uniform.uniformNumberFormat?.includes(
            filters.uniformNumberFormat
          )) &&
        (filters.category === "" ||
          uniform.category?.includes(filters.category))
      );
    });
    console.log(filtered, "from filter func");
    setFilteredUniforms(filtered); // Update filtered uniforms
    setLoading(false); // Turn off loading
    console.log("Loading data end.");
    toggleRefresh()
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page); // Change page
    }
  };
   return (
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
        className={`w-full md:w-1/4 p-4 bg-gray-200 transition-transform duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        } xl:block lg:block`}
      >
        <div className="flex gap-2 items-center justify-between">
          <h2 className="font-bold mb-4">Filters</h2>
          <button
            onClick={toggleRefresh}
            onKeyDown={applyFilter}
            className=" bg-blue-500 text-white p-2 rounded mb-4 flex items-center justify-between "
          >
            <LuRefreshCw className={`${loading ? "rotate" : " "} mr-2`} />{" "}
            Refresh
          </button>
        </div>

        {/* Filter Inputs */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Company Filter */}
          <div className="flex flex-col">
            <label htmlFor="company" className="font-medium mb-1">Company:</label>
            <input
              type="text"
              id="company"
              name="company"
              value={filters.company}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter company name"
            />
          </div>

          {/* Size Filter */}
          <div className="flex flex-col">
            <label htmlFor="size" className="font-medium mb-1">Size:</label>
            <input
              type="text"
              name="size"
              id="size"
              value={filters.size}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter size"
            />
          </div>

          {/* Upper Color Filter */}
          <div className="flex flex-col">
            <label htmlFor="upperColor" className="font-medium mb-1">Upper Color:</label>
            <input
              type="text"
              name="upperColor"
              id="upperColor"
              value={filters.upperColor}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter upper color"
            />
          </div>

          {/* Trouser Color Filter */}
          <div className="flex flex-col">
            <label htmlFor="trowserColor" className="font-medium mb-1">Trouser Color:</label>
            <input
              type="text"
              name="trowserColor"
              id="trowserColor"
              value={filters.trowserColor}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter trouser color"
            />
          </div>

          {/* Seniority Filter */}
          <div className="flex flex-col">
            <label htmlFor="seneiority" className="font-medium mb-1">Seniority:</label>
            <input
              type="text"
              name="seneiority"
              id="seneiority"
              value={filters.seneiority}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter seniority"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-col">
            <label htmlFor="category" className="font-medium mb-1">Category:</label>
            <input
              type="text"
              name="category"
              id="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter category"
            />
          </div>

          {/* Uniform Number Format Filter */}
          <div className="flex flex-col">
            <label htmlFor="uniformNumberFormat" className="font-medium mb-1">Uniform Number Format:</label>
            <input
              type="text"
              name="uniformNumberFormat"
              id="uniformNumberFormat"
              value={filters.uniformNumberFormat}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter uniform number format"
            />
          </div>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            type="button"
            onClick={applyFilter}
          >
            {loading ? "Applying Filters..." : "Apply Filters"}
          </button>
        </form>
      </div>

      {/* Main content */}
      <div className="w-full md:w-3/4">
        {loading ? (
          <SkeletonCards />
        ) : (
          <>
            <h1 className="text-center">
              Total: ({filteredUniforms.length}) of ({totalUniformsInFront}){" "}
            </h1>
            <div className="grid grid-cols-4 gap-2">
              {filteredUniforms.map((uniform) => (
                <Link key={uniform._id} href={`/product/${uniform._id}`}>
                  <ProductCard uniform={uniform} hide={"hidden"} />
                </Link>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex items-center justify-center px-8 py-8">
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
              <span className={`${hiddenWord}`}>...</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
