import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import { useLocation } from "react-router-dom";
import SubNavbar from "./SubNav";
import Flag from "./Flag";
import logo from "../assets/ounaLogo.png";
import bigLogo from "../assets/ouna-01.png";

const Header = () => {
  const location = useLocation();
  // const [isOpen, setIsOpen] = useState(false);

  // const handleToggle = () => {
  //   setIsOpen(!isOpen);
  // };
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);

  // const [selectedFlag, setSelectedFlag] = useState(
  //   localStorage.getItem("selectedFlag") || "Lebanon"
  // );

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  // const handleOptionClick = (option) => {
  //   // do something with the selected option
  //   setIsOpen(false);
  // };

  // const linkStyles = {
  //   width: "fit-content",
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
    setKeyword("");
  };
  return (
    <div>
      {/* Top Header */}
      {/* <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+255 768 356 890</p>
              <p>info@zpunet.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div> */}
      {/* Header */}
      <div className="header">
        <div className="">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link
                    className="navbar-brand"
                    to={
                      localStorage.getItem("selectedFlag") === "Lebanon"
                        ? "/lb"
                        : "/eg"
                    }
                  >
                    <img alt={""} src={logo} />
                  </Link>
                  {/* <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/images/logo.png" />
                  </Link> */}
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div
                      className="btn-group"
                      style={{
                        marginRight: "38px",
                      }}
                    >
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                        <Link to="/createProduct">Sell</Link>
                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Link to="/login">
                        <button className="loginButton">Login</button>
                      </Link>
                      <Link to="/createProduct">
                        <button className="sellProduct">Sell</button>
                      </Link>
                    </>
                  )}

                  <div className="containflag">
                    <Link to="/cart" className="cart-mobile-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-cart-check"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                      <span className="badge">{cartItems.length}</span>
                    </Link>
                    <Flag />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt={""} src={bigLogo} />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form onSubmit={submitHandler}>
                  <div className="searchBox">
                    <input
                      className="searchInput"
                      type="text"
                      name=""
                      placeholder="Search"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button className="searchButton" href="#">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div
                    className="btn-group"
                    style={{
                      marginRight: "38px",
                    }}
                  >
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hi, {userInfo?.data.user.fname}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                    <Link to="/createProduct">
                      <button className="sellProduct">Sell</button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link to="/login">
                      <button className="loginButton">Login</button>
                    </Link>
                    <Link to="/createProduct">
                      <button className="sellProduct">Sell</button>
                    </Link>
                  </>
                )}

                <div className="containflag">
                  <Link to="/cart">
                    <div
                      className={`badge ${cartItems.length > 0 ? "shake" : ""}`}
                    >
                      <span>{cartItems.length}</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-cart-check"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </Link>
                  <Flag />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      {location.pathname === "/" ||
      location.pathname.startsWith("/page") ||
      location.pathname === "/lb" ||
      location.pathname === "/eg" ||
      location.pathname.startsWith("/search") ? (
        <SubNavbar />
      ) : null}
    </div>
  );
};

export default Header;
