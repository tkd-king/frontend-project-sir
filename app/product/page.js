"use client"
import NavBar from "@/components/molicules/NavBar.jsx";
import Image from "next/image";
import Footer from "@/components/organism/Footer";
import { UniformContext } from "@/context/UniformContextProvider"
import { useContext } from "react"
import "../../app/globals.css";
import RoutedPath from "@/components/atoms/RoutedPath";
import { calculatePrice } from "@/utils/priceCalculator";
export default function ProductDetail() {
  const { product } = useContext(UniformContext)

const handleClick = () => {
  window.history.back()
}
console.log("page is haer",product);
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
      <RoutedPath page={`Product Detail`} />
      <main className="container mx-auto my-10 px-4">
        <div className="flex flex-col lg:flex-row items-start">
          {/* Product Image */}
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <Image
              width={700}
              height={700}
              src={product.imageUrl || `https://res.cloudinary.com/drcuzf46e/image/upload/v1730362263/uniforms/skb52wqag8slx4yuwfnx.png`}
              alt={product.name}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>

          {/* Product Information */}
          <div className="w-full lg:w-1/2 lg:pl-10">
            <h2 className="text-4xl font-bold mb-4">
              Company: <span className="text-4xl">{product.company}</span>
            </h2>
            <p className="font-bolder text-xl mb-4">Size: <span className="text-gray-600 text-xl">{product.size}cm</span></p>
            <p className="font-bolder text-xl mb-4">
              Category: <span className="text-gray-600 text-xl">{product.category}</span>
            </p>
            <p className="font-bolder text-xl mb-4">
              Upper Color: <span className="text-gray-600 text-xl">{product.upperColor}</span>
            </p>
            <p className="font-bolder text-xl mb-4">
              Trouser Color: <span className="text-gray-600 text-xl">{product.trowserColor}</span>
            </p>
            <p className="font-bolder text-xl mb-4">
              NeckStyle: <span className="text-gray-600 text-xl">{product.seneiority}</span>
            </p>
            <p className="font-bolder text-xl mb-4">
              Product no. <span className="text-gray-600 text-xl">({product.uniformNumberFormat})</span>
            </p>
            <p className="font-bolder text-xl mb-4">Style: <span className="text-gray-600 text-xl">{product.style}</span></p>
            <p className="font-bolder xl:text-xl sm:text-sm text-sm mb-4 bg-green-600 text-white w-[40%] p-2 text-center shadow-xl rounded-full">Price: Rs. <span className="text-white  "> {calculatePrice(product)}</span>/_ </p>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Description:
            </h2>
            <p className="font-bolder text-lg mb-4">{product.name || "Unleash your full potential with our premium-quality Taekwondo uniform, specially crafted for athletes of all levels. Made with high-performance fabric, it ensures durability, flexibility, and comfort during intense training sessions and competitions."}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


