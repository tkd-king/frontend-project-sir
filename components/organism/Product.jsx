"use client";
import { useContext, useEffect, useState } from "react";
import { findOneUniform, getUniforms } from "../../services/api.js";
import ProductCard from "../organism/productCard.jsx";
import SkeletonCards from "../atoms/SkeletonCards.jsx";
import "../../app/globals.css";
import { LuRefreshCw } from "react-icons/lu";
import { UniformContext } from "@/context/UniformContextProvider.jsx";
import { useRouter } from "next/navigation.js";

const Home = () => {
  const Router = useRouter();
  const { setProduct } = useContext(UniformContext);
  const [productId, setProductId] = useState("");
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
  //  console.log("this is 15 line ..", productId);

  const fetchOneUniform = async () => {
    try {
      setLoading(true)
      Router.push(`/product`);
      const data = await findOneUniform(productId);
      setProduct(data.data);
      setLoading(false)
      //  console.log("fetch uniform 404" ,data.data);
    } catch (error) {
      console.log("unable to fetch uniform", error);
      Router.push(`/`);
      setLoading(false)
    }
  };
  useEffect(() => {
    if (productId) {
      fetchOneUniform();
    }
  }, [productId]);

  //   console.log("log here 28 line",productId);
  // console.log("log here 29 line",product.data);

  

  // Fetch uniforms with pagination
  const fetchUniforms = async (page = 1) => {
    try {
      setLoading(true); // Show loading state
      const data = await getUniforms(filters, page);
      setUniforms(data.uniforms);
      console.log("data in fetching func", uniforms);
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
    const updatedFilters = {
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
          uniform.size.toLowerCase().includes(filters.size.toLowerCase())) &&
        (filters.upperColor === "" ||
          uniform.upperColor?.includes(filters.upperColor)) &&
        (filters.trowserColor === "" ||
          uniform.trowserColor?.includes(filters.trowserColor)) &&
        (filters.seneiority === "" ||
          uniform.seneiority?.includes(filters.seneiority)) &&
        (filters.uniformNumberFormat === "" ||
          uniform.uniformNumberFormat?.includes(filters.uniformNumberFormat)) &&
        (filters.category === "" ||
          uniform.category?.includes(filters.category)) &&
        (filters.poomseOrNot === "" ||
          uniform.poomseOrNot?.includes(filters.poomseOrNot))
      );
    });
    console.log(
      filtered.map((data) => console.log(data.uniformNumberFormat)),
      "from filter func"
    );
    setFilteredUniforms(filtered); // Update filtered uniforms
    setLoading(false); // Turn off loading
    console.log("Loading data end.");
    toggleRefresh();
    setIsSidebarOpen(!isSidebarOpen);
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
    <div className="container mx-auto p-0 flex flex-col md:flex-row ">
      {/* Button to toggle sidebar on mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden bg-blue-500 text-white p-2 rounded mb-4"
      >
        {isSidebarOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Sidebar Filters */}
      <div
        className={`w-full h-[820px] mt-8 md:w-1/4 md:rounded-xl md:shadow-xl p-4 bg-gray-200 transition-transform duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        } xl:block lg:block md:block`}
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
          {/* Size Filter */}
          <div className="flex flex-col">
            <label htmlFor="size" className="font-medium mb-1">
              Size:
            </label>
            <input
              type="text"
              name="size"
              id="size"
              value={filters.size}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter size"
              list="sizeOptions"
            />
            <datalist id="sizeOptions">
              <option value="80" />
              <option value="90" />
              <option value="100" />
              <option value="110" />
              <option value="120" />
              <option value="130" />
              <option value="140" />
              <option value="150" />
              <option value="160" />
              <option value="170" />
              <option value="180" />
              <option value="190" />
              <option value="200" />
              {/* Add more categories as needed */}
            </datalist>
          </div>
          {/* Category Filter */}
          <div className="flex flex-col">
            <label htmlFor="category" className="font-medium mb-1">
              Category:
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter category"
              list="categoryOptions"
            />
            <datalist id="categoryOptions">
              <option value="A" />
              <option value="A+" />
              <option value="B" />
              <option value="C" />
              {/* Add more categories as needed */}
            </datalist>
          </div>
          {/* Uniform poomsaOrNot Filter */}
          <div className="flex flex-col">
            <label htmlFor="poomseOrNot" className="font-medium mb-1">
              Poomse or Fight:
            </label>
            <input
              type="text"
              name="poomseOrNot"
              id="poomseOrNot"
              value={filters.poomseOrNot}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter [ Poomse, Fight ] ... "
              list="poomseOrNotOption"
            />
            <datalist id="poomseOrNotOption">
              <option value="Poomse" />
              <option value="Fight" />
              {/* Add more categories as needed */}
            </datalist>
          </div>
          {/* Company Filter */}
          <div className="flex flex-col">
            <label htmlFor="company" className="font-medium mb-1">
              Company:
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={filters.company}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter company name"
              list="cumponyOptions"
            />
            <datalist id="cumponyOptions">
              <option value="addidas" />
              <option value="Pine Tree" />
              <option value="FILLA" />
              {/* Add more categories as needed */}
            </datalist>
          </div>

          {/* Upper Color Filter */}
          <div className="flex flex-col">
            <label htmlFor="upperColor" className="font-medium mb-1">
              Upper Color:
            </label>
            <input
              type="text"
              name="upperColor"
              id="upperColor"
              value={filters.upperColor}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter upper color"
              list="upperColorOptions"
            />
            <datalist id="upperColorOptions">
              <option value="White" />
              <option value="Red" />
              <option value="Gray" />
              <option value="Black" />
              <option value="Blue" />
              <option value="Pink" />
              {/* Add more categories as needed */}
            </datalist>
          </div>
          {/* Trouser Color Filter */}
          <div className="flex flex-col">
            <label htmlFor="trowserColor" className="font-medium mb-1">
              Trouser Color:
            </label>
            <input
              type="text"
              name="trowserColor"
              id="trowserColor"
              value={filters.trowserColor}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter trouser color"
              list="trosercolorOptions"
            />
            <datalist id="trosercolorOptions">
              <option value="White" />
              <option value="Red" />
              <option value="Black" />
              <option value="Blue" />
              <option value="Pink" />
              {/* Add more categories as needed */}
            </datalist>
          </div>

          {/* Seniority Filter */}
          <div className="flex flex-col">
            <label htmlFor="seneiority" className="font-medium mb-1">
              Collar Color:
            </label>
            <input
              type="text"
              name="seneiority"
              id="seneiority"
              value={filters.seneiority}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter seniority"
              list="collarcolorOptions"
            />
            <datalist id="collarcolorOptions">
              <option value="Red Black" />
              <option value="Black" />
              <option value="Blue" />
              <option value="Red" />
              {/* Add more categories as needed */}
            </datalist>
          </div>
          {/* Uniform Number Format Filter */}
          <div className="flex flex-col">
            <label htmlFor="uniformNumberFormat" className="font-medium mb-1">
              Product no.
            </label>
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
      <div className="w-full">
        {loading ? (
          <SkeletonCards />
        ) : (
          <div>
            <div className="sahdow-xl rouded-xl flex flex-cols items-center justify-center">
              <h1 className="text-center my-4 xl:w-[20%] lg:w-[25%] md:w-[28%] sm:w-[30%] w-[35%] bg-[#f5f5f5] shadow-xl rounded-xl p-4 ">
                Total: ({filteredUniforms.length}) of ({totalUniformsInFront}){" "}
              </h1>
            </div>
            <div className="px-[10px] xl:grid xl:grid-cols-4 xl:gap-2 xl:ml-4 lg:grid lg:grid-cols-4 lg:gap-4 lg:ml-4 md:grid md:grid-cols-4 md:gap-4 md:ml-4 sm:grid sm:grid-cols-3 sm:gap-[20px] grid grid-cols-2 gap-[20px]">
              {filteredUniforms.map((uniform) => (
                <div
                  key={uniform._id}
                  onClick={() => setProductId(uniform._id)}
                >
                  <ProductCard uniform={uniform} hide={"hidden"} />
                </div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
