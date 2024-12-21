"use client"
import React, { useEffect, useRef, useContext } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { UniformContext } from "@/context/UniformContextProvider";

export default function Footer() {
  const { setShowWhatsApp } = useContext(UniformContext)
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowWhatsApp(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-gray-900 text-gray-300 px-4 py-8 relative rounded-t-[30px] shadow-md">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: About Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            Taekwondo<span className="text-red-500">zone</span>
          </h2>
          <p className="text-sm">
            Taekwondozone is a leading provider of web solutions, offering services in web design,
            development, and digital marketing.
          </p>
        </div>


        {/* Column 3: Social Media */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              className="text-white-800 hover:text-blue-600 transition-colors duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-300 hover:text-blue-700 transition-colors duration-300"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4">
        <p className="text-center text-sm">
          © 2024 Taekwondo<span className="text-red-500">zone</span>. All rights reserved.
        </p>
      </div>
     
        <div className="watsapp-image-footer absolute xl:w-[10%] lg:w-[10%] md:w-[15%] sm:w-[15%] w-[20%] bottom-16 right-6 scale-[0.9] hover:scale-[1] transition-all duraiton-300">
          <a
            href="https://api.whatsapp.com/send/?phone=923099414135&text=Hi%2C+I+need+help%21&type=phone_number&app_absent=0"
          >
            <img src="/images/wattsapp image.webp" alt="WhatsApp image" />
          </a>
        </div>
     
    </footer>
  );
}
