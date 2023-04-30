import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
//Images
import image from "../images/images/images.jpg";
import image1 from "../images/images/image1.jpg";
// CSS
import "../style/footer.css";

// data
import sorceCode from "../data/Footerdata.json";

function Footer() {
  let footerItem = sorceCode.footerItem;
  return (
    <React.StrictMode>
      <section className="footerF">
        <div className="footer__topF">
          <div className="centerF">
            {footerItem.map((value, index) => {
              let { heading, item1, item2, item3, item4 } = value;
              return (
                <div className="categoriesF" key={index}>
                  <h4>{heading}</h4>
                  <ul>
                    <li>
                      <Link to={item1.href}>
                        <p >{item1.text}</p>
                      </Link>
                    </li>
                    <li>
                      <Link to={item2.href}>
                        <p>{item2.text}</p>
                      </Link>
                    </li>
                    <li>
                      <Link to={item3.href}>
                        <p>{item3.text}</p>
                      </Link>
                    </li>
                    <li>
                      <Link to={item4.href}>
                        <p>{item4.text}</p>
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            })}

            <div className="follow__usF">
              <h4>FOLLOW US</h4>
              <ul className="social__iconF">
                <li>
                  <Link to=''>
                    <FacebookIcon />
                  </Link>
                </li>
                <li>
                  <Link to=''>
                    <TwitterIcon />
                  </Link>
                </li>
               
                <li>
                  <Link to=''>
                    <InstagramIcon />
                  </Link>
                </li>
              </ul>
              <div className="download_app_optionF">
                <Link to=''>
                  <img src={image} alt="App Store" width="70px" />
                </Link>
                <Link to="">
                  <img src={image1} alt="App Store" width="70px" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottomF">
          <p>Mustafa Khodor</p>
          <p className="copyrightF">. © 2023 Ouna</p>
        </div>
      </section>
    </React.StrictMode>
  );
}

export default Footer;