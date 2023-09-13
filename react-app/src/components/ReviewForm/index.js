import React, { useState } from 'react'
import { useDispatch } from 'react-redux'  //  , useSelector
import { useParams, useHistory } from 'react-router-dom'  //
import { thunkCreateReview } from "../../store/review"

import "./ReviewForm.css"


function ReviewForm() {

const history = useHistory();
const { productId } = useParams();
const dispatch = useDispatch();
const [title, setTitle] = useState("");
const [body, setBody] = useState("");
const [rating, setRating] = useState(0);
const [activeRating, setActiveRating] = useState(rating);
const [errors, setErrors] = useState({});
let trackErrors = {}

const submitReveiw = () => {
    setErrors({});
    trackErrors = {};
    if(title.length < 1 || title.length > 100) trackErrors.title = "*Must have a title";
    if(body.length < 5 || body.length > 500) trackErrors.body = "*Review must be between 5 and 500 characters";
    if(rating === 0) trackErrors.rating = "*Please Select a rating";
    setErrors(trackErrors)

    if(Object.values(trackErrors).length > 0) {
        return null
    } else {
        dispatch(thunkCreateReview({title, body, rating}, productId))
        history.push(`/collections/products/${productId}`)
    }
}

  return (
    <main className='mainReviewPage'>
        <h1>Review Form</h1>
        <section className='reviewFormContainer'>
            <span className='labelInputSpan'>
                <label className='reviewLabel'>
                    Title:
                </label>
                <input type="text"className="reviewTitleInput" value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}/>
                {errors.title && <p className='errorTag'>{errors.title}</p>}
            </span>
            <span className='labelDesciptionSpan'>
                <label className='reviewLabel'>
                    Description:
                </label>
                <textarea type="text"className="reviewDescriptionInput" value={body}
                    onChange={(e) => {
                        setBody(e.target.value)
                    }}/>
                {errors.body && <p className='errorTag'>{errors.body}</p>}
            </span>
            <span className='labelInputSpan'>
                <label className='reviewLabel'>
                    Rating:
                </label>
                <section className="star-rating">
                    <div className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => {setActiveRating(1)} }
                        onMouseLeave={() => {setActiveRating(rating)} }
                        onClick={() => {setRating(1)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    <div className={activeRating >= 2 ? "filled" : "empty"}
                        onMouseEnter={() => {setActiveRating(2)} }
                        onMouseLeave={() => {setActiveRating(rating)} }
                        onClick={() => {setRating(2)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    <div className={activeRating >= 3 ? "filled" : "empty"}
                        onMouseEnter={() => {setActiveRating(3)} }
                        onMouseLeave={() => {setActiveRating(rating)} }
                        onClick={() => {setRating(3)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    <div className={activeRating >= 4 ? "filled" : "empty"}
                        onMouseEnter={() => {setActiveRating(4)} }
                        onMouseLeave={() => {setActiveRating(rating)} }
                        onClick={() => {setRating(4)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    <div className={activeRating >= 5 ? "filled" : "empty"}
                        onMouseEnter={() => {setActiveRating(5)} }
                        onMouseLeave={() => {setActiveRating(rating)} }
                        onClick={() => {setRating(5)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>
                </section>
                {errors.rating && <p className='errorTag'>{errors.rating}</p>}
            </span>
            <span className='confirmReviewsSpan'>
                <button className='reviewModalButtons'
                onClick={()=>{
                    return submitReveiw()
                }}>
                    Create Review
                </button>
                <button className='reviewModalButtons'
                onClick={()=>{
                    return history.push(`/collections/products/${productId}`)
                }}>
                    Cancel
                </button>
            </span>
        </section>
    </main>
  )
}

export default ReviewForm
