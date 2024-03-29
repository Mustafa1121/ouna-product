import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/HomeComponent/Header/Header";
import ProfileTabs from "../../components/profileComponents/ProfileTabs.jsx";
import { getUserAddresses } from "../../Redux/Actions/userActions";
import moment from "moment";
import { listMyOrders } from "../../Redux/Actions/OrderActions";
import Addresses from "../../components/profileComponents/Addresses.jsx";
import AddressForm from "../../components/profileComponents/AddressForm.jsx";
import Rating from "../../components/Utils/Rating";
import userPhoto from "../../images/user.png";

const ProfileScreen = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.listOfAddresses);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listMyOrders());
    // dispatch(getUserDetails("profile", userInfo));
    dispatch(getUserAddresses(userInfo));
  }, [dispatch, userInfo]);

  return (
    <>
      <Header />
      <div className="ProfileContainer">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-4 p-0 shadow ">
              <div className="author-card pb-0 pb-md-3">
                <div className="author-card-cover"></div>
                <div className="author-card-profile row">
                  <div className="author-card-avatar col-md-5">
                    <img src={userPhoto} alt="userprofileimage" />
                  </div>
                  <div className="author-card-details col-md-7">
                    <h5 className="author-card-name mb-2">
                      <strong>
                        {`${userInfo.data.user.Fname} ${userInfo.data.user.Lname}`}{" "}
                      </strong>
                    </h5>
                    <span className="author-card-position">
                      <>
                        Joined{" "}
                        {moment(userInfo.data.user.createdAt).format("LL")}
                      </>
                    </span>
                    <br />
                    <Rating value={userInfo.data.user.rating} text={``} />
                  </div>
                </div>
              </div>
              <div className="wizard pt-3 ">
                <div className="d-flex align-items-start">
                  <div
                    className="nav align-items-start flex-column col-12 nav-pills me-3 "
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <button
                      className="nav-link active"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      Profile Settings
                    </button>
                    <button
                      className="nav-link"
                      id="v-pills-address-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-address"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-address"
                      aria-selected="true"
                    >
                      Address Settings
                    </button>
                    <button
                      className="nav-link"
                      id="v-pills-addressF-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-addressF"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-addressF"
                      aria-selected="true"
                    >
                      Create Address
                    </button>
                    {/* <button
                    className="nav-link d-flex justify-content-between"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Orders List
                    <span className="badge2">{orders ? orders.length : 0}</span>
                  </button> */}
                  </div>
                </div>
              </div>
            </div>

            {/* panels */}
            <div
              className="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
              id="v-pills-tabContent"
            >
              <div
                className="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <ProfileTabs />
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-address"
                role="tabpanel"
                aria-labelledby="v-pills-address-tab"
              >
                <Addresses addresses={addresses} />
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-addressF"
                role="tabpanel"
                aria-labelledby="v-pills-addressF-tab"
              >
                <AddressForm />
              </div>
              {/* <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Orders orders={orders} loading={loading} error={error} />
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
