import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { checkAuth } from "../utils/auth";
import Header from "../components/Header.jsx";
import ShopSection from "../components/homeComponents/ShopSection.jsx";
import Footer from "../components/Footer.jsx";
import Label from "../components/Label.jsx";

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  const history = useHistory();
  useEffect(() => {
    const authResult = checkAuth();
    console.log(authResult);
    if (authResult === "EXPIRED") {
      alert("your session has expired, please login again");
      localStorage.removeItem("userInfo");
      history.push("/login");
    }
  }, []);

  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      <Label />
      <Footer />
    </div>
  );
};

export default HomeScreen;
