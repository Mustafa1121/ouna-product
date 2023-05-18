import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = () => {
    const [counter, setCounter] = useState(1);


    const nextSlide = () => {
        document.getElementById('radio' + counter).checked = true;
        setCounter((prevCounter) => {
            if (prevCounter === 4) {
                return 1;
            } else {
                return prevCounter + 1;
            }
        });
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 10000);
        return () => clearInterval(interval);
    }, [counter]);



    return (

        <div className='slider'>
            <div className="slides">

                <input type="radio" name="radio-btn" id="radio1" aria-label="Radio Button 1" />
                <input type="radio" name="radio-btn" id="radio2" aria-label="Radio Button 2" />
                <input type="radio" name="radio-btn" id="radio3" aria-label="Radio Button 3" />
                <input type="radio" name="radio-btn" id="radio4" aria-label="Radio Button 4" />

                <div className="slide first">
                    <img src="https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                </div>
                <div className="slide">
                    <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                </div>
                <div className="slide">
                    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                </div>
                <div className="slide">
                    <img src="https://images.pexels.com/photos/35550/ipad-tablet-technology-touch.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>

                <div className="navigation-auto">
                    <div className="auto-btn1"></div>
                    <div className="auto-btn2"></div>
                    <div className="auto-btn3"></div>
                    <div className="auto-btn4"></div>

                </div>

                <div className="navigation-manual">
                    <label htmlFor="radio1" className="manual-btn"></label>
                    <label htmlFor="radio2" className="manual-btn"></label>
                    <label htmlFor="radio3" className="manual-btn"></label>
                    <label htmlFor="radio4" className="manual-btn"></label>
                </div>

            </div>
        </div>

    )
}

export default Slider