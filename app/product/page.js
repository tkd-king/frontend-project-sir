"use client"
import NavBar from "@/components/molicules/NavBar.jsx";
import Image from "next/image";
import Footer from "@/components/organism/Footer";
import { UniformContext } from "@/context/UniformContextProvider"
import { useContext } from "react"
import "../../app/globals.css";
export default function ProductDetail() {
  const { product } = useContext(UniformContext)

const handleClick = () => {
  window.history.back()
}
console.log("page is haer",product);

 
  console.log(product, ":)");
  if ( product === null || product === undefined ) {
    return(
      <div className="flex flex-col items-center justify-center gap-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h1 className="text-5xl mb-12"> <span className="font-bolder text-red-800  ">404</span> Not Product Exist! </h1>
        <button
        onClick={handleClick}
        className="px-6 py-3 rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
          Back to Home
        </button>
      </div>
    )
  }
  if (!product) {
    return(
      <div className="flex items-center justify-center ">
        <h1 className="text-[50px] w-[40%] text-center p-8 rounded-xl text-gray-400 bg-[#F5F5F5] shadow-xl">Loading...</h1>
      </div>

  )}

  return (
    <div>
      <NavBar />
      <main className="container mx-auto my-10 px-4">
        <div className="flex flex-col lg:flex-row items-start">
          {/* Product Image */}
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <Image
              width={700}
              height={700}
              src={product.imageUrl || `https://res.cloudinary.com/drcuzf46e/image/upload/v1730362263/uniforms/skb52wqag8slx4yuwfnx.png`}
              alt={product.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Product Information */}
          <div className="w-full lg:w-1/2 lg:pl-10">
            <h2 className="text-4xl font-bold mb-4">
              Company: {product.company}
            </h2>
            <p className="text-gray-600 text-xl mb-4">Size: {product.size}cm</p>
            <p className="text-gray-600 text-xl mb-4">
              Category: {product.category}
            </p>
            <p className="text-gray-600 text-xl mb-4">
              Upper Color: {product.upperColor}
            </p>
            <p className="text-gray-600 text-xl mb-4">
              Trouser Color: {product.trowserColor}
            </p>
            <p className="text-gray-600 text-xl mb-4">
              Seniority: {product.seneiority}
            </p>
            <p className="text-gray-600 text-xl mb-4">Style: {product.style}</p>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Description:
            </h2>
            <p className="text-gray-600 text-lg mb-4">{product.name}</p>

            {/* Buttons (e.g., Add to Cart, Buy Now) */}
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg mr-4">
              Add to Cart
            </button>
            <button className="bg-green-600 text-white py-2 px-6 rounded-lg">
              Buy Now
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


