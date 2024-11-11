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
    poomseOrNot: "",
  });
  const [submiting, setSubmiting] = useState(false);
  const [errors, setErrors] = useState(false);
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


  const handleChange = (e) => {
    
    if (e.target.name === "imageUrl") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrors(false);
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
        uniformNumberFormat: "",
        neckStyle: "",
        poomseOrNot: "",
      });
      setSubmiting(false);
      // setTimeout(() => {
      //  router.push("/"); // Redirect to uniforms page after form submission
      // }, 1500);
    } catch (error) {
      setErrors(true);
      setSubmiting(true);
      setPopupMessage("Error submitting form!",error);
      console.error("Error submitting form", error);
    } finally {
      setErrors(false);
      setSubmiting(false);
    }
  };
 const handleClose = () =>{
  setTimeout(() => setPopupMessage(null), 500); // Failure popup for 2 seconds
  setErrors(false);
 }
  // first later apitale ka concept :)
  const capitalize = (str) => {
    return str
      .split(" ") // String ko words mein split karna
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Har word ka pehla letter capitalize aur baqi lowercase karna
      .join(" "); // Words ko wapas ek string mein join karna
  };
  const ShortStringUpperCaseLongStringCapitalyze = (str) => {
    if ( str.length == 3 || str.length == 4 || str.length == 2 ) {
      return str.toUpperCase()
    }else{
      return str
      .split(" ") // String ko words mein split karna
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Har word ka pehla letter capitalize aur baqi lowercase karna
      .join(" "); // Words ko wapas ek string mein join karna    
      }
  };
  return (
    <>
      <NavBar />
      {popupMessage ? (
        <div className="flex flex-col items-center jusitify-center my-[100px] gap-2">
        <h1
          className={`w-[400px] ${
            errors ? "bg-red-500" : "bg-green-500"
          } text-white flex items-center justify-center   py-2 px-4 rounded-lg shadow-lg transition duration-300 ${
            popupMessage ? "opacity-100" : "opacity-0"
          }`}
        >
          {popupMessage}
        </h1>
       {errors && ( <button 
        onClick={handleClose}
        className={`px-8 py-[5px] bg-red-500 text-white rounded hover:bg-red-400 hover:rounded-full transition-all ${errors ? "block" : "hiddne"} `}>
          Close
        </button>)}
        </div>
      ) : (
        <div className="flex justify-center items-center py-[50px] min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl text-center mb-6">Uniform Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="uniformNumberFormat"
                  className="block mb-1 text-sm"
                >
                  Number
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  type="number"
                  name="uniformNumberFormat"
                  id="uniformNumberFormat"
                  placeholder="Number..."
                  value={formData.uniformNumberFormat}
                  onChange={handleChange}
                  required
                  disabled={submiting}
                />
              </div>
              <div>
                <label htmlFor="company" className="block mb-1 text-sm">
                  Company Name
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Compony Name..."
                  name="company"
                  id="company"
                  value={ShortStringUpperCaseLongStringCapitalyze(formData.company)}
                  onChange={handleChange}
                  disabled={submiting}
                  required
                />
              </div>

              <div>
                <label htmlFor="size" className="block mb-1 text-sm">
                  Size
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Size in cm..."
                  name="size"
                  id="size"
                  value={formData.size}
                  onChange={handleChange}
                  disabled={submiting}
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block mb-1 text-sm">
                  Category
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Category..."
                  name="category"
                  id="category"
                  value={formData.category.toUpperCase()}
                  onChange={handleChange}
                  list="categoryOptions" // Link input to datalist
                  disabled={submiting}
                  required
                />
                <datalist id="categoryOptions">
                  <option value="A" />
                  <option value="A+" />
                  <option value="B" />
                  <option value="C" />
                  <option value="D" />
                  {/* Add more categories as needed */}
                </datalist>

              </div>

              <div>
                <label htmlFor="upperColor" className="block mb-1 text-sm">
                  Upper Color
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Upper Color..."
                  name="upperColor"
                  id="upperColor"
                  value={capitalize(formData.upperColor) }
                  onChange={handleChange}
                  disabled={submiting}
                  required
                />
              </div>

              <div>
                <label htmlFor="trowserColor" className="block mb-1 text-sm">
                  Trowser Color
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Add Trouser Color..."
                  name="trowserColor"
                  id="trowserColor"
                  value={capitalize(formData.trowserColor)}
                  onChange={handleChange}
                  disabled={submiting}
                  required
                />
              </div>

              <div>
                <label htmlFor="seneiority" className="block mb-1 text-sm">
                  Collar Color
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Add Senriority..."
                  name="seneiority"
                  id="seneiority"
                  value={formData.seneiority}
                  onChange={handleChange}
                  disabled={submiting}
                  required
                />
              </div>

              <div>
                <label htmlFor="style" className="block mb-1 text-sm">
                  Sleeve-Style
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Add Style..."
                  name="style"
                  id="style"
                  list="sleeve"
                  value={formData.style}
                  onChange={handleChange}
                  disabled={submiting}
                  required
                />
                <datalist id="sleeve">
                  <option value="Full Sleeve" />
                  <option value="Short Sleeve" />
                  {/* Add more styles as needed */}
                </datalist>
              </div>
              <div>
                <label htmlFor="neckStyle" className="block mb-1 text-sm">
                  Neck Style
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Add NeckStyle..."
                  name="neckStyle"
                  list="collar-style"
                  id="neckStyle"
                  value={capitalize( formData.neckStyle )}
                  onChange={handleChange}
                  disabled={submiting}
                  required
                />
                <datalist id="collar-style">
                  <option value="Close" />
                  <option value="Open" />
                  {/* Add more styles as needed */}
                </datalist>
              </div>
              <div>
                <label htmlFor="poomseOrNot" className="block mb-1 text-sm">
                  Poomse or not
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="ENTER poomseOrNot..."
                  name="poomseOrNot"
                  id="poomseOrNot"
                  list="poomseOrNot"
                  value={capitalize(formData.poomseOrNot)}
                  disabled={submiting}
                  onChange={handleChange}
                />
                <datalist id="poomseOrNot">
                  <option value="fighter" />
                  <option value="poomse" />
                  {/* Add more styles as needed */}
                </datalist>
              </div>

              <div>
                <label htmlFor="imageUrl" className="block mb-1 text-sm">
                  Image
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  type="file"
                  name="imageUrl"
                  id="imageUrl"
                  disabled={submiting}
                  onChange={handleChange}
                />
              </div>

              {submiting ? (
                <button
                  type="button" // Prevents form submission if in "submitting" state
                  className="w-full p-2 bg-blue-500/80 text-white cursor-progress rounded hover:bg-blue-600/80"
                  disabled // Disable the button to prevent clicking during submission
                >
                  Submiting...
                </button>
              ) : (
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
