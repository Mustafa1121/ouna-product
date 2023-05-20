import React, { useEffect, useState } from "react";
import Header from "../../components/HomeComponent/Header/Header";
import Rating from "../../components/Utils/Rating";
import Footer from "../../components/HomeComponent/Footer/Footer.jsx";
import Message from "../../components/LoadingError/Error.jsx";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../Redux/Actions/ProductActions";
import Loading from "../../components/LoadingError/Loading.jsx";
// import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import { addToCart, getListCart } from "../../Redux/Actions/cartActions";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const SingleProduct = ({ history, match }) => {
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");
  const [index, setIndex] = useState(0);
  const productId = match.params.id;
  const dispatch = useDispatch();
  // const isRecycle = useState(false);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loading1 } = useSelector((state) => state.cart);
  const { userInfo } = userLogin;

  // const productReviewCreate = useSelector((state) => state.productReviewCreate);
  // const {
  //   loading: loadingCreateReview,
  //   error: errorCreateReview,
  //   success: successCreateReview,
  // } = productReviewCreate;

  useEffect(() => {
    // if (successCreateReview) {
    //   alert("Review Submitted");
    //   setRating(0);
    //   setComment("");
    //   dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    // }
    dispatch(listProductDetails(productId));
    dispatch(getListCart(userInfo));
    window.scroll(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, productId]);

  const AddToCartHandle = (id) => {
    dispatch(addToCart(id, userInfo, product));
    // history.push("/cart");
    document.querySelector(".badge").classList.add("shake"); // Add the "shake" class to the badge element
    setTimeout(() => {
      document.querySelector(".badge").classList.remove("shake"); // Remove the "shake" class after 1 second
    }, 1000);
  };

  console.log(product);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     createProductReview(productId, {
  //       rating,
  //       comment,
  //     })
  //   );
  // };
  return (
    <>
      <Header />
      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  {productDetails?.product?.images && (
                    <img
                      alt={product?.name}
                      src={product?.images[index]?.url}
                      className=""
                    />
                  )}
                </div>
                <div className="recycle12">
                  {product.recycling ? "recycle" : "sell"}
                </div>
                <div className="small-images-container">
                  {product?.images?.map((item, i) => (
                    <img
                      key={i}
                      src={item.url}
                      className={
                        i === index
                          ? "small-image selected-image"
                          : "small-image"
                      }
                      alt={""}
                      onClick={() => setIndex(i)}
                    />
                  ))}
                </div>
                {product.recycling === false ? (
                  <div className="recycle">
                    <h5>
                      <b>Proof of Work:</b>
                    </h5>
                    <iframe
                      title="video"
                      width="520"
                      height="345"
                      className="videoP"
                      src={`${product?.video.url}`}
                    ></iframe>
                  </div>
                ) : null}
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                  </div>
                  <p>{product.description}</p>

                  <div className="product-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Price</h6>
                      <span>${product.price}</span>
                    </div>
                    {/* <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Status</h6>
                      {product.countInStock > 0 ? (
                        <span>In Stock</span>
                      ) : (
                        <span>unavailable</span>
                      )}
                    </div> */}
                    {/* <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Need Recycling</h6>
                      <span>{productDetails.product.recycling}</span>
                    </div> */}

                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Condition</h6>
                      <Rating
                        value={product.rating}
                        // text={`${product.numReviews} reviews`}
                      />
                    </div>
                    <>
                      {userInfo ? (
                        <button
                          onClick={() => AddToCartHandle(product._id)}
                          disabled={loading}
                          className="round-black-btn"
                        >
                          {loading1 && (
                            <CircularProgress
                              size={20}
                              style={{ color: "white" }}
                            />
                          )}
                          {!loading1 && "Add to Cart"}
                        </button>
                      ) : (
                        <Link to="/login">
                          <button className="round-black-btn">
                            Login First
                          </button>
                        </Link>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
