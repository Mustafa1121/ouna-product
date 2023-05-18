import Header from "../components/Header.jsx";
import ShopSection from "../components/homeComponents/ShopSection.jsx";
import Footer from "../components/Footer.jsx";
import Label from "../components/Label.jsx";
import Slider from "../components/newComponents/Slider.jsx";


const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;

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
