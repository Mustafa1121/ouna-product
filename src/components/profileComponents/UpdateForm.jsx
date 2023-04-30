import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { useSelector } from "react-redux";

const UpdatedForm = ({ address, index, deleteAddress }) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    countryCode: "",
    city: "",
    fullAdress: "",
    additionalAddressInfo: "",
  });
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handleDeleteAddress = async (id, index) => {
    try {
      const config = {
        headers: {
          token: `${userInfo.data.token}`,
        },
      };
      await axios.delete(
        `/api/user/deleteAddress/${id}`,
        config
      );
      deleteAddress(index);
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };
  const handleUpdateAddress = async (id) => {
    try {
      const config = {
        headers: {
          token: `${userInfo.data.token}`,
        },
      };
      await axios.post(
        `/api/user/updateAddress/${id}`,
        config
      );
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };
  useEffect(() => {
    setFormData(address);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <form>
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
            <b> Last Name</b>
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
            <b> Phone</b>
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
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
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
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
        <div className="form-group col-md-12 col-12 mt-3">
          <label style={{ fontSize: "16px" }} htmlFor="additionalAddressInfo">
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
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="col-5 btn btn-danger mt-3"
          onClick={() => handleDeleteAddress(address._id, index)}
        >
          Delete
        </button>
        <button
          type="button"
          className="col-5 btn btn-primary mt-3"
          onClick={() => handleUpdateAddress(address._id, index)}
        >
          Edit
        </button>
      </div>
    </form>
  );
};

export default UpdatedForm;
