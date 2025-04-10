import React, { useEffect } from 'react';
import { MdNoteAlt } from 'react-icons/md';
import { FaHome, FaSearch, FaNotesMedical, FaCameraRetro } from 'react-icons/fa';
import { GoLaw } from 'react-icons/go';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';

const service = [
  {
    icon: MdNoteAlt,
    title: "Sell your home",
    desc: "We sell your home at the best market price",
  },
  {
    icon: FaHome,
    title: "Home loans",
    desc: "We offer you free consultancy to get a loan",
  },
  {
    icon: GoLaw,
    title: "Legal services",
    desc: "Expert legal help for all related property items",
  },
  {
    icon: FaSearch,
    title: "Home inspection",
    desc: "We make sure you get what you were promised",
  },
  {
    icon: FaNotesMedical,
    title: "Evaluation",
    desc: "We offer you free evaluation to get a mortgage loan",
  },
  {
    icon: FaCameraRetro,
    title: "Photoshoot",
    desc: "We prepare your home visual presentation",
  },
];

const Services = () => {

  return (
    <div className="bg-white text-white py-5">
      <div className="container py-4" id="services">
        <div className="text-center mb-5">
          <h4 className="text-primary mb-2">Our Services</h4>
          <h2 >Top real estate services available</h2>
        </div>

        <div className="row g-4">
          {service.map((item, index) => (
            <div
              className="col-md-4"
              key={index}
              // data-aos="fade-up"
              // data-aos-delay={index * 100}
            >
              <div className="card h-100 shadow border-0">
                <div className="card-body d-flex flex-column">
                  <div className="mb-3 p-3 bg-light rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px" }}>
                    <item.icon className="text-primary" size={30} />
                  </div>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text text-muted flex-grow-1">{item.desc}</p>
                  <a href="#" className="btn btn-primary mt-auto align-self-start">Read More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
