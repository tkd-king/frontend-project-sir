"use client"

import React,{useState} from 'react';
import Image from 'next/image'; // Import the Image component
import { deleteUniform } from '../../services/api.js';



const ProductCard = ({ uniform, onEdit, onClick, hide }) => {
  const [deleting, setDeleteing] = useState(false)

  const handleDelete = async () => {
    try {
      setDeleteing(true)
 const allow = window.confirm("Are you sure you want to delete")
 if(allow){
      await deleteUniform(uniform._id)
      window.location.reload(); // Reload the page to reflect the deletion
      setDeleteing(false)
 }else{
  setDeleteing(false)
  
 }      
    } catch (error) {
      setDeleteing(false)
      console.error('Error deleting uniform', error);
    }
  };
  const handleClick = () => onClick(uniform.imageUrl);

  return (
    <div className="bg-white shadow-md rounded-lg p-[5px]  flex-shrink-0"
     onClick={handleClick} // Pass the image URL on click
    >
      <div className="h-48 w-full overflow-hidden cursor-pointer "> {/* Add cursor pointer */}
        <Image 
          src={uniform.imageUrl} 
          alt={uniform.company} 
          layout="responsive" // Use layout responsive
          width={500} // Set width for the image
          height={200} // Set height for the image
          className="rounded-md object-cover scale-100 hover:scale-105 transition-all"
          priority={false} // Use false for lazy loading, true if it's crucial
        />
      </div>
      
      <h2 className=" font-semibold xl:mt-4 xl:text-xl md:mt-[2px] md:text-md">{uniform.company}</h2>
      <p className="text-gray-600">Size: {uniform.size}cm</p>
      <p className="text-gray-600">Category: {uniform.category}</p>
      <p className="text-gray-600">Product no. {uniform.uniformNumberFormat}</p>
      <div className="mt-2 flex space-x-2">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(uniform); }} // Prevent click event from bubbling up
          className={`px-4 py-2 ${hide} bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none`}
        >
          Edit
        </button>
        { deleting ?(
          <button 
          className= {`bg-red-500/80 ${hide} text-white rounded-md hover:bg-red-600/80 cursor-progress tronsform transition-all duration-300 focus:outline-none xl:px-4 xl:py-2 xl:text-md md:text-md sm:text-sm text-[12px] md:px-[5px] md:py-[5px] sm:px-[2px] sm:py-[2px] px-[2px] py-[2px]`}
        >
          Deleting...
        </button>
        ) : (
          <button 
          onClick={(e) => { e.stopPropagation(); handleDelete(); }} // Prevent click event from bubbling up
          className= {`bg-red-500 ${hide} text-white rounded-md hover:bg-red-600 focus:outline-none xl:px-4 xl:py-2 xl:text-md md:text-md sm:text-sm text-[12px] md:px-[5px] md:py-[5px] sm:px-[2px] sm:py-[2px] px-[2px] py-[2px]`}
        >
          Delete
        </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
