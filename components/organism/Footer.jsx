import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: About Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">UniCal</h2>
          <p className="text-sm">
            UniCal is a leading provider of web solutions, offering services in web design, development, and digital marketing.
          </p>
        </div>
        
        {/* Column 2: Links */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        
        {/* Column 3: Social Media */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-6">
            <a href="https://facebook.com" className="text-gray-300 hover:text-blue-600 transition-colors duration-300">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="https://twitter.com" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="https://instagram.com" className="text-gray-300 hover:text-pink-500 transition-colors duration-300">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="https://linkedin.com" className="text-gray-300 hover:text-blue-700 transition-colors duration-300">
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4">
        <p className="text-center text-sm">
          © 2024 UniCal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}