// pages/product/[id].js
import NavBar from "@/components/molicules/NavBar.jsx"
import Footer from "@/components/organism/Footer";
import { findOneUniform } from "@/services/api";
import "../../app/globals.css"
export default function ProductDetail({ product }) {
  return (
    <div>
      <NavBar />
      <main className="container mx-auto my-10 px-4">
        <div className="flex flex-col lg:flex-row items-start">
          {/* Product Image */}
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-lg" />
          </div>

          {/* Product Information */}
          <div className="w-full lg:w-1/2 lg:pl-10">
            <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-600 text-xl mb-4">Company: {product.company}</p>
            <p className="text-gray-600 text-xl mb-4">Size: {product.size}</p>
            <p className="text-gray-600 text-xl mb-4">Category: {product.category}</p>
            <p className="text-gray-600 text-xl mb-4">Upper Color: {product.upperColor}</p>
            <p className="text-gray-600 text-xl mb-4">Trouser Color: {product.trowserColor}</p>
            <p className="text-gray-600 text-xl mb-4">Seniority: {product.seneiority}</p>
            <p className="text-gray-600 text-xl mb-4">Style: {product.style}</p>

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

// getServerSideProps for server-side fetching
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    // API call or database fetching
    const res = await findOneUniform(id); // Replace with actual API endpoint
    const product = res.data;

    // Return the product as a prop
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
    };
  }
}
