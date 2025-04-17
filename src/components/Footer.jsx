import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} Digi-Med. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-blue-600">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-blue-600">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;