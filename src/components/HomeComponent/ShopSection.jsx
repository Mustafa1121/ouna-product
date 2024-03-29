import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../Utils/Rating.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  listProduct,
} from "../../Redux/Actions/ProductActions.js";
import Loading from "../LoadingError/Loading.jsx";
import Message from "../LoadingError/Error.jsx";
import wpIcon from "../../images/wpIcon.png";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { getListCart } from "../../Redux/Actions/cartActions.js";
import Slider from "./Slider/Slider.jsx";
import FilterSection from "../HomeComponent/Category/Category.jsx";
import NewSearchSection from "./Search/SearchInput.jsx";

const filterProducts = (products, searchTerm, isRecycle, isNotRecycle) => {
  if (searchTerm === "" && (isRecycle || isNotRecycle)) {
    return products?.filter((product) => {
      const recycle = product.recycling;

      if (isRecycle) {
        return recycle === true;
      }
      if (isNotRecycle) {
        return recycle === false;
      }

      return true;
    });
  }
  return products?.filter((product) => {
    if (searchTerm === "") return products;
    const productName = product.name.toLowerCase();
    const categoryName = product.category.name.toLowerCase();
    const recycle = product.recycling;

    if (isRecycle) {
      return (
        (productName.includes(searchTerm.toLowerCase()) && recycle === true) ||
        (categoryName.includes(searchTerm.toLowerCase()) && recycle === true)
      );
    }
    if (isNotRecycle) {
      return (
        (productName.includes(searchTerm.toLowerCase()) && recycle === false) ||
        (categoryName.includes(searchTerm.toLowerCase()) && recycle === false)
      );
    }

    return (
      productName.includes(searchTerm.toLowerCase()) ||
      categoryName.includes(searchTerm.toLowerCase())
    );
  });
};

const ShopSection = (props) => {
  const [filteredProducts, setFilterProducts] = useState([]);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const selectedFlag = localStorage.getItem("selectedFlag");
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 8;
  const totalPages = Math.ceil(filteredProducts?.length / productPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // scroll to top of page
  };

  useEffect(() => {
    dispatch(listProduct(selectedFlag));
    dispatch(getCategories());
    dispatch(getListCart(userInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleFilterProducts = (search, isRecycle, isNotRecycle) => {
    const filteredProducts = filterProducts(
      products,
      search,
      isRecycle,
      isNotRecycle
    );
    setFilterProducts(filteredProducts);
  };

  useEffect(() => {
    handleFilterProducts("", false, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <>
      <div className="sliderContainer">
        <Slider />
      </div>
      <br />
      <div className="FilterSection">
        <FilterSection />
      </div>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    <div className="searchSection">
                      <NewSearchSection
                        handleFilterProducts={handleFilterProducts}
                      />
                    </div>
                    <label className="fresh-recom">Fresh Recommendations</label>
                    {filteredProducts?.length ? (
                      <>
                        <Grid container spacing={5}>
                          {filteredProducts
                            ?.slice(
                              (currentPage - 1) * productPerPage,
                              currentPage * productPerPage
                            )
                            ?.map((product) => (
                              <Grid
                                item
                                key={product._id}
                                xs={11}
                                sm={6}
                                md={4}
                                lg={3}
                                xl={2}
                              >
                                <Card
                                  style={{
                                    height: "93%",
                                    width: "110%",
                                    boxShadow:
                                      "0 2px 4px rgba(44, 42, 42, 0.3)",
                                    borderBottom: "5px solid #3471db",
                                    borderBottomColor: "transparent",
                                    transition:
                                      "transform 0.2s, box-shadow 0.2s, border-bottom-color 0.2s",
                                    borderRadius: "10px",
                                  }}
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.transform =
                                      "scale(1.05)";
                                    e.currentTarget.style.boxShadow =
                                      "0px 0px 15px rgba(52, 113, 219, 0.4)";
                                    e.currentTarget.style.borderBottomWidth =
                                      "6px";
                                    e.currentTarget.style.borderBottomColor =
                                      "#3471db";
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.transform =
                                      "scale(1)";
                                    e.currentTarget.style.boxShadow =
                                      "0px 0px 10px rgba(0, 0, 0, 0.2)";
                                    e.currentTarget.style.borderBottomWidth =
                                      "5px";
                                    e.currentTarget.style.borderBottomColor =
                                      "transparent";
                                  }}
                                >
                                  {" "}
                                  <Link to={`/products/${product._id}`}>
                                    <CardMedia
                                      style={{
                                        height: "150px",
                                        objectFit: "contain",
                                        transition: "transform 0.2s",
                                      }}
                                      component="img"
                                      image={product.images[0].url}
                                      alt={product.name}
                                      className="product-image"
                                    />{" "}
                                  </Link>
                                  <CardContent>
                                    <Typography variant="h6" component="h4">
                                      <Link to={`/products/${product._id}`}>
                                        {product.name}
                                      </Link>
                                    </Typography>
                                    <Typography variant="h6" component="h6">
                                      {/* {product.category.name} */}
                                    </Typography>
                                    <Rating
                                      value={product.status}
                                      // text={`${product.numReviews}`}
                                    />
                                    <Typography variant="h6" component="p">
                                      {product.unitPrice}
                                      {product.price}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                        </Grid>
                        {totalPages > 1 && (
                          <div className="pagination">
                            <div className="mt-3">
                              <div
                                className="customPagination"
                                style={{ display: "flex" }}
                              >
                                <Link
                                  to=""
                                  className="prev"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage === 1) return;
                                    handleClick(currentPage - 1);
                                  }}
                                  disabled={currentPage === 1}
                                >
                                  Prev
                                </Link>
                                <div className="d-flex">
                                  {pageNumbers.map((pageNumber) => (
                                    <Link
                                      to=""
                                      key={pageNumber}
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                      className={
                                        pageNumber === currentPage
                                          ? "active"
                                          : ""
                                      }
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleClick(pageNumber);
                                      }}
                                    >
                                      {pageNumber}
                                    </Link>
                                  ))}
                                </div>
                                <Link
                                  to=""
                                  className="next"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage === totalPages) return;
                                    handleClick(currentPage + 1);
                                  }}
                                  disabled={currentPage === totalPages}
                                >
                                  Next
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <h2>No Products</h2>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contain-wp">
        <a
          href="https://web.whatsapp.com/send?phone=+96170528539&text=Hello,%20I%20want%20to%20chat"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="wp">
            <img alt="" src={wpIcon} />
          </div>
        </a>
      </div>
    </>
  );
};

export default ShopSection;
