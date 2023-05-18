import React, { useState } from 'react'
import './NewSearchSection.css';

const NewSearchSection = () => {
    return (
        <>

            <div id="search-container">
                <input
                    type="search"
                    id="search-input"
                    placeholder="Search product name here.."
                />
                <button id="search">Search</button>
            </div>
            <div className='containRdio'>
                <input type="radio" id="radioButtonAll" name="radioGroup" />
                <label for="radioButtonAll">All</label>
                <input type="radio" id="radioButtonRecycled" name="radioGroup" />
                <label for="radioButtonRecycled">Recycled</label>
                <input type="radio" id="radioButtonNotRecycled" name="radioGroup" />
                <label for="radioButtonNotRecycled">Not Recycled</label>

            </div>
            <div id="products"></div>

        </>
    )
}

export default NewSearchSection