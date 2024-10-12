import Home from "@/components/tamplate/Home";

export default function HomePage() {
  return (
    <>
    <Home />
    </>
  );
}
// pages/product/[id].js


// const product = {
//   _id: "66ff52c77ac666cd0c5e2d4a",
//   name: "one",
//   company: "one",
//   size: "Large",
//   category: "A+",
//   upperColor: "white",
//   trowserColor: "trowser",
//   seneiority: "seneio",
//   imageUrl: "https://res.cloudinary.com/drcuzf46e/image/upload/v1728008903/uniforms/dayepcovv8muffi6kync.jpg",
//   style: "styel"
// };

// export default function ProductDetail() {
//   return (
//     <div>
//      <header className="bg-blue-600 text-white py-4 text-center">
//       <h1 className="text-3xl font-bold">My Product Store</h1>
//     </header>
//     <main className="container mx-auto my-10 px-4">
//         <div className="flex flex-col lg:flex-row items-start">
//           {/* Product Image */}
//           <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
//             <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-lg" />
//           </div>

//           {/* Product Information */}
//           <div className="w-full lg:w-1/2 lg:pl-10">
//             <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
//             <p className="text-gray-600 text-xl mb-4">Company: {product.company}</p>
//             <p className="text-gray-600 text-xl mb-4">Size: {product.size}</p>
//             <p className="text-gray-600 text-xl mb-4">Category: {product.category}</p>
//             <p className="text-gray-600 text-xl mb-4">Upper Color: {product.upperColor}</p>
//             <p className="text-gray-600 text-xl mb-4">Trouser Color: {product.trowserColor}</p>
//             <p className="text-gray-600 text-xl mb-4">Seniority: {product.seneiority}</p>
//             <p className="text-gray-600 text-xl mb-4">Style: {product.style}</p>

//             {/* Buttons (e.g., Add to Cart, Buy Now) */}
//             <button className="bg-blue-600 text-white py-2 px-6 rounded-lg mr-4">
//               Add to Cart
//             </button>
//             <button className="bg-green-600 text-white py-2 px-6 rounded-lg">
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </main>
//       <footer className="bg-blue-600 text-white py-4 text-center">
//       <p>© 2024 My Product Store. All rights reserved.</p>
//     </footer>
//     </div>
//   );
// }
