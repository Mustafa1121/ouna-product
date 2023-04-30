import React from "react";

// CSS
import "../style/Label.css";
import Logo from "../images/images/image1.jpg";
import image2 from "../images/images/images.jpg";
import Label1 from "../assets/app2.png";
import { Link } from "react-router-dom";

function Label() {
  return (
    <React.StrictMode>
      <section className="label">
        <div className="left__side">
          <img src={Label1} alt="" width="200px" />
        </div>
        <div className="right__side">
          <div className="heading">
            <h1>GET YOUR APP TODAY</h1>
          </div>
          <div className="social__icons">
            <Link to=''>
              <img src={Logo} alt="" width="100px" />
            </Link>
            <Link to=''>
              <img src={image2} alt="" className="center" width="100px" />
            </Link>
          </div>
        </div>
      </section>
    </React.StrictMode>
  );
}

export default Label;
