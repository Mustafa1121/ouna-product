import React, { useState, useEffect } from "react";
import "../../style/product.css";
import Header from "../Header";
import Footer from "../Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  Typography,
  Box,
  InputLabel,
  MenuItem,
  Rating,
  FormControl,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getCategories } from "../../Redux/Actions/ProductActions";
import { useHistory } from "react-router-dom";
import Loading from "../LoadingError/Loading";

function ProductForm() {
  const currencySymbol =
    localStorage.getItem("selectedFlag") === "Lebanon"
      ? "USD"
      : localStorage.getItem("selectedFlag") === "Egypt"
      ? "EGP"
      : localStorage.getItem("selectedFlag") === "Tunisia"
      ? "د.ت"
      : localStorage.getItem("selectedFlag") === "Morocco"
      ? "د.م."
      : localStorage.getItem("selectedFlag") === "Algeria"
      ? "د.ج"
      : localStorage.getItem("selectedFlag") === "Senegal" ||
        localStorage.getItem("selectedFlag") === "Côte d'Ivoire" ||
        localStorage.getItem("selectedFlag") === "Benin"
      ? "CFA"
      : "$";
  const history = useHistory();
  const categories = useSelector((state) => state.productCategories);
  const { loading } = useSelector((state) => state.productList);
  console.log(loading);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [numDownloaded, setNumDownloaded] = useState(0);
  const [video, setVideo] = useState(null);
  const selectedFlag = localStorage.getItem("selectedFlag");
  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      description: "",
      imageClass: "",
      price: "",
      category: "",
      rating: 0,
      recycling: false,
      origin: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(18, "At most 18 characters!")
        .required("Name is required!"),
      description: Yup.string().required("Description is required!"),
      price: Yup.string().required("Price is required."),
      category: Yup.string().required("Select a category"),
    }),
    onSubmit: (values, { resetForm }) => {
      const formData = {
        name: values.name,
        category: selectedCategoryId,
        price: values.price,
        description: values.description,
        recycling: values.recycling,
        base64Video: video,
        imagesbase: selectedImages,
        rating: Number(values.rating),
        origin: selectedFlag,
      };
      dispatch(addProduct(formData, userInfo, history));
    },
    validateOnChange: false, // disable validation on change
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (numDownloaded < 2) {
      toast.warning("Please download at least 5 images before submitting!");
      return;
    }
    if (formik.values.category === "Phones") {
      toast.warning(
        "For testing purposes, please note that the 'Phones' category is currently only available on our mobile app. Please use the app to test this category"
      );
      return;
    }
    formik.handleSubmit();
  };
  useEffect(() => {
    if (formik.errors.brand) {
      toast.error(formik.errors.brand);
    }
    if (formik.errors.title) {
      toast.error(formik.errors.title);
    }
    if (formik.errors.description) {
      toast.error(formik.errors.description);
    }
    if (formik.errors.price) {
      toast.error(formik.errors.price);
    }
    if (formik.errors.category) {
      toast.error(formik.errors.category);
    }
    if (formik.errors.isRecycling) {
      toast.error(formik.errors.isRecycling);
    }
    if (formik.errors.rating) {
      toast.error(formik.errors.rating);
    }
    if (!userInfo) {
      history.push("/login");
      toast.warning("You should be logged in to sell a product");
    }
    formik.setErrors({});
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.errors]);

  const removeImage = (indexToRemove) => {
    setSelectedImages(
      selectedImages.filter((_, index) => index !== indexToRemove)
    );
    setNumDownloaded(numDownloaded - 1);
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    checkVideoDuration(file);
  };

  function checkVideoDuration(file) {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.onloadedmetadata = function () {
      if (this.duration < 10) {
        toast.warning("Video must be at least 10 seconds long");
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          const base64Video = reader.result.split(",")[1];
          setVideo(base64Video);
        };
      }
    };
  }

  // const AddProductHandler = () => {
  //   history.push("/login?redirect=/");
  // };

  return (
    <>
      <Header />
      <form className="product-formp mt-4" onSubmit={onSubmit}>
        <div className="form-fieldp">
          <div className="inputsp">
            <div className="brand-div">
              <label htmlFor="brand">Brand Name:</label>
              <input
                placeholder="Enter Brand Name"
                maxLength="17"
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="Rating">
          <Box
            sx={{
              "& > legend": {
                mt: 4,
                fontWeight: "bold",
                marginBottom: "10px",
                fontSize: ".95rem",
              },
            }}
          >
            <Typography
              component="legend"
              sx={{
                fontSize: "1.25rem",
              }}
            >
              {" "}
              Condition:
            </Typography>
            <br />
            <br />
            <Rating
              size="large"
              name="rating"
              value={Number(formik.values.rating)}
              onChange={formik.handleChange}
            />
          </Box>
          <div className="pricingp">
            <label htmlFor="price">
              <label htmlFor="price">Price ( in {currencySymbol}):</label>
            </label>
            <input
              placeholder="Enter Price"
              type="text"
              id="price"
              min="0"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="form-fieldp">
          <div className="selectp">
            <FormControl sx={{ m: 1, minWidth: 250 }}>
              <InputLabel
                id="demo-multiple-checkbox-label"
                sx={{
                  color: "text.secondary",
                  position: "absolute",
                  top: "-3px",
                  left: "16px",
                  backgroundColor: "white",
                  padding: "0 4px",
                  "&.Mui-focused": {
                    transform: "translate(0, -3px) scale(0.75)",
                    backgroundColor: "white",
                    padding: "0 4px",
                  },
                }}
              >
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={formik.values.category}
                onChange={(event) => {
                  setSelectedCategoryId(
                    categories.categories.find(
                      (category) => category.name === event.target.value
                    )._id
                  );
                  formik.handleChange(event);
                  if (event.target.value === "Phones") {
                    toast.warning(
                      "For testing purposes, please note that the 'Phones' category is currently only available on our mobile app. Please use the app to test this category"
                    );
                    return;
                  }
                }}
                name="category"
                autoWidth
                label="Category"
              >
                {categories?.categories?.map((category) => (
                  <MenuItem key={category._id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 250 }}>
              <InputLabel
                id="demo-simple-select-autowidth-label"
                sx={{
                  color: "text.secondary",
                  position: "absolute",
                  top: "-4px",
                  left: "16px",
                  backgroundColor: "white",
                  padding: "0 4px",
                  "&.Mui-focused": {
                    transform: "translate(0, -4px) scale(0.75)",
                    backgroundColor: "white",
                    padding: "0 4px",
                  },
                }}
              >
                Need Recycling ?
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                name="recycling"
                value={formik.values.recycling}
                onChange={formik.handleChange}
                autoWidth
                label="Recycling"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="form-fieldp">
          <label htmlFor="description">Description:</label>
          <textarea
            className="descriptionp"
            rows={5}
            cols={50}
            type="text"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-fieldp">
          <label htmlFor="image">Choose Image:</label>
          <label className="file-input-labelp" htmlFor="image">
            Select Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              files.forEach((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                  const base64Image = reader.result;
                  setSelectedImages([...selectedImages, base64Image]);
                  setNumDownloaded(numDownloaded + 1);
                };
              });
            }}
          />

          <div className="imagesp">
            {selectedImages.map((image, index) => (
              <div key={index} className="imm">
                <img
                  src={`${image}`}
                  height="100px"
                  width="100px"
                  alt={`Selected ${index}`}
                />
                <p className="removeImage" onClick={() => removeImage(index)}>
                  &times;
                </p>
              </div>
            ))}
          </div>
        </div>
        {!formik.values.recycling && (
          <div className="form-fieldp">
            <label htmlFor="video">Choose Video:</label>
            <label className="file-input-labelp" htmlFor="video">
              Select Video
            </label>
            <input id="video" type="file" onChange={handleVideoChange} />
            {video && <video src={video} controls />}
          </div>
        )}
        <div className="btn-submit-product">
          <button type="submit">{loading ? <Loading /> : "Add Product"}</button>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default ProductForm;
