"use client";

import React, { useState } from "react";
import Image from "next/image"; // Import the Image component
import { deleteUniform, sellProduct } from "../../services/api.js";
import { calculatePrice } from "@/utils/priceCalculator.js";


const ProductCard = ({ uniform, onEdit, hide }) => {
  const [deleting, setDeleteing] = useState(false);
  
  const handleDelete = async () => {
    try {
      setDeleteing(true);
      const allow = window.confirm(
        `Are you sure you want to delete (${uniform.uniformNumberFormat})`
      );
      if (allow) {
        await deleteUniform(uniform._id);
        window.location.reload(); // Reload the page to reflect the deletion
        setDeleteing(false);
      } else {
        setDeleteing(false);
      }
    } catch (error) {
      setDeleteing(false);
      console.error("Error deleting uniform", error);
    }
  };
  const handleSellProduct = async () => {
    const result = await sellProduct(uniform._id); // Call the sellProduct function
    // On success, update the list of products
    console.log("from frontend line 11::", result);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-[5px] relative flex-shrink-0">
      <div className="h-48 w-full overflow-hidden cursor-pointer  ">
        {" "}
        {/* Add cursor pointer */}
        <Image
          src={uniform.imageUrl}
          alt={uniform.company}
          width={500} // Set width for the image
          height={200} // Set height for the image
          className="rounded-md object-cover scale-100 hover:scale-105 transition-all"
          priority={false} // Use false for lazy loading, true if it's crucial
        />
      </div>
      <h2 className=" font-semibold xl:mt-4 xl:text-xl md:mt-[2px] md:text-md">
        {uniform.company}
      </h2>
      <p className="text-gray-600">Size: {uniform.size}cm</p>
      <p className="text-gray-600">Category: {uniform.category}</p>
      <p className="text-gray-600">Product no. {uniform.uniformNumberFormat}</p>
      <span className="text-sm text-red-500 flex items-center justify-center pt-2 xl:absolute xl:bottom-2 xl:right-2 sm:pt-2 text-center  font-bolder z-10">
        Rs.{calculatePrice(uniform)}/_
      </span>

      <div className="mt-2 flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(uniform);
          }} // Prevent click event from bubbling up
          className={`px-4 py-2 ${hide} bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none`}
        >
          Edit
        </button>
        {deleting ? (
          <button
            className={`bg-red-500/80 ${hide} text-white rounded-md hover:bg-red-600/80 cursor-progress tronsform transition-all duration-300 focus:outline-none xl:px-4 xl:py-2 xl:text-md md:text-md sm:text-sm text-[12px] md:px-[5px] md:py-[5px] sm:px-[2px] sm:py-[2px] px-[2px] py-[2px]`}
          >
            deleting...
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }} // Prevent click event from bubbling up
            className={`bg-red-500 ${hide} text-white rounded-md hover:bg-red-600 focus:outline-none xl:px-4 xl:py-2 xl:text-md md:text-md sm:text-sm text-[12px] md:px-[5px] md:py-[5px] sm:px-[2px] sm:py-[2px] px-[2px] py-[2px]`}
          >
            delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
