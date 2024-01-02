import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link, useLocation } from "react-router-dom";
//Images
import image1 from "../../../images/images/image1.jpg";
// CSS
import "./footer.css";

// data
import sorceCode from "../../../data/Footerdata.json";

function Footer() {
  let footerItem = sorceCode.footerItem;
  const location = useLocation();
  const getInstagramURL = () => {
    if (location.pathname.includes("lb")) {
      return "https://www.instagram.com/ounaapp?utm_source=qr&igsh=MWNwcTkzMmVhamFvbA==";
    }

    return "https://www.instagram.com/ouna.egypt?utm_source=qr&igsh=dHJudm5xZ2JhazZv";
  };

  const getFacebookURL = () => {
    if (location.pathname.includes("lb")) {
      return "https://www.instagram.com/ounaapp?utm_source=qr&igsh=MWNwcTkzMmVhamFvbA==";
    }

    return "https://www.facebook.com/profile.php?id=100093082482722&mibextid=hIlR13";
  };
  return (
    <React.StrictMode>
      <section className="footerF">
        <div className="footer__topF">
          <div className="centerF">
            {footerItem.map((value, index) => {
              let { heading, item1, item3, item4, item5 } = value;
              return (
                <div className="categoriesF" key={index}>
                  <h4>{heading}</h4>
                  <ul>
                    <li>
                      <Link to={item1.href}>
                        <p>{item1.text}</p>
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
                    {item5 && (
                      <li>
                        <a href={item5.href}>
                          <p>{item5.text}</p>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}

            <div className="follow__usF">
              <h4>FOLLOW US</h4>
              <ul className="social__iconF">
                <li>
                  <a href={getFacebookURL}>
                    <FacebookIcon />
                  </a>
                </li>
                <li>
                  <a href={getInstagramURL}>
                    <InstagramIcon />
                  </a>
                </li>
              </ul>
              <div className="download_app_optionF">
                {/* <Link to="">
                  <img src={image} alt="App Store" width="70px" />
                </Link> */}
                <a href="https://play.google.com/store/apps/details?id=com.ounasupport.ouna&pli=1">
                  <img src={image1} alt="App Store" width="70px" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottomF">
          <p>Ouna Team</p>
          <p className="copyrightF">. © 2023 Ouna</p>
        </div>
      </section>
    </React.StrictMode>
  );
}

export default Footer;
