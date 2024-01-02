import React from "react";
import "./style/App.css";
import "./style/responsive.css";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import SingleProduct from "./screens/ProductScreen/SingleProduct.jsx";
import Form from "./screens/AuthScreen/Form.jsx";
import CartScreen from "./screens/CartScreen/CartScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen/ShippingScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen.jsx";
import PaymentScreen from "./screens/PaymentScreen/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen/PlaceOrderScreen.jsx";
import NotFound from "./screens/NotFound.jsx";
import PrivateRouter from "./PrivateRouter.jsx";
import ProductForm from "./components/createProduct/ProductForm.jsx";
import Terms from "./components/Utils/Terms.jsx";
import About from "./components/Utils/AboutUs.jsx";
import PrivacyPolicy from "./components/Utils/PrivacyPolicy.jsx";
import Payment from "./components/Utils/Payment.jsx";
import ResetPassword from "./screens/AuthScreen/ResetPasswordScreen/ResetPassword.jsx";

const App = () => {
  const location = localStorage.getItem("selectedFlag") || "Lebanon";

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            {location === "Lebanon" ? (
              <Redirect to="/lb" />
            ) : location === "Egypt" ? (
              <Redirect to="/eg" />
            ) : (
              // ) : location === "Tunisia" ? (
              //   <Redirect to="/tn" />
              // ) : location === "Morocco" ? (
              //   <Redirect to="/ma" />
              // ) : location === "Algeria" ? (
              //   <Redirect to="/dz" />
              // ) : location === "Senegal" ? (
              //   <Redirect to="/sn" />
              // ) : location === "Côte d'Ivoire" ? (
              //   <Redirect to="/ci" />
              // ) : location === "Benin" ? (
              //   <Redirect to="/bj" />
              <Redirect to="/lb" />
            )}
          </Route>

          <Route exact path="/lb" component={HomeScreen} />
          <Route exact path="/eg" component={HomeScreen} />
          {/* <Route exact path="/tn" component={HomeScreen} />
          <Route exact path="/ma" component={HomeScreen} />
          <Route exact path="/dz" component={HomeScreen} />
          <Route exact path="/sn" component={HomeScreen} />
          <Route exact path="/ci" component={HomeScreen} />
          <Route exact path="/bj" component={HomeScreen} /> */}

          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pagenumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/products/:id" component={SingleProduct} />
          <Route path="/login" component={Form} />
          <Route path="/register" component={Form} />
          <Route path="/resetPassword/:token" component={ResetPassword} />
          <Route path="/createProduct" component={ProductForm} />
          <PrivateRouter path="/profile" component={ProfileScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/terms" component={Terms} />
          <Route path="/about" component={About} />
          <Route path="/privacyPolicy" component={PrivacyPolicy} />
          <Route path="/paymentPolicy" component={Payment} />
          <PrivateRouter path="/shipping" component={ShippingScreen} />
          <PrivateRouter path="/payment" component={PaymentScreen} />
          <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
