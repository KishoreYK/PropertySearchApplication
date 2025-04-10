import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer py-4 text-white"> {/* Assumes .footer has a dark bg */}
      <div className="container">
        <div className="row justify-content-between align-items-center text-center text-md-start">
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="d-flex flex-column flex-md-row gap-3">
              <Link to="/about" className="text-decoration-none text-white">About Us</Link>
              <Link to="/contact" className="text-decoration-none text-white">Contact</Link>
              <Link to="/terms" className="text-decoration-none text-white">Terms of Service</Link>
              <Link to="/privacy" className="text-decoration-none text-white">Privacy Policy</Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <hr className="border-light my-3" />
        <div className="text-center">
          <p className="mb-0 text-white">&copy; 2025 Real Estate Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
