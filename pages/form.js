"use client";
import { useState, useEffect } from "react";
import { addUniform, updateUniform } from "../services/api";
import "../app/globals.css";
import NavBar from "../components/molicules/NavBar";
import Footer from "@/components/organism/Footer";
// import { useRouter } from "next/router";

const FormSection = ({ selectedUniform }) => {
// const router = useRouter(); route krnay k leay only nextjs  mn 
  const [formData, setFormData] = useState({
    company: "",
    size: "",
    category: "",
    imageUrl: "",
    upperColor: "",
    trowserColor: "",
    seneiority: "",
    style: "",
    uniformNumberFormat: "",
    neckStyle: "",
    poomseOrNot:"",
  });
  const [submiting, setSubmiting] = useState(false)
  const [errors, setErrors] = useState({});
  const [popupMessage, setPopupMessage] = useState(null);

  useEffect(() => {
    if (selectedUniform) {
      setFormData({
        company: selectedUniform.company || "",
        size: selectedUniform.size || "",
        category: selectedUniform.category || "A",
        imageUrl:
          selectedUniform.imageUrl ||
          "https://res.cloudinary.com/drcuzf46e/image/upload/v1726993449/uniforms/fmzdovinimfizfiufqsn.jpg",
        upperColor: selectedUniform.upperColor || "White",
        trowserColor: selectedUniform.trowserColor || "White",
        seneiority: selectedUniform.seneiority || "Poom",
        style: selectedUniform.style || "Full-Sleeve",
        uniformNumberFormat: selectedUniform.uniformNumberFormat || "",
        neckStyle: selectedUniform.neckStyle || "",
        poomseOrNot: selectedUniform.poomseOrNot || "",
      });
    }
  }, [selectedUniform]);

  const validate = () => {
    const newErrors = {};
    //all fields bad mn chage krnay h lazmy ok :)
    // if (!formData.name) newErrors.name = "Uniform Name is required";
    // if (!formData.company) newErrors.company = "Company Name is required";
    // if (!formData.size) newErrors.size = "Size is required";
    // if (!formData.category) newErrors.category = "Category is required";
    // if (!formData.upperColor) newErrors.upperColor = "Upper color is required";
    // if (!formData.trowserColor)
    //   newErrors.trowserColor = "Trowser color is required";
    // if (!formData.seneiority)
    //   newErrors.seneiority = "Seniority is required";
    // if (!formData.style) newErrors.style = "Style is required";
    // if (!formData.imageUrl) newErrors.imageUrl = "Image is required";
    // if (!formData.name) newErrors.name = "Discover the perfect blend of style and quality with our [Product Name]. Designed to bring both elegance and durability into your daily life, this [product type] is crafted from high-quality materials to ensure long-lasting performance. Its sleek design makes it a versatile addition to any space, while the attention to detail ensures a premium feel. Whether for everyday use or special occasions, this product offers the ideal balance of functionality and aesthetic appeal, making it a must-have for those who appreciate both comfort and style.";
    // if (!formData.company) newErrors.company = "Company Name is required";
    // if (!formData.size) newErrors.size = "Size is required";
    // if (!formData.category) newErrors.category = "Category is required";
    // if (!formData.upperColor) newErrors.upperColor = "White";
    // if (!formData.trowserColor)
    //   newErrors.trowserColor = "White";
    // if (!formData.seneiority)
    //   newErrors.seneiority = "Poom";
    // if (!formData.style) newErrors.style = "Full Slieve";
    // if (!formData.imageUrl) newErrors.imageUrl = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    if (e.target.name === "imageUrl") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Return early if validation fails

    try {
      setSubmiting(true);
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
      });

      if (selectedUniform) {
        await updateUniform(selectedUniform._id, formDataObj);
      } else {
        await addUniform(formDataObj);
      }

      setPopupMessage("Uniform submitted successfully!");
      setTimeout(() => setPopupMessage(null), 500); // Success popup for 2 seconds

      setFormData({
        company: "",
        size: "",
        category: "",
        imageUrl: "",
        upperColor: "",
        trowserColor: "",
        seneiority: "",
        style: "",
        uniformNumberFormat:"",
        neckStyle:"",
        poomseOrNot:"",
      });
      setErrors({});
      setSubmiting(false)
      // setTimeout(() => {
      //  router.push("/"); // Redirect to uniforms page after form submission
      // }, 1500);
    } catch (error) {
      setSubmiting(true);
      setPopupMessage("Error submitting form!");
      setTimeout(() => setPopupMessage(null), 2000); // Failure popup for 2 seconds
      console.error("Error submitting form", error);
    }
  };

  return (
    <>
      <NavBar />
      {popupMessage ? (<h1
  className={`w-[400px] ml-[470px] my-[300px] bg-green-500 text-white flex items-center justify-center   py-2 px-4 rounded-lg shadow-lg transition duration-300 ${
    popupMessage ? "opacity-100" : "opacity-0"
  }`}
>
  {popupMessage}
</h1>
) : (
        <div className="flex justify-center items-center py-[50px] min-h-screen bg-gray-700">
        <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl text-center mb-6">Uniform Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Number</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                type="number"
                name="uniformNumberFormat"
                placeholder="Number..."
                value={formData.uniformNumberFormat}
                onChange={handleChange}
                required
              />
              {errors.uniformNumberFormat && <p className="text-red-500">{errors.uniformNumberFormat}</p>}
            </div>
            <div>
              <label className="block mb-1 text-sm">Company Name</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Compony Name..."
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
              {errors.company && (
                <p className="text-red-500">{errors.company}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm">Size</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Size in cm..."
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
              />
              {errors.size && <p className="text-red-500">{errors.size}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm">Category</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Category..."
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
              {errors.category && (
                <p className="text-red-500">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm">Upper Color</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Upper Color..."
                name="upperColor"
                value={formData.upperColor}
                onChange={handleChange}
                required
              />
              {errors.upperColor && (
                <p className="text-red-500">{errors.upperColor}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm">Trowser Color</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Add Trouser Color..."
                name="trowserColor"
                value={formData.trowserColor}
                onChange={handleChange}
                required
              />
              {errors.trowserColor && (
                <p className="text-red-500">{errors.trowserColor}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm">Collar Color</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Add Senriority..."
                name="seneiority"
                value={formData.seneiority}
                onChange={handleChange}
                required
              />
              {errors.seneiority && (
                <p className="text-red-500">{errors.seneiority}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm">Style</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Add Style..."
                name="style"
                value={formData.style}
                onChange={handleChange}
                required
              />
              {errors.style && <p className="text-red-500">{errors.style}</p>}
            </div>
            <div>
              <label className="block mb-1 text-sm">Neck Style</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Add NeckStyle..."
                name="neckStyle"
                value={formData.neckStyle}                
                onChange={handleChange}
                required
              />
              {errors.style && <p className="text-red-500">{errors.style}</p>}
            </div>
            <div> 
              <label className="block mb-1 text-sm">Poomse or not</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="ENTER poomseOrNot..."
                name="poomseOrNot"
                value={formData.poomseOrNot}
                onChange={handleChange}
              />
              {errors.style && <p className="text-red-500">{errors.style}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm">Image</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                type="file"
                name="imageUrl"
                onChange={handleChange}
              />
              {errors.imageUrl && (
                <p className="text-red-500">{errors.imageUrl}</p>
              )}
            </div>
            

           {submiting ? (
            <button
            className="w-full p-2 bg-blue-500/80 text-white cursor-progress rounded hover:bg-blue-600/80"
          >
            Submiting...
          </button>
         ) :  (
             <button
             type="submit"
             className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
           >
             {selectedUniform ? "Update Uniform" : "Add Uniform"}
           </button>
           )}
         
         

          </form>
        </div>
      </div>
      )}
      <Footer />
    </>
  );
};

export default FormSection;
