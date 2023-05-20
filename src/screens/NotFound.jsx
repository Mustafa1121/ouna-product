import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/HomeComponent/Header/Header";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <h4 className="text-center mb-2 mb-sm-5">Page Not Found</h4>
          <h4 className="text-center mb-2 mb-sm-5" style={{color:'red',fontSize:'10rem'}}>404</h4>
          <button className="col-md-3 col-sm-6 col-12 btn btn-primary mt-5">
            <Link to="/" className="text-white text-decoration-none">
              Home page
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
