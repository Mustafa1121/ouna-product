import React, { useEffect } from "react";
import classes from "../../style/terms.module.css";
import Footer from "../HomeComponent/Footer/Footer";
import Header from "../HomeComponent/Header/Header";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div className={classes.header}>
        <div className={classes.logo}>Last Updated on 08 January 2021</div>
        <div className={classes.title}>
          <h1>About Us</h1>
        </div>
      </div>
      <div className={classes.terms}>
        <h5 className={classes.subHeader}>About Us</h5>
        <div className={classes.termsList}>
          <ul>
            <li>
              After the enormous technological advancements in recent years, it
              became necessary to create something that regulates the
              relationship between websites or electronic platforms, especially
              commercial websites and service providers, and users. This is to
              protect electronic applications and websites and to emphasize
              their non-liability for the risks that service providers and users
              are exposed to as a result of their use. It is also to confirm
              that these platforms or websites are not responsible for what is
              published inside them in violation of what has been stated by them
              or for the failure of products to reach the user on time from
              service providers on electronic platforms and commercial websites.
            </li>
            <li>
              The best way to protect electronic platforms or websites is to
              formulate terms and conditions and privacy policies for electronic
              applications, which are considered a contract between the platform
              or electronic application on one hand, and the service provider
              and the service user on the other hand. Through this contract, the
              intellectual property rights of the platform or application are
              maintained, and the rights and obligations of the user and the
              service provider are confirmed, especially in commercial websites.
            </li>
            <li>
              By using the electronic website or the OUNA application on the
              electronic platform's mobile phone (referred to collectively as
              the "electronic website"), you confirm that you have read and
              understood and accepted the terms and conditions that govern your
              access to the electronic website and services, and your use of
              them. If you do not accept these terms or do not agree to abide by
              them, you are prohibited from using this electronic website. In
              addition, when you use part of the services, you agree to comply
              with any applicable published guidelines related to those
              services, which may be subject to change or update from time to
              time according to our sole discretion.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
