import React, { useState, useRef, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import "../style/form.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useHistory, useLocation } from "react-router-dom";

const Form = () => {
  const history = useHistory();
  const location = useLocation();
  const [isLogginActive, setIsLogginActive] = useState(true);
  const containerRef = useRef(null);
  const currentRef = useRef(null);
  const rightSideRef = useRef(null);

  useEffect(() => {
    // Add .right by default
    if (location.pathname === "/login") {
      setIsLogginActive(true);
      rightSideRef.current.classList.remove("left");
      rightSideRef.current.classList.add("right");
    } else if (location.pathname === "/register") {
      setIsLogginActive(false);
      rightSideRef.current.classList.remove("right");
      rightSideRef.current.classList.add("left");
    }
    rightSideRef.current.classList.add("right");
  }, [location.pathname]);

  const changeState = () => {
    if (isLogginActive) {
      rightSideRef.current.classList.remove("right");
      rightSideRef.current.classList.add("left");
      history.push("/register");
    } else {
      rightSideRef.current.classList.remove("left");
      rightSideRef.current.classList.add("right");
      history.push("/login");
    }
    setIsLogginActive((prevState) => !prevState);
  };

  const current = isLogginActive ? "Register" : "Login";
  const currentActive = isLogginActive ? "login" : "register";

  return (
    <>
      <Header />
      <div className="AppF">
        <div className="loginF">
          <div className="containerF" ref={containerRef}>
            {isLogginActive && <Login containerRef={currentRef} />}
            {!isLogginActive && <Register containerRef={currentRef} />}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={rightSideRef}
            onClick={changeState}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

const RightSide = ({ current, currentActive, containerRef, onClick }) => {
  return (
    <div className="right-sideF" ref={containerRef} onClick={onClick}>
      <div className="inner-containerF">
        <div className="text">{current}</div>
      </div>
    </div>
  );
};

export default Form;
