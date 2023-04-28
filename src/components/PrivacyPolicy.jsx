import React, { useEffect } from "react";
import classes from "../style/terms.module.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div className={classes.header}>
        <div className={classes.logo}>Last Updated on 08 January 2021</div>
        <div className={classes.title}>
          <h1>Privacy Policy</h1>
        </div>
      </div>
      <div className={classes.terms}>
        <h5 className={classes.subHeader}>Privacy Policy</h5>
        <div className={classes.termsList}>
          <ul>
            <li>
              We take your privacy seriously and are committed to protecting the
              privacy of all visitors and subscribers to our website. When you
              visit our platform or create a login and password to access
              services, you may be asked to provide information about yourself.
              This may include: (1) your name and contact details, including
              email address and phone number; (2) information that enables us to
              verify and authenticate your identity; (3) location data; (4)
              billing information, transaction information, payment information,
              and history; and (5) any other information we may request from
              time to time to provide the services and comply with applicable
              law. You agree, and when necessary consent, to the collection of
              information about your use of the platform and services and
              information from messages and communications you send to us. This
              information is required to provide services to you. If you do not
              provide this information, it may result in our delay or inability
              to provide services to you.
            </li>
            <li>
              Your personal information (including your name, address, and any
              other details you provide to us and that concern you as an
              individual) may be processed for the following purposes: To update
              and develop. To understand, diagnose, troubleshoot, and fix issues
              related to OUNA services. To evaluate new features, technologies,
              and enhancements and develop them for OUNA service. For marketing,
              promotion, and advertising purposes. To comply with legal
              obligations and law enforcement requests. To file or defend legal
              claims. To conduct business planning and prepare reports and
              forecasts. To detect and prevent fraud, including fraudulent
              payments and fraudulent use of OUNA service.
            </li>
            <li>
              Deletion: If you close your account or request that we close it,
              we will delete your personal data or anonymize your identity so
              that you cannot be identified thereafter, unless we are required
              to retain some data or still need to use it for a lawful purpose.
              The following are some examples of cases where we are legally
              permitted or required to retain some of your personal data.
            </li>
            <li style={{ fontWeight: "bold", marginBottom: "5px" }}>
              Limitation of Liability:
            </li>
            <li>
              The company shall not be liable for the following: Consequential,
              indirect, special, or punitive damages or disciplinary
              compensations (even if the company has been notified of the
              possibility of such losses or damages). Loss of profit Data loss
              or damage Contractual loss Damage to reputation Regardless of the
              cause of their occurrence or whether they are incurred by any user
              in any form related to these terms or any user's liability to any
              third party. You specifically acknowledge and agree that the
              company shall not be liable for any user-provided content,
              defamation campaigns, abusive or unlawful behavior by any user or
              third party, and that you assume any risks that may result in any
              harm or damage from the above. Although the company will make all
              reasonable efforts to eliminate any viruses that affect the
              website, it cannot guarantee their elimination, and the company
              accepts no responsibility for any viruses. Users are advised to
              take all appropriate warranties before accessing or downloading
              any information or material from the website. The website contains
              information and materials uploaded by other users. The company has
              not verified or approved these materials or information, and
              therefore, the company shall not be responsible for any materials
              that may be deemed unacceptable. You may also be exposed to
              inaccurate, defamatory, inappropriate, rejected, defamatory, or
              obscene materials, so you agree that to the extent permitted by
              law, you waive and relinquish any legal rights you may have
              against the company in that regard. The user agrees to defend the
              company, the website, and all of their respective officers,
              affiliates, subsidiaries, successors, assigns, directors,
              officers, agents, service providers, suppliers, and employees, and
              to indemnify and hold them harmless from and against any and all
              claims, damages, obligations, losses, liabilities, costs, and
              expenses (including attorney's fees).
            </li>
            <li style={{ fontWeight: "bold", marginBottom: "5px" }}>
              Regarding the company's regulations and the judicial authority:
            </li>
            <li>
              The company aims to achieve integrity in its sales and purchase
              operations, combat fraud and deception by adhering to the laws and
              legislations in the United States. All disputes are subject to the
              law related to public order (private international law). Regarding
              the refund and exchange policy: The refund and exchange policy is
              considered one of the important policies in the terms and
              conditions of electronic stores and is one of the main provisions
              in the sales and purchase process, as stipulated by the Consumer
              Protection Law. The company allows for exchange and return within
              14 days from the date of receiving the goods, provided that: The
              item is kept in its original condition. A defect is discovered in
              the item or the wrong item is received. The exchange and return
              request form should be filled out on the website, and the company
              will contact you directly at support@ouna.app. The seller on the
              company's website bears 100% of the shipping and return costs.
              Regarding the shipping and delivery policy: OUNA company seeks to
              provide maximum satisfaction to its customers in obtaining their
              products. It realizes the importance of the buyer receiving their
              products easily, quickly, and at the right time and in the same
              excellent condition.
            </li>
            
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;