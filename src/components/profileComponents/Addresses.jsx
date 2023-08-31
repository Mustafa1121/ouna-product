import React from "react";
import { useDispatch } from "react-redux";
import { UPDATE_ADDRESSES_AFTER_DELETION } from "../../Redux/Constants/UserContants";
import UpdatedForm from "./UpdateForm";

const Addresses = ({ addresses }) => {
  const dispatch = useDispatch();

  const deleteAddress = (index) => {
    const updatedAddresses = addresses.filter((address, i) => i !== index);

    // Alternatively, you can dispatch an action to update the addresses state
    dispatch({
      type: UPDATE_ADDRESSES_AFTER_DELETION,
      payload: updatedAddresses,
    });
  };

  return (
    <div className="row">
      {addresses?.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No Addresses Found, Please create one to start your shopping
        </div>
      ) : (
        <>
          <div className="col-md-4 col-xs-12 mt-3">
            <div className="list-group" id="list-tab" role="tablist">
              {addresses?.map((address, index) => (
                <a
                  key={index}
                  className={`list-group-item list-group-item-action ${
                    index === 0 ? "active" : ""
                  }`}
                  id={`list-${address.fullAddress}-list`}
                  data-toggle="list"
                  href={`#list-${address.fullAddress}`}
                  role="tab"
                  aria-controls={address.label}
                >
                  {address.fullAddress}
                </a>
              ))}
            </div>
          </div>
          <div className="col-md-8 col-12">
            <div className="tab-content" id="nav-tabContent">
              {addresses?.map((address, index) => (
                <div
                  key={index}
                  className={`tab-pane fade ${
                    index === 0 ? "show active" : ""
                  }`}
                  id={`list-${address.fullAddress}`}
                  role="tabpanel"
                  aria-labelledby={`list-${address.label}-list`}
                >
                  <UpdatedForm
                    deleteAddress={deleteAddress}
                    address={address}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Addresses;
