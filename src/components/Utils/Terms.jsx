import React, { useEffect } from "react";
import classes from "../../style/terms.module.css";
import Footer from "../HomeComponent/Footer/Footer";
import Header from "../HomeComponent/Header/Header";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div className={classes.header}>
        <div className={classes.logo}>Last Updated on 08 January 2021</div>
        <div className={classes.title}>
          <h1>Terms and Conditions</h1>
        </div>
      </div>
      <div className={classes.terms}>
        <h5 className={classes.subHeader}>Terms and Conditions</h5>
        <div className={classes.termsList}>
          <ul>
            <li style={{ fontWeight: "bold", marginBottom: "5px" }}>
              For the general terms and conditions:
            </li>
            <li>
              The company will receive a commission of 10% of the total value of
              the business transaction upon completion, paid by the advertiser
              and held in trust by the company. Payment is due upon receipt.
              Since we are not involved in any relationship with the user or the
              service provider, we have nothing to do with any dispute, if any,
              that arises between the two parties. Upon registration on this website, the user must provide truthful,
              accurate, up-to-date, and complete registration details and must
              update them if any changes occur (excluding age) before using the
              website to access other services in the future.
              You undertake that you are licensed by and hold a valid license
              issued by the relevant rights holders of the property before
              advertising on the website. And that you are legally authorized to
              publish such an advertisement.
            </li>
            <li>
              These terms and privacy policy, and any other document included
              therein, expressly constitute the full agreement between you and
              the company, and neither party may rely on any statement made by
              the other party unless that statement is expressly included in
              these terms. No party shall be entitled to claim or receive any
              compensation for any unintentional shortfall or false
              representation, except to the extent (if any) permitted by the
              court based on the same principle as fair and reasonable.
            </li>
            <li>
              The company reserves the right to modify its business terms from
              time to time. The text at the beginning of these terms specifies
              the date of entry into force, and the user must verify that the
              date of entry into force has not changed before using the website
              again. If it has changed, the user must review the new terms and
              conditions and not use the website until accepting the new terms
              and conditions. If you do not accept these changes, you must
              immediately stop attempting to access the website and using the
              service.
            </li>
            <li>
              Any provisions or conditions or any part thereof shall be deleted
              if they become void for any reason, provided that the remaining
              provisions remain in full force and effect.
            </li>
            <li>
              No delay by the company in enforcing any of these terms or
              refraining from doing so or in exercising any of its rights under
              this agreement shall be interpreted as a waiver of such right, and
              no waiver of any such right or remedy shall be effective unless it
              is in writing and signed by an authorized representative of the
              company.
            </li>
           


            <li style={{ fontWeight: "bold", marginBottom: "5px" }}>
              Payment Policy:
            </li>
            <li>
              Payment Policy: OUNA Company and website allow users to pay: In
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

export default Terms;