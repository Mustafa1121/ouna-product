import axios from "../../axios/axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ADD_ADDRESS } from "../../Redux/Constants/UserContants";
import cities from "../../utils/cities";
// import Select from "react-select";

const AddressForm = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [formData, setFormData] = useState({
    fname: userInfo.data.user.Fname,
    lname: userInfo.data.user.Lname,
    phoneN: userInfo.data.user.phone,
    countryCode: userInfo.data.user.countryCode,
    city: cities[0].Lebanon,
    fullAddress: "",
    additionalAddressInfo: "",
  });

  const addAddress = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.post("/api/user/Address", formData, config);
      console.log(response.data);
      dispatch({
        type: ADD_ADDRESS,
        payload: response.data,
      });
      toast.info("New Address is created", {
        position: "bottom-right",
      });
      setFormData({
        fname: userInfo.data.user.Fname,
        lname: userInfo.data.user.Fname,
        phoneN: userInfo.data.user.phone,
        countryCode: userInfo.data.user.countryCode,
        city: cities[0].Lebanon,
        fullAddress: "",
        additionalAddressInfo: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="row">
      <div className="col-md-12 col-12">
        <form onSubmit={addAddress}>
          <div className="d-flex flex-wrap">
            <div className="form-group col-md-6 col-sm-12 col-12 mt-3">
              <label style={{ fontSize: "16px" }} htmlFor="fname">
                <b>First Name</b>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="fname"
                  name="fname"
                  value={formData.fname}
                  onChange={(e) =>
                    setFormData({ ...formData, fname: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group col-md-6 col-sm-12 col-12 mt-3">
              <label style={{ fontSize: "16px" }} htmlFor="lname">
                <b>Last Name</b>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="lname"
                  name="lname"
                  value={formData.lname}
                  onChange={(e) =>
                    setFormData({ ...formData, lname: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group col-md-6 col-sm-12 col-12 mt-3">
              <label style={{ fontSize: "16px" }} htmlFor="phone">
                <b>Phone</b>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phoneN}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneN: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group col-md-6 col-sm-12 col-12 mt-3">
              <label style={{ fontSize: "16px" }} htmlFor="countryCode">
                <b>Country Code</b>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={(e) =>
                    setFormData({ ...formData, countryCode: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group col-md-6 col-sm-12 col-12 mt-3">
              <label style={{ fontSize: "16px" }} htmlFor="city">
                <b>City</b>
              </label>
              <div className="input-group">
                <select
                  className="SelectedCountries form-select"
                  value={cities[0].Lebanon}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                >
                  {cities.map((city) => {
                    return <option value={city.Lebanon}>{city.Lebanon}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="form-group col-md-6 col-sm-12 col-12 mt-3">
              <label style={{ fontSize: "16px" }} htmlFor="fullAddress">
                <b>Full Address</b>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="fullAddress"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, fullAddress: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group col-md-12 col-12 mt-3 ">
              <label
                style={{ fontSize: "16px" }}
                htmlFor="additionalAddressInfo"
              >
                <b>Additional Address Info</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="additionalAddressInfo"
                name="additionalAddressInfo"
                value={formData.additionalAddressInfo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    additionalAddressInfo: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="updateProfileBtn"
              type="submit"
              style={{
                backgroundColor: "#3498db",
                width: "100%",
                borderRadius: "35px",
                border: "none",
                color: "#fff",
                padding: "10px 20px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,.2)",
                fontSize: "16px",
              }}
            >
              Create Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
