'use client'
import { useState, useEffect } from 'react';
import { addUniform, updateUniform } from '../../services/api';
import { useRouter } from 'next/router';

const FormSection = ({ selectedUniform, onFormSubmit }) => {
          router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    size: '',
    category: '',
    imageUrl: '',
    upperColor:'',
    trowserColor:'',
    seneiority:'',
    style:''
  });

  const [isFormOpen, setIsFormOpen] = useState(false); // State to track if form is open or closed

  useEffect(() => {
    if (selectedUniform) {
      setFormData({
        name: selectedUniform.name || 'lkjf',
        company: selectedUniform.company || 'ksjg',
        size: selectedUniform.size || 'slkadgj',
        category: selectedUniform.category || 'A',
        imageUrl: selectedUniform.imageUrl || 'https://res.cloudinary.com/drcuzf46e/image/upload/v1726993449/uniforms/fmzdovinimfizfiufqsn.jpg', // Set empty for initial state
        upperColor: selectedUniform.upperColor || 'White',
        trowserColor: selectedUniform.trowserColor || 'White',
        seneiority: selectedUniform.seneiority || 'Poom',
        style: selectedUniform.style || 'Full-Slieve', // Set empty for initial state
      });
      setIsFormOpen(true);
    }
  }, [selectedUniform]);

  const handleChange = (e) => {
    if (e.target.name === 'imageUrl') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
      });
  
      if (selectedUniform) {
        await updateUniform(selectedUniform._id, formDataObj);
      } else {
        await addUniform(formDataObj);
      }
  
      // Reset form data to clear the form fields
      setFormData({
        name: '',
        company: '',
        size: '',
        imageUrl:'',
        category: '', // Set empty for initial state
        upperColor:'',
        trowserColor:'',
        seneiority:'',
        style: '', // Set empty for initial state
      });
  
      onFormSubmit(); // Call the onFormSubmit function after the form is successfully submitted
      setIsFormOpen(false); // Close the form after submission
      setTimeout(() => {
        console.log("user successfully routed");
        
        router.push("/");
     }, 1000);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen); // Toggle the form visibility
  };

  return (
    <div id="form">
      <button 
        onClick={toggleForm} 
        className="p-2 w-[10%] ml-[45%] bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline focus:ring-2 focus:ring-blue-500"
      >
        {isFormOpen ? (
          <>
            <span>Up</span>
            {/* SVG for "Up" arrow */}
            <svg className="h-3 w-3 font-bold ml-[5px] inline-block" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>
          </>
        ) : (
          <>
            <span>Down</span>
            {/* SVG for "Down" arrow */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 6.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </>
        )}
      </button>

      {/* Slide down form */}
      <div className={`transition-all duration-500 overflow-hidden ${isFormOpen ? 'max-h-[800px]' : 'max-h-0'}`}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-lg"
        >
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            type="text"
            name="name"
            placeholder="Uniform Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            type="text"
            name="size"
            placeholder="Size"
            value={formData.size}
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            type="text"
            name="category"
            placeholder="Category [A+, A, B, C, D]"
            value={formData.category}
            onChange={handleChange}
          />
           <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            type="text"
            name="upperColor"
            placeholder="fill upperColor color"
            value={formData.upperColor}
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            type="text"
            name="trowserColor"
            placeholder="fill trowserColor color"
            value={formData.trowserColor}
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            type="text"
            name="seneiority"
            placeholder="fill seneiority senier or poom"
            value={formData.seneiority}
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            type="text"
            name="style"
            placeholder="fill style fullslieve or slieveless"
            value={formData.style}
            onChange={handleChange}
          />
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="file"
            name="imageUrl"
            placeholder="Image URL"
            onChange={handleChange}
          />
          <button 
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {selectedUniform ? 'Update Uniform' : 'Add Uniform'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormSection;
