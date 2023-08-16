import React, { useState } from "react";  //  , useEffect
import { useDispatch } from 'react-redux'  //  , useSelector
import { thunkEditReview } from '../../store/review';

import "./ConfirmationModal.css"


function ConfirmReviewModal({review}) {

    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState(review.title);
    const [body, setBody] = useState(review.body);
    const [rating, setRating] = useState(review.rating);

    const toggleButton = () => {
        setModal(!modal)
    }

    const submitReveiw = () => {
        dispatch(thunkEditReview({title, body, rating }, review.id))
        toggleButton()
    }

  return (
    <div>

        <button className='editReviewButton'
            onClick={()=>{toggleButton()
            }}>
                Edit Review
        </button>

        {modal && (
            <div className='reviewModalOverlay'>
                <div className='reviewModal'>
                    <h1>Do you want to edit your Review?</h1>
                    <section className='ReviewFormContainer'>
                        <label>Title</label>
                        <input type="text"className="ReviewTitleInput" value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                        }}/>
                        <label>Description</label>
                        <input type="text"className="ReviewDescriptionInput" value={body}
                            onChange={(e) => {
                                setBody(e.target.value)
                        }}/>
                        <label>Rating</label>
                        <input type="text"className="ReviewRatingInput" value={rating}
                            onChange={(e) => {
                                setRating(e.target.value)
                        }}/>

                    </section>
                    <span className='confirmButtonSpan'>
                        <button onClick={()=>{
                             return submitReveiw()
                        }}>
                            Edit Review
                        </button>
                        <button onClick={()=>{toggleButton()}}>
                            Cancel
                        </button>
                    </span>
                </div>
            </div>
        )}

    </div>
  )
}

export default ConfirmReviewModal
