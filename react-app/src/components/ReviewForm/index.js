import React, { useState } from 'react'
import { useDispatch  } from 'react-redux'  //useSelector
import { useParams, useHistory } from 'react-router-dom'
import { thunkCreateReview } from "../../store/review"

import "./ReviewForm.css"


function ReviewForm() {

const { productId } = useParams();
const dispatch = useDispatch();
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [rating, setRating] = useState(0);

const submitReveiw = () => {
    console.log('before thunk');
    console.log({title, description, rating});
    dispatch(thunkCreateReview({title, description, rating}, productId))
    console.log('after thunk');
}

  return (
    <main>
        <h1>Review Form</h1>
        <section className='ReviewFormContainer'>
            <label>Title</label>
            <input type="text"className="ReviewTitleInput" value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
            }}/>
            <label>Description</label>
            <input type="text"className="ReviewDescriptionInput" value={description}
                onChange={(e) => {
                    setDescription(e.target.value)
            }}/>
            <label>Rating</label>
            <input type="text"className="ReviewRatingInput" value={rating}
                onChange={(e) => {
                    setRating(e.target.value)
            }}/>
            <button onClick={()=>{
                return submitReveiw()
            }}>Create Review</button>
        </section>
    </main>
  )
}

export default ReviewForm
