import React, { useState } from "react";
import Slider from "react-slick";
import './FilterSection.css';
import { useSelector } from "react-redux";
const FilterSection = () => {


    const categories = useSelector((state) => state.productCategories);



    const [settings] = useState({
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                }
            }
        ]
    });

    return (
        <div className="dummyContainer">

            <Slider {...settings}>
                {
                    categories?.categories?.map((category, index) => (
                        <>
                            <div className="dummy" key={index}>
                                <img src={category.imageUrl} />
                                <p>{category.name}</p>
                            </div>
                        </>

                    ))

                }



            </Slider>
        </div>
    );
};

export default FilterSection;
