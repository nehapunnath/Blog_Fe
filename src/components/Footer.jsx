import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className="text-light py-4 bg-dark " >
        <div className="d-flex flex-column align-items-center">
        <h4 className="fw-bold">
          <i className="fa-solid fa-feather-pointed"></i> BlogNova
        </h4>
        

        {/* Quick Links */}
        <div className="d-flex gap-3 mb-3">
          <Link to="/" className="text-light text-decoration-none">Home</Link>
          <Link to="/about" className="text-light text-decoration-none">About</Link>
          <Link to="/contact" className="text-light text-decoration-none">Contact</Link>
          {/* <Link to="/privacy" className="text-light text-decoration-none">Privacy Policy</Link> */}
        </div>

        {/* Social Media Icons */}
        <div className="d-flex gap-3">
          <a href="#" className="text-light" style={{ fontSize: "20px" }}>
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" className="text-light" style={{ fontSize: "20px" }}>
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#" className="text-light" style={{ fontSize: "20px" }}>
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className="text-light" style={{ fontSize: "20px" }}>
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>

        {/* Copyright Section */}
        <hr className="w-100 mt-3" style={{ borderColor: "rgba(255,255,255,0.2)" }} />
        <p className="mb-0">&copy; {new Date().getFullYear()} BlogNova. All Rights Reserved.</p>

        </div>

    </div>

    
    </>
  )
}

export default Footer