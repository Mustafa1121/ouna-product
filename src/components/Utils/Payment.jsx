import React, { useEffect } from "react";
import classes from "../../style/terms.module.css";
import Footer from "../HomeComponent/Footer/Footer";
import Header from "../HomeComponent/Header/Header";

const Payment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div className={classes.header}>
        <div className={classes.logo}>Last Updated on 08 January 2021</div>
        <div className={classes.title}>
          <h1>Payment Policy</h1>
        </div>
      </div>
      <div className={classes.terms}>
        <h5 className={classes.subHeader}>Payment Policy</h5>
        <div className={classes.termsList}>
          <ul>
            <li style={{ fontWeight: "bold", marginBottom: "5px" }}>
              Payment Policy:
            </li>
            <li>
              OUNA Company and website allow users to pay: In
              local currency In digital currencies In foreign currencies By
              credit card ▫️ Emphasis is placed on the necessity of using valid
              cards, and ensuring that the payment information is accurate and
              correct when making the payment by the cardholder or the
              authorized user. These terms and conditions are binding for both
              parties. If these terms and conditions are translated into any
              other language and a contradiction is found between the English
              text and the translated text, the English text shall prevail and
              replace it. All texts and content are subject to OUNA's copyright.
              We may sometimes make changes to this policy. When we make
              material changes to this policy, we will provide you with clear
              notice as appropriate under the circumstances. For example, we may
              display a prominent notice within the OUNA service or send you a
              notice through email or your device. If you have any questions or
              concerns about this policy, please contact our data protection
              officer through any of the following methods: We hope you enjoy
              the OUNA experience, and welcome any suggestions for improvements.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;