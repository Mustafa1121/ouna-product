import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error.jsx";
import Loading from "../LoadingError/Loading.jsx";
const Orders = (props) => {
  const { loading, error, orders } = props;
  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              <Link
                className="btn btn-primary mx-2 px-3 py-2"
                to="/"
                style={{
                  fontSize: "12px",
                  backgroundColor: "#3498db",
                  border: "none",
                }}
              >
                START SHOPPING
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      className={`${
                        order.isPaid ? "alert-success" : "alert-danger"
                      }`}
                      key={order._id}
                    >
                      <td>
                        <Link to={`/order/${order._id}`} className="link">
                          {order._id}
                        </Link>
                      </td>
                      <td>{order.isPaid ? <>Paid</> : <>Not Paid</>}</td>
                      <td>
                        {order.isPaid
                          ? moment(order.paidAt).calendar()
                          : moment(order.createdAt).calendar()}
                      </td>
                      <td>${order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;