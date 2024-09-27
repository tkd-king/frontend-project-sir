"use client"

import React from 'react';
import { deleteUniform } from '../../services/api.js';

const ProductCard = ({ uniform, onEdit, onClick }) => {
  const handleDelete = async () => {
    try {
      await deleteUniform(uniform._id);
      window.location.reload(); // Reload the page to reflect the deletion
    } catch (error) {
      console.error('Error deleting uniform', error);
    }
  };

  return (
    <div 
      className="bg-white shadow-md rounded-lg p-4" 
      style={{ height: '370px' }}
      onClick={() => onClick(uniform.imageUrl)} // Pass the image URL on click
    >
      <div className="h-48 w-full overflow-hidden cursor-pointer"> {/* Add cursor pointer */}
        <img 
          src={uniform.imageUrl} 
          alt={uniform.company} 
          className="rounded-md w-full h-full object-cover"
        />
      </div>
      
      <h2 className="text-xl font-semibold mt-4">{uniform.company}</h2>
      <p className="text-gray-600">Size: {uniform.size}</p>
      <p className="text-gray-600">Category: {uniform.category}</p>
      <div className="mt-4 flex space-x-2">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(uniform); }} // Prevent click event from bubbling up
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Edit
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleDelete(); }} // Prevent click event from bubbling up
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
