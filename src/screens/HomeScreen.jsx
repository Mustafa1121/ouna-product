import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { checkAuth } from "../utils/auth";
import Header from "../components/HomeComponent/Header/Header.jsx";
import ShopSection from "../components/HomeComponent/ShopSection.jsx";
import Footer from "../components/HomeComponent/Footer/Footer.jsx";
import Label from "../components/HomeComponent/Label/Label";
import { USER_LOGOUT } from "../Redux/Constants/UserContants";

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const authResult = checkAuth();
    if (authResult === "EXPIRED") {
      alert("your session has expired, please login again");
      dispatch({ type: USER_LOGOUT });
      history.push("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
