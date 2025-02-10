import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* About Us Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          <p className="text-gray-300">
            WSWE is dedicated to empowering women by providing tools and
            resources for personal safety, education, and emotional well-being.
            Join us in creating a safer world for women everywhere.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#features" className="text-gray-400 hover:text-orange-400">Features</a></li>
            <li><a href="/allWorkshop" className="text-gray-400 hover:text-orange-400">Workshops</a></li>
            <li><a href="#contact" className="text-gray-400 hover:text-orange-400">Contact Us</a></li>
            <li><a href="#terms" className="text-gray-400 hover:text-orange-400">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#blog" className="text-gray-400 hover:text-orange-400">Blog</a></li>
            <li><a href="#articles" className="text-gray-400 hover:text-orange-400">Articles</a></li>
            <li><a href="#self-defense" className="text-gray-400 hover:text-orange-400">Self-Defense Tips</a></li>
            <li><a href="#mental-health" className="text-gray-400 hover:text-orange-400">Mental Health Support</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p className="text-gray-300">Email: support@wswe.com</p>
          <p className="text-gray-300 mb-4">Phone: +1 234 567 890</p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:scale-110 transition-transform">
              <FaFacebook size={24} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:scale-110 transition-transform">
              <FaTwitter size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:scale-110 transition-transform">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
        
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center mt-10 border-t border-gray-700 pt-6">
        <p className="text-gray-400">&copy; 2025 WSWE. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
